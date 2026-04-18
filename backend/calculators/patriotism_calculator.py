# =============================================================================
#  🇨🇳 爱国纯度测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class PatriotismPurityCalculator(BaseCalculator):
    assessment_id = "patriotism-purity"
    assessment_name = "爱国纯度测评"
    question_count = 25
    dimensions = ["cultural_pride", "national_identity", "social_responsibility", "critical_thinking", "global_vision"]

    DIMENSION_NAMES = {
        "cultural_pride": "文化自豪感",
        "national_identity": "国家认同",
        "social_responsibility": "社会责任",
        "critical_thinking": "理性批判",
        "global_vision": "国际视野",
    }

    LEVELS = {
        "pure": {"name": "特级爱国", "emoji": "🏅", "desc": "社会主义接班人，根正苗红的好青年。国家的未来就靠你了！"},
        "sane": {"name": "理性爱国", "emoji": "🇨🇳", "desc": "热爱祖国，但也保持独立思考。真正的爱国者，从不盲目。"},
        "normal": {"name": "普通爱国", "emoji": "❤️", "desc": "我爱我的国家，但不怎么挂在嘴上。过好自己的日子，就是最大的爱国。"},
        "critical": {"name": "批评者", "emoji": "🤔", "desc": "爱之深，责之切。因为真正在乎，所以才会批评。"},
        "detached": {"name": "吃瓜群众", "emoji": "🍉", "desc": "国家大事与我何干？我就是个打酱油的。"},
    }

    def _get_level(self, score: int) -> str:
        if score >= 85:
            return "pure"
        elif score >= 65:
            return "sane"
        elif score >= 45:
            return "normal"
        elif score >= 25:
            return "critical"
        else:
            return "detached"

    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)

        dim_scores = {}
        items_per_dim = 5
        for idx, dim in enumerate(self.dimensions):
            score = 0
            for i in range(1, items_per_dim + 1):
                q_num = idx * items_per_dim + i
                val = answer_map.get(q_num, 3)
                score += val
            normalized = round((score / items_per_dim - 1) * 100 / 4)
            dim_scores[dim] = normalized

        total = sum(dim_scores.values())
        patriotism_index = round(total / len(self.dimensions))
        level = self._get_level(patriotism_index)
        config = self.LEVELS[level]

        dimensions = []
        for dim, raw_score in dim_scores.items():
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=raw_score,
                stanine=self._calculate_stanine(raw_score),
            ))

        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=patriotism_index,
            dimensions=dimensions,
            type_profile={
                "level": level,
                "level_name": config["name"],
                "level_emoji": config["emoji"],
            },
            interpretation={
                "description": config["desc"],
                "patriotism_type": self._get_type(dim_scores),
            },
            development_advice=self._get_advice(level),
        )

    def _get_type(self, scores: Dict[str, int]) -> str:
        max_dim = max(scores.items(), key=lambda x: x[1])[0]
        types = {
            "cultural_pride": "文化自信型",
            "national_identity": "民族自豪型",
            "social_responsibility": "行动派",
            "critical_thinking": "理性反思型",
            "global_vision": "国际视野型",
        }
        return types[max_dim]

    def _get_advice(self, level: str) -> List[str]:
        return {
            "pure": ["继续保持这份赤子之心", "建设祖国的重任就交给你了", "多做少说，用行动证明"],
            "sane": ["理性爱国才是真正的爱国", "继续保持独立思考", "你的声音很重要"],
            "normal": ["爱国不是喊口号", "过好自己的日子就是最大的贡献", "从身边的小事做起"],
            "critical": ["批评也是一种爱国", "但不要忘了建设性", "保持独立思考很重要"],
            "detached": ["国家兴亡，匹夫有责", "偶尔也关心一下国家大事", "你怎样，中国便怎样"],
        }[level]
