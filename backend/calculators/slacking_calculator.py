# =============================================================================
#  🐟 摸鱼纯度测评 - 后端计算器
# =============================================================================
from typing import Dict, List, Any
from .base import BaseCalculator, CalculationResult, DimensionResult


class SlackingPurityCalculator(BaseCalculator):
    assessment_id = "slacking-purity"
    assessment_name = "摸鱼纯度测评"
    question_count = 25
    dimensions = ["meeting_evading", "pretend_working", "toilet_escape", "overtime_resistance", "gossip_expert"]

    DIMENSION_NAMES = {
        "meeting_evading": "逃会技巧",
        "pretend_working": "假装工作",
        "toilet_escape": "厕所遁术",
        "overtime_resistance": "反加班",
        "gossip_expert": "八卦专家",
    }

    CLASSIFICATIONS = {
        "god": {"name": "摸鱼之神", "emoji": "🐟", "desc": "公司就是我的带薪拉屎场所。一天工作10分钟，剩下7小时50分全在摸鱼，老板还觉得你很努力。"},
        "master": {"name": "摸鱼大师", "emoji": "🎣", "desc": "摸鱼界的扛把子。带薪拉屎一小时，老板路过我还在敲键盘。"},
        "normal": {"name": "正常摸鱼", "emoji": "🦥", "desc": "该干活干活，该摸鱼摸鱼。劳逸结合，不卷不躺。"},
        "worker": {"name": "老实人", "emoji": "🐮", "desc": "老板说什么就做什么，叫加班就加班。摸鱼是什么？能吃吗？"},
        "slave": {"name": "社畜本畜", "emoji": "💪", "desc": "卷王本王。别人摸鱼我工作，别人下班我加班。老板的好员工，同事的眼中钉。"},
    }

    SLACKING_QUOTES = [
        "上班不摸鱼，不如回家卖鱼",
        "工作是为了摸鱼，摸鱼才是正经事",
        "只要我摸鱼摸得够快，焦虑就追不上我",
        "摸鱼一时爽，一直摸鱼一直爽",
        "带薪拉屎是打工人最后的倔强",
    ]

    def _get_classification(self, index: int) -> str:
        if index >= 85:
            return "god"
        elif index >= 65:
            return "master"
        elif index >= 45:
            return "normal"
        elif index >= 25:
            return "worker"
        else:
            return "slave"

    def _get_dimension_description(self, dim: str, score: int) -> str:
        descriptions = {
            "meeting_evading": {
                80: "开会永远不在工位，电话永远接不通",
                50: "能不参加的会绝不参加",
                25: "尽量少开会，但躲不过的也没办法",
                0: "开会积极分子，每次必到还抢着发言",
            },
            "pretend_working": {
                80: "老板路过我永远在高速敲键盘",
                50: "表面工作做得很到位",
                25: "偶尔会假装很忙",
                0: "摸鱼太明显，老板已经看你不爽了",
            },
            "toilet_escape": {
                80: "带薪拉屎王者，一次40分钟起步",
                50: "厕所是我第二个家",
                25: "每天上几次厕所放空一下",
                0: "直肠子，5分钟解决战斗",
            },
            "overtime_resistance": {
                80: "到点就走，谁叫加班都不好使",
                50: "没事绝不加班，有事尽量早点走",
                25: "实在没办法才会加一下班",
                0: "主动加班，还劝同事一起卷",
            },
            "gossip_expert": {
                80: "全公司的瓜都逃不过我的耳朵",
                50: "八卦信息站，啥都知道一点",
                25: "偶尔参与一下办公室八卦",
                0: "两耳不闻窗外事，一心只想写代码",
            },
        }
        for threshold in [80, 50, 25, 0]:
            if score >= threshold:
                return descriptions[dim][threshold]
        return descriptions[dim][0]

    def _get_slacking_rank(self, classification: str) -> str:
        ranks = {
            "god": "🐟 摸鱼等级：SSS级 摸鱼之神",
            "master": "🎣 摸鱼等级：S级 摸鱼大师",
            "normal": "🦥 摸鱼等级：A级 普通摸鱼人",
            "worker": "🐮 摸鱼等级：C级 老实人",
            "slave": "💪 摸鱼等级：E级 卷王本王",
        }
        return ranks[classification]

    def _get_anti996_level(self, index: int) -> str:
        if index >= 80:
            return "革命级 - 996？不存在的"
        elif index >= 60:
            return "斗士级 - 坚决维护8小时工作制"
        elif index >= 40:
            return "温和级 - 尽量不加班"
        elif index >= 20:
            return "妥协级 - 偶尔加一下也没办法"
        else:
            return "顺从级 - 加班是福报"

    def _get_tips(self, classification: str) -> List[str]:
        tips = {
            "god": [
                "你的摸鱼技巧已臻化境，请收徒！",
                "继续保持，老板永远不会发现",
                "记得偶尔还是要表现一下很忙的样子",
            ],
            "master": [
                "摸鱼大师，继续精进！",
                "可以考虑向摸鱼之神进阶",
                "注意不要太过得意忘形",
            ],
            "normal": [
                "劳逸结合是最好的工作方式",
                "可以适当提高摸鱼技巧",
                "保持现状就很好了",
            ],
            "worker": [
                "老实人容易吃亏",
                "学一点摸鱼技巧对身体好",
                "该摸鱼时就摸鱼",
            ],
            "slave": [
                "卷王，请停下你的内卷",
                "给同事们留条活路吧",
                "摸鱼有益身心健康",
            ],
        }
        return tips[classification]

    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)

        dim_items = {
            "meeting_evading": list(range(1, 6)),
            "pretend_working": list(range(6, 11)),
            "toilet_escape": list(range(11, 16)),
            "overtime_resistance": list(range(16, 21)),
            "gossip_expert": list(range(21, 26)),
        }

        dim_scores = {}
        for dim, items in dim_items.items():
            score = 0
            for i in items:
                val = answer_map.get(i, 3)
                score += val
            normalized = round((score / len(items) - 1) * 100 / 4)
            dim_scores[dim] = normalized

        raw_score = sum(dim_scores.values())
        slacking_index = round(raw_score / 5)
        classification = self._get_classification(slacking_index)
        config = self.CLASSIFICATIONS[classification]

        dimension_descriptions = {}
        for dim, score in dim_scores.items():
            dimension_descriptions[dim] = self._get_dimension_description(dim, score)

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
            overall_score=slacking_index,
            dimensions=dimensions,
            type_profile={
                "classification": classification,
                "classification_name": config["name"],
                "classification_emoji": config["emoji"],
                "slacking_rank": self._get_slacking_rank(classification),
                "anti996_level": self._get_anti996_level(slacking_index),
            },
            interpretation={
                "description": config["desc"],
                "dimension_descriptions": dimension_descriptions,
                "slacking_quotes": self.SLACKING_QUOTES,
            },
            development_advice=self._get_tips(classification),
        )
