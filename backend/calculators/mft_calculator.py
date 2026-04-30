# =============================================================================
#  MFT 道德基础理论量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class MFTMoralFoundationsCalculator(BaseCalculator):
    assessment_id = "mft-standard"
    assessment_name = "MFT 道德基础理论量表"
    question_count = 42
    dimensions = ["care", "fairness", "loyalty", "authority", "purity", "liberty"]
    
    DIMENSION_NAMES = {
        "care": "关怀/伤害",
        "fairness": "公平/欺骗",
        "loyalty": "忠诚/背叛",
        "authority": "权威/颠覆",
        "purity": "圣洁/堕落",
        "liberty": "自由/压迫",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 7
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 4) for i in items)
            dimension_scores[dim] = score
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (items_per_dim * 6)) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        moral_profile = self._get_moral_profile(dimension_scores)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            interpretation={
                "moral_profile": moral_profile,
                "top_foundations": self._get_top_foundations(dimension_scores),
            },
            strengths=self._get_strengths(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("mft-"):
                idx = int(key.replace("mft-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_moral_profile(self, scores: Dict[str, int]) -> str:
        individual = (scores["care"] + scores["fairness"] + scores["liberty"]) / 3
        binding = (scores["loyalty"] + scores["authority"] + scores["purity"]) / 3
        
        if individual > binding + 10:
            return "个体导向道德观"
        elif binding > individual + 10:
            return "群体导向道德观"
        else:
            return "平衡型道德观"
    
    def _get_top_foundations(self, scores: Dict[str, int]) -> List[str]:
        sorted_foundations = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
        return [self.DIMENSION_NAMES[k] for k, v in sorted_foundations]
    
    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        strengths = []
        if scores.get("care", 0) > 30:
            strengths.append("富有同情心，关心他人福祉")
        if scores.get("fairness", 0) > 30:
            strengths.append("追求正义，重视公平公正")
        if scores.get("loyalty", 0) > 30:
            strengths.append("忠诚可靠，重视团队凝聚力")
        if scores.get("authority", 0) > 30:
            strengths.append("尊重传统，维护社会秩序")
        if scores.get("purity", 0) > 30:
            strengths.append("坚守原则，有高尚的道德追求")
        return strengths
