# =============================================================================
#  福报指数计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class FubaoIndexCalculator(BaseCalculator):
    assessment_id = "fubao-index"
    assessment_name = "福报指数测评"
    question_count = 30
    dimensions = ["overwork", "alienation", "cope_level"]
    
    DIMENSION_NAMES = {
        "overwork": "过度劳动",
        "alienation": "劳动异化",
        "cope_level": "应对水平",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dim_scores = {}
        for dim_idx, dim in enumerate(self.dimensions):
            score = 0
            for i in range(1, 11):
                q_num = dim_idx * 10 + i
                score += answer_map.get(q_num, 3)
            dim_scores[dim] = score
        
        fubao_score = round(dim_scores["overwork"] * 0.5 + dim_scores["alienation"] * 0.5)
        level = self._get_level(fubao_score)
        
        dimensions = []
        for dim, raw_score in dim_scores.items():
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=round((raw_score / 50) * 100),
                level=self._get_dimension_level(raw_score),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=fubao_score,
            dimensions=dimensions,
            type_profile={
                "fubao_level": level,
                "worker_type": self._get_worker_type(fubao_score),
                "burnout_risk": self._get_burnout_risk(fubao_score),
            },
            interpretation={
                "score_explanation": self._get_explanation(fubao_score),
            },
            development_advice=self._get_advice(fubao_score),
            strengths=self._get_strengths(fubao_score),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("fubao-"):
                idx = int(key.replace("fubao-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_level(self, score: int) -> str:
        if score < 60:
            return "福报入门"
        elif score < 80:
            return "福报中人"
        elif score < 100:
            return "福报深厚"
        else:
            return "福报齐天"
    
    def _get_dimension_level(self, score: int) -> str:
        if score < 20:
            return "轻度"
        elif score < 35:
            return "中度"
        else:
            return "重度"
    
    def _get_worker_type(self, score: int) -> str:
        types = [
            (50, "准点下班战士"),
            (70, "偶尔加班社畜"),
            (90, "996常驻人口"),
            (150, "007奋斗者"),
        ]
        for threshold, typ in types:
            if score < threshold:
                return typ
        return "狼性文化传承人"
    
    def _get_burnout_risk(self, score: int) -> str:
        if score < 60:
            return "低风险，请继续保持"
        elif score < 80:
            return "中风险，注意休息"
        else:
            return "高风险，强烈建议休息"
    
    def _get_explanation(self, score: int) -> str:
        explanations = [
            (60, "恭喜你，还没有被福报深度感染。你还保留着打工人的最后尊严。"),
            (80, "标准社畜水平。你已经熟练掌握了摸鱼和划水技巧来对抗福报。"),
            (100, "福报深厚。老板看了都感动，医生看了都摇头。"),
        ]
        for threshold, exp in explanations:
            if score < threshold:
                return exp
        return "福报齐天。你的奋斗感天动地，建议直接飞升。"
    
    def _get_strengths(self, score: int) -> List[str]:
        strengths = []
        if score < 60:
            strengths.extend([
                "边界感极强，到点就走",
                "摸鱼大师，工作生活平衡达人",
            ])
        elif score < 80:
            strengths.extend([
                "抗压能力出色",
                "摸鱼干活两不误",
            ])
        else:
            strengths.extend([
                "当代铁人，耐力惊人",
                "老板最爱员工",
            ])
        return strengths
    
    def _get_advice(self, score: int) -> List[str]:
        advice = [
            "💰 记住：公司是老板的，身体是自己的",
            "⏰ 加班不会让你发财，只会让老板买新车",
        ]
        
        if score >= 60:
            advice.extend([
                "🚪 到点就走，你的工作永远做不完",
                "📱 工作微信下班就关",
            ])
        
        if score >= 80:
            advice.extend([
                "🏥 每年体检，重点检查肝和心",
                "🤔 想想你到底在为谁奋斗",
            ])
        
        return advice
