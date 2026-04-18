# =============================================================================
#  所有测评计算器注册中心
# =============================================================================
from .base import BaseCalculator, CalculationResult, DimensionResult
from .bigfive_calculator import BigFiveCalculator
from .burnout_calculator import BurnoutCalculator
from .sas_calculator import SASCalculator
from .holland_calculator import HollandCalculator
from .dark_calculator import DarkTriadCalculator
from .eq_calculator import EQCalculator
from .ecr_calculator import ECRAttachmentCalculator
from .iq_calculator import RavensIQCalculator
from .ideology_calculator import Ideology9SquareCalculator
from .fubao_calculator import FubaoIndexCalculator
from .slacking_calculator import SlackingPurityCalculator
from .foodie_calculator import FoodieLevelCalculator
from .internet_calculator import InternetAddictionCalculator
from .life_meaning_calculator import LifeMeaningCalculator
from .patriotism_calculator import PatriotismPurityCalculator
from .sexual_calculator import SexualExperienceCalculator
from .gma_calculator import GMAMaturityCalculator
from .cast_calculator import CASTParentingCalculator
from .philo_calculator import PhiloSpectrumCalculator
from .bounty_calculator import OnePieceBountyCalculator
from .lacan_calculator import LacanDiagnosisCalculator
from .pua_calculator import PUAResistanceCalculator

CALCULATORS = {
    "ocean-bigfive": BigFiveCalculator,
    "burnout-mbi": BurnoutCalculator,
    "sas-standard": SASCalculator,
    "holland-sds": HollandCalculator,
    "dark-triad": DarkTriadCalculator,
    "eq-goleman": EQCalculator,
    "ecr-attachment": ECRAttachmentCalculator,
    "iq-ravens": RavensIQCalculator,
    "ideology-9square": Ideology9SquareCalculator,
    "fubao-index": FubaoIndexCalculator,
    "slacking-purity": SlackingPurityCalculator,
    "foodie-level": FoodieLevelCalculator,
    "internet-addiction": InternetAddictionCalculator,
    "life-meaning": LifeMeaningCalculator,
    "patriotism-purity": PatriotismPurityCalculator,
    "sexual-experience": SexualExperienceCalculator,
    "gma-maturity": GMAMaturityCalculator,
    "cast-parenting": CASTParentingCalculator,
    "philo-spectrum": PhiloSpectrumCalculator,
    "onepiece-bounty": OnePieceBountyCalculator,
    "lacan-diagnosis": LacanDiagnosisCalculator,
    "pua-resistance": PUAResistanceCalculator,
}

def get_calculator(assessment_id: str) -> BaseCalculator:
    """获取测评计算器实例"""
    calculator_class = CALCULATORS.get(assessment_id)
    if not calculator_class:
        raise ValueError(f"未知的测评类型: {assessment_id}")
    return calculator_class()

def list_calculators():
    """列出所有可用的测评计算器"""
    return [
        {
            "id": aid,
            "name": cls.assessment_name,
            "question_count": cls.question_count,
            "dimensions": cls.dimensions,
        }
        for aid, cls in CALCULATORS.items()
    ]

__all__ = [
    "BaseCalculator",
    "CalculationResult",
    "DimensionResult",
    "BigFiveCalculator",
    "BurnoutCalculator",
    "SASCalculator",
    "HollandCalculator",
    "DarkTriadCalculator",
    "EQCalculator",
    "ECRAttachmentCalculator",
    "RavensIQCalculator",
    "Ideology9SquareCalculator",
    "FubaoIndexCalculator",
    "get_calculator",
    "list_calculators",
    "CALCULATORS",
]
