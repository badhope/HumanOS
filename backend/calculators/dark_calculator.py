# =============================================================================
#  黑暗三角人格量表计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class DarkTriadCalculator(BaseCalculator):
    assessment_id = "dark-triad"
    assessment_name = "黑暗三角人格测试"
    question_count = 27
    dimensions = ["machiavellianism", "narcissism", "psychopathy"]
    
    DIMENSION_NAMES = {
        "machiavellianism": "马基雅维利主义",
        "narcissism": "自恋",
        "psychopathy": "精神病态",
    }
    
    REVERSE_ITEMS = [3, 6, 9, 12, 15, 18, 21, 24, 27]
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        dim_ids = ["machiavellianism", "narcissism", "psychopathy"]
        
        for idx, dim in enumerate(dim_ids):
            score = 0
            for i in range(idx + 1, 28, 3):
                val = answer_map.get(i, 3)
                if i in self.REVERSE_ITEMS:
                    val = 6 - val
                score += val
            dimension_scores[dim] = score
        
        total = sum(dimension_scores.values())
        primary = max(dimension_scores.items(), key=lambda x: x[1])[0]
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            max_score = 9 * 5
            percentage = round((raw_score / max_score) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=self._get_percentile(raw_score),
                stanine=self._calculate_stanine(self._get_percentile(raw_score)),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=total,
            dimensions=dimensions,
            type_profile={
                "primary_type": primary,
                "primary_name": self.DIMENSION_NAMES[primary],
                "darkness_level": self._get_darkness_level(total),
            },
            interpretation={
                "total_score": total,
                "profile": self._generate_profile(primary, dimension_scores),
            },
            development_advice=self._get_advice(dimension_scores),
            strengths=self._get_strengths(dimension_scores),
            blind_spots=self._get_blind_spots(dimension_scores),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("dark-"):
                idx = int(key.replace("dark-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_percentile(self, score: int) -> float:
        if score < 18:
            return 10
        elif score < 27:
            return 30
        elif score < 36:
            return 50
        elif score < 40:
            return 75
        else:
            return 90
    
    def _get_darkness_level(self, total: int) -> str:
        if total < 54:
            return "光明型"
        elif total < 81:
            return "灰调型"
        elif total < 108:
            return "暗影型"
        else:
            return "深渊型"
    
    def _generate_profile(self, primary: str, scores: Dict[str, int]) -> str:
        profiles = {
            "machiavellianism": "策略大师型：擅长人际操控，目标导向极强",
            "narcissism": "魅力领袖型：享受被关注，善于自我展示",
            "psychopathy": "冷酷决断型：情绪隔离，决策不受干扰",
        }
        return profiles.get(primary, "平衡型")
    
    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        strengths = []
        if scores["machiavellianism"] > 30:
            strengths.append("卓越的战略思维和长远规划能力")
        if scores["narcissism"] > 30:
            strengths.append("领袖魅力和强大的自我驱动力")
        if scores["psychopathy"] > 30:
            strengths.append("高压下的冷静决断能力")
        return strengths
    
    def _get_blind_spots(self, scores: Dict[str, int]) -> List[str]:
        spots = []
        if scores["machiavellianism"] > 36:
            spots.append("人际关系功利化，难以建立真正信任")
        if scores["narcissism"] > 36:
            spots.append("无法接受批评，容易陷入自证陷阱")
        if scores["psychopathy"] > 36:
            spots.append("共情能力缺失，可能伤害他人而不自知")
        return spots
    
    def _get_advice(self, scores: Dict[str, int]) -> List[str]:
        advice = [
            "🌱 黑暗特质本身没有对错，关键在于使用的目标和方式",
            "⚖️  建立自己的道德锚点，让力量服务于更大的价值",
        ]
        
        if scores["machiavellianism"] > 36:
            advice.append("💝 练习无条件的给予，体验纯粹利他的快乐")
        
        if scores["narcissism"] > 36:
            advice.append("👂 练习3分钟不打断地倾听，把舞台真正让给别人")
        
        if scores["psychopathy"] > 36:
            advice.append("❤️  每天记录一个让你感动的小瞬间")
        
        return advice
