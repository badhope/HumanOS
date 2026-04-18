# =============================================================================
#  情绪智力量表计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class EQCalculator(BaseCalculator):
    assessment_id = "eq-goleman"
    assessment_name = "戈尔曼情绪智力量表"
    question_count = 33
    dimensions = ["self_awareness", "self_management", "social_awareness", "relationship_management"]
    
    DIMENSION_NAMES = {
        "self_awareness": "自我觉察",
        "self_management": "自我管理",
        "social_awareness": "社会觉察",
        "relationship_management": "关系管理",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        for i, dim in enumerate(self.dimensions):
            start = i * 8 + 1
            end = start + 8 if dim != "relationship_management" else start + 9
            score = sum(answer_map.get(j, 3) for j in range(start, end))
            dimension_scores[dim] = score
        
        total = sum(dimension_scores.values())
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            max_score = 8 * 5 if dim != "relationship_management" else 9 * 5
            percentage = round((raw_score / max_score) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                stanine=self._calculate_stanine(self._get_percentile(percentage)),
                level=self._get_level(percentage),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=total,
            dimensions=dimensions,
            type_profile={
                "eq_level": self._get_eq_level(total),
                "strengths": sorted(dimension_scores.items(), key=lambda x: -x[1])[:2],
            },
            development_advice=self._get_advice(dimension_scores),
            strengths=self._get_strengths(dimension_scores),
            blind_spots=self._get_blind_spots(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("eq-"):
                idx = int(key.replace("eq-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_percentile(self, percentage: int) -> float:
        if percentage < 40:
            return 15
        elif percentage < 60:
            return 50
        elif percentage < 80:
            return 75
        else:
            return 90
    
    def _get_level(self, percentage: int) -> str:
        if percentage < 40:
            return "待发展"
        elif percentage < 60:
            return "一般"
        elif percentage < 80:
            return "良好"
        else:
            return "卓越"
    
    def _get_eq_level(self, total: int) -> str:
        if total < 82:
            return "待发展"
        elif total < 124:
            return "一般"
        elif total < 148:
            return "良好"
        else:
            return "卓越"
    
    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        strengths = []
        avg = sum(scores.values()) / len(scores)
        for dim, score in scores.items():
            if score >= avg * 1.1:
                strengths.append(f"{self.DIMENSION_NAMES[dim]}能力突出")
        return strengths
    
    def _get_blind_spots(self, scores: Dict[str, int]) -> List[str]:
        spots = []
        avg = sum(scores.values()) / len(scores)
        for dim, score in scores.items():
            if score <= avg * 0.9:
                spots.append(f"{self.DIMENSION_NAMES[dim]}是需要提升的领域")
        return spots
    
    def _get_advice(self, scores: Dict[str, int]) -> List[str]:
        advice = [
            "❤️  情绪智能是可以通过练习持续提升的技能",
            "🎯 每天5分钟情绪日志：记录触发事件 + 你的反应",
        ]
        
        if scores["self_awareness"] < 30:
            advice.append("🧘 身体扫描冥想，学习识别情绪的生理信号")
        
        if scores["self_management"] < 30:
            advice.append("⏸️  情绪爆发前的6秒暂停法则")
        
        if scores["social_awareness"] < 30:
            advice.append("👀 练习观察他人微表情和肢体语言的5分钟训练")
        
        if scores["relationship_management"] < 30:
            advice.append("🤝 非暴力沟通：观察 - 感受 - 需要 - 请求")
        
        return advice
