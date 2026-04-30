# =============================================================================
#  ABM 爱宠人格计算器
# =============================================================================
from typing import Dict, List
from .base import BaseCalculator, CalculationResult, DimensionResult

class ABMLoveAnimalCalculator(BaseCalculator):
    assessment_id = "abm-love-animal"
    assessment_name = "ABM 爱宠人格测试"
    question_count = 30
    dimensions = ["dog_type", "cat_type", "bird_type", "rabbit_type", "fish_type"]
    
    DIMENSION_NAMES = {
        "dog_type": "犬系人格",
        "cat_type": "猫系人格",
        "bird_type": "鸟系人格",
        "rabbit_type": "兔系人格",
        "fish_type": "鱼系人格",
    }
    
    def calculate(self, answers: Dict[str, int]) -> CalculationResult:
        answer_map = self._normalize_answers(answers)
        
        dimension_scores = {}
        items_per_dim = 6
        
        for idx, dim in enumerate(self.dimensions):
            start = idx * items_per_dim + 1
            items = list(range(start, start + items_per_dim))
            score = sum(answer_map.get(i, 3) for i in items)
            dimension_scores[dim] = score
        
        dominant_pet = max(dimension_scores.items(), key=lambda x: x[1])[0]
        
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
        
        return CalculationResult(
            assessment_id=self.assessment_id,
            assessment_name=self.assessment_name,
            overall_score=None,
            dimensions=dimensions,
            interpretation={
                "dominant_type": self.DIMENSION_NAMES[dominant_pet],
                "type_traits": self._get_traits(dominant_pet),
            },
            strengths=self._get_strengths(dominant_pet),
            development_advice=self._get_advice(dominant_pet),
        )
    
    def _normalize_answers(self, answers: Dict[str, int]) -> Dict[int, int]:
        normalized = {}
        for key, val in answers.items():
            if key.startswith("abm-"):
                idx = int(key.replace("abm-", ""))
            else:
                try:
                    idx = int(key)
                except:
                    continue
            normalized[idx] = val
        return normalized
    
    def _get_traits(self, pet_type: str) -> str:
        traits = {
            "dog_type": "忠诚热情，黏人可爱，对朋友一心一意",
            "cat_type": "独立高冷，傲娇迷人，有自己的精神世界",
            "bird_type": "活泼好动，话痨体质，自由奔放爱唱歌",
            "rabbit_type": "软萌温柔，胆小害羞，需要被好好呵护",
            "fish_type": "佛系淡定，优雅神秘，情绪稳定内心戏足",
        }
        return traits.get(pet_type, "混合萌系体质")
    
    def _get_strengths(self, pet_type: str) -> List[str]:
        strengths_map = {
            "dog_type": ["真诚热情", "忠诚可靠", "感染力强"],
            "cat_type": ["独立自信", "边界感强", "神秘迷人"],
            "bird_type": ["精力充沛", "乐观向上", "表达力强"],
            "rabbit_type": ["温柔体贴", "善解人意", "治愈能力"],
            "fish_type": ["冷静理性", "情绪稳定", "抗压能力"],
        }
        return strengths_map.get(pet_type, ["可爱爆表"])
    
    def _get_advice(self, pet_type: str) -> List[str]:
        advice = [
            "🐾 每种萌系体质都有独特的魅力",
            "💕 接纳并喜爱真实的自己",
            "🌈 人格是光谱，不是非此即彼的分类",
        ]
        return advice
