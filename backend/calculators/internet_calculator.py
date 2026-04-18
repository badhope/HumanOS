# =============================================================================
#  📱 网瘾程度测评 - 后端计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult


class InternetAddictionCalculator(BaseCalculator):
    assessment_id = "internet-addiction"
    assessment_name = "网瘾程度测评"
    question_count = 28
    dimensions = ["usage_time", "withdrawal", "tolerance", "impulse_control", "social_impact", "sleep_impact"]

    DIMENSION_NAMES = {
        "usage_time": "使用时长",
        "withdrawal": "戒断反应",
        "tolerance": "耐受性",
        "impulse_control": "冲动控制",
        "social_impact": "社交影响",
        "sleep_impact": "睡眠影响",
    }

    LEVELS = {
        "extreme": {"name": "终极网瘾", "emoji": "☠️", "desc": "你已经是人界互联网的化身。没有手机你活不过三天。建议直接植入芯片变成赛博格。"},
        "severe": {"name": "重度网瘾", "emoji": "📱", "desc": "手机就是你的外置器官。吃饭睡觉上厕所都要带着，没带就心慌。"},
        "moderate": {"name": "中度网瘾", "emoji": "🤳", "desc": "典型的现代互联网居民。每天大部分时间都在线，但还能离线一会儿。"},
        "mild": {"name": "轻度网瘾", "emoji": "💬", "desc": "上网是日常，但还在可控范围内。偶尔也能放下手机享受生活。"},
        "minimal": {"name": "轻度网民", "emoji": "🌐", "desc": "互联网只是工具，对你来说生活才是最重要的。"},
        "unplugged": {"name": "原始人", "emoji": "🏕️", "desc": "你确定你生活在21世纪？网瘾是什么？能吃吗？"},
    }

    def _get_level(self, score: int) -> str:
        if score >= 90:
            return "extreme"
        elif score >= 75:
            return "severe"
        elif score >= 55:
            return "moderate"
        elif score >= 35:
            return "mild"
        elif score >= 20:
            return "minimal"
        else:
            return "unplugged"

    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)

        dim_scores = {}
        items_per_dim = 5
        for idx, dim in enumerate(self.dimensions):
            score = 0
            for i in range(1, items_per_dim + 1):
                q_num = idx * items_per_dim + i
                if q_num <= self.question_count:
                    val = answer_map.get(q_num, 3)
                    score += val
            normalized = round((score / items_per_dim - 1) * 100 / 4)
            dim_scores[dim] = normalized

        total = sum(dim_scores.values())
        addiction_index = round(total / len(self.dimensions))
        level = self._get_level(addiction_index)
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
            overall_score=addiction_index,
            dimensions=dimensions,
            type_profile={
                "level": level,
                "level_name": config["name"],
                "level_emoji": config["emoji"],
                "digital_detox_urgency": self._get_detox_urgency(level),
            },
            interpretation={
                "description": config["desc"],
                "addiction_symptoms": self._get_symptoms(addiction_index),
            },
            development_advice=self._get_advice(level),
        )

    def _get_detox_urgency(self, level: str) -> str:
        return {
            "extreme": "🚨 极度紧急 - 请立即断网治疗",
            "severe": "⚠️ 非常紧急 - 建议马上开始数字排毒",
            "moderate": "🔶 需要注意 - 可以开始控制上网时间",
            "mild": "✅ 问题不大 - 保持现状即可",
            "minimal": "✨ 状态良好 - 继续保持",
            "unplugged": "🌟 令人羡慕 - 继续你的离线生活",
        }[level]

    def _get_symptoms(self, score: int) -> List[str]:
        symptoms = []
        if score >= 70:
            symptoms.extend(["睡前刷手机刷到失眠", "吃饭的时候必须看视频", "找不到手机就心慌"])
        if score >= 50:
            symptoms.extend(["每隔5分钟就要看一下微信", "上厕所必须带手机", "起床第一件事就是摸手机"])
        if score >= 30:
            symptoms.extend(["每天使用手机超过5小时", "能打字就绝不打电话", "WIFI比吃饭更重要"])
        return symptoms or ["你真的是这个时代的一股清流"]

    def _get_advice(self, level: str) -> List[str]:
        return {
            "extreme": ["建议立即进行数字排毒", "每天强制断网2小时", "培养一些离线的兴趣爱好", "考虑把手机换成老人机"],
            "severe": ["设置手机使用时间限制", "睡前一小时不要玩手机", "多和朋友面对面交流", "运动是戒网瘾的好方法"],
            "moderate": ["可以适当减少上网时间", "尝试手机不在身边的感觉", "周末可以安排一些户外活动"],
            "mild": ["继续保持健康的上网习惯", "上网也要注意休息眼睛", "多利用互联网学习新东西"],
            "minimal": ["你的上网习惯很健康", "继续保持这种平衡", "可以适当利用互联网提升自己"],
            "unplugged": ["太厉害了！请受我一拜", "教教大家怎么戒掉网瘾吧", "继续享受你的离线人生"],
        }[level]
