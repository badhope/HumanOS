# =============================================================================
#  🌸 性经验程度测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class SexualExperienceCalculator(BaseCalculator):
    assessment_id = "sexual-experience"
    assessment_name = "性经验程度测评"
    question_count = 25
    dimensions = ["theoretical", "practical", "openness", "communication", "attitude"]

    DIMENSION_NAMES = {
        "theoretical": "理论知识",
        "practical": "实战经验",
        "openness": "性观念开放度",
        "communication": "沟通能力",
        "attitude": "性态度",
    }

    LEVELS = {
        "god": {"name": "老司机", "emoji": "🚗", "desc": "秋名山车神就是你。理论实践双修，没有你不懂的姿势。"},
        "expert": {"name": "懂王", "emoji": "😏", "desc": "嘴上说不要，身体很诚实。看起来人畜无害，其实什么都懂。"},
        "normal": {"name": "正常水平", "emoji": "🙂", "desc": "该懂的都懂，不该懂的也略懂一点。"},
        "beginner": {"name": "萌新", "emoji": "🐣", "desc": "理论还可以，实战为零。说的就是你，屏幕前的那个。"},
        "pure": {"name": "纯纯的白纸", "emoji": "🍼", "desc": "小朋友，你是否有很多问号？"},
    }

    def _get_level(self, score: int) -> str:
        if score >= 85:
            return "god"
        elif score >= 65:
            return "expert"
        elif score >= 45:
            return "normal"
        elif score >= 25:
            return "beginner"
        else:
            return "pure"

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
        experience_index = round(total / len(self.dimensions))
        level = self._get_level(experience_index)
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
            overall_score=experience_index,
            dimensions=dimensions,
            type_profile={
                "level": level,
                "level_name": config["name"],
                "level_emoji": config["emoji"],
                "dominant_skill": self._get_dominant_skill(dim_scores),
            },
            interpretation={
                "description": config["desc"],
                "signature_phrases": self._get_signature_phrases(level),
            },
            development_advice=self._get_advice(level),
        )

    def _get_dominant_skill(self, scores: Dict[str, int]) -> str:
        max_dim = max(scores.items(), key=lambda x: x[1])[0]
        skills = {
            "theoretical": "理论家",
            "practical": "实战派",
            "openness": "开放玩家",
            "communication": "沟通大师",
            "attitude": "哲学家",
        }
        return skills[max_dim]

    def _get_signature_phrases(self, level: str) -> List[str]:
        return {
            "god": ["这不就来了吗", "懂的都懂", "我要说的是..."],
            "expert": ["这个我熟", "很简单的", "过来人告诉你"],
            "normal": ["我听说...", "好像是这样", "大概吧"],
            "beginner": ["真的吗？", "怎么会这样", "学习了"],
            "pure": ["???", "这是什么意思", "我不懂"],
        }[level]

    def _get_advice(self, level: str) -> List[str]:
        return {
            "god": ["老司机带带我！", "注意身体，节制一点", "理论还要联系实际"],
            "expert": ["可以往更高的段位冲击", "可以教教萌新们", "继续保持"],
            "normal": ["革命尚未成功，同志仍需努力", "多学习，多实践", "注意安全"],
            "beginner": ["多学习理论知识", "实践出真知", "注意保护自己"],
            "pure": ["小朋友不要学坏了", "等你长大就懂了", "保持这份纯真"],
        }[level]
