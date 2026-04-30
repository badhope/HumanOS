# =============================================================================
#  TKI 冲突处理模式量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class TKICalculator(BaseCalculator):
    assessment_id = "tki-standard"
    assessment_name = "TKI 冲突处理模式量表"
    question_count = 30
    dimensions = ["competing", "collaborating", "compromising", "avoiding", "accommodating"]
    
    DIMENSION_NAMES = {
        "competing": "竞争型",
        "collaborating": "合作型",
        "compromising": "妥协型",
        "avoiding": "回避型",
        "accommodating": "迁就型",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        style_items = 6
        
        for idx, dim in enumerate(self.dimensions):
            items = [idx + 1 + i * 5 for i in range(style_items)]
            score = sum(answer_map.get(i, 2) for i in items)
            dimension_scores[dim] = score
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (style_items * 4)) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        dominant_style = max(dimension_scores.items(), key=lambda x: x[1])[0]
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            interpretation={
                "dominant_style": self.DIMENSION_NAMES[dominant_style],
                "style_description": self._get_style_description(dominant_style),
            },
            strengths=self._get_strengths(dominant_style),
            blind_spots=self._get_blind_spots(dominant_style),
            development_advice=self._get_advice(dominant_style),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("tki-"):
                idx = int(key.replace("tki-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_style_description(self, style: str) -> str:
        descriptions = {
            "competing": "坚定果断，追求自身利益最大化",
            "collaborating": "寻求双赢，追求各方需求都得到满足",
            "compromising": "求同存异，寻找双方都能接受的中间点",
            "avoiding": "避其锋芒，暂时回避冲突等待时机",
            "accommodating": "以和为贵，优先满足对方的需求",
        }
        return descriptions.get(style, "")
    
    def _get_strengths(self, style: str) -> List[str]:
        strengths_map = {
            "competing": ["决策效率高", "能保护核心利益", "适合危机处理"],
            "collaborating": ["创造性解决问题", "建立深度信任", "整合多方资源"],
            "compromising": ["务实灵活", "容易达成协议", "维持关系平衡"],
            "avoiding": ["冷静理智", "给双方冷静时间", "避免无谓争斗"],
            "accommodating": ["关系导向", "愿意让步", "获得他人好感"],
        }
        return strengths_map.get(style, [])
    
    def _get_blind_spots(self, style: str) -> List[str]:
        blind_spots_map = {
            "competing": ["可能损害关系", "容易引发对抗", "忽略他人感受"],
            "collaborating": ["耗时较长", "可能过度复杂", "成本较高"],
            "compromising": ["可能牺牲原则", "结果未必最优", "缺乏深度"],
            "avoiding": ["问题可能积累", "被视为软弱", "错过解决时机"],
            "accommodating": ["可能忽视自身利益", "被他人利用", "积累怨恨"],
        }
        return blind_spots_map.get(style, [])
    
    def _get_advice(self, style: str) -> List[str]:
        return [
            f"⚖️ 根据具体情境灵活选择冲突处理模式",
            f"📊 重要冲突：优先考虑合作/妥协",
            f"⏰ 紧急情况：竞争/回避可能更合适",
            f"🤝 长期关系：迁就/合作更有利于维护",
        ]
