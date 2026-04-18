# =============================================================================
#  国家模拟引擎 - 状态数据模型
#  与前端 TypeScript 类型 1:1 精确映射
# =============================================================================
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Literal, Union
import hashlib
import json


# =============================================================================
#  基础枚举类型
# =============================================================================
DifficultyLevel = Literal["tutorial", "easy", "normal", "hard", "nightmare"]
GameStatus = Literal["running", "victory", "defeat"]
CommodityCategory = Literal["raw", "industrial", "consumer", "luxury"]
BuildingType = Literal["production", "infrastructure", "service", "military"]
PriceTrend = Literal["rising", "falling", "stable"]
RegionType = Literal["west", "east", "europe", "americas", "asia", "africa"]
CountryId = Literal["usa", "china", "germany", "japan", "france", "uk", "russia", "india", "brazil", "southkorea"]


# =============================================================================
#  商品与市场
# =============================================================================
class Commodity(BaseModel):
    id: str
    name: str
    icon: str
    category: CommodityCategory
    basePrice: float
    elasticity: float
    minPrice: float
    maxPrice: float
    weightPerUnit: float
    volumePerUnit: float


class MarketItem(BaseModel):
    supply: float
    demand: float
    stock: float
    price: float
    priceTrend: PriceTrend
    priceHistory: List[float]


MarketState = Dict[str, MarketItem]


# =============================================================================
#  人口与建筑
# =============================================================================
class PopGroup(BaseModel):
    id: str
    name: str
    size: int
    income: float
    wealth: float
    consumption: Dict[str, float]
    needs: Dict[str, float]
    standardOfLiving: float
    approval: float
    literacy: float


class Building(BaseModel):
    id: str
    name: str
    type: BuildingType
    level: int
    workers: int
    maxWorkers: int
    inputs: Dict[str, float]
    outputs: Dict[str, float]
    operatingCosts: float
    profitability: float
    isActive: bool
    efficiency: float


# =============================================================================
#  财政与国家统计
# =============================================================================
class TaxRates(BaseModel):
    income: float
    trade: float
    luxury: float
    land: float


class Subsidies(BaseModel):
    agriculture: float
    industry: float
    poor: float


class Treasury(BaseModel):
    gold: float
    income: float
    expenses: float
    balance: float
    taxes: TaxRates
    subsidies: Subsidies
    debt: float
    interestRate: float


class NationalStats(BaseModel):
    population: int
    gdp: float
    gdpPerCapita: float
    inflation: float
    unemployment: float
    stability: float
    legitimacy: float
    bureaucracy: float
    infrastructure: float
    education: float
    health: float
    military: float


# =============================================================================
#  国家精神与Modifier
# =============================================================================
class SpiritEffect(BaseModel):
    type: str
    value: float
    description: str


class NationalSpirit(BaseModel):
    id: str
    name: str
    icon: str
    description: str
    effects: List[SpiritEffect]
    isDebuff: Optional[bool] = None


class Modifier(BaseModel):
    id: str
    name: str
    value: float
    duration: int
    source: str


class Policy(BaseModel):
    id: str
    name: str
    category: str
    isActive: bool
    effects: List[SpiritEffect]


class Law(BaseModel):
    id: str
    name: str
    category: str
    enacted: bool
    effects: List[SpiritEffect]


class GameDate(BaseModel):
    year: int
    month: int
    day: int


class GameEndCondition(BaseModel):
    type: Literal["victory", "defeat"]
    name: str
    description: str
    icon: str


# =============================================================================
#  国家定义
# =============================================================================
class CountryBonuses(BaseModel):
    production: float
    research: float
    stability: float
    populationGrowth: float
    taxEfficiency: float


class StartingDate(BaseModel):
    year: int
    month: int
    day: int


class InitialStats(BaseModel):
    population: int
    gdp: float
    inflation: float
    unemployment: float
    stability: float
    treasury: float
    debt: float


class Country(BaseModel):
    id: str
    name: str
    flag: str
    region: RegionType
    difficulty: Literal[1, 2, 3, 4, 5]
    description: str
    politicalSystem: Optional[str] = None
    startingDate: StartingDate
    spirits: List[NationalSpirit]
    initialStats: InitialStats
    taxRates: TaxRates
    bonuses: CountryBonuses
    uniqueMechanics: List[str]
    startingSituation: str


# =============================================================================
#  核心游戏状态
# =============================================================================
class EconomyState(BaseModel):
    """与前端 TypeScript 1:1 精确映射"""
    countryId: Optional[CountryId] = None
    date: GameDate = GameDate(year=2024, month=1, day=1)
    day: int = 0
    tick: int = 0
    speed: Literal[1, 2, 5, 10] = 1
    difficulty: DifficultyLevel = "normal"
    
    gameStatus: GameStatus = "running"
    endCondition: Optional[GameEndCondition] = None
    
    commodities: Dict[str, Commodity] = {}
    market: MarketState = {}
    pops: List[PopGroup] = []
    buildings: List[Building] = []
    industries: Dict[str, dict] = {}
    treasury: Treasury = Treasury(
        gold=1000000, income=50000, expenses=40000, balance=10000,
        taxes=TaxRates(income=0.25, trade=0.1, luxury=0.3, land=0.05),
        subsidies=Subsidies(agriculture=0.1, industry=0.05, poor=0.02),
        debt=500000, interestRate=0.05
    )
    stats: NationalStats = NationalStats(
        population=1400000000, gdp=18000000, gdpPerCapita=12857,
        inflation=2.5, unemployment=5.2, stability=75, legitimacy=80,
        bureaucracy=60, infrastructure=70, education=65, health=72, military=85
    )
    
    nationalSpirits: List[NationalSpirit] = []
    modifiers: List[Modifier] = []
    policies: List[Policy] = []
    laws: List[Law] = []
    
    politicalCapital: int = 100
    dailyPoliticalGain: int = 1

    class Config:
        extra = "ignore"


# =============================================================================
#  游戏会话与状态工具
# =============================================================================
class GameSession(BaseModel):
    session_id: str
    player_id: str
    created_at: int
    last_tick_at: int
    state: EconomyState
    is_async_computing: bool = False
    target_speed: int = 1


class TickRequest(BaseModel):
    steps: int = 1
    state: Optional[dict] = None
    state_hash: Optional[str] = None


class TickResponse(BaseModel):
    session_id: str
    tick: int
    new_state_hash: str
    state_diff: dict
    processing_time_ms: float
    server_time: int


def calculate_state_hash(state: Union[EconomyState, dict]) -> str:
    """计算游戏状态哈希，用于前后端一致性校验"""
    if isinstance(state, EconomyState):
        state_dict = state.model_dump()
    else:
        state_dict = state
    
    exclude_fields = {"processing_time_ms", "server_time", "source"}
    clean_state = {k: v for k, v in state_dict.items() if k not in exclude_fields}
    
    sorted_str = json.dumps(clean_state, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(sorted_str.encode("utf-8")).hexdigest()[:16]


def compute_state_diff(old_state: dict, new_state: dict) -> dict:
    """计算两个状态的增量diff，只传输变化的字段，大幅减少网络流量"""
    diff = {}
    
    for key in new_state:
        if key not in old_state:
            diff[key] = new_state[key]
        elif isinstance(new_state[key], (int, float, str, bool)) and old_state[key] != new_state[key]:
            diff[key] = new_state[key]
        elif isinstance(new_state[key], dict):
            nested_diff = compute_state_diff(old_state.get(key, {}), new_state[key])
            if nested_diff:
                diff[key] = nested_diff
    
    return diff
