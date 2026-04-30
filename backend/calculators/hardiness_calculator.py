# =============================================================================
#  心理韧性量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class HardinessCalculator(BaseCalculator):
    assessment_id = "hardiness-standard"
    assessment_name = "心理韧性量表"
    question_count = 36
    dimensions = ["commitment", "control", "challenge"]
    
    DIMENSION_NAMES = {
        "commitment": "投入",
        "control": "控制",
        "challenge": "挑战",
    }
    
    DIMENSION_ITEMS = {
        "commitment": list(range(1, 13)),
        "control": list(range(13, 25)),
        "challenge": list(range(25, 37)),
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        total_raw = 0
        
        for dim, items in self.DIMENSION_ITEMS.items():
            score = 0
            for i in items:
                val = answer_map.get(i, 3)
                score += val
            dimension_scores[dim] = score
            total_raw += score
        
        hardiness_score = round((total_raw / (36 * 4)) * 100)
        
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
            overall_score=hardiness_score,
            dimensions=dimensions,
            interpretation={
                "hardiness_score": hardiness_score,
                "classification": self._get_classification(hardiness_score),
            },
            strengths=self._get_strengths(hardiness_score),
            development_advice=self._get_advice(),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("hardiness-"):
                idx = int(key.replace("hardiness-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_classification(self, score: int) -> str:
        if score < 40:
            return "韧性较低"
        elif score < 60:
            return "韧性中等"
        elif score < 80:
            return "韧性良好"
        else:
            return "韧性卓越"
    
    def _get_strengths(self, score: int) -> List[str]:
        strengths = []
        if score >= 60:
            strengths.extend([
                "面临困境时能保持目标感",
                "相信自己能够影响事件结果",
                "将变化视为成长的机会",
            ])
        return strengths
    
    def _get_advice(self) -> List[str]:
        return [
            "🎯 每天设定3个小目标并完成",
            "📖 记录应对挑战的成功经历",
            "🧘 练习接纳无法控制的事情",
            "🌱 将压力视为成长的肥料",
        ]
