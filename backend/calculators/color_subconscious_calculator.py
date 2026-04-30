# =============================================================================
#  色彩潜意识投射计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class ColorSubconsciousCalculator(BaseCalculator):
    assessment_id = "color-subconscious"
    assessment_name = "色彩潜意识投射测试"
    question_count = 24
    dimensions = ["energy_level", "emotional_state", "cognitive_style", "unconscious_desire"]
    
    DIMENSION_NAMES = {
        "energy_level": "能量状态",
        "emotional_state": "情绪状态",
        "cognitive_style": "认知风格",
        "unconscious_desire": "潜意识渴望",
    }
    
    COLORS = {
        "red": "红色", "orange": "橙色", "yellow": "黄色",
        "green": "绿色", "blue": "蓝色", "purple": "紫色",
        "black": "黑色", "white": "白色", "pink": "粉色",
        "brown": "棕色", "gray": "灰色", "gold": "金色",
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
        
        dominant_color = self._get_dominant_color(dimension_scores)
        
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
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            interpretation={
                "dominant_color": dominant_color,
                "color_meaning": self._get_color_meaning(dominant_color),
            },
            strengths=self._get_color_strengths(dominant_color),
            development_advice=self._get_color_advice(dominant_color),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("color-"):
                idx = int(key.replace("color-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_dominant_color(self, scores: Dict[str, int]) -> str:
        color_idx = int(sum(scores.values()) / 4) % 12
        return list(self.COLORS.keys())[color_idx]
    
    def _get_color_meaning(self, color: str) -> str:
        meanings = {
            "red": "充满激情与生命力，渴望行动与成就",
            "orange": "追求快乐与社交，创造力旺盛",
            "yellow": "乐观积极，渴望知识与智慧",
            "green": "追求和谐与成长，需要安全感",
            "blue": "冷静理性，渴望内心的平静",
            "purple": "神秘浪漫，追求灵性与艺术",
            "black": "力量与保护，渴望掌控感",
            "white": "纯净与完美，渴望简单纯粹",
            "pink": "爱与温柔，需要被关爱与理解",
            "brown": "踏实稳定，渴望安全感与归属感",
            "gray": "中立平衡，避免冲突与压力",
            "gold": "成功与荣耀，追求卓越与认可",
        }
        return meanings.get(color, "丰富而独特的内心世界")
    
    def _get_color_strengths(self, color: str) -> List[str]:
        strengths_map = {
            "red": ["行动力强", "充满激情", "领导力"],
            "orange": ["创造力", "社交能力", "乐观"],
            "yellow": ["智慧", "幽默感", "积极"],
            "green": ["同理心", "耐心", "治愈力"],
            "blue": ["理性", "洞察力", "平静"],
            "purple": ["直觉", "艺术感", "灵性"],
        }
        return strengths_map.get(color, ["独特", "深刻", "丰富"])
    
    def _get_color_advice(self, color: str) -> List[str]:
        return [
            f"🎨 多接触能带给你力量的{self.COLORS[color]}",
            "🌈 色彩疗愈：在环境中加入平衡色",
            "✨ 潜意识正在通过色彩与你对话",
        ]
