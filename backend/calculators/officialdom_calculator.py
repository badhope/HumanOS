# =============================================================================
#  官场气质计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class OfficialdomDreamCalculator(BaseCalculator):
    assessment_id = "officialdom-dream"
    assessment_name = "官场气质测试"
    question_count = 36
    dimensions = ["power_motivation", "diplomatic_wisdom", "steadiness", "sense_of_responsibility", "risk_awareness"]
    
    DIMENSION_NAMES = {
        "power_motivation": "权力动机",
        "diplomatic_wisdom": "圆融智慧",
        "steadiness": "稳重程度",
        "sense_of_responsibility": "责任担当",
        "risk_awareness": "风险意识",
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
        
        official_score = round(sum(dimension_scores.values()) / (36 * 5) * 100)
        
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
        
        official_type = self._get_official_type(dimension_scores)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=official_score,
            dimensions=dimensions,
            interpretation={
                "official_type": official_type,
                "suitability_score": official_score,
            },
            strengths=self._get_strengths(dimension_scores),
            development_advice=self._get_advice(),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("od-"):
                idx = int(key.replace("od-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_official_type(self, scores: Dict[str, int]) -> str:
        sorted_dims = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        top_dim = sorted_dims[0][0]
        
        type_map = {
            "power_motivation": "开拓型干将",
            "diplomatic_wisdom": "协调型智囊",
            "steadiness": "稳健型管家",
            "sense_of_responsibility": "担当型骨干",
            "risk_awareness": "谨慎型监察",
        }
        return type_map.get(top_dim, "综合型人才")
    
    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        strengths = []
        if scores.get("diplomatic_wisdom", 0) > 25:
            strengths.append("善于协调各方关系，沟通能力强")
        if scores.get("steadiness", 0) > 25:
            strengths.append("遇事沉着冷静，处变不惊")
        if scores.get("sense_of_responsibility", 0) > 25:
            strengths.append("勇于承担责任，值得信赖")
        return strengths
    
    def _get_advice(self) -> List[str]:
        return [
            "🎯 守得住初心，才能走得更远",
            "⚖️ 权力是责任，不是特权",
            "🤝 做事先做人，人品是最好的名片",
            "📚 终身学习，与时俱进",
        ]
