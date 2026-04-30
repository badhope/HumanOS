# =============================================================================
#  PCQ 心理资本量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class PCQCalculator(BaseCalculator):
    assessment_id = "pcq-standard"
    assessment_name = "PCQ 心理资本量表"
    question_count = 48
    dimensions = ["self_efficacy", "hope", "resilience", "optimism"]
    
    DIMENSION_NAMES = {
        "self_efficacy": "自我效能",
        "hope": "希望",
        "resilience": "韧性",
        "optimism": "乐观",
    }
    
    DIMENSION_ITEMS = {
        "self_efficacy": list(range(1, 13)),
        "hope": list(range(13, 25)),
        "resilience": list(range(25, 37)),
        "optimism": list(range(37, 49)),
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        total_raw = 0
        
        for dim, items in self.DIMENSION_ITEMS.items():
            score = 0
            for i in items:
                val = answer_map.get(i, 4)
                score += val
            dimension_scores[dim] = score
            total_raw += score
        
        overall_percentile = round((total_raw / (48 * 6)) * 100)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            max_score = len(self.DIMENSION_ITEMS[dim]) * 6
            percentage = round((raw_score / max_score) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=overall_percentile,
            dimensions=dimensions,
            interpretation={
                "psycap_level": overall_percentile,
                "classification": self._get_classification(overall_percentile),
            },
            strengths=self._get_strengths(overall_percentile),
            development_advice=self._get_advice(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("pcq-"):
                idx = int(key.replace("pcq-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_classification(self, score: int) -> str:
        if score < 40:
            return "心理资本待开发"
        elif score < 60:
            return "心理资本中等"
        elif score < 80:
            return "心理资本良好"
        else:
            return "心理资本卓越"
    
    def _get_strengths(self, score: int) -> List[str]:
        strengths = []
        if score >= 60:
            strengths.extend([
                "面对挑战时能保持积极心态",
                "具备从逆境中恢复的能力",
                "对未来抱有现实的乐观态度",
            ])
        return strengths
    
    def _get_advice(self, scores: Dict[str, int]) -> List[str]:
        return [
            "🎯 设置SMART目标，建立成功体验",
            "💪 通过微习惯建立自我效能",
            "🔄 练习认知重构，培养积极解释风格",
            "🤝 建立支持性社交网络",
        ]
