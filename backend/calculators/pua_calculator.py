# =============================================================================
#  🛡️ 反PUA能力测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class PUAResistanceCalculator(BaseCalculator):
    assessment_id = "pua-resistance"
    assessment_name = "反PUA能力测评"
    question_count = 25
    dimensions = ["self_esteem", "boundary", "critical_thinking", "emotional_independence", "social_support", "gaslighting_detection"]

    DIMENSION_NAMES = {
        "self_esteem": "自尊水平",
        "boundary": "边界意识",
        "critical_thinking": "批判性思维",
        "emotional_independence": "情感独立",
        "social_support": "社会支持",
        "gaslighting_detection": "煤气灯识别",
    }

    LEVELS = {
        "invincible": {"name": "PUA绝缘体", "emoji": "🛡️", "desc": "PUA对你来说就是小儿科。你一眼就能看穿，甚至还能反杀。"},
        "expert": {"name": "鉴渣达人", "emoji": "🔍", "desc": "普通的PUA根本近不了你的身。渣男渣女在你面前无所遁形。"},
        "aware": {"name": "清醒路人", "emoji": "🧠", "desc": "有基本的辨别能力。一开始可能会懵，但很快就能反应过来。"},
        "vulnerable": {"name": "危险危险", "emoji": "⚠️", "desc": "很容易被精神控制。小心！你是PUA的目标人群。"},
        "target": {"name": "高危人群", "emoji": "🎯", "desc": "PUA最佳人选。你简直就是行走的KP。求你了，谈恋爱之前先下载国家反诈APP。"},
    }

    def _get_level(self, score: int) -> str:
        if score >= 85:
            return "invincible"
        elif score >= 70:
            return "expert"
        elif score >= 50:
            return "aware"
        elif score >= 30:
            return "vulnerable"
        else:
            return "target"

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
        resistance_index = round(total / len(self.dimensions))
        level = self._get_level(resistance_index)
        config = self.LEVELS[level]
        weakest = min(dim_scores.items(), key=lambda x: x[1])[0]

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
            overall_score=resistance_index,
            dimensions=dimensions,
            type_profile={
                "level": level,
                "level_name": config["name"],
                "level_emoji": config["emoji"],
                "vulnerability": self._get_vulnerability(weakest),
            },
            interpretation={
                "description": config["desc"],
                "warning_signs": self._get_warning_signs(),
                "pua_tactics": self._get_tactics(),
            },
            development_advice=self._get_advice(level, weakest),
            strengths=self._get_strengths(dim_scores),
        )

    def _get_vulnerability(self, weakest: str) -> str:
        vulnerabilities = {
            "self_esteem": "自尊容易在自卑时被攻击",
            "boundary": "不拒绝别人的越界",
            "critical_thinking": "容易被话术洗脑",
            "emotional_independence": "感情用事上头了就智商下线",
            "social_support": "孤立无援的时候最危险",
            "gaslighting_detection": "被人卖了还帮着数钱",
        }
        return vulnerabilities[weakest]

    def _get_warning_signs(self) -> List[str]:
        return [
            "快速推进关系",
            "孤立你和朋友家人",
            "贬低打击你的自信",
            "让你觉得都是你的错",
            "冷热暴力交替",
        ]

    def _get_tactics(self) -> List[str]:
        return [
            "煤气灯操纵 - 让你怀疑自己的记忆",
            "冷热暴力 - 忽冷忽热让你患得患失",
            "贬低打击 - 摧毁你的自尊心",
            "三角测量 - 制造嫉妒和其他人比较",
            "情感轰炸 - 一开始的完美人设",
        ]

    def _get_strengths(self, scores: Dict[str, int]) -> List[str]:
        sorted_dims = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
        return [self.DIMENSION_NAMES[dim] for dim, _ in sorted_dims]

    def _get_advice(self, level: str, weakest: str) -> List[str]:
        base_advice = {
            "invincible": ["请出书教大家反PUA！", "保持你的清醒就是最好的保护", "遇到不对劲就跑"],
            "expert": ["继续保持你的火眼金睛", "可以教教身边的朋友", "相信你的直觉"],
            "aware": ["相信你的第六感", "不对劲就跑", "不要怀疑自己", "不舒服就是不舒服"],
            "vulnerable": ["多学习反PUA知识", "建立好自己的边界感", "凡是让你不舒服的关系都是错的"],
            "target": ["立刻下载国家反诈APP！", "你值得被好好对待", "不要在垃圾堆里找对象", "爱你的人不会让你怀疑自己"],
        }
        advice = base_advice[level]
        advice.append(f"重点提升：" + self.DIMENSION_NAMES[weakest])
        return advice
