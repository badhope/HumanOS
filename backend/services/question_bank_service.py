# =============================================================================
#  高性能题库服务 - 支持百万级题目
# =============================================================================
from typing import List, Dict, Any, Optional, Set
from dataclasses import dataclass, field
from collections import defaultdict
import logging
import math

from database.cache import cached, memory_cache, make_hash_key

logger = logging.getLogger(__name__)

@dataclass
class Question:
    id: str
    text: str
    options: List[str]
    dimension: str
    reverse_score: bool = False
    weight: float = 1.0
    difficulty: float = 0.5
    discrimination: float = 0.5

@dataclass
class QuestionBank:
    id: str
    name: str
    version: str
    dimensions: Set[str] = field(default_factory=set)
    questions: List[Question] = field(default_factory=list)
    dimension_index: Dict[str, List[int]] = field(default_factory=lambda: defaultdict(list))
    difficulty_index: Dict[float, List[int]] = field(default_factory=lambda: defaultdict(list))

    def build_indexes(self) -> None:
        for idx, q in enumerate(self.questions):
            self.dimension_index[q.dimension].append(idx)
            difficulty_bin = round(q.difficulty * 10) / 10
            self.difficulty_index[difficulty_bin].append(idx)
        
        self.dimensions = set(self.dimension_index.keys())

    def get_questions_by_dimension(self, dimension: str) -> List[Question]:
        return [self.questions[idx] for idx in self.dimension_index.get(dimension, [])]

    def sample_questions(
        self,
        count: int,
        dimension_filter: Optional[Set[str]] = None,
        difficulty_range: Optional[tuple[float, float]] = None,
        stratified: bool = True,
    ) -> List[Question]:
        candidate_indices = list(range(len(self.questions)))

        if dimension_filter:
            candidate_indices = [
                idx for idx in candidate_indices
                if self.questions[idx].dimension in dimension_filter
            ]

        if difficulty_range:
            min_d, max_d = difficulty_range
            candidate_indices = [
                idx for idx in candidate_indices
                if min_d <= self.questions[idx].difficulty <= max_d
            ]

        if not stratified or not dimension_filter:
            import random
            random.shuffle(candidate_indices)
            return [self.questions[idx] for idx in candidate_indices[:count]]

        per_dimension = math.ceil(count / len(dimension_filter))
        result = []
        
        for dim in dimension_filter:
            dim_indices = [idx for idx in candidate_indices if self.questions[idx].dimension == dim]
            import random
            random.shuffle(dim_indices)
            result.extend([self.questions[idx] for idx in dim_indices[:per_dimension]])

        return result[:count]

class QuestionBankManager:
    def __init__(self):
        self.banks: Dict[str, QuestionBank] = {}
        self.meta_index: Dict[str, Dict[str, Any]] = {}
        self._load_all_banks()

    def _load_all_banks(self) -> None:
        from calculators import list_calculators
        
        for calc_info in list_calculators():
            bank_id = calc_info["id"]
            
            calc = self._load_bank_from_calculator(bank_id)
            if calc:
                self.banks[bank_id] = calc
                calc.build_indexes()
                
                self.meta_index[bank_id] = {
                    "question_count": len(calc.questions),
                    "dimensions": sorted(calc.dimensions),
                    "version": calc.version,
                    "name": calc.name,
                }
        
        logger.info(f"✅ 题库服务初始化完成，共加载 {len(self.banks)} 个题库")

    def _load_bank_from_calculator(self, calculator_id: str) -> Optional[QuestionBank]:
        try:
            from calculators import get_calculator
            calc = get_calculator(calculator_id)
            
            if not hasattr(calc, 'questions'):
                return None
            
            bank = QuestionBank(
                id=calculator_id,
                name=getattr(calc, 'name', calculator_id),
                version=getattr(calc, 'version', '1.0.0'),
            )
            
            for idx, q in enumerate(calc.questions):
                question = Question(
                    id=f"{calculator_id}:{idx}",
                    text=q.get('text', ''),
                    options=q.get('options', []),
                    dimension=q.get('dimension', 'general'),
                    reverse_score=q.get('reverseScore', False),
                    weight=q.get('weight', 1.0),
                )
                bank.questions.append(question)
            
            return bank
        except Exception as e:
            logger.warning(f"加载题库失败 {calculator_id}: {e}")
            return None

    @cached(ttl=3600, key_prefix="bank", cache_type="memory")
    def get_bank_meta(self, bank_id: str) -> Optional[Dict[str, Any]]:
        return self.meta_index.get(bank_id)

    @cached(ttl=7200, key_prefix="bank", cache_type="tiered")
    def get_bank(self, bank_id: str) -> Optional[QuestionBank]:
        return self.banks.get(bank_id)

    def list_banks(self) -> List[Dict[str, Any]]:
        return list(self.meta_index.values())

    @cached(ttl=1800, key_prefix="sampling", cache_type="memory")
    def sample_questions(
        self,
        bank_id: str,
        count: int,
        dimensions: Optional[List[str]] = None,
        seed: Optional[int] = None,
    ) -> List[Dict[str, Any]]:
        bank = self.get_bank(bank_id)
        if not bank:
            return []

        if seed:
            import random
            random.seed(seed)

        questions = bank.sample_questions(
            count=count,
            dimension_filter=set(dimensions) if dimensions else None,
        )

        return [
            {
                "id": q.id,
                "text": q.text,
                "options": q.options,
                "dimension": q.dimension,
            }
            for q in questions
        ]

    def search_questions(
        self,
        bank_id: str,
        keyword: str,
        limit: int = 50,
    ) -> List[Dict[str, Any]]:
        bank = self.get_bank(bank_id)
        if not bank:
            return []

        keyword = keyword.lower()
        results = []
        
        for q in bank.questions:
            if keyword in q.text.lower():
                results.append({
                    "id": q.id,
                    "text": q.text,
                    "dimension": q.dimension,
                })
                if len(results) >= limit:
                    break

        return results

question_bank_manager = QuestionBankManager()
