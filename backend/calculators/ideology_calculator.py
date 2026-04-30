# =============================================================================
#  政治意识形态九宫格计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class Ideology9SquareCalculator(BaseCalculator):
    assessment_id = "ideology-9square"
    assessment_name = "政治意识形态九宫格"
    question_count = 50
    dimensions = ["economic", "social", "diplomatic", "governance"]
    
    DIMENSION_NAMES = {
        "economic": "经济维度",
        "social": "社会维度",
        "diplomatic": "外交维度",
        "governance": "治理维度",
    }
    
    SECTORS = {
        "liberal": "自由派",
        "conservative": "保守派",
        "authoritarian": "威权主义",
        "libertarian": "自由意志主义",
        "socialist": "社会主义",
        "fascist": "法西斯主义",
        "anarchist": "无政府主义",
        "statist": "国家主义",
        "centrist": "中间派",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dim_scores = {dim: 0 for dim in self.dimensions}
        items_per_dim = 12
        
        for dim_idx, dim in enumerate(self.dimensions):
            for i in range(1, items_per_dim + 1):
                q_num = dim_idx * items_per_dim + i
                val = answer_map.get(q_num, 3)
                dim_scores[dim] += (val - 3)
        
        sector = self._get_sector(dim_scores["economic"], dim_scores["governance"])
        
        dimensions = []
        for dim, raw_score in dim_scores.items():
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=self._score_to_percentage(raw_score),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=50,
            dimensions=dimensions,
            type_profile={
                "sector": sector,
                "sector_name": self.SECTORS.get(sector, "中间派"),
                "coordinates": {
                    "x": dim_scores["economic"] / 36,
                    "y": dim_scores["governance"] / 36,
                },
                "quadrant": self._get_quadrant(sector),
            },
            interpretation={
                "description": self._get_description(sector),
                "compatible_sectors": self._get_compatible(sector),
                "critical_thinking_advice": [
                    "意识形态只是理解世界的简化模型，不是现实本身",
                    "任何极端意识形态都有其内在的逻辑缺陷",
                    "主动理解你反对的立场，才是真正的思考",
                ],
            },
            development_advice=self._get_advice(sector),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("ideo-"):
                idx = int(key.replace("ideo-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _score_to_percentage(self, score: int) -> float:
        return 50 + (score / 36) * 50
    
    def _get_axis_label(self, dim: str, score: int) -> str:
        thresholds = [-12, 12]
        if dim == "economic":
            if score < thresholds[0]:
                return "左翼"
            elif score > thresholds[1]:
                return "右翼"
            return "中间"
        elif dim == "governance":
            if score < thresholds[0]:
                return "威权"
            elif score > thresholds[1]:
                return "自由"
            return "中间"
        return ""
    
    def _get_sector(self, x: int, y: int) -> str:
        if abs(x) < 8 and abs(y) < 8:
            return "centrist"
        
        if x < -8 and y < -8:
            return "statist"
        elif x < -8 and y > 8:
            return "socialist"
        elif x > 8 and y < -8:
            return "fascist"
        elif x > 8 and y > 8:
            return "libertarian"
        elif x < -8:
            return "liberal"
        elif x > 8:
            return "conservative"
        elif y < -8:
            return "authoritarian"
        else:
            return "anarchist"
    
    def _get_quadrant(self, sector: str) -> str:
        quadrants = {
            "centrist": "中间地带",
            "statist": "第三象限",
            "socialist": "第二象限",
            "fascist": "第四象限",
            "libertarian": "第一象限",
            "liberal": "左倾",
            "conservative": "右倾",
            "authoritarian": "威权倾",
            "anarchist": "自由倾",
        }
        return quadrants[sector]
    
    def _get_description(self, sector: str) -> str:
        descriptions = {
            "centrist": "你拒绝极端意识形态，相信实用主义。好的政策往往来自中间道路。",
            "socialist": "经济平等和个人自由是你追求的双重目标。你相信市场需要被监管。",
            "libertarian": "管得最少的政府就是最好的政府。你相信自由市场和公民社会能够自我治理。",
            "statist": "强大的国家是平等的保障。你相信国家应该在经济和社会生活中发挥主导作用。",
            "fascist": "传统、秩序、民族是你最看重的价值。你相信强有力的领导和集体认同。",
            "liberal": "你看重平等，相信进步的力量。社会正义和经济公平是你的核心诉求。",
            "conservative": "传统智慧经过了时间的检验。你相信渐进的变革比激进的革命更好。",
            "authoritarian": "秩序高于一切。你相信强有力的中央权威是社会稳定的基础。",
            "anarchist": "所有的国家都是压迫机器。你相信没有政府的社会才是真正自由的社会。",
        }
        return descriptions.get(sector, "")
    
    def _get_compatible(self, sector: str) -> List[str]:
        compatibility = {
            "centrist": ["liberal", "conservative"],
            "socialist": ["liberal", "anarchist"],
            "libertarian": ["conservative", "anarchist"],
        }
        return compatibility.get(sector, [])
    
    def _get_advice(self, sector: str) -> List[str]:
        advice = [
            "🤝 意识形态只是理解世界的地图，不是世界本身",
            "🧠 警惕回音室效应，主动阅读你不同意的观点",
        ]
        
        if sector == "centrist":
            advice.append("⚖️  中间不是平庸，是一种清醒的选择")
        else:
            advice.append("🌍 和不同意识形态的人交朋友，你会收获更多")
        
        return advice
