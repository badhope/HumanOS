# =============================================================================
#  PSS 压力知觉量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class PSSCalculator(BaseCalculator):
    assessment_id = "pss-standard"
    assessment_name = "PSS 压力知觉量表"
    question_count = 50
    dimensions = ["distress", "coping", "control", "predictability"]
    
    DIMENSION_NAMES = {
        "distress": "紧张感",
        "coping": "应对能力",
        "control": "控制感",
        "predictability": "预测性",
    }
    
    DIMENSION_ITEMS = {
        "distress": list(range(1, 13)),
        "coping": list(range(13, 25)),
        "control": list(range(25, 38)),
        "predictability": list(range(38, 51)),
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
        
        stress_level = round((total_raw / 200) * 100)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            max_score = len(self.DIMENSION_ITEMS[dim]) * 5
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
            overall_score=stress_level,
            dimensions=dimensions,
            interpretation={
                "stress_level": stress_level,
                "classification": self._get_classification(stress_level),
            },
            development_advice=self._get_advice(stress_level),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("pss-"):
                idx = int(key.replace("pss-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_classification(self, score: int) -> str:
        if score < 30:
            return "低压力"
        elif score < 50:
            return "中等压力"
        elif score < 70:
            return "高压力"
        else:
            return "极高压力"
    
    def _get_advice(self, score: int) -> List[str]:
        advice = [
            "⏰ 建立规律的作息时间表",
            "🏃 每天至少30分钟有氧运动",
            "🎯 学会说不，合理设定边界",
        ]
        if score >= 60:
            advice.extend([
                "💬 考虑寻求专业心理咨询支持",
                "🌴 安排短期休假彻底放松",
                "📋 分解任务，避免 overwhelm",
            ])
        return advice
