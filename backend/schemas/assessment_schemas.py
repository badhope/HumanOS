# =============================================================================
#  测评系统数据验证模型
# =============================================================================
from pydantic import BaseModel, Field, validator
from typing import Dict, List, Optional, Any
from datetime import datetime

# =============================================================================
#  计算请求
# =============================================================================
class CalculationRequest(BaseModel):
    answers: Dict[str, int] = Field(..., description="题目答案映射 {question_id: score}")
    user_id: Optional[int] = Field(None, description="用户ID（可选）")
    session_id: Optional[str] = Field(None, description="会话ID")
    include_norm: bool = Field(True, description="是否包含常模对比")
    include_interpretation: bool = Field(True, description="是否生成解读")
    language: str = Field("zh", description="结果语言")
    
    @validator('answers')
    def answers_must_be_valid(cls, v):
        if not v:
            raise ValueError('答案不能为空')
        return v

# =============================================================================
#  维度得分
# =============================================================================
class DimensionScore(BaseModel):
    id: str
    name: str
    raw_score: float
    percentile: Optional[float] = None
    stanine: Optional[int] = None
    level: str = Field(..., description="等级: 低/中/高")
    interpretation: Optional[str] = None
    z_score: Optional[float] = None
    t_score: Optional[float] = None

# =============================================================================
#  计算响应
# =============================================================================
class CalculationResponse(BaseModel):
    assessment_id: str
    assessment_name: str
    overall_score: Optional[float] = None
    overall_percentile: Optional[float] = None
    dimensions: List[DimensionScore]
    type_profile: Optional[Dict[str, Any]] = None
    interpretation: Optional[Dict[str, Any]] = None
    career_suggestions: Optional[List[str]] = None
    development_advice: Optional[List[str]] = None
    strengths: Optional[List[str]] = None
    blind_spots: Optional[List[str]] = None
    norm_comparison: Optional[Dict[str, Any]] = None
    result_id: Optional[int] = None
    share_token: Optional[str] = None
    calculated_at: datetime = Field(default_factory=datetime.now)
    version: str = "2.5.0"
    source: str = "backend"
    server_time: Optional[int] = None
    processing_time_ms: Optional[float] = None
    result_hash: Optional[str] = None
    request_id: Optional[str] = None

# =============================================================================
#  测评元数据
# =============================================================================
class AssessmentInfo(BaseModel):
    id: str
    name: str
    category: str
    description: str
    question_count: int
    estimated_time_minutes: int
    reliability: Optional[float] = None
    sample_size: Optional[int] = None
    dimensions: List[Dict[str, str]]

# =============================================================================
#  历史记录
# =============================================================================
class AssessmentHistoryItem(BaseModel):
    id: int
    assessment_type_id: str
    assessment_name: str
    created_at: datetime
    overall_score: Optional[float]
    percentile: Optional[float]
    is_public: bool
    share_token: Optional[str]

# =============================================================================
#  常模数据
# =============================================================================
class NormInfo(BaseModel):
    assessment_id: str
    dimension: str
    sample_size: int
    mean: float
    std_dev: float
    version: str
    population: str
