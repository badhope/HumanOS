# =============================================================================
#  MBI 职业倦怠测评计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult
import numpy as np

class BurnoutCalculator(BaseCalculator):
    assessment_id = "burnout-mbi"
    assessment_name = "MBI 职业倦怠量表"
    question_count = 22
    dimensions = ["EE", "CY", "rPE"]
    
    DIMENSION_NAMES = {
        "EE": "情感耗竭 (Emotional Exhaustion)",
        "CY": "去人格化 (Cynicism)",
        "rPE": "个人成就感降低 (Reduced Personal Accomplishment)",
    }
    
    DIMENSION_ITEMS = {
        "EE": [1, 2, 3, 6, 8, 13, 14, 16, 20],
        "CY": [4, 5, 7, 10, 11, 15, 22],
        "rPE": [9, 12, 17, 18, 19, 21],
    }
    
    NORMS = {
        "EE": {"mean": 16.0, "std": 8.5, "high": 27, "moderate": 19},
        "CY": {"mean": 10.0, "std": 6.8, "high": 17, "moderate": 10},
        "rPE": {"mean": 30.0, "std": 6.5, "high": 33, "moderate": 25},
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        dimension_scores = {}
        
        for dim in self.dimensions:
            scores = []
            for item in self.DIMENSION_ITEMS[dim]:
                key = str(item)
                if key in answers:
                    scores.append(answers[key])
            
            raw = sum(scores) if scores else 0
            dimension_scores[dim] = raw
        
        dimensions = []
        for dim in self.dimensions:
            raw = dimension_scores[dim]
            norm = self.NORMS[dim]
            
            z = self._calculate_z_score(raw, norm["mean"], norm["std"])
            if dim == "rPE":
                percentile = min(99, max(1, round(50 - z * 15.87)))
            else:
                percentile = min(99, max(1, round(50 + z * 15.87)))
            
            level = self._get_burnout_level(dim, raw)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw,
                percentile=percentile,
                stanine=self._calculate_stanine(percentile),
                level=level,
                interpretation=self._get_dimension_interpretation(dim, raw, level),
                z_score=round(z, 3),
            ))
        
        burnout_level, burnout_type = self._get_overall_burnout(dimension_scores)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=round((dimension_scores["EE"] + dimension_scores["CY"]) / 2, 1),
            dimensions=dimensions,
            interpretation={
                "level": burnout_level,
                "type": burnout_type,
                "summary": self._get_summary(burnout_level, dimension_scores),
            },
            development_advice=self._get_intervention_advice(dimension_scores, burnout_level),
        )
    
    def _get_burnout_level(self, dim: str, raw: int) -> str:
        norm = self.NORMS[dim]
        if dim == "rPE":
            if raw <= norm["moderate"]:
                return "高风险"
            elif raw <= norm["high"]:
                return "中等风险"
            return "健康"
        else:
            if raw >= norm["high"]:
                return "高风险"
            elif raw >= norm["moderate"]:
                return "中等风险"
            return "健康"
    
    def _get_dimension_interpretation(self, dim: str, raw: int, level: str) -> str:
        if dim == "EE":
            if level == "高风险":
                return f"情感严重耗竭 ({raw}分)，工作让你身心俱疲，每天起床都感到无力"
            elif level == "中等风险":
                return f"情感出现耗竭迹象 ({raw}分)，需要注意休息调整"
            return f"情感能量充足 ({raw}分)，对工作保持热情"
        
        if dim == "CY":
            if level == "高风险":
                return f"严重去人格化 ({raw}分)，开始对工作对象变得冷漠麻木"
            elif level == "中等风险":
                return f"去人格化倾向 ({raw}分)，保持人际距离的倾向增加"
            return f"同理心在线 ({raw}分)，能够真诚对待他人"
        
        if level == "高风险":
            return f"个人成就感极低 ({raw}分)，怀疑自己的工作价值"
        elif level == "中等风险":
            return f"成就感不足 ({raw}分)，需要更多正反馈"
        return f"成就感充足 ({raw}分)，认可自己的工作价值"
    
    def _get_overall_burnout(self, scores: Dict[str, int]):
        ee_high = scores["EE"] >= self.NORMS["EE"]["high"]
        cy_high = scores["CY"] >= self.NORMS["CY"]["high"]
        rpe_low = scores["rPE"] <= self.NORMS["rPE"]["moderate"]
        
        risk_count = sum([ee_high, cy_high, rpe_low])
        
        if risk_count >= 2:
            if ee_high and cy_high:
                return "重度倦怠", "狂热型倦怠"
            if rpe_low and ee_high:
                return "重度倦怠", "能力耗竭型"
            return "重度倦怠", "混合型"
        elif risk_count == 1:
            if ee_high:
                return "中度倦怠", "情感耗竭为主"
            if cy_high:
                return "中度倦怠", "去人格化为主"
            return "中度倦怠", "成就感不足为主"
        else:
            return "健康状态", "职业状态良好"
    
    def _get_summary(self, level: str, scores: Dict[str, int]) -> str:
        ee, cy, rpe = scores["EE"], scores["CY"], scores["rPE"]
        
        if level == "重度倦怠":
            return (f"检测到重度职业倦怠风险。情感耗竭({ee})、去人格化({cy})、"
                    f"成就感({rpe})三个维度中至少两项亮红灯。强烈建议立即休息，"
                    f"考虑与专业人士或信任的朋友聊聊。")
        elif level == "中度倦怠":
            return "检测到中度倦怠风险，这是身体发出的警告信号。趁现在还来得及，立即调整工作节奏！"
        return "职业状态整体健康，请继续保持工作与生活的平衡。"
    
    def _get_intervention_advice(self, scores: Dict[str, int], level: str) -> List[str]:
        advice = []
        
        if scores["EE"] >= 19:
            advice.extend([
                "🔥 强制执行'无加班日'：每周至少2天准点下班",
                "🍀 设置工作邮箱定时关闭，睡前1小时不看工作消息",
                "🧘‍♀️ 5-4-3-2-1接地法：情绪崩溃时快速锚定当下",
            ])
        
        if scores["CY"] >= 10:
            advice.extend([
                "💝 每天做一件微小的善事，重建与他人的情感连接",
                "☕ '咖啡时间'规则：每周与1位不同的同事15分钟非工作聊天",
                "🎨 重新拾起一个与工作无关的兴趣爱好",
            ])
        
        if scores["rPE"] <= 25:
            advice.extend([
                "✅ '微小胜利'日志：每天记录3个哪怕微不足道的成就",
                "🎯 SMART目标拆解：把宏大愿景分解为可执行的小步骤",
                "🙏 停止与他人比较：你的成长曲线是独一无二的",
            ])
        
        if level == "重度倦怠":
            advice.extend([
                "🚑 强制休假：至少连续3天，完全脱离工作环境",
                "💬 寻求支持：不要独自承受，家人、朋友或心理咨询都可以",
            ])
        
        return advice
