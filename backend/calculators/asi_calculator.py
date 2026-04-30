# =============================================================================
#  ASI 权威主义人格量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class ASICalculator(BaseCalculator):
    assessment_id = "asi-standard"
    assessment_name = "ASI 权威主义人格量表"
    question_count = 36
    dimensions = ["authoritarian_submission", "authoritarian_aggression", "conventionalism"]
    
    DIMENSION_NAMES = {
        "authoritarian_submission": "权威服从",
        "authoritarian_aggression": "权威攻击",
        "conventionalism": "传统主义",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 12
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 4) for i in items)
            dimension_scores[dim] = score
        
        rwa_score = round(sum(dimension_scores.values()) / (36 * 7) * 100)
        
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
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=rwa_score,
            dimensions=dimensions,
            interpretation={
                "rwa_score": rwa_score,
                "classification": self._get_classification(rwa_score),
            },
            development_advice=self._get_advice(rwa_score),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("asi-"):
                idx = int(key.replace("asi-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_classification(self, score: int) -> str:
        if score < 30:
            return "反权威主义"
        elif score < 50:
            return "平等自由主义"
        elif score < 70:
            return "温和权威主义"
        else:
            return "典型权威主义"
    
    def _get_advice(self, score: int) -> List[str]:
        advice = [
            "🤔 保持批判性思维，质疑权威不等于不尊重",
            "⚖️ 在秩序与自由间寻找个人平衡点",
            "🗣️ 多接触不同观点，避免回音室效应",
        ]
        if score >= 70:
            advice.extend([
                "💡 尝试从下属/弱势群体的视角看问题",
                "🌍 意识到不同文化有不同的权力距离",
            ])
        return advice
