# =============================================================================
#  霍兰德职业兴趣测评 SDS 计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult
import numpy as np

class HollandCalculator(BaseCalculator):
    assessment_id = "holland-sds"
    assessment_name = "霍兰德职业兴趣测评 (SDS)"
    question_count = 60
    dimensions = ["R", "I", "A", "S", "E", "C"]
    
    DIMENSION_NAMES = {
        "R": "现实型 (Realistic)",
        "I": "研究型 (Investigative)",
        "A": "艺术型 (Artistic)",
        "S": "社会型 (Social)",
        "E": "企业型 (Enterprising)",
        "C": "常规型 (Conventional)",
    }
    
    DIMENSION_DESCRIPTIONS = {
        "R": "喜欢动手操作、户外活动、机械、工具",
        "I": "喜欢探索、分析、研究、解决复杂问题",
        "A": "创意、表达、审美、自由、非结构化",
        "S": "帮助他人、教学、服务、社区",
        "E": "领导、说服、销售、影响他人",
        "C": "条理、数据、细节、规则、组织",
    }
    
    CAREER_MATCHES = {
        "R": ["工程师", "技术人员", "机械师", "建筑师", "农林牧渔"],
        "I": ["科学家", "程序员", "医生", "研究员", "数据分析师"],
        "A": ["设计师", "艺术家", "作家", "音乐人", "创意总监"],
        "S": ["教师", "心理咨询师", "社工", "护士", "人力资源"],
        "E": ["企业家", "销售总监", "市场经理", "律师", "政治家"],
        "C": ["会计师", "银行家", "行政主管", "质量管控", "税务专家"],
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        dimension_scores = {}
        
        for i, dim in enumerate(self.dimensions):
            scores = []
            for j in range(10):
                idx = i * 10 + j + 1
                key = str(idx)
                if key in answers:
                    scores.append(answers[key])
            
            dimension_scores[dim] = sum(scores) if scores else 0
        
        sorted_dims = sorted(dimension_scores.items(), key=lambda x: -x[1])
        top3 = [d[0] for d in sorted_dims[:3]]
        holland_code = "".join(top3)
        
        dimensions = []
        for dim in self.dimensions:
            raw = dimension_scores[dim]
            
            percentile = min(99, max(1, round(50 + (raw - 30) / 15 * 15.87)))
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw,
                percentile=percentile,
                stanine=self._calculate_stanine(percentile),
                level=self._get_level_cn(percentile),
                interpretation=self.DIMENSION_DESCRIPTIONS[dim],
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            type_profile={
                "holland_code": holland_code,
                "top3": top3,
                "profile": sorted_dims,
            },
            career_suggestions=self._get_career_suggestions(top3),
            strengths=self._get_strengths(top3),
            blind_spots=self._get_blind_spots(top3),
            development_advice=[
                f"你的霍兰德代码是 {holland_code}",
                f"建议从事与你TOP3兴趣类型匹配的职业",
                "职业满意度 = 兴趣 × 能力 × 价值观",
            ],
        )
    
    def _get_career_suggestions(self, top3: List[str]) -> List[str]:
        careers = []
        for dim in top3:
            careers.extend(self.CAREER_MATCHES[dim][:2])
        return list(dict.fromkeys(careers))[:8]
    
    def _get_strengths(self, top3: List[str]) -> List[str]:
        strengths_map = {
            "R": ["动手能力强", "脚踏实地", "解决实际问题"],
            "I": ["分析思维", "好奇心", "逻辑严密"],
            "A": ["创新思维", "审美敏感", "表达能力"],
            "S": ["同理心", "沟通能力", "服务意识"],
            "E": ["领导力", "说服力", "商业敏感"],
            "C": ["细致严谨", "组织能力", "遵守规则"],
        }
        result = []
        for dim in top3:
            result.extend(strengths_map[dim][:2])
        return list(dict.fromkeys(result))[:6]
    
    def _get_blind_spots(self, top3: List[str]) -> List[str]:
        blind_spots_map = {
            "R": ["可能忽视人际关系", "不善言辞"],
            "I": ["可能过于理论化", "社交技能一般"],
            "A": ["可能不切实际", "讨厌规则束缚"],
            "S": ["可能讨好型人格", "难以拒绝他人"],
            "E": ["可能过于强势", "忽略细节"],
            "C": ["可能过于保守", "抗拒变化"],
        }
        result = []
        for dim in top3:
            result.extend(blind_spots_map[dim])
        return list(dict.fromkeys(result))[:4]
