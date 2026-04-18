# =============================================================================
#  🏴‍☠️ 海贼王赏金测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class OnePieceBountyCalculator(BaseCalculator):
    assessment_id = "onepiece-bounty"
    assessment_name = "海贼王赏金测评"
    question_count = 25
    dimensions = ["strength", "intelligence", "influence", "leadership", "luck", "willpower"]

    DIMENSION_NAMES = {
        "strength": "战斗力",
        "intelligence": "智谋",
        "influence": "影响力",
        "leadership": "领导力",
        "luck": "运气",
        "willpower": "意志力",
    }

    BOUNTY_RANKS = [
        {"rank": "四皇级", "min_bounty": 3000000000, "emoji": "👑", "title": "新世界的皇帝"},
        {"rank": "大将级", "min_bounty": 1500000000, "emoji": "⭐", "title": "海军本部最高战力"},
        {"rank": "七武海级", "min_bounty": 500000000, "emoji": "💀", "title": "世界政府公认的战力"},
        {"rank": "超新星级", "min_bounty": 100000000, "emoji": "🔥", "title": "最恶的世代"},
        {"rank": "海贼团干部", "min_bounty": 50000000, "emoji": "⚔️", "title": "出道即是5000万俱乐部"},
        {"rank": "新人海贼", "min_bounty": 10000000, "emoji": "🏴‍☠️", "title": "初出茅庐的菜鸟"},
        {"rank": "杂鱼", "min_bounty": 0, "emoji": "🐟", "title": "赏金500万的小角色"},
    ]

    def _calculate_bounty(self, scores: Dict[str, int]) -> int:
        base = sum(scores.values()) * 2000000
        luck_bonus = scores["luck"] * 500000
        will_multiplier = 1 + (scores["willpower"] / 100)
        return int((base + luck_bonus) * will_multiplier)

    def _get_rank(self, bounty: int) -> Dict:
        for rank in self.BOUNTY_RANKS:
            if bounty >= rank["min_bounty"]:
                return rank
        return self.BOUNTY_RANKS[-1]

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

        bounty = self._calculate_bounty(dim_scores)
        rank_info = self._get_rank(bounty)
        strongest = max(dim_scores.items(), key=lambda x: x[1])[0]

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
            overall_score=bounty,
            dimensions=dimensions,
            type_profile={
                "bounty": bounty,
                "bounty_display": f"{bounty:,}",
                "rank": rank_info["rank"],
                "rank_emoji": rank_info["emoji"],
                "title": rank_info["title"],
                "strongest_ability": self.DIMENSION_NAMES[strongest],
                "devil_fruit_type": self._get_devil_fruit(dim_scores),
            },
            interpretation={
                "crew_position": self._get_crew_position(dim_scores),
                "famous_line": self._get_famous_line(),
            },
            development_advice=self._get_advice(rank_info["rank"]),
        )

    def _get_devil_fruit(self, scores: Dict[str, int]) -> str:
        strongest = max(scores.items(), key=lambda x: x[1])[0]
        fruits = {
            "strength": "动物系 - 幻兽种",
            "intelligence": "超人系 - 脑脑果实",
            "influence": "霸王色霸气",
            "leadership": "超人系 - 领袖果实",
            "luck": "人人果实 - 主角形态",
            "willpower": "自然系 - 意志果实",
        }
        return fruits[strongest]

    def _get_crew_position(self, scores: Dict[str, int]) -> str:
        strongest = max(scores.items(), key=lambda x: x[1])[0]
        positions = {
            "strength": "战斗员",
            "intelligence": "参谋长",
            "influence": "外交官",
            "leadership": "船长",
            "luck": "吉祥物",
            "willpower": "副船长",
        }
        return positions[strongest]

    def _get_famous_line(self) -> List[str]:
        return [
            "我是要成为海贼王的男人！",
            "海贼王，我当定了！",
            "人的梦想，是不会结束的！",
            "死了的话，就到此为止了啊！",
        ]

    def _get_advice(self, rank: str) -> List[str]:
        return [
            f"你的赏金等级是【{rank}】！",
            "在伟大航路上继续前进吧！",
            "找到One Piece就在那里！",
            "不要忘记你的伙伴！",
        ]
