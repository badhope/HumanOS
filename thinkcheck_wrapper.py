#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
ThinkCheck Harmony 引擎封装脚本
用于从 Node.js/TypeScript 调用，对心理测评报告进行逻辑健康度评估

使用方式:
    python thinkcheck_wrapper.py --text "报告文本内容"
    python thinkcheck_wrapper.py --file report.txt
    echo "报告文本" | python thinkcheck_wrapper.py --stdin
"""

import sys
import json
import argparse
from typing import Optional, Dict, Any

try:
    from thinkcheck_harmony import HarmonyEvaluator, get_preset
except ImportError:
    print(json.dumps({
        "success": False,
        "error": "ThinkCheck Harmony 引擎未安装，请确保 thinkcheck_harmony 目录存在",
        "H": 0,
        "U": 0,
        "D": 0,
        "A": 0,
        "suggestions": [],
        "warnings": []
    }))
    sys.exit(1)


PSYCHOLOGY_TERMS = [
    "情绪", "认知", "行为", "人格", "性格", "心理", "压力", "焦虑", "抑郁",
    "自信", "自尊", "社交", "关系", "沟通", "适应", "成长", "发展", "能力",
    "特质", "倾向", "得分", "维度", "水平", "特征", "表现", "建议", "提升",
    "优势", "劣势", "风险", "机会", "目标", "策略", "执行", "评估", "分析",
    "理解", "表达", "控制", "调节", "感知", "思维", "记忆", "注意", "决策"
]

PSYCHOLOGY_CONTRADICTIONS = [
    ("自信", "自卑"),
    ("外向", "内向"),
    ("稳定", "波动"),
    ("理性", "感性"),
    ("独立", "依赖"),
]


def evaluate_report(text: str, domain: str = "psychology") -> Dict[str, Any]:
    """
    评估报告文本的逻辑健康度
    
    Args:
        text: 报告文本内容
        domain: 评估领域 (general, psychology, medical, legal)
    
    Returns:
        包含评估结果的字典
    """
    if not text or not text.strip():
        return {
            "success": False,
            "error": "文本内容为空",
            "H": 0,
            "U": 0,
            "D": 0,
            "A": 0,
            "suggestions": [],
            "warnings": []
        }
    
    try:
        if domain == "psychology":
            evaluator = HarmonyEvaluator(
                domain="general",
                custom_terms=PSYCHOLOGY_TERMS,
                enable_suggestions=True
            )
        else:
            evaluator = HarmonyEvaluator(domain=domain, enable_suggestions=True)
        
        report = evaluator.evaluate(text)
        result = report.to_dict()
        
        interpretation = interpret_harmony(result["H"])
        
        return {
            "success": True,
            "H": result["H"],
            "U": result["U"],
            "D": result["D"],
            "A": result["A"],
            "interpretation": interpretation,
            "suggestions": result.get("suggestions", []),
            "warnings": result.get("warnings", []),
            "weights": result.get("weights", {}),
            "layers": result.get("layers", {}),
            "audit": result.get("audit", {})
        }
    
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "H": 0,
            "U": 0,
            "D": 0,
            "A": 0,
            "suggestions": [],
            "warnings": []
        }


def interpret_harmony(H: float) -> Dict[str, str]:
    """
    解读和谐度分数
    
    Args:
        H: 和谐度分数 (0-1)
    
    Returns:
        包含等级和描述的字典
    """
    if H >= 0.85:
        return {
            "level": "优秀",
            "grade": "A+",
            "description": "报告逻辑高度一致，论述清晰，无明显矛盾。"
        }
    elif H >= 0.75:
        return {
            "level": "良好",
            "grade": "A",
            "description": "报告逻辑较为一致，论述基本清晰，存在少量可优化之处。"
        }
    elif H >= 0.65:
        return {
            "level": "中等",
            "grade": "B",
            "description": "报告逻辑基本合理，但存在一些不一致或矛盾之处，建议优化。"
        }
    elif H >= 0.50:
        return {
            "level": "待改进",
            "grade": "C",
            "description": "报告逻辑存在较多问题，建议重新审视和修改。"
        }
    else:
        return {
            "level": "需重构",
            "grade": "D",
            "description": "报告逻辑存在严重问题，建议重新撰写。"
        }


def main():
    parser = argparse.ArgumentParser(
        description="ThinkCheck Harmony 报告逻辑健康度评估工具"
    )
    parser.add_argument(
        "--text", "-t",
        type=str,
        help="直接传入报告文本内容"
    )
    parser.add_argument(
        "--file", "-f",
        type=str,
        help="从文件读取报告内容"
    )
    parser.add_argument(
        "--stdin",
        action="store_true",
        help="从标准输入读取报告内容"
    )
    parser.add_argument(
        "--domain", "-d",
        type=str,
        default="psychology",
        choices=["general", "psychology", "medical", "legal"],
        help="评估领域 (默认: psychology)"
    )
    parser.add_argument(
        "--pretty",
        action="store_true",
        help="格式化输出 JSON"
    )
    
    args = parser.parse_args()
    
    text = None
    
    if args.text:
        text = args.text
    elif args.file:
        try:
            with open(args.file, "r", encoding="utf-8") as f:
                text = f.read()
        except Exception as e:
            result = {
                "success": False,
                "error": f"无法读取文件: {str(e)}",
                "H": 0, "U": 0, "D": 0, "A": 0,
                "suggestions": [], "warnings": []
            }
            print(json.dumps(result, indent=2 if args.pretty else None, ensure_ascii=False))
            sys.exit(1)
    elif args.stdin:
        text = sys.stdin.read()
    else:
        parser.print_help()
        sys.exit(1)
    
    result = evaluate_report(text, args.domain)
    
    if args.pretty:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
