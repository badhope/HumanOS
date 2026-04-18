# =============================================================================
#  SAS 焦虑自评量表计算器
#  算法 100% 对齐 TypeScript 版本 (50题版)
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class SASCalculator(BaseCalculator):
    assessment_id = "sas-standard"
    assessment_name = "Zung SAS 焦虑自评量表"
    question_count = 50
    dimensions = ["social_anxiety", "somatic_anxiety", "cognitive_anxiety", "sleep_anxiety"]
    
    DIMENSION_NAMES = {
        "social_anxiety": "社交焦虑",
        "somatic_anxiety": "躯体焦虑",
        "cognitive_anxiety": "认知焦虑",
        "sleep_anxiety": "睡眠障碍",
    }
    
    REVERSE_ITEMS = [1, 3, 5, 6, 11, 13, 17, 19, 24, 26, 31, 33, 34, 36, 37, 39, 42, 44, 46, 48, 50]
    
    DIMENSION_ITEMS = {
        "social_anxiety": list(range(1, 13)),
        "somatic_anxiety": list(range(13, 24)),
        "cognitive_anxiety": list(range(24, 34)),
        "sleep_anxiety": list(range(34, 51)),
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        total_raw = 0
        
        for dim, items in self.DIMENSION_ITEMS.items():
            score = 0
            for i in items:
                val = answer_map.get(i, 3)
                if i in self.REVERSE_ITEMS:
                    val = 6 - val
                score += val
            dimension_scores[dim] = score
            total_raw += score
        
        standard_score = round(25 + ((total_raw - 134) / 32 * 75))
        
        level, level_text = self._get_level(standard_score)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            max_score = len(self.DIMENSION_ITEMS[dim]) * 5
            percentage = round((raw_score / max_score) * 100)
            dim_level = self._get_dimension_level(percentage)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=dim_level,
                stanine=self._calculate_stanine(self._get_percentile(standard_score)),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=standard_score,
            dimensions=dimensions,
            interpretation={
                "raw_score": total_raw,
                "standard_score": standard_score,
                "level": level,
                "level_text": level_text,
            },
            development_advice=self._get_advice(standard_score),
            strengths=self._get_strengths(standard_score),
            blind_spots=self._get_blind_spots(standard_score),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("sas-"):
                idx = int(key.replace("sas-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_level(self, score: int):
        if score < 50:
            return "normal", "正常范围"
        elif score < 60:
            return "mild", "轻度焦虑"
        elif score < 70:
            return "moderate", "中度焦虑"
        else:
            return "severe", "重度焦虑"
    
    def _get_dimension_level(self, percentage: int) -> str:
        if percentage < 50:
            return "正常"
        elif percentage < 60:
            return "轻度"
        elif percentage < 75:
            return "中度"
        else:
            return "重度"
    
    def _get_percentile(self, standard_score: int) -> float:
        if standard_score < 40:
            return 10
        elif standard_score < 47:
            return 25
        elif standard_score < 50:
            return 50
        elif standard_score < 60:
            return 75
        elif standard_score < 70:
            return 90
        else:
            return 95
    
    def _get_strengths(self, score: int) -> List[str]:
        strengths = ["情绪自我觉察能力较强"]
        if score < 50:
            strengths.extend([
                "情绪稳定性好，不易受外界干扰",
                "压力下仍能保持理性思考",
                "人际关系中能保持轻松自在",
            ])
        return strengths
    
    def _get_blind_spots(self, score: int) -> List[str]:
        spots = []
        if score >= 60:
            spots.extend([
                "容易过度解读他人行为的意图",
                "躯体症状可能掩盖真正的情绪问题",
                "灾难化思维倾向需要警惕",
            ])
        return spots
    
    def _get_advice(self, score: int) -> List[str]:
        advice = [
            "🧘 4-7-8 呼吸法：吸气4秒，屏气7秒，呼气8秒",
            "🏃 每天30分钟有氧运动，焦虑的天然解药",
        ]
        
        if score >= 50:
            advice.extend([
                "📝 '焦虑日记'：把担心的事情写下来，90%都不会发生",
                "🚫 减少咖啡因摄入：咖啡、奶茶、能量饮料",
            ])
        
        if score >= 60:
            advice.extend([
                "🌙 睡前1小时'数字排毒'，不让焦虑偷走你的睡眠",
                "🤝 向信任的人倾诉，不要独自承担",
            ])
        
        if score >= 70:
            advice.append("🚑 请考虑寻求专业心理咨询帮助，这是勇敢的选择")
        
        return advice
