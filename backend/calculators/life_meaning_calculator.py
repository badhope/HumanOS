# =============================================================================
#  ✨ 人生意义感测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class LifeMeaningCalculator(BaseCalculator):
    assessment_id = "life-meaning"
    assessment_name = "人生意义感测评"
    question_count = 25
    dimensions = ["purpose", "values", "efficacy", "self_worth", "connectedness", "growth"]

    DIMENSION_NAMES = {
        "purpose": "目标感",
        "values": "价值观",
        "efficacy": "效能感",
        "self_worth": "自我价值",
        "connectedness": "联结感",
        "growth": "成长感",
    }

    LEVELS = {
        "enlightened": {"name": "开悟者", "emoji": "✨", "desc": "你找到了人生的答案。活着对你来说不再是问题，而是一种享受。"},
        "fulfilled": {"name": "圆满者", "emoji": "🌟", "desc": "你的人生很充实。知道自己要什么，也在努力去做。"},
        "seeker": {"name": "探索者", "emoji": "🔍", "desc": "走在寻找意义的路上。虽然还没找到答案，但至少你在寻找。"},
        "confused": {"name": "迷茫者", "emoji": "🌫️", "desc": "偶尔会思考人生，但大多时候还是得过且过。"},
        "empty": {"name": "空心人", "emoji": "🥚", "desc": "感觉人生很虚无。活着好像也没什么特别的意义。"},
        "despairing": {"name": "绝望者", "emoji": "💔", "desc": "人生对你来说可能是一种煎熬。请一定不要放弃，活着就有希望。"},
    }

    def _get_level(self, score: int) -> str:
        if score >= 85:
            return "enlightened"
        elif score >= 70:
            return "fulfilled"
        elif score >= 50:
            return "seeker"
        elif score >= 35:
            return "confused"
        elif score >= 20:
            return "empty"
        else:
            return "despairing"

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
        meaning_index = round(total / len(self.dimensions))
        level = self._get_level(meaning_index)
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
            overall_score=meaning_index,
            dimensions=dimensions,
            type_profile={
                "level": level,
                "level_name": config["name"],
                "level_emoji": config["emoji"],
            },
            interpretation={
                "description": config["desc"],
                "meaning_sources": self._get_meaning_sources(dim_scores),
                "philosophical_quotes": self._get_quotes(),
            },
            development_advice=self._get_advice(level, dim_scores),
            strengths=self._get_strengths(dim_scores),
        )

    def _get_meaning_sources(self, scores: Dict[str, int]) -> List[str]:
        sources = []
        if scores["purpose"] >= 60:
            sources.append("拥有清晰的人生目标")
        if scores["values"] >= 60:
            sources.append("坚定的价值观和原则")
        if scores["self_worth"] >= 60:
            sources.append("无条件的自我接纳")
        if scores["connectedness"] >= 60:
            sources.append("与他人深度联结")
        if scores["growth"] >= 60:
            sources.append("持续成长和进步")
        return sources or ["意义需要自己去寻找和创造"]

    def _get_quotes(self) -> List[str]:
        return [
            "人生的意义不在于长度，而在于深度",
            "不是你寻找意义，而是意义寻找你",
            "活着本身就是意义",
            "每一个不曾起舞的日子，都是对生命的辜负",
        ]

    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        sorted_dims = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
        return [self.DIMENSION_NAMES[dim] for dim, _ in sorted_dims]

    def _get_advice(self, level: str, scores: Dict[str, int]) -> List[str]:
        weak_dim = min(scores.items(), key=lambda x: x[1])[0]
        advice = {
            "enlightened": ["继续你的修行", "把你的智慧分享给更多人", "保持这份觉知"],
            "fulfilled": ["继续走在你的道路上", "帮助他人也找到意义", "感恩你所拥有的一切"],
            "seeker": ["继续探索，不要放弃", "答案可能就在下一个转角", f"可以在「{self.DIMENSION_NAMES[weak_dim]}」方面多下功夫"],
            "confused": ["迷茫是正常的，大家都一样", "多读书，多经历", "行动是解决迷茫的最好方法"],
            "empty": ["去做点什么吧，哪怕是很小的事", "先从照顾好自己开始", "帮助他人也能找到意义"],
            "despairing": ["请一定寻求帮助，你不是一个人", "明天会更好的，相信我", "活着本身就是最勇敢的事"],
        }
        return advice[level]
