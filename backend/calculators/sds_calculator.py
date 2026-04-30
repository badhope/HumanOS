# =============================================================================
#  SDS 抑郁自评量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class SDSCalculator(BaseCalculator):
    assessment_id = "sds-standard"
    assessment_name = "SDS 抑郁自评量表"
    question_count = 50
    dimensions = ["affective", "somatic", "cognitive", "psychomotor"]
    
    DIMENSION_NAMES = {
        "affective": "情感障碍",
        "somatic": "躯体症状",
        "cognitive": "认知障碍",
        "psychomotor": "精神运动",
    }
    
    DIMENSION_ITEMS = {
        "affective": list(range(1, 13)),
        "somatic": list(range(13, 25)),
        "cognitive": list(range(25, 38)),
        "psychomotor": list(range(38, 51)),
    }
    
    REVERSE_ITEMS = [2, 5, 8, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49]
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        total_raw = 0
        
        for dim, items in self.DIMENSION_ITEMS.items():
            score = 0
            for i in items:
                val = answer_map.get(i, 2)
                if i in self.REVERSE_ITEMS:
                    val = 5 - val
                score += val
            dimension_scores[dim] = score
            total_raw += score
        
        standard_score = round((total_raw / 200) * 100)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            max_score = len(self.DIMENSION_ITEMS[dim]) * 4
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
            overall_score=standard_score,
            dimensions=dimensions,
            interpretation={
                "standard_score": standard_score,
                "classification": self._get_classification(standard_score),
            },
            development_advice=self._get_advice(standard_score),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("sds-"):
                idx = int(key.replace("sds-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_classification(self, score: int) -> str:
        if score < 53:
            return "正常范围"
        elif score < 63:
            return "轻度抑郁"
        elif score < 73:
            return "中度抑郁"
        else:
            return "重度抑郁"
    
    def _get_advice(self, score: int) -> List[str]:
        advice = [
            "🌅 每天固定时间起床，建立作息规律",
            "🚶 每天30分钟户外散步",
            "📝 记录三件小确幸",
        ]
        if score >= 63:
            advice.extend([
                "💬 强烈建议寻求专业帮助",
                "👥 主动联系信任的家人朋友",
                "💊 必要时咨询精神科医生",
            ])
        return advice
