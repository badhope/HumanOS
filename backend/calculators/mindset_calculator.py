# =============================================================================
#  Mindset 成长型思维量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class MindsetCalculator(BaseCalculator):
    assessment_id = "mindset-standard"
    assessment_name = "成长型思维量表"
    question_count = 36
    dimensions = ["fixed_traits", "effort_belief", "challenge_attitude", "failure_response", "feedback_reception", "success_view"]
    
    DIMENSION_NAMES = {
        "fixed_traits": "固有特质观",
        "effort_belief": "努力信念",
        "challenge_attitude": "挑战态度",
        "failure_response": "失败回应",
        "feedback_reception": "反馈接受",
        "success_view": "成功看法",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 6
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 4) for i in items)
            dimension_scores[dim] = score
        
        growth_score = 0
        for dim in self.dimensions:
            if dim == "fixed_traits":
                growth_score += (6 * items_per_dim) - dimension_scores[dim]
            else:
                growth_score += dimension_scores[dim]
        
        growth_percentage = round((growth_score / (6 * 6 * items_per_dim)) * 100)
        
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
        
        mindset_type = self._get_mindset_type(growth_percentage)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=growth_percentage,
            dimensions=dimensions,
            interpretation={
                "mindset_type": mindset_type,
                "growth_score": growth_percentage,
            },
            strengths=self._get_strengths(mindset_type),
            development_advice=self._get_advice(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("mindset-"):
                idx = int(key.replace("mindset-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_mindset_type(self, score: int) -> str:
        if score < 30:
            return "固定型思维"
        elif score < 50:
            return "偏固定型思维"
        elif score < 70:
            return "中间型思维"
        elif score < 85:
            return "偏成长型思维"
        else:
            return "典型成长型思维"
    
    def _get_strengths(self, mindset_type: str) -> List[str]:
        strengths = []
        if "成长" in mindset_type:
            strengths.extend([
                "相信能力可以通过努力发展",
                "将挑战视为成长的机会",
                "从批评中学习而非防御",
                "从他人成功中获得灵感",
            ])
        return strengths
    
    def _get_advice(self, scores: Dict[str, int]) -> List[str]:
        return [
            "🌱 用「尚未」替代「失败」：我还没学会",
            "🧠 神经可塑性：大脑像肌肉一样可以训练",
            "💪 赞美努力和策略，而非智力天赋",
            "🎯 关注过程，而非只看结果",
            "📚 将错误变成学习的机会",
        ]
