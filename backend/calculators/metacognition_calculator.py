# =============================================================================
#  元认知量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class MetacognitionCalculator(BaseCalculator):
    assessment_id = "metacognition-standard"
    assessment_name = "元认知量表"
    question_count = 48
    dimensions = ["planning", "monitoring", "evaluating", "debugging", "awareness", "regulation"]
    
    DIMENSION_NAMES = {
        "planning": "计划能力",
        "monitoring": "监控能力",
        "evaluating": "评估能力",
        "debugging": "调试能力",
        "awareness": "认知觉察",
        "regulation": "认知调节",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 8
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 4) for i in items)
            dimension_scores[dim] = score
        
        total_score = sum(dimension_scores.values())
        meta_score = round((total_score / (48 * 5)) * 100)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (items_per_dim * 5)) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        meta_level = self._get_meta_level(meta_score)
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=meta_score,
            dimensions=dimensions,
            interpretation={
                "meta_level": meta_level,
                "meta_score": meta_score,
            },
            strengths=self._get_strengths(meta_score),
            development_advice=self._get_advice(),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("metacognition-"):
                idx = int(key.replace("metacognition-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_meta_level(self, score: int) -> str:
        if score < 30:
            return "元认知待开发"
        elif score < 50:
            return "元认知基础水平"
        elif score < 70:
            return "元认知良好"
        elif score < 85:
            return "元认知优秀"
        else:
            return "元认知卓越"
    
    def _get_strengths(self, score: int) -> List[str]:
        strengths = []
        if score >= 60:
            strengths.extend([
                "能够觉察自己的思考过程",
                "懂得如何规划复杂任务",
                "善于从错误中学习调整",
            ])
        return strengths
    
    def _get_advice(self) -> List[str]:
        return [
            "🤔 三思而后行：行动前问「我为什么这么做？」",
            "📝 写思考日志：记录做对和做错时的思维过程",
            "🗣️ 出声思考：将内心的思考过程说出来",
            "🎯 暂停检查：中途停下来评估进度",
        ]
