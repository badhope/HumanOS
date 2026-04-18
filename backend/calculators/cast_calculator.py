# =============================================================================
#  👨‍👩‍👧 教养方式测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class CASTParentingCalculator(BaseCalculator):
    assessment_id = "cast-parenting"
    assessment_name = "CAST教养方式测评"
    question_count = 32
    dimensions = ["authoritative", "authoritarian", "permissive", "uninvolved"]

    DIMENSION_NAMES = {
        "authoritative": "权威型",
        "authoritarian": "专制型",
        "permissive": "纵容型",
        "uninvolved": "忽视型",
    }

    STYLE_DESCRIPTIONS = {
        "authoritative": {
            "name": "权威型父母",
            "emoji": "🌟",
            "desc": "理想的教养方式。既有规矩又有温度，既尊重孩子又有底线。"
        },
        "authoritarian": {
            "name": "专制型父母",
            "emoji": "👮",
            "desc": "我说的就是对的。过于强调控制和服从，缺乏情感支持。"
        },
        "permissive": {
            "name": "纵容型父母",
            "emoji": "😇",
            "desc": "孩子永远是对的。过于溺爱，没有规矩，孩子想怎么样就怎么样。"
        },
        "uninvolved": {
            "name": "忽视型父母",
            "emoji": "👻",
            "desc": "孩子是充话费送的。既没有要求也没有回应，自生自灭。"
        },
    }

    def _get_primary_style(self, scores: Dict[str, int]) -> str:
        return max(scores.items(), key=lambda x: x[1])[0]

    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)

        dim_items = {
            "authoritative": list(range(1, 9)),
            "authoritarian": list(range(9, 17)),
            "permissive": list(range(17, 25)),
            "uninvolved": list(range(25, 33)),
        }

        dim_scores = {}
        for dim, items in dim_items.items():
            score = 0
            for i in items:
                val = answer_map.get(i, 3)
                score += val
            normalized = round((score / len(items) - 1) * 100 / 4)
            dim_scores[dim] = normalized

        primary = self._get_primary_style(dim_scores)
        config = self.STYLE_DESCRIPTIONS[primary]

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
            overall_score=dim_scores[primary],
            dimensions=dimensions,
            type_profile={
                "primary_style": primary,
                "style_name": config["name"],
                "style_emoji": config["emoji"],
                "style_profile": self._get_style_profile(dim_scores),
            },
            interpretation={
                "description": config["desc"],
                "parenting_strengths": self._get_strengths(primary),
            },
            development_advice=self._get_advice(primary, dim_scores),
            blind_spots=self._get_blind_spots(primary),
        )

    def _get_style_profile(self, scores: Dict[str, int]) -> str:
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        profile = []
        for style, score in sorted_scores:
            if score >= 60:
                profile.append(f"高{self.DIMENSION_NAMES[style]}")
            elif score >= 40:
                profile.append(f"中等{self.DIMENSION_NAMES[style]}")
            else:
                profile.append(f"低{self.DIMENSION_NAMES[style]}")
        return " + ".join(profile[:2])

    def _get_strengths(self, style: str) -> List[str]:
        return {
            "authoritative": ["既讲原则又灵活", "尊重孩子的独立性", "有效的沟通", "温暖的情感支持"],
            "authoritarian": ["规矩清晰", "说到做到", "培养孩子的纪律性", "对孩子有高期望"],
            "permissive": ["温暖有爱的亲子关系", "尊重孩子的自由", "很少打骂孩子", "孩子很快乐"],
            "uninvolved": ["孩子独立性很强", "给孩子充分的自由空间", "不干涉孩子的选择"],
        }[style]

    def _get_blind_spots(self, style: str) -> List[str]:
        return {
            "authoritative": ["不要太追求完美", "偶尔也可以放松一下标准", "小心变成控制狂"],
            "authoritarian": ["多听听孩子的想法", "棍棒底下不一定出孝子", "多表达你的爱"],
            "permissive": ["没有规矩不成方圆", "溺爱不是真爱", "该说不时就要说不"],
            "uninvolved": ["孩子需要你的关注", "多花点时间陪陪孩子", "参与孩子的成长"],
        }[style]

    def _get_advice(self, style: str, scores: Dict[str, int]) -> List[str]:
        if style == "authoritative":
            return ["你已经很棒了！", "继续保持这种教养方式", "可以多和其他父母交流经验"]
        elif style == "authoritarian":
            target = scores["authoritative"]
            if target < 50:
                return ["学会倾听", "把孩子当成平等的人", "奖励和惩罚同样重要", "多表达你的情感"]
            return ["在控制和温暖之间找平衡", "规则是死的，人是活的"]
        elif style == "permissive":
            return ["设立清晰的界限", "温柔但坚定", "学会对孩子说不", "延迟满足很重要"]
        else:
            return ["孩子的成长只有一次", "每天至少花30分钟高质量陪伴", "参与孩子的生活", "了解孩子的世界"]
