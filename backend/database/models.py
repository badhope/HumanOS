# =============================================================================
#  数据库 ORM 模型定义
# =============================================================================
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import json

# =============================================================================
#  用户表
# =============================================================================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(200), nullable=False)
    nickname = Column(String(50))
    avatar = Column(String(200))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True))
    
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    
    total_assessments = Column(Integer, default=0)
    
    assessment_results = relationship("AssessmentResult", back_populates="user")
    
    def __repr__(self):
        return f"<User {self.username}>"

# =============================================================================
#  测评类型表
# =============================================================================
class AssessmentType(Base):
    __tablename__ = "assessment_types"

    id = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    description = Column(Text)
    
    question_count = Column(Integer, nullable=False)
    estimated_time = Column(Integer)
    
    dimensions = Column(JSON)
    scoring_algorithm = Column(String(100))
    
    sample_size = Column(Integer, default=0)
    reliability = Column(Float)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    results = relationship("AssessmentResult", back_populates="assessment_type")
    
    def __repr__(self):
        return f"<AssessmentType {self.id}>"

# =============================================================================
#  测评结果表
# =============================================================================
class AssessmentResult(Base):
    __tablename__ = "assessment_results"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    assessment_type_id = Column(String(50), ForeignKey("assessment_types.id"), nullable=False)
    
    answers = Column(JSON, nullable=False)
    scores = Column(JSON, nullable=False)
    dimensions = Column(JSON)
    interpretation = Column(JSON)
    
    overall_score = Column(Float)
    percentile = Column(Float)
    stanine = Column(Integer)
    
    time_spent = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    is_public = Column(Boolean, default=False)
    share_token = Column(String(32), unique=True)
    
    user = relationship("User", back_populates="assessment_results")
    assessment_type = relationship("AssessmentType", back_populates="results")
    
    def __repr__(self):
        return f"<AssessmentResult {self.assessment_type_id}>"

# =============================================================================
#  常模数据表
# =============================================================================
class NormData(Base):
    __tablename__ = "norm_data"

    id = Column(Integer, primary_key=True)
    assessment_type_id = Column(String(50), ForeignKey("assessment_types.id"), nullable=False)
    
    dimension = Column(String(100), nullable=False)
    
    sample_size = Column(Integer, default=0)
    mean = Column(Float, nullable=False)
    std_dev = Column(Float, nullable=False)
    median = Column(Float)
    
    percentiles = Column(JSON)
    
    min_score = Column(Float)
    max_score = Column(Float)
    
    population_group = Column(String(50), default="general")
    version = Column(String(20), default="2024")
    
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    __table_args__ = (
        dict(
            comment='各测评维度常模数据，用于计算百分位'
        ),
    )
    
    def get_percentile(self, raw_score: float) -> float:
        if self.percentiles:
            pcts = json.loads(self.percentiles) if isinstance(self.percentiles, str) else self.percentiles
            for pct, threshold in sorted(pcts.items(), key=lambda x: -float(x[0])):
                if raw_score >= threshold:
                    return float(pct)
        return 50.0

# =============================================================================
#  题目质量分析表
# =============================================================================
class ItemAnalysis(Base):
    __tablename__ = "item_analysis"

    id = Column(Integer, primary_key=True)
    assessment_type_id = Column(String(50), nullable=False)
    question_id = Column(Integer, nullable=False)
    
    difficulty = Column(Float)
    discrimination = Column(Float)
    response_times = Column(JSON)
    
    option_distribution = Column(JSON)
    
    total_responses = Column(Integer, default=0)
    
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# =============================================================================
#  测评会话表
# =============================================================================
class AssessmentSession(Base):
    __tablename__ = "assessment_sessions"

    id = Column(String(64), primary_key=True)
    assessment_type_id = Column(String(50), nullable=False)
    
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    last_activity = Column(DateTime(timezone=True), onupdate=func.now())
    
    current_question = Column(Integer, default=0)
    answers_so_far = Column(JSON, default=dict)
    
    is_completed = Column(Boolean, default=False)
    result_id = Column(Integer, ForeignKey("assessment_results.id"), nullable=True)
    
    ip_address = Column(String(45))
    user_agent = Column(String(200))
