# =============================================================================
#  瑞文标准推理测验计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class RavensIQCalculator(BaseCalculator):
    assessment_id = "iq-ravens"
    assessment_name = "瑞文标准推理测验"
    question_count = 60
    dimensions = ["fluid_intelligence"]
    
    ANSWER_KEY = {
        1: 4, 2: 5, 3: 1, 4: 2, 5: 6,
        6: 3, 7: 6, 8: 2, 9: 1, 10: 3,
        11: 5, 12: 4, 13: 3, 14: 6, 15: 2,
        16: 1, 17: 5, 18: 4, 19: 5, 20: 1,
        21: 2, 22: 6, 23: 3, 24: 4, 25: 2,
        26: 6, 27: 1, 28: 3, 29: 5, 30: 4,
        31: 6, 32: 1, 33: 2, 34: 4, 35: 3,
        36: 5, 37: 5, 38: 6, 39: 4, 40: 1,
        41: 2, 42: 1, 43: 3, 44: 5, 45: 6,
        46: 4, 47: 3, 48: 2, 49: 5, 50: 1,
        51: 2, 52: 6, 53: 4, 54: 1, 55: 3,
        56: 5, 57: 2, 58: 6, 59: 4, 60: 1,
    }
    
    IQ_NORMS = {
        0: 50, 10: 65, 20: 78, 30: 90, 35: 100,
        40: 108, 45: 115, 50: 125, 55: 135, 60: 145,
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        correct = 0
        for i in range(1, 61):
            if answer_map.get(i, 1) == self.ANSWER_KEY[i]:
                correct += 1
        
        iq_score = self._calculate_iq(correct)
        level = self._get_level(iq_score)
        
        dimensions = [
            DimensionResult(
                dimension_id="fluid_intelligence",
                name="流体智力",
                raw_score=correct,
                percentile=round((correct / 60) * 100),
                stanine=self._calculate_stanine(self._get_percentile(iq_score)),
                level=level,
            ),
        ]
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=iq_score,
            dimensions=dimensions,
            interpretation={
                "correct_count": correct,
                "total_questions": 60,
                "accuracy": round((correct / 60) * 100, 1),
                "iq_range": self._get_iq_range(iq_score),
            },
            development_advice=self._get_advice(iq_score),
            strengths=self._get_strengths(iq_score),
            career_suggestions=self._get_career_suggestions(iq_score),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("iq-"):
                idx = int(key.replace("iq-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _calculate_iq(self, correct: int) -> int:
        keys = sorted(self.IQ_NORMS.keys())
        for i in range(len(keys) - 1):
            if keys[i] <= correct < keys[i + 1]:
                ratio = (correct - keys[i]) / (keys[i + 1] - keys[i])
                return round(self.IQ_NORMS[keys[i]] + ratio * (self.IQ_NORMS[keys[i + 1]] - self.IQ_NORMS[keys[i]]))
        return 145 if correct >= 60 else 50
    
    def _get_percentile(self, iq: int) -> float:
        if iq < 70:
            return 2
        elif iq < 85:
            return 16
        elif iq < 100:
            return 50
        elif iq < 115:
            return 75
        elif iq < 130:
            return 97
        else:
            return 99.9
    
    def _get_level(self, iq: int) -> str:
        if iq < 70:
            return "临界"
        elif iq < 85:
            return "中下"
        elif iq < 115:
            return "中等"
        elif iq < 130:
            return "优秀"
        else:
            return "超常"
    
    def _get_iq_range(self, iq: int) -> str:
        if iq < 70:
            return "临界范围 (需要更多练习)"
        elif iq < 85:
            return "中下范围 (正常水平)"
        elif iq < 115:
            return "平均范围 (68%的人在此区间)"
        elif iq < 130:
            return "优秀范围 (前15%)"
        else:
            return "超常范围 (前2%)"
    
    def _get_strengths(self, iq: int) -> List[str]:
        strengths = ["抽象推理能力", "模式识别能力"]
        if iq >= 115:
            strengths.extend([
                "强大的逻辑推理和问题解决能力",
                "快速学习新知识的能力",
                "复杂系统的理解和建模能力",
            ])
        return strengths
    
    def _get_career_suggestions(self, iq: int) -> List[str]:
        if iq >= 130:
            return [
                "科学研究：基础学科的突破需要高智商",
                "软件工程：特别是算法和系统架构",
                "数量金融：高频交易和量化分析",
            ]
        elif iq >= 115:
            return [
                "数据科学和数据分析",
                "产品经理和战略咨询",
                "法律和医学等高认知要求行业",
            ]
        else:
            return [
                "智商不是成功的唯一决定因素",
                "情商和韧性在大多数职业中更重要",
                "选择你真正热爱和有天赋的领域",
            ]
    
    def _get_advice(self, iq: int) -> List[str]:
        advice = [
            "🧠 流体智力在30岁前可以通过训练提升",
            "🎮 双N-back训练已被证实可以提升工作记忆容量",
        ]
        
        if iq < 100:
            advice.extend([
                "📚 不要急，认知速度不代表认知深度",
                "💡 找到你的'慢热'优势所在，比如深度思考",
            ])
        
        if iq >= 120:
            advice.extend([
                "⚠️  高智商容易带来'过度思考'的副作用",
                "🤝 智商只是工具，不要让它成为你和人的壁垒",
            ])
        
        return advice
