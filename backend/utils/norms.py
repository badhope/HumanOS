# =============================================================================
#  常模数据更新工具
# =============================================================================
import json
import numpy as np
import pandas as pd
from pathlib import Path
from typing import Dict, Any

NORM_DATA = {
    "ocean-bigfive": {
        "version": "2024",
        "sample_size": 10000,
        "population": "general",
        "dimensions": {
            "O": {"mean": 32.5, "std": 6.8, "percentiles": {
                "10": 24, "25": 28, "50": 32, "75": 37, "90": 41
            }},
            "C": {"mean": 34.2, "std": 7.1, "percentiles": {
                "10": 25, "25": 29, "50": 34, "75": 39, "90": 44
            }},
            "E": {"mean": 29.8, "std": 7.5, "percentiles": {
                "10": 20, "25": 24, "50": 30, "75": 35, "90": 40
            }},
            "A": {"mean": 36.1, "std": 6.2, "percentiles": {
                "10": 28, "25": 32, "50": 36, "75": 40, "90": 44
            }},
            "N": {"mean": 27.4, "std": 8.3, "percentiles": {
                "10": 17, "25": 21, "50": 27, "75": 33, "90": 38
            }},
        }
    },
    "burnout-mbi": {
        "version": "2024",
        "sample_size": 5000,
        "population": "working_adults",
        "dimensions": {
            "EE": {"mean": 16.0, "std": 8.5},
            "CY": {"mean": 10.0, "std": 6.8},
            "rPE": {"mean": 30.0, "std": 6.5},
        }
    },
    "sas-standard": {
        "version": "2024",
        "sample_size": 8000,
        "population": "general",
        "cutoff": 50,
    },
    "holland-sds": {
        "version": "2024",
        "sample_size": 6000,
        "population": "college_students",
    },
}


def load_norm_data(assessment_id: str) -> Dict[str, Any]:
    """加载常模数据"""
    return NORM_DATA.get(assessment_id, {})


def calculate_percentile(raw_score: float, mean: float, std: float) -> float:
    """计算百分位"""
    from scipy.stats import norm
    z = (raw_score - mean) / std if std > 0 else 0
    return round(norm.cdf(z) * 100, 1)


def generate_norm_report(assessment_id: str, scores: Dict[str, float]) -> Dict[str, Any]:
    """生成常模对比报告"""
    norm = load_norm_data(assessment_id)
    report = {
        "assessment_id": assessment_id,
        "norm_version": norm.get("version", "unknown"),
        "sample_size": norm.get("sample_size", 0),
        "population": norm.get("population", "general"),
        "comparison": {},
    }
    
    dim_norms = norm.get("dimensions", {})
    for dim, raw in scores.items():
        if dim in dim_norms:
            dn = dim_norms[dim]
            z = (raw - dn["mean"]) / dn["std"] if dn["std"] > 0 else 0
            report["comparison"][dim] = {
                "raw_score": raw,
                "norm_mean": dn["mean"],
                "norm_std": dn["std"],
                "z_score": round(z, 2),
                "percentile": calculate_percentile(raw, dn["mean"], dn["std"]),
                "sd_from_mean": f"{abs(round(z, 1))} SD",
            }
    
    return report
