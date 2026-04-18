# =============================================================================
#  🧠 拉康精神分析诊断 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class LacanDiagnosisCalculator(BaseCalculator):
    assessment_id = "lacan-diagnosis"
    assessment_name = "拉康精神分析诊断"
    question_count = 28
    dimensions = ["imaginary", "symbolic", "real", "desire", "lack", "jouissance"]

    DIMENSION_NAMES = {
        "imaginary": "想象界",
        "symbolic": "象征界",
        "real": "实在界",
        "desire": "欲望",
        "lack": "欠缺",
        "jouissance": "原乐",
    }

    SUBJECT_TYPES = {
        "neurotic": {"name": "神经症主体", "emoji": "😶", "desc": "被象征秩序捕获的现代人。欲望着他者的欲望。"},
        "psychotic": {"name": "精神病主体", "emoji": "🌑", "desc": "与象征秩序断裂。父之名的除权弃绝。"},
        "pervert": {"name": "倒错主体", "emoji": "🎭", "desc": "双重否认阉割。把自己作为大他者享乐的工具。"},
        "hysteric": {"name": "歇斯底里主体", "emoji": "💃", "desc": "不断地质问大他者。欲望着他者的欲望。"},
    }

    def _get_subject_type(self, scores: Dict[str, int]) -> str:
        if scores["real"] >= 70:
            return "psychotic"
        elif scores["jouissance"] >= 70:
            return "pervert"
        elif scores["desire"] >= scores["lack"]:
            return "hysteric"
        else:
            return "neurotic"

    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)

        dim_scores = {}
        items_per_dim = 5
        for idx, dim in enumerate(self.dimensions):
            score = 0
            for i in range(1, items_per_dim + 1):
                q_num = idx * items_per_dim + i
                if q_num <= 28:
                    val = answer_map.get(q_num, 3)
                    score += val
            normalized = round((score / items_per_dim - 1) * 100 / 4)
            dim_scores[dim] = normalized

        subject_type = self._get_subject_type(dim_scores)
        config = self.SUBJECT_TYPES[subject_type]
        dominant = max(dim_scores.items(), key=lambda x: x[1])[0]

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
            overall_score=sum(dim_scores.values()) // len(self.dimensions),
            dimensions=dimensions,
            type_profile={
                "subject_type": subject_type,
                "type_name": config["name"],
                "type_emoji": config["emoji"],
                "dominant_order": self.DIMENSION_NAMES[dominant],
            },
            interpretation={
                "description": config["desc"],
                "lacanian_formula": self._get_formula(subject_type),
                "diagnosis": self._get_diagnosis(subject_type),
            },
            development_advice=self._get_advice(subject_type),
        )

    def _get_formula(self, subject_type: str) -> str:
        formulas = {
            "neurotic": "$ <> a 欲望的辩证法",
            "psychotic": "foreclosure of the Name-of-the-Father",
            "pervert": "fetishistic disavowal 拜物教式否认",
            "hysteric": "Why am I what you say I am?",
        }
        return formulas[subject_type]

    def _get_diagnosis(self, subject_type: str) -> List[str]:
        diagnoses = {
            "neurotic": ["你已经被象征秩序所捕获", "症状就是你的防御", "压抑是你的存在的基本", "你的欲望就是他者的欲望"],
            "psychotic": ["父之名的除权弃绝", "你活在实在界", "大他者不存在", "你与象征界断裂了"],
            "pervert": ["你知道，但你还是...", "倒错是对阉割的双重否认"],
            "hysteric": ["你欲望着他者的欲望", "你通过质问大他者来确证自己的存在"],
        }
        return diagnoses[subject_type]

    def _get_advice(self, subject_type: str) -> List[str]:
        advice = {
            "neurotic": ["穿越幻想", "不要认同你的症状", "这不是你的错", "欲望就是这个样子的。"],
            "psychotic": ["不要向大他者寻求保证", "你的疯狂也是一种答案", "安提戈涅是你的榜样", "坚持住！"],
            "pervert": ["不要把你的原乐献祭给大他者", "你不是大他者的工具"],
            "hysteric": ["继续质问大他者", "不要停下来，继续欲望！"],
        }
        return advice[subject_type]
