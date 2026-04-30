# =============================================================================
#  Kolb 学习风格量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class KolbLearningStyleCalculator(BaseCalculator):
    assessment_id = "kolb-standard"
    assessment_name = "Kolb 学习风格量表"
    question_count = 48
    dimensions = ["concrete_experience", "reflective_observation", "abstract_conceptualization", "active_experimentation"]
    
    DIMENSION_NAMES = {
        "concrete_experience": "具体经验",
        "reflective_observation": "反思观察",
        "abstract_conceptualization": "抽象概念",
        "active_experimentation": "主动实践",
    }
    
    DIMENSION_ITEMS = {
        "concrete_experience": list(range(1, 13)),
        "reflective_observation": list(range(13, 25)),
        "abstract_conceptualization": list(range(25, 37)),
        "active_experimentation": list(range(37, 49)),
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        
        for dim, items in self.DIMENSION_ITEMS.items():
            score = sum(answer_map.get(i, 3) for i in items)
            dimension_scores[dim] = score
        
        ac_ce = dimension_scores["abstract_conceptualization"] - dimension_scores["concrete_experience"]
        ae_ro = dimension_scores["active_experimentation"] - dimension_scores["reflective_observation"]
        
        learning_style = self._get_learning_style(ac_ce, ae_ro)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (12 * 5)) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_level_cn(percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            interpretation={
                "learning_style": learning_style,
                "style_description": self._get_style_description(learning_style),
                "ac_ce_axis": ac_ce,
                "ae_ro_axis": ae_ro,
            },
            strengths=self._get_strengths(learning_style),
            career_suggestions=self._get_career_suggestions(learning_style),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("kolb-"):
                idx = int(key.replace("kolb-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_learning_style(self, ac_ce: int, ae_ro: int) -> str:
        if ac_ce >= 0 and ae_ro >= 0:
            return "发散型"
        elif ac_ce < 0 and ae_ro >= 0:
            return "同化型"
        elif ac_ce < 0 and ae_ro < 0:
            return "聚合型"
        else:
            return "顺应型"
    
    def _get_style_description(self, style: str) -> str:
        descriptions = {
            "发散型": "善于从多角度思考，喜欢头脑风暴，擅长人际交往",
            "同化型": "善于归纳整理，构建理论模型，喜欢抽象思考",
            "聚合型": "擅长解决问题和决策，喜欢技术应用和实际操作",
            "顺应型": "动手能力强，喜欢冒险探索，善于执行计划",
        }
        return descriptions.get(style, "")
    
    def _get_strengths(self, style: str) -> List[str]:
        strengths_map = {
            "发散型": ["想象力丰富", "善于头脑风暴", "人际关系良好", "情感丰富"],
            "同化型": ["逻辑思维强", "善于归纳总结", "理论构建能力", "信息整合"],
            "聚合型": ["问题解决专家", "决策能力强", "技术应用", "目标导向"],
            "顺应型": ["行动力强", "适应变化快", "敢于冒险", "执行能力"],
        }
        return strengths_map.get(style, [])
    
    def _get_career_suggestions(self, style: str) -> List[str]:
        careers_map = {
            "发散型": ["人力资源", "市场营销", "艺术创作", "心理咨询"],
            "同化型": ["科学研究", "教育培训", "战略规划", "数据分析"],
            "聚合型": ["工程技术", "医学诊断", "金融分析", "项目管理"],
            "顺应型": ["创业管理", "销售业务", "活动策划", "现场执行"],
        }
        return careers_map.get(style, [])
