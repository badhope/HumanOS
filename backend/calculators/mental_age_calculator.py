# =============================================================================
#  心理年龄计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class MentalAgeCalculator(BaseCalculator):
    assessment_id = "mental-age"
    assessment_name = "心理年龄测试"
    question_count = 40
    dimensions = ["emotional_maturity", "cognitive_maturity", "social_maturity", "self_awareness"]
    
    DIMENSION_NAMES = {
        "emotional_maturity": "情绪成熟度",
        "cognitive_maturity": "认知成熟度",
        "social_maturity": "社交成熟度",
        "self_awareness": "自我觉察",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 10
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 3) for i in items)
            dimension_scores[dim] = score
        
        maturity_score = round(sum(dimension_scores.values()) / (40 * 5) * 100)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (items_per_dim * 5)) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        mental_age = self._calculate_mental_age(maturity_score)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=maturity_score,
            dimensions=dimensions,
            interpretation={
                "mental_age": mental_age,
                "maturity_score": maturity_score,
            },
            strengths=self._get_strengths(maturity_score),
            development_advice=self._get_advice(maturity_score),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("ma-"):
                idx = int(key.replace("ma-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _calculate_mental_age(self, score: int) -> str:
        if score < 25:
            return "少年期 (12-17岁)"
        elif score < 40:
            return "青年期 (18-25岁)"
        elif score < 60:
            return "成年期 (26-40岁)"
        elif score < 80:
            return "中年期 (41-60岁)"
        else:
            return "智慧老年期 (60+岁)"
    
    def _get_strengths(self, score: int) -> List[str]:
        strengths = []
        if score >= 40:
            strengths.append("情绪稳定性良好，能应对生活压力")
        if score >= 60:
            strengths.append("有清晰的自我认知和人生方向")
        if score >= 75:
            strengths.append("通透豁达，有人生智慧")
        return strengths
    
    def _get_advice(self, score: int) -> List[str]:
        advice = [
            "🌱 成熟是终生的成长过程，不是终点",
            "🎯 每个年龄段都有其独特的美好",
            "💖 保持赤子之心与成熟并不矛盾",
        ]
        if score < 40:
            advice.append("⏳ 给自己时间成长，不必急于成熟")
        return advice
