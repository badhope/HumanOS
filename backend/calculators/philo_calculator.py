# =============================================================================
#  🧭 哲学光谱测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class PhiloSpectrumCalculator(BaseCalculator):
    assessment_id = "philo-spectrum"
    assessment_name = "哲学光谱测评"
    question_count = 30
    dimensions = ["existentialism", "utilitarianism", "stoicism", "nihilism", "idealism", "skepticism"]

    DIMENSION_NAMES = {
        "existentialism": "存在主义",
        "utilitarianism": "功利主义",
        "stoicism": "斯多葛",
        "nihilism": "虚无主义",
        "idealism": "唯心主义",
        "skepticism": "怀疑主义",
    }

    SCHOOLS = {
        "existentialism": {"name": "存在主义者", "emoji": "🌍", "representative": "萨特"},
        "utilitarianism": {"name": "功利主义者", "emoji": "⚖️", "representative": "边沁"},
        "stoicism": {"name": "斯多葛派", "emoji": "🏛️", "representative": "马可·奥勒留"},
        "nihilism": {"name": "虚无主义者", "emoji": "🌑", "representative": "尼采"},
        "idealism": {"name": "唯心主义者", "emoji": "💡", "representative": "柏拉图"},
        "skepticism": {"name": "怀疑主义者", "emoji": "❓", "representative": "休谟"},
    }

    def _get_primary_school(self, scores: Dict[str, int]) -> str:
        return max(scores.items(), key=lambda x: x[1])[0]

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

        primary = self._get_primary_school(dim_scores)
        secondary = sorted(dim_scores.items(), key=lambda x: x[1], reverse=True)[1][0]

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
                "primary_school": primary,
                "school_name": self.SCHOOLS[primary]["name"],
                "school_emoji": self.SCHOOLS[primary]["emoji"],
                "representative": self.SCHOOLS[primary]["representative"],
                "secondary_school": secondary,
                "secondary_name": self.SCHOOLS[secondary]["name"],
                "philosophy_profile": f"{self.SCHOOLS[primary]['name']} + {self.SCHOOLS[secondary]['name']}",
            },
            interpretation={
                "core_belief": self._get_core_belief(primary),
                "life_quote": self._get_quote(primary),
            },
            development_advice=self._get_advice(primary),
            strengths=self._get_strengths(primary),
            blind_spots=self._get_blind_spots(primary),
        )

    def _get_core_belief(self, school: str) -> str:
        beliefs = {
            "existentialism": "存在先于本质。你是你自己选择的那个人。",
            "utilitarianism": "最大多数人的最大幸福就是道德的标准。",
            "stoicism": "控制你能控制的，接受你不能控制的。",
            "nihilism": "上帝已死。没有什么是必须的，一切都是允许的。",
            "idealism": "世界是我的表象。心外无物。",
            "skepticism": "我只知道我一无所知。",
        }
        return beliefs[school]

    def _get_quote(self, school: str) -> str:
        quotes = {
            "existentialism": "人被判定为自由的。—— 萨特",
            "utilitarianism": "宁做不满足的人，不做满足的猪。—— 密尔",
            "stoicism": "不要要求事情像你希望的那样发生，而是像它们实际发生的那样发生。—— 爱比克泰德",
            "nihilism": "那些听不见音乐的人以为跳舞的人疯了。—— 尼采",
            "idealism": "未经审视的人生不值得过。—— 苏格拉底",
            "skepticism": "习惯是人生的伟大指南。—— 休谟",
        }
        return quotes[school]

    def _get_strengths(self, school: str) -> List[str]:
        return {
            "existentialism": ["绝对自由", "真诚", "勇于选择", "承担责任"],
            "utilitarianism": ["理性计算", "结果导向", "集体利益", "实用主义"],
            "stoicism": ["情绪稳定", "内心强大", "坚韧不拔"],
            "nihilism": ["解构一切", "重估价值", "不受束缚"],
            "idealism": ["理想主义", "精神追求", "相信精神世界丰富"],
            "skepticism": ["批判性思维", "不盲从", "保持怀疑精神"],
        }[school]

    def _get_blind_spots(self, school: str) -> List[str]:
        return {
            "existentialism": ["绝对自由带来绝对责任", "容易陷入焦虑", "选择困难"],
            "utilitarianism": ["正义问题", "少数人的权利", "计算冰冷"],
            "stoicism": ["过度压抑情绪", "可能变得冷漠", "接受不公正"],
            "nihilism": ["容易陷入虚无", "破坏之后怎么办", "意义真空"],
            "idealism": ["脱离现实", "可能变成空想", "忽视物质世界"],
            "skepticism": ["怀疑一切导致行动瘫痪", "没有确定性"],
        }[school]

    def _get_advice(self, school: str) -> List[str]:
        return {
            "existentialism": ["自由很沉重，但也很珍贵", "选择并承担", "真诚地活着", "不要逃避自由"],
            "utilitarianism": ["计算不是全部", "也要考虑正义", "不要忘了少数人"],
            "stoicism": ["接受不是懦弱", "愤怒也是有力量的", "偶尔也可以不那么理性"],
            "nihilism": ["破坏之后还要建设", "虚无之后还要创造意义", "重估一切价值包括你自己"],
            "idealism": ["理想也要落地", "精神也要面包都要", "知其不可而为之"],
            "skepticism": ["怀疑之后还要行动", "怀疑不是目的而是方法", "保持开放的心态"],
        }[school]
