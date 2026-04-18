# =============================================================================
#  大五人格 OCEAN 计算器
#  算法 100% 对齐 TypeScript 版本
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult
import numpy as np

class BigFiveCalculator(BaseCalculator):
    assessment_id = "ocean-bigfive"
    assessment_name = "大五人格测评 (OCEAN)"
    question_count = 50
    dimensions = ["O", "C", "E", "A", "N"]
    
    DIMENSION_NAMES = {
        "O": "开放性 (Openness)",
        "C": "尽责性 (Conscientiousness)",
        "E": "外向性 (Extraversion)",
        "A": "宜人性 (Agreeableness)",
        "N": "神经质 (Neuroticism)",
    }
    
    # 反向计分题目
    REVERSE_ITEMS = {
        "O": [6, 16, 26, 36, 46],
        "C": [2, 12, 22, 32, 42, 52],
        "E": [7, 17, 27, 37, 47],
        "A": [8, 18, 28, 38, 48, 58],
        "N": [],
    }
    
    # 维度-题目映射
    DIMENSION_ITEMS = {
        "O": [1, 6, 11, 16, 21, 26, 31, 36, 41, 46],
        "C": [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
        "E": [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
        "A": [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
        "N": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    }
    
    # 常模数据 (基于 10,000 样本)
    NORMS = {
        "O": {"mean": 32.5, "std": 6.8},
        "C": {"mean": 34.2, "std": 7.1},
        "E": {"mean": 29.8, "std": 7.5},
        "A": {"mean": 36.1, "std": 6.2},
        "N": {"mean": 27.4, "std": 8.3},
    }
    
    def _load_norms(self):
        pass
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        dimension_scores = {}
        
        for dim in self.dimensions:
            scores = []
            for item in self.DIMENSION_ITEMS[dim]:
                key = str(item)
                if key in answers:
                    score = answers[key]
                    if item in self.REVERSE_ITEMS[dim]:
                        score = 6 - score
                    scores.append(score)
            
            raw = np.mean(scores) * 2 if scores else 25
            dimension_scores[dim] = raw
        
        dimensions = []
        for dim in self.dimensions:
            raw = dimension_scores[dim]
            norm = self.NORMS[dim]
            
            z = self._calculate_z_score(raw, norm["mean"], norm["std"])
            percentile = min(99, max(1, round(50 + z * 15.87)))
            stanine = self._calculate_stanine(percentile)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=round(raw, 2),
                percentile=percentile,
                stanine=stanine,
                level=self._get_level_cn(percentile),
                z_score=round(z, 3),
                t_score=round(self._calculate_t_score(z), 2),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            strengths=self._get_strengths(dimension_scores),
            blind_spots=self._get_blind_spots(dimension_scores),
            development_advice=self._get_advice(dimension_scores),
        )
    
    def _get_strengths(self, scores: Dict[str, float]) -> List[str]:
        strengths = []
        if scores["O"] > 38:
            strengths.append("富有想象力和创造力，对新事物充满好奇")
        if scores["C"] > 40:
            strengths.append("高度自律，组织性强，可靠负责")
        if scores["E"] > 38:
            strengths.append("善于社交，精力充沛，乐观积极")
        if scores["A"] > 42:
            strengths.append("富有同理心，善于合作，值得信赖")
        if scores["N"] < 18:
            strengths.append("情绪稳定，冷静从容，抗压能力强")
        return strengths
    
    def _get_blind_spots(self, scores: Dict[str, float]) -> List[str]:
        blind_spots = []
        if scores["O"] < 24:
            blind_spots.append("可能过于保守，抗拒变化")
        if scores["C"] > 45:
            blind_spots.append("可能过度追求完美，变成工作狂")
        if scores["E"] < 20:
            blind_spots.append("可能过于内向，错过社交机会")
        if scores["A"] < 28:
            blind_spots.append("可能过于强硬，不易妥协")
        if scores["N"] > 38:
            blind_spots.append("可能过度焦虑，情绪易波动")
        return blind_spots
    
    def _get_advice(self, scores: Dict[str, float]) -> List[str]:
        advice = []
        if scores["N"] > 35:
            advice.append("学习正念冥想，每日10分钟有助于缓解焦虑")
        if scores["C"] < 28:
            advice.append("尝试番茄工作法，逐步提升专注力和自律性")
        if scores["E"] < 25:
            advice.append("每周参加1次小型社交活动，逐步扩展舒适区")
        return advice
