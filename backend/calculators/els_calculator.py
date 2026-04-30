# =============================================================================
#  ELS 情绪劳动量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class ELSemotionalLaborCalculator(BaseCalculator):
    assessment_id = "els-standard"
    assessment_name = "ELS 情绪劳动量表"
    question_count = 36
    dimensions = ["surface_acting", "deep_acting", "autonomous_emotion", "emotional_exhaustion"]
    
    DIMENSION_NAMES = {
        "surface_acting": "表层扮演",
        "deep_acting": "深层扮演",
        "autonomous_emotion": "自主情绪",
        "emotional_exhaustion": "情绪耗竭",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 9
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 3) for i in items)
            dimension_scores[dim] = score
        
        burnout_score = round((dimension_scores["surface_acting"] + dimension_scores["emotional_exhaustion"]) / (items_per_dim * 2 * 5) * 100)
        
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
        
        strategy_profile = self._get_strategy_profile(dimension_scores)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=burnout_score,
            dimensions=dimensions,
            interpretation={
                "strategy_profile": strategy_profile,
                "burnout_risk": self._get_burnout_risk(burnout_score),
            },
            development_advice=self._get_advice(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("els-"):
                idx = int(key.replace("els-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_strategy_profile(self, scores: Dict[str, int]) -> str:
        surface = scores["surface_acting"]
        deep = scores["deep_acting"]
        auto = scores["autonomous_emotion"]
        
        max_score = max(surface, deep, auto)
        
        if max_score == auto:
            return "真实表达型"
        elif max_score == deep:
            return "深层调节型"
        else:
            return "表层扮演型"
    
    def _get_burnout_risk(self, score: int) -> str:
        if score < 40:
            return "低风险"
        elif score < 60:
            return "中风险"
        else:
            return "高风险"
    
    def _get_advice(self, scores: Dict[str, int]) -> List[str]:
        advice = [
            "⚡ 设置情绪缓冲区，工作前后5分钟过渡",
            "🧘 练习5分钟呼吸法重置情绪",
            "🔋 每天安排真正的「离线」时间",
        ]
        if scores["surface_acting"] > scores["deep_acting"] * 1.2:
            advice.append("💡 尝试从「假装」转向「真实体验」积极情绪")
        if scores["emotional_exhaustion"] > 30:
            advice.append("🛀 建立释放情绪的健康仪式")
        return advice
