# =============================================================================
#  🍜 吃货等级测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class FoodieLevelCalculator(BaseCalculator):
    assessment_id = "foodie-level"
    assessment_name = "吃货等级测评"
    question_count = 24
    dimensions = ["taste_sensitivity", "food_knowledge", "adventurous", "cooking_skill", "spending"]

    DIMENSION_NAMES = {
        "taste_sensitivity": "味觉灵敏度",
        "food_knowledge": "美食知识",
        "adventurous": "尝鲜精神",
        "cooking_skill": "烹饪技能",
        "spending": "美食消费",
    }

    LEVELS = {
        "god": {"name": "食神", "emoji": "👑", "desc": "在吃的领域，你就是神。天上飞的地上跑的水里游的，没有你不懂的美食。"},
        "master": {"name": "美食家", "emoji": "🍣", "desc": "专业级吃货。对吃有极高追求，一般的饭馆根本入不了你的法眼。"},
        "expert": {"name": "资深吃货", "emoji": "🍜", "desc": "吃遍大街小巷，哪里有好吃的哪里就有你。"},
        "normal": {"name": "普通吃货", "emoji": "🍔", "desc": "喜欢吃，也懂一点吃，但还不够专业。"},
        "beginner": {"name": "入门吃货", "emoji": "🍟", "desc": "刚踏上吃货这条不归路。"},
        "survivor": {"name": "生存型吃饭", "emoji": "🍞", "desc": "吃饭只是为了活着而已。"},
    }

    def _get_level(self, score: int) -> str:
        if score >= 90:
            return "god"
        elif score >= 75:
            return "master"
        elif score >= 60:
            return "expert"
        elif score >= 45:
            return "normal"
        elif score >= 25:
            return "beginner"
        else:
            return "survivor"

    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)

        dim_items = {
            "taste_sensitivity": list(range(1, 6)),
            "food_knowledge": list(range(6, 11)),
            "adventurous": list(range(11, 16)),
            "cooking_skill": list(range(16, 21)),
            "spending": list(range(21, 25)),
        }

        dim_scores = {}
        for dim, items in dim_items.items():
            score = 0
            for i in items:
                val = answer_map.get(i, 3)
                score += val
            normalized = round((score / len(items) - 1) * 100 / 4)
            dim_scores[dim] = normalized

        total = sum(dim_scores.values())
        foodie_index = round(total / len(dim_scores))
        level = self._get_level(foodie_index)
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
            overall_score=foodie_index,
            dimensions=dimensions,
            type_profile={
                "level": level,
                "level_name": config["name"],
                "level_emoji": config["emoji"],
            },
            interpretation={
                "description": config["desc"],
                "signature_dishes": self._get_signature_dishes(level),
                "foodie_mottos": self._get_mottos(),
            },
            development_advice=self._get_advice(level),
        )

    def _get_signature_dishes(self, level: str) -> List[str]:
        dishes = {
            "god": ["满汉全席", "分子料理", "米其林三星", "私房菜"],
            "master": ["日料OMAKASE", "法式大餐", "潮汕牛肉火锅"],
            "expert": ["小龙虾", "烧烤", "火锅", "日料"],
            "normal": ["外卖", "家常菜", "快餐"],
            "beginner": ["泡面", "速冻饺子", "外卖"],
            "survivor": ["泡面", "面包", "白开水"],
        }
        return dishes[level]

    def _get_mottos(self) -> List[str]:
        return [
            "人生苦短，再来一碗",
            "吃饱了才有力气减肥",
            "没有什么是一顿饭解决不了的",
            "如果有，那就两顿",
        ]

    def _get_advice(self, level: str) -> List[str]:
        return {
            "god": ["请受小弟一拜！", "继续保持食神的尊严", "多写点美食点评造福人类"],
            "master": ["可以考虑开个美食博客", "继续探索更多美食", "可以尝试自己开发新菜品"],
            "expert": ["继续吃遍大街小巷", "可以提升一下烹饪技能", "尝试一些更有挑战的美食"],
            "normal": ["吃货之路还很长", "多出去走走发现更多美食", "可以学一点烹饪技巧"],
            "beginner": ["欢迎加入吃货大家庭", "先从外卖开始你的吃货之旅", "多尝试不同的口味"],
            "survivor": ["兄弟，对自己好一点", "偶尔也吃点好的吧", "生活不止眼前的苟且，还有吃和远方"],
        }[level]
