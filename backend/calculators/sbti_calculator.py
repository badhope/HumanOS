# =============================================================================
#  SBTI 人格类型计算器 (简易MBTI)
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class SBTIPersonalityCalculator(BaseCalculator):
    assessment_id = "sbti-personality"
    assessment_name = "SBTI 简易人格类型量表"
    question_count = 40
    dimensions = ["extraversion", "sensing", "thinking", "judging"]
    
    DIMENSION_NAMES = {
        "extraversion": "能量倾向",
        "sensing": "信息获取",
        "thinking": "决策方式",
        "judging": "生活态度",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        e_score = sum(answer_map.get(i, 3) for i in range(1, 11))
        s_score = sum(answer_map.get(i, 3) for i in range(11, 21))
        t_score = sum(answer_map.get(i, 3) for i in range(21, 31))
        j_score = sum(answer_map.get(i, 3) for i in range(31, 41))
        
        dimension_scores = {
            "extraversion": e_score,
            "sensing": s_score,
            "thinking": t_score,
            "judging": j_score,
        }
        
        type_code = self._get_type_code(e_score, s_score, t_score, j_score)
        type_name = self._get_type_name(type_code)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / 50) * 100)
            
            dimensions.append(DimensionResult(
                dimension_id=dim,
                name=self.DIMENSION_NAMES[dim],
                raw_score=raw_score,
                percentile=percentage,
                level=self._get_preference(dim, percentage),
                stanine=self._calculate_stanine(percentage),
            ))
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            interpretation={
                "type_code": type_code,
                "type_name": type_name,
                "type_description": self._get_type_description(type_code),
            },
            type_profile={
                "code": type_code,
                "name": type_name,
                "dominant": self._get_dominant(type_code),
            },
            strengths=self._get_strengths(type_code),
            blind_spots=self._get_blind_spots(type_code),
            career_suggestions=self._get_careers(type_code),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("sbti-"):
                idx = int(key.replace("sbti-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_type_code(self, e: int, s: int, t: int, j: int) -> str:
        code = ""
        code += "E" if e >= 25 else "I"
        code += "S" if s >= 25 else "N"
        code += "T" if t >= 25 else "F"
        code += "J" if j >= 25 else "P"
        return code
    
    def _get_preference(self, dim: str, pct: int) -> str:
        pref_map = {
            "extraversion": ("I", "E"),
            "sensing": ("N", "S"),
            "thinking": ("F", "T"),
            "judging": ("P", "J"),
        }
        a, b = pref_map.get(dim, ("-", "-"))
        if pct < 35:
            return f"明显{a}"
        elif pct < 50:
            return f"轻微{a}"
        elif pct < 65:
            return f"轻微{b}"
        else:
            return f"明显{b}"
    
    def _get_type_name(self, code: str) -> str:
        names = {
            "INTJ": "建筑师", "INTP": "逻辑学家", "ENTJ": "指挥官", "ENTP": "辩论家",
            "INFJ": "提倡者", "INFP": "调停者", "ENFJ": "主人公", "ENFP": "竞选者",
            "ISTJ": "物流师", "ISFJ": "守卫者", "ESTJ": "总经理", "ESFJ": "执政官",
            "ISTP": "鉴赏家", "ISFP": "探险家", "ESTP": "企业家", "ESFP": "表演者",
        }
        return names.get(code, "探索者")
    
    def _get_type_description(self, code: str) -> str:
        desc = {
            "INTJ": "富有想象力和战略性思维的战略家，一切皆在计划之中",
            "INTP": "具有创新精神的发明家，对知识有着永不满足的渴望",
            "ENTJ": "大胆、富有想象力且意志强大的领导者",
            "INFJ": "安静而神秘，同时鼓舞人心且不知疲倦的理想主义者",
            "INFP": "诗意、善良的利他主义者，总是热情地为正当理由提供帮助",
            "ENFJ": "富有魅力且鼓舞人心的领导者，有迷人的影响力",
            "ENFP": "热情、有创造力、社交自由的人，总能找到微笑的理由",
            "ISTJ": "实际且注重事实的个人，可靠性不容怀疑",
            "ISFJ": "非常专注、热情的保护者，时刻准备着守护所爱之人",
            "ESTJ": "出色的管理者，在管理事物或人方面无与伦比",
            "ESFJ": "极有同情心、爱社交、受欢迎的人，总是热心帮助别人",
            "ISTP": "大胆而实际的实验家，擅长使用各种工具",
            "ISFP": "灵活有魅力的艺术家，时刻准备探索和体验新事物",
            "ESTP": "聪明、精力充沛、善于感知的人，真正享受生活在边缘",
            "ESFP": "自发的、精力充沛的表演者，生活在他们周围永不乏味",
        }
        return desc.get(code, "独特而富有魅力的人格")
    
    def _get_dominant(self, code: str) -> str:
        return code
    
    def _get_strengths(self, code: str) -> List[str]:
        if code[0] == "I":
            return ["深度思考能力", "专注持久", "独立工作"]
        else:
            return ["热情活力", "善于社交", "快速反应"]
    
    def _get_blind_spots(self, code: str) -> List[str]:
        if code[0] == "I":
            return ["可能忽视社交能量", "想法不易被发现"]
        else:
            return ["可能缺乏深度", "容易分心"]
    
    def _get_careers(self, code: str) -> List[str]:
        careers = {
            "NT": ["科学研究", "战略咨询", "系统架构"],
            "NF": ["心理咨询", "教育培训", "创意创作"],
            "SJ": ["行政管理", "金融财务", "医疗健康"],
            "SP": ["艺术设计", "运动竞技", "现场执行"],
        }
        key = code[1:3]
        return careers.get(key, ["专业发展", "持续成长"])
