#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
ThinkCheck Harmony 简化版引擎
用于心理测评报告的逻辑健康度评估

简化版不依赖 sentence-transformers，使用基于规则的评估方法
"""

import re
import json
import sys
from typing import List, Dict, Any, Optional
from dataclasses import dataclass

PSYCHOLOGY_TERMS = [
    "情绪", "认知", "行为", "人格", "性格", "心理", "压力", "焦虑", "抑郁",
    "自信", "自尊", "社交", "关系", "沟通", "适应", "成长", "发展", "能力",
    "特质", "倾向", "得分", "维度", "水平", "特征", "表现", "建议", "提升",
    "优势", "劣势", "风险", "机会", "目标", "策略", "执行", "评估", "分析",
    "理解", "表达", "控制", "调节", "感知", "思维", "记忆", "注意", "决策",
    "外向", "内向", "稳定", "波动", "理性", "感性", "独立", "依赖"
]

ADVERSARIAL_MARKERS = [
    "但是", "然而", "不过", "尽管", "需要注意的是", "必须指出",
    "与此相反", "另一方面", "存在风险", "有待商榷", "虽然", "可是",
    "却", "反而", "其实", "实际上", "事实上"
]

POSITIVE_MARKERS = [
    "因此", "所以", "由此可见", "综上所述", "这表明", "这说明",
    "表现出", "展现出", "体现了", "反映了", "说明", "表明"
]

@dataclass
class HarmonyReport:
    H: float
    U: float
    D: float
    A: float
    interpretation: Dict[str, str]
    suggestions: List[str]
    warnings: List[Dict]
    
    def to_dict(self) -> Dict:
        return {
            "success": True,
            "H": round(self.H, 4),
            "U": round(self.U, 4),
            "D": round(self.D, 4),
            "A": round(self.A, 4),
            "interpretation": self.interpretation,
            "suggestions": self.suggestions,
            "warnings": self.warnings
        }


def split_sentences(text: str) -> List[str]:
    text = text.replace('；', '。').replace('！', '。').replace('？', '。')
    text = text.replace('\n', '。').replace('\r', '')
    return [s.strip() for s in text.split('。') if s.strip()]


def compute_U(text: str, sentences: List[str]) -> float:
    term_occurrences = {}
    for term in PSYCHOLOGY_TERMS:
        count = text.count(term)
        if count > 0:
            term_occurrences[term] = count
    
    if not term_occurrences:
        return 0.8
    
    total_terms = sum(term_occurrences.values())
    unique_terms = len(term_occurrences)
    
    coverage = unique_terms / len(PSYCHOLOGY_TERMS)
    density = min(1.0, total_terms / (len(sentences) * 2)) if sentences else 0
    
    return 0.6 * coverage + 0.4 * min(1.0, density * 2)


def compute_D(text: str, sentences: List[str]) -> float:
    if len(sentences) <= 1:
        return 0.0
    
    first_positions = []
    for term in PSYCHOLOGY_TERMS:
        pos = text.find(term)
        if pos >= 0:
            first_positions.append(pos / len(text))
    
    if len(first_positions) <= 1:
        return 0.5
    
    mean_pos = sum(first_positions) / len(first_positions)
    variance = sum((p - mean_pos) ** 2 for p in first_positions) / len(first_positions)
    std = variance ** 0.5
    
    return min(1.0, std * 3.0)


def compute_A(text: str, sentences: List[str]) -> float:
    if not sentences:
        return 0.0
    
    marker_count = 0
    for sent in sentences:
        for marker in ADVERSARIAL_MARKERS:
            if marker in sent:
                marker_count += 1
                break
    
    marker_density = marker_count / len(sentences) if sentences else 0
    
    positive_count = 0
    for sent in sentences:
        for marker in POSITIVE_MARKERS:
            if marker in sent:
                positive_count += 1
                break
    
    positive_density = positive_count / len(sentences) if sentences else 0
    
    return min(1.0, max(0, marker_density - positive_density * 0.5))


def compute_harmony(U: float, D: float, A: float,
                    lambda_u: float = 0.4,
                    lambda_d: float = 0.4,
                    lambda_a: float = 0.2) -> float:
    return lambda_u * U + lambda_d * D - lambda_a * A


def interpret_harmony(H: float) -> Dict[str, str]:
    if H >= 0.75:
        return {
            "level": "优秀",
            "grade": "A",
            "description": "报告逻辑高度一致，论述清晰，无明显矛盾。"
        }
    elif H >= 0.65:
        return {
            "level": "良好",
            "grade": "B",
            "description": "报告逻辑较为一致，论述基本清晰，存在少量可优化之处。"
        }
    elif H >= 0.50:
        return {
            "level": "中等",
            "grade": "C",
            "description": "报告逻辑基本合理，但存在一些不一致或矛盾之处，建议优化。"
        }
    else:
        return {
            "level": "待改进",
            "grade": "D",
            "description": "报告逻辑存在较多问题，建议重新审视和修改。"
        }


def generate_suggestions(H: float, U: float, D: float, A: float, 
                         sentences: List[str], text: str) -> List[str]:
    suggestions = []
    
    if A > 0.3:
        suggestions.append("报告中存在较多转折或矛盾表述，建议检查逻辑一致性")
    
    if U < 0.5:
        suggestions.append("报告中心理学术语使用较少，建议增加专业术语以提高报告专业性")
    
    if D < 0.3:
        suggestions.append("报告结构较为集中，建议增加更多维度的分析内容")
    
    if len(sentences) < 3:
        suggestions.append("报告内容较短，建议补充更多详细分析")
    
    if H >= 0.75:
        suggestions.append("报告整体质量优秀，逻辑清晰，继续保持")
    elif H >= 0.65:
        suggestions.append("报告整体质量良好，可以进一步优化细节")
    
    return suggestions


def get_warnings(text: str, sentences: List[str]) -> List[Dict]:
    warnings = []
    
    contradiction_pairs = [
        ("自信", "自卑"),
        ("外向", "内向"),
        ("稳定", "波动"),
        ("理性", "感性"),
        ("独立", "依赖"),
        ("优势", "劣势"),
    ]
    
    for term1, term2 in contradiction_pairs:
        if term1 in text and term2 in text:
            warnings.append({
                "type": "potential_contradiction",
                "terms": [term1, term2],
                "message": f"报告中同时出现「{term1}」和「{term2}」，请检查是否存在矛盾"
            })
    
    return warnings


def evaluate_report(text: str) -> Dict[str, Any]:
    if not text or not text.strip():
        return {
            "success": False,
            "error": "文本内容为空",
            "H": 0, "U": 0, "D": 0, "A": 0,
            "suggestions": [],
            "warnings": []
        }
    
    sentences = split_sentences(text)
    
    U = compute_U(text, sentences)
    D = compute_D(text, sentences)
    A = compute_A(text, sentences)
    H = compute_harmony(U, D, A)
    
    interpretation = interpret_harmony(H)
    suggestions = generate_suggestions(H, U, D, A, sentences, text)
    warnings = get_warnings(text, sentences)
    
    report = HarmonyReport(
        H=H, U=U, D=D, A=A,
        interpretation=interpretation,
        suggestions=suggestions,
        warnings=warnings
    )
    
    return report.to_dict()


def main():
    parser = argparse.ArgumentParser(
        description="ThinkCheck Harmony 报告逻辑健康度评估工具"
    )
    parser.add_argument("--text", "-t", type=str, help="直接传入报告文本内容")
    parser.add_argument("--file", "-f", type=str, help="从文件读取报告内容")
    parser.add_argument("--stdin", action="store_true", help="从标准输入读取报告内容")
    parser.add_argument("--pretty", action="store_true", help="格式化输出 JSON")
    
    args = parser.parse_args()
    
    text = None
    
    if args.text:
        text = args.text
    elif args.file:
        try:
            with open(args.file, "r", encoding="utf-8") as f:
                text = f.read()
        except Exception as e:
            result = {"success": False, "error": f"无法读取文件: {str(e)}"}
            print(json.dumps(result, indent=2 if args.pretty else None, ensure_ascii=False))
            sys.exit(1)
    elif args.stdin:
        text = sys.stdin.read()
    else:
        parser.print_help()
        sys.exit(1)
    
    result = evaluate_report(text)
    
    if args.pretty:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    import argparse
    main()
