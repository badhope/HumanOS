# =============================================================================
#  测评计算器基类
# =============================================================================
from abc import ABC, abstractmethod
from typing import Dict, List, Any, Optional
import numpy as np
from dataclasses import dataclass
from datetime import datetime

@dataclass
class DimensionResult:
    dimension_id: str
    name: str
    raw_score: float
    percentile: Optional[float] = None
    stanine: Optional[int] = None
    level: str = ""
    interpretation: str = ""
    z_score: Optional[float] = None
    t_score: Optional[float] = None

@dataclass
class CalculationResult:
    assessment_id: str
    assessment_name: str
    overall_score: Optional[float]
    dimensions: List[DimensionResult]
    type_profile: Optional[Dict[str, Any]] = None
    interpretation: Optional[Dict[str, Any]] = None
    career_suggestions: List[str] = None
    development_advice: List[str] = None
    strengths: List[str] = None
    blind_spots: List[str] = None
    norm_comparison: Optional[Dict[str, Any]] = None

    def __post_init__(self):
        if self.career_suggestions is None:
            self.career_suggestions = []
        if self.development_advice is None:
            self.development_advice = []
        if self.strengths is None:
            self.strengths = []
        if self.blind_spots is None:
            self.blind_spots = []


class BaseCalculator(ABC):
    """所有测评计算器的基类"""
    
    assessment_id: str = ""
    assessment_name: str = ""
    question_count: int = 0
    dimensions: List[str] = []
    
    def __init__(self):
        self._norm_data = {}
        self._load_norms()
    
    def _load_norms(self):
        """加载常模数据 - 子类可覆盖"""
        pass
    
    def _calculate_stanine(self, percentile: float) -> int:
        """将百分位转换为标准九分"""
        if percentile < 4:
            return 1
        elif percentile < 11:
            return 2
        elif percentile < 23:
            return 3
        elif percentile < 40:
            return 4
        elif percentile < 60:
            return 5
        elif percentile < 77:
            return 6
        elif percentile < 89:
            return 7
        elif percentile < 96:
            return 8
        else:
            return 9
    
    def _calculate_z_score(self, raw: float, mean: float, std: float) -> float:
        """计算Z分数"""
        if std == 0:
            return 0.0
        return (raw - mean) / std
    
    def _calculate_t_score(self, z_score: float) -> float:
        """计算T分数 (均值50, 标准差10)"""
        return 50 + z_score * 10
    
    def _get_level_cn(self, percentile: float) -> str:
        """获取中文等级描述"""
        if percentile < 15:
            return "低"
        elif percentile < 35:
            return "偏低"
        elif percentile < 65:
            return "中等"
        elif percentile < 85:
            return "偏高"
        else:
            return "高"
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        """标准化答案键名，支持带前缀和不带前缀的题号"""
        normalized = {}
        for key, val in answers.items():
            if isinstance(key, str) and "-" in key:
                parts = key.rsplit("-", 1)
                if len(parts) == 2 and parts[1].isdigit():
                    idx = int(parts[1])
                    normalized[idx] = val
                    continue
            try:
                idx = int(key)
                normalized[idx] = val
            except:
                continue
        return normalized
    
    @abstractmethod
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        """核心计算方法 - 子类必须实现"""
        pass
    
    def validate_answers(self, answers: Dict[str, int]) -> bool:
        """验证答案有效性"""
        if not answers:
            return False
        if len(answers) < self.question_count * 0.8:
            return False
        return True
    
    def __call__(self, answers: Dict[str, int], **kwargs) -> CalculationResult:
        if not self.validate_answers(answers):
            raise ValueError(f"答案无效或不完整: 需要{self.question_count}题")
        return self.calculate(answers)
