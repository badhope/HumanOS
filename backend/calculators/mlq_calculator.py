# =============================================================================
#  MLQ 生命意义感量表计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class MLQMeaningInLifeCalculator(BaseCalculator):
    assessment_id = "mlq-standard"
    assessment_name = "MLQ 生命意义感量表"
    question_count = 30
    dimensions = ["presence", "search"]
    
    DIMENSION_NAMES = {
        "presence": "意义拥有感",
        "search": "意义寻求感",
    }
    
    DIMENSION_ITEMS = {
        "presence": list(range(1, 16)),
        "search": list(range(16, 31)),
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        
        for dim, items in self.DIMENSION_ITEMS.items():
            score = sum(answer_map.get(i, 4) for i in items)
            dimension_scores[dim] = score
        
        presence_pct = round((dimension_scores["presence"] / (15 * 7)) * 100)
        search_pct = round((dimension_scores["search"] / (15 * 7)) * 100)
        
        meaning_profile = self._get_profile(presence_pct, search_pct)
        
        dimensions = []
        for dim, raw_score in dimension_scores.items():
            percentage = round((raw_score / (15 * 7)) * 100)
            
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
            overall_score=(presence_pct + search_pct) // 2,
            dimensions=dimensions,
            interpretation={
                "meaning_profile": meaning_profile,
                "profile_description": self._get_profile_description(meaning_profile),
            },
            development_advice=self._get_advice(meaning_profile),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("mlq-"):
                idx = int(key.replace("mlq-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_profile(self, presence: int, search: int) -> str:
        if presence >= 60 and search >= 60:
            return "充实探索型"
        elif presence >= 60 and search < 60:
            return "明确安住型"
        elif presence < 60 and search >= 60:
            return "追寻探索型"
        else:
            return "存在困惑型"
    
    def _get_profile_description(self, profile: str) -> str:
        descriptions = {
            "充实探索型": "既感受到生命的意义，又在不断探索更深层次的意义",
            "明确安住型": "对生命意义有清晰的认知，内心平和稳定",
            "追寻探索型": "正在积极寻找生命的意义，充满探索精神",
            "存在困惑型": "正在经历存在性的困惑，需要重新连接生命的意义",
        }
        return descriptions.get(profile, "")
    
    def _get_advice(self, profile: str) -> List[str]:
        advice_map = {
            "充实探索型": ["🌟 继续深度探索，尝试创造性表达", "🤝 将生命意义与服务他人结合"],
            "明确安住型": ["🎨 用艺术形式表达你理解的生命意义", "👥 成为他人的意义导师"],
            "追寻探索型": ["📚 阅读存在主义哲学和心理学著作", "🌍 参与志愿服务和公益活动"],
            "存在困惑型": ["🧘 进行正念冥想，连接内在自我", "💬 与信任的人进行深度对话", "🌱 从小事中寻找意义感"],
        }
        base = ["📝 每天记录三件有意义的小事", "🎯 设定符合价值观的短期目标"]
        return base + advice_map.get(profile, [])
