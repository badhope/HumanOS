# =============================================================================
#  🧠 心理成熟度测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class GMAMaturityCalculator(BaseCalculator):
    assessment_id = "gma-maturity"
    assessment_name = "GMA心理成熟度测评"
    question_count = 30
    dimensions = ["emotional_regulation", "responsibility", "empathy", "reality_orientation", "self_awareness", "flexibility"]

    DIMENSION_NAMES = {
        "emotional_regulation": "情绪调节",
        "responsibility": "责任心",
        "empathy": "同理心",
        "reality_orientation": "现实取向",
        "self_awareness": "自我觉察",
        "flexibility": "灵活性",
    }

    LEVELS = {
        "sage": {"name": "智者", "emoji": "🦉", "desc": "情绪稳定，内心强大。看什么都云淡风轻，没什么能真正伤害到你。"},
        "adult": {"name": "成年人", "emoji": "🧑", "desc": "真正的成年人。能为自己负责，也能为别人着想。"},
        "growing": {"name": "成长中", "emoji": "🌱", "desc": "走在成熟的路上。虽然有时还会幼稚，但至少在进步。"},
        "teenager": {"name": "青春期", "emoji": "😤", "desc": "心里住着一个叛逆的少年。情绪容易激动，世界观非黑即白。"},
        "child": {"name": "小朋友", "emoji": "👶", "desc": "巨婴说的就是你。需要别人照顾，期望世界围着你转。"},
    }

    def _get_level(self, score: int) -> str:
        if score >= 85:
            return "sage"
        elif score >= 70:
            return "adult"
        elif score >= 50:
            return "growing"
        elif score >= 30:
            return "teenager"
        else:
            return "child"

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
        maturity_index = round(total / len(self.dimensions))
        level = self._get_level(maturity_index)
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
            overall_score=maturity_index,
            dimensions=dimensions,
            type_profile={
                "level": level,
                "level_name": config["name"],
                "level_emoji": config["emoji"],
                "mental_age": self._get_mental_age(maturity_index),
            },
            interpretation={
                "description": config["desc"],
                "maturity_signs": self._get_maturity_signs(dim_scores),
            },
            development_advice=self._get_advice(level, dim_scores),
            strengths=self._get_strengths(dim_scores),
            blind_spots=self._get_blind_spots(level),
        )

    def _get_mental_age(self, score: int) -> str:
        if score >= 85:
            return "100岁以上 - 成精了"
        elif score >= 70:
            return "35-50岁 - 不惑之年"
        elif score >= 50:
            return "25-35岁 - 而立之年"
        elif score >= 30:
            return "18-25岁 - 青春年少"
        else:
            return "18岁以下 - 小朋友"

    def _get_maturity_signs(self, scores: Dict[str, int]) -> List[str]:
        signs = []
        if scores["emotional_regulation"] >= 60:
            signs.append("情绪稳定，不轻易发脾气")
        if scores["responsibility"] >= 60:
            signs.append("说到做到，有担当")
        if scores["empathy"] >= 60:
            signs.append("能体谅他人的感受")
        if scores["self_awareness"] >= 60:
            signs.append("有清晰的自我认知")
        return signs or ["成熟是一辈子的修行"]

    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        sorted_dims = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
        return [self.DIMENSION_NAMES[dim] for dim, _ in sorted_dims]

    def _get_blind_spots(self, level: str) -> List[str]:
        return {
            "sage": ["不要太佛系了，偶尔也要争取一下", "小心变成老油条"],
            "adult": ["不要太累了，偶尔也可以幼稚一下", "对自己好一点"],
            "growing": ["不要着急，慢慢来", "成熟的过程就是不断打脸的过程"],
            "teenager": ["世界不是非黑即白的", "不要总是和世界对着干"],
            "child": ["没有人有义务一直照顾你", "学会自己承担责任"],
        }[level]

    def _get_advice(self, level: str, scores: Dict[str, int]) -> List[str]:
        weak_dim = min(scores.items(), key=lambda x: x[1])[0]
        advice = {
            "sage": ["继续保持这份智慧", "帮助身边的人也成长", "保持对生活的热情"],
            "adult": ["你做得很好了", "学会给自己减压", f"可以在「{self.DIMENSION_NAMES[weak_dim]}」方面继续提升"],
            "growing": ["成长需要时间，不要着急", "每一次经历都是学习", f"重点提升「{self.DIMENSION_NAMES[weak_dim]}」"],
            "teenager": ["学会控制情绪", "试着换位思考", "多听少说"],
            "child": ["首先要为自己负责", "学会独立", "不要总是期望别人迁就你"],
        }
        return advice[level]
