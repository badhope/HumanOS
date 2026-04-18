# =============================================================================
#  数据分析 API 路由
# =============================================================================
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
import pandas as pd
import numpy as np
from typing import Dict, Any

from database.database import get_db
from database import models
from api.auth import get_current_user

router = APIRouter()

# =============================================================================
#  系统整体统计
# =============================================================================
@router.get("/system-overview", summary="系统数据概览")
async def get_system_overview(db: AsyncSession = Depends(get_db)):
    """获取系统整体数据统计"""
    total_users = await db.scalar(select(func.count(models.User.id)))
    total_assessments = await db.scalar(select(func.count(models.AssessmentResult.id)))
    
    assessment_counts = await db.execute(
        select(
            models.AssessmentResult.assessment_type_id,
            func.count(models.AssessmentResult.id).label("count")
        ).group_by(models.AssessmentResult.assessment_type_id)
    )
    
    return {
        "total_users": total_users,
        "total_assessments": total_assessments,
        "assessment_distribution": [
            {"type": aid, "count": count}
            for aid, count in assessment_counts.all()
        ],
    }

# =============================================================================
#  测评常模更新
# =============================================================================
@router.get("/norms/{assessment_id}", summary="获取测评常模数据")
async def get_assessment_norms(
    assessment_id: str,
    db: AsyncSession = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    """获取指定测评的常模统计数据"""
    results = await db.execute(
        select(models.AssessmentResult.scores).where(
            models.AssessmentResult.assessment_type_id == assessment_id
        )
    )
    
    all_scores = [r.scores for r in results.scalars().all() if r.scores]
    
    if not all_scores:
        raise HTTPException(status_code=404, detail="暂无足够数据")
    
    df = pd.DataFrame(all_scores)
    
    norms = {}
    for dim in df.columns:
        scores = df[dim].dropna()
        norms[dim] = {
            "sample_size": len(scores),
            "mean": round(np.mean(scores), 2),
            "std": round(np.std(scores), 2),
            "min": round(np.min(scores), 2),
            "max": round(np.max(scores), 2),
            "percentiles": {
                "p10": round(np.percentile(scores, 10), 2),
                "p25": round(np.percentile(scores, 25), 2),
                "p50": round(np.percentile(scores, 50), 2),
                "p75": round(np.percentile(scores, 75), 2),
                "p90": round(np.percentile(scores, 90), 2),
            },
        }
    
    return {
        "assessment_id": assessment_id,
        "total_samples": len(all_scores),
        "dimensions": norms,
    }

# =============================================================================
#  用户个人分析报告
# =============================================================================
@router.get("/user-report/{user_id}", summary="用户个人测评分析报告")
async def get_user_analytics_report(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """生成用户个人测评综合分析报告"""
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="无权查看")
    
    results = await db.execute(
        select(models.AssessmentResult).where(
            models.AssessmentResult.user_id == user_id
        ).order_by(models.AssessmentResult.created_at.desc())
    )
    
    user_results = results.scalars().all()
    
    return {
        "user_id": user_id,
        "total_assessments_completed": len(user_results),
        "assessment_types_completed": list({r.assessment_type_id for r in user_results}),
        "first_assessment_date": min(r.created_at for r in user_results) if user_results else None,
        "latest_assessment_date": max(r.created_at for r in user_results) if user_results else None,
    }
