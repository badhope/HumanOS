# =============================================================================
#  Schwartz 价值观量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class SchwartzValuesCalculator(BaseCalculator):
    assessment_id = "schwartz-standard"
    assessment_name = "Schwartz 价值观量表"
    question_count = 57
    dimensions = [
        "conformity", "tradition", "benevolence", "universalism",
        "self_direction", "stimulation", "hedonism", "achievement",
        "power", "security"
    ]
    
    DIMENSION_NAMES = {
        "conformity": "遵从",
        "tradition": "传统",
        "benevolence": "仁慈",
        "universalism": "普世主义",
        "self_direction": "自我导向",
        "stimulation": "刺激",
        "hedonism": "享乐主义",
        "achievement": "成就",
        "power": "权力",
        "security": "安全",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        dim_items = 6
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * dim_items + 1
            items = list(range(start, start + dim_items))
            score = sum(answer_map.get(i, 4) for i in items)
            dimension_scores[dim] = score
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (dim_items * 7)) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        sorted_values = sorted(dimension_scores.items(), key=lambda x: x[1], reverse=True)[:3]
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            interpretation={
                "top_values": [self.DIMENSION_NAMES[k] for k, v in sorted_values],
                "value_profile": self._get_profile(dimension_scores),
            },
            strengths=self._get_strengths(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("schwartz-"):
                idx = int(key.replace("schwartz-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_profile(self, scores: Dict[str, int]) -> str:
        sorted_dims = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        top2 = [d for d, s in sorted_dims[:2]]
        
        if set(top2) & set(["universalism", "benevolence"]):
            return "自我超越型"
        elif set(top2) & set(["power", "achievement"]):
            return "自我提升型"
        elif set(top2) & set(["self_direction", "stimulation"]):
            return "开放变革型"
        else:
            return "保守传统型"
    
    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        strengths = []
        if scores.get("universalism", 0) > 30:
            strengths.append("关心社会福祉，有社会责任感")
        if scores.get("benevolence", 0) > 30:
            strengths.append("乐于助人，重视人际关系")
        if scores.get("achievement", 0) > 30:
            strengths.append("追求卓越，有强烈的成就动机")
        if scores.get("self_direction", 0) > 30:
            strengths.append("独立自主，有创造力")
        return strengths
