# =============================================================================
#  OCB 组织公民行为量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class OCBCalculator(BaseCalculator):
    assessment_id = "ocb-standard"
    assessment_name = "OCB 组织公民行为量表"
    question_count = 42
    dimensions = ["altruism", "conscientiousness", "sportsmanship", "courtesy", "civic_virtue"]
    
    DIMENSION_NAMES = {
        "altruism": "利他行为",
        "conscientiousness": "尽职行为",
        "sportsmanship": "运动员精神",
        "courtesy": "礼让行为",
        "civic_virtue": "公民美德",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 8
        dims = list(self.dimensions)
        
        for idx, dim in enumerate(dims):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 5) for i in items)
            dimension_scores[dim] = score
        
        ocb_score = round(sum(dimension_scores.values()) / (42 * 7) * 100)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (items_per_dim * 7)) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        ocb_profile = self._get_ocb_profile(dimension_scores)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=ocb_score,
            dimensions=dimensions,
            interpretation={
                "ocb_level": ocb_score,
                "ocb_profile": ocb_profile,
            },
            strengths=self._get_strengths(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("ocb-"):
                idx = int(key.replace("ocb-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_ocb_profile(self, scores: Dict[str, int]) -> str:
        sorted_dims = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:2]
        top_dims = [d for d, s in sorted_dims]
        
        if "altruism" in top_dims:
            return "热心助人型"
        elif "conscientiousness" in top_dims:
            return "尽职敬业型"
        elif "civic_virtue" in top_dims:
            return "主动担当型"
        else:
            return "合作共赢型"
    
    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        strengths = []
        if scores.get("altruism", 0) > 40:
            strengths.append("乐于助人，主动帮助同事")
        if scores.get("conscientiousness", 0) > 40:
            strengths.append("尽职尽责，超出预期完成工作")
        if scores.get("sportsmanship", 0) > 40:
            strengths.append("乐观包容，不斤斤计较")
        if scores.get("civic_virtue", 0) > 40:
            strengths.append("主动参与，有主人翁精神")
        return strengths
