# =============================================================================
#  成人依恋风格量表计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class ECRAttachmentCalculator(BaseCalculator):
    assessment_id = "ecr-attachment"
    assessment_name = "ECR成人依恋风格测评"
    question_count = 36
    dimensions = ["anxiety", "avoidance"]
    
    DIMENSION_NAMES = {
        "anxiety": "依恋焦虑",
        "avoidance": "依恋回避",
    }
    
    ATTACHMENT_STYLES = {
        "secure": "安全型",
        "preoccupied": "痴迷型",
        "dismissive": "疏离型",
        "fearful": "恐惧型",
    }
    
    REVERSE_ITEMS = [3, 11, 19, 22, 27, 31, 33, 35]
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        anxiety_items = list(range(1, 19))
        avoidance_items = list(range(19, 37))
        
        anxiety_score = 0
        for i in anxiety_items:
            val = answer_map.get(i, 3)
            if i in self.REVERSE_ITEMS:
                val = 8 - val
            anxiety_score += val
        
        avoidance_score = 0
        for i in avoidance_items:
            val = answer_map.get(i, 3)
            if i in self.REVERSE_ITEMS:
                val = 8 - val
            avoidance_score += val
        
        anxiety_avg = anxiety_score / 18
        avoidance_avg = avoidance_score / 18
        
        style = self._get_style(anxiety_avg, avoidance_avg)
        
        dimensions = [
            DimensionResult(
                dimension_id="anxiety",
                name="依恋焦虑",
                raw_score=anxiety_score,
                percentile=round(anxiety_avg / 7 * 100),
                level=self._get_dimension_level(anxiety_avg),
            ),
            DimensionResult(
                dimension_id="avoidance",
                name="依恋回避",
                raw_score=avoidance_score,
                percentile=round(avoidance_avg / 7 * 100),
                level=self._get_dimension_level(avoidance_avg),
            ),
        ]
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=round((anxiety_avg + avoidance_avg) / 2 * 10),
            dimensions=dimensions,
            type_profile={
                "attachment_style": style,
                "style_name": self.ATTACHMENT_STYLES[style],
                "anxiety_score": anxiety_avg,
                "avoidance_score": avoidance_avg,
                "quadrant": self._get_quadrant(style),
            },
            interpretation={
                "style_description": self._get_description(style),
                "relationship_patterns": self._get_relationship_patterns(style),
            },
            development_advice=self._get_advice(style),
            career_suggestions=self._get_career_suggestions(style),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("ecr-"):
                idx = int(key.replace("ecr-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_style(self, anxiety: float, avoidance: float) -> str:
        mid = 3.5
        if anxiety < mid and avoidance < mid:
            return "secure"
        elif anxiety >= mid and avoidance < mid:
            return "preoccupied"
        elif anxiety < mid and avoidance >= mid:
            return "dismissive"
        else:
            return "fearful"
    
    def _get_quadrant(self, style: str) -> str:
        quadrants = {
            "secure": "低焦虑 × 低回避",
            "preoccupied": "高焦虑 × 低回避",
            "dismissive": "低焦虑 × 高回避",
            "fearful": "高焦虑 × 高回避",
        }
        return quadrants[style]
    
    def _get_dimension_level(self, avg: float) -> str:
        if avg < 2.5:
            return "低度"
        elif avg < 4.5:
            return "中度"
        else:
            return "高度"
    
    def _get_description(self, style: str) -> str:
        descriptions = {
            "secure": "你拥有最健康的依恋模式。你相信自己是值得被爱的，也相信他人是可靠的。能够在亲密关系中舒适地依赖他人，也享受独立的空间。",
            "preoccupied": "你渴望深度的亲密，但内心深处常常担心对方是不是真的爱你。需要通过不断确认来获得安全感，容易在关系中感到焦虑。",
            "dismissive": "独立对你来说是最重要的。你倾向于回避亲密，习惯情感上的隔离。表面上看起来不在乎关系，但其实是用独立来保护自己。",
            "fearful": "你既渴望亲密，又害怕受伤。想要靠近，但当别人真的靠近时你又会退缩。这是最痛苦的依恋模式，源于曾经的伤害。",
        }
        return descriptions[style]
    
    def _get_relationship_patterns(self, style: str) -> List[str]:
        patterns = {
            "secure": ["稳定持久的亲密关系", "良好的冲突解决能力", "能够适度依赖和独立"],
            "preoccupied": ["过度理想化伴侣", "害怕被抛弃", "情绪起伏较大"],
            "dismissive": ["回避深度情感承诺", "过于强调独立", "关系中保持距离"],
            "fearful": ["推拉式的关系模式", "既渴望又害怕亲密", "容易被渣吸引"],
        }
        return patterns[style]
    
    def _get_career_suggestions(self, style: str) -> List[str]:
        careers = {
            "secure": ["需要团队协作的工作", "人力资源", "心理咨询"],
            "preoccupied": ["创造性工作，把情绪变成作品", "艺术创作", "内容创作"],
            "dismissive": ["独立完成的技术工作", "科研", "远程自由职业"],
            "fearful": ["从低人际的工作开始", "逐步建立安全感", "远程工作是好选择"],
        }
        return careers[style]
    
    def _get_advice(self, style: str) -> List[str]:
        advice = {
            "secure": [
                "❤️ 保持这份幸运，你的安全基地会感染身边的人",
                "🌟 可以成为朋友的依恋安全港",
            ],
            "preoccupied": [
                "🧘 停止'读心术'，直接问：你是怎么想的？",
                "🎯 把注意力从对方身上收回到自己的生活",
                "💝 练习：我值得被爱，不因为我做了什么",
            ],
            "dismissive": [
                "🤝 尝试一次脆弱的暴露，你会发现天不会塌",
                "💔 承认需要关系不是软弱，是人之常情",
                "🛡️  独立很好，但它不应该是逃避亲密的盾牌",
            ],
            "fearful": [
                "🌱 先从安全的关系开始练习，比如一个靠谱的朋友",
                "😢 那个曾经受伤的小孩需要被看见和安慰",
                "⚡ 想要逃的时候，试着多停留3分钟",
            ],
        }
        return advice[style]
