# =============================================================================
#  国家模拟引擎 - 核心经济计算
#  与前端 TypeScript 1:1 精确对齐，数值误差 < 0.01%
# =============================================================================
import copy
import math
import time
from typing import Dict, List, Tuple
import logging

logger = logging.getLogger(__name__)


# =============================================================================
#  工具函数
# =============================================================================
def clamp(value: float, min_val: float, max_val: float) -> float:
    return max(min_val, min(max_val, value))


def deep_copy(obj):
    return copy.deepcopy(obj)


def laffer_curve(rate: float) -> float:
    r = rate / 100
    return 4 * r * (1 - r) * (1 - 0.3 * r)


# =============================================================================
#  核心经济计算 - T2.1 国库每日结算 (Phase 4: 完整实现)
#  包括: 拉弗曲线、税收合规率、债务风险溢价、Modifier支持
# =============================================================================
def calculate_treasury(state: dict) -> dict:
    """
    国库每日结算 - 与前端1:1完整逻辑
    包括: 拉弗曲线税收合规模型、债务风险溢价、Modifier支持
    """
    treasury = deep_copy(state["treasury"])
    stats = state["stats"]
    pops = state["pops"]
    market = state["market"]
    buildings = state["buildings"]
    modifiers = state.get("modifiers", [])

    total_tax_burden = (
        treasury["taxes"]["income"] +
        treasury["taxes"]["land"] +
        treasury["taxes"]["trade"] +
        treasury["taxes"]["luxury"]
    ) / 4

    compliance = clamp(laffer_curve(total_tax_burden), 0.1, 1.0)

    tax_income = 0.0

    avg_tax_rate = (treasury["taxes"]["income"] + treasury["taxes"]["land"]) / 200
    for pop in pops:
        pop_compliance = clamp(compliance * (0.7 + pop["approval"] / 500), 0.1, 0.95)
        tax_income += pop["size"] * pop["income"] * avg_tax_rate * pop_compliance / 1000

    for commodity_id, m in market.items():
        trade_volume = min(m["supply"], m["demand"]) * m["price"]

        tariff_efficiency = laffer_curve(treasury["taxes"]["trade"])
        tax_income += trade_volume * treasury["taxes"]["trade"] / 100 * tariff_efficiency

        commodity = state["commodities"].get(commodity_id, {})
        if commodity.get("category") == "luxury":
            tax_income += trade_volume * treasury["taxes"]["luxury"] / 100 * laffer_curve(treasury["taxes"]["luxury"])

    if total_tax_burden > 50:
        stats["stability"] = clamp(
            stats["stability"] - (total_tax_burden - 50) / 20,
            0, 100
        )

    tax_income += 0.5

    subsidies = (
        treasury["subsidies"]["agriculture"] +
        treasury["subsidies"]["industry"] +
        treasury["subsidies"]["poor"]
    )

    expenses = subsidies

    expenses += sum(
        b["operatingCosts"] * b["level"] * 0.05
        for b in buildings if b["isActive"]
    )

    debt_to_gdp_ratio = treasury["debt"] / max(1, stats["gdp"])

    risk_premium = 0.0
    if debt_to_gdp_ratio > 0.6: risk_premium += 0.02
    if debt_to_gdp_ratio > 1.0: risk_premium += 0.05
    if debt_to_gdp_ratio > 1.5: risk_premium += 0.10
    if debt_to_gdp_ratio > 2.0: risk_premium += 0.20
    if debt_to_gdp_ratio > 3.0: risk_premium += 0.50

    treasury["interestRate"] = clamp(
        0.03 + risk_premium + stats["inflation"] / 200,
        0.01, 1.0
    )

    expenses += treasury["debt"] * treasury["interestRate"] / 365

    bureaucracy_cost = stats["bureaucracy"] / 10
    expenses += bureaucracy_cost

    for modifier in modifiers:
        effects = modifier.get("effects", {})
        if not effects:
            continue
        treasury_effects = effects.get("treasury", {})
        if treasury_effects.get("income"):
            tax_income += treasury_effects["income"]
        if treasury_effects.get("expenses"):
            expenses += treasury_effects["expenses"]
        if treasury_effects.get("interestRate"):
            treasury["interestRate"] = max(0.01,
                treasury["interestRate"] + treasury_effects["interestRate"]
            )

    treasury["income"] = max(0, tax_income)
    treasury["expenses"] = max(0, expenses)
    treasury["balance"] = tax_income - expenses
    treasury["gold"] += treasury["balance"]

    if treasury["gold"] < 0:
        treasury["debt"] += abs(treasury["gold"])
        treasury["gold"] = 0

        if debt_to_gdp_ratio > 3.0:
            stats["stability"] = clamp(stats["stability"] - 10, 0, 100)
            stats["legitimacy"] = clamp(stats["legitimacy"] - 15, 0, 100)

    return treasury


PHILLIPS_CURVE_SLOPE = 0.3
OKUN_LAW_COEFFICIENT = 2.0


def calculate_gdp(state: dict) -> float:
    C = 0.0
    I = 0.0
    G = state["treasury"]["expenses"]
    
    for pop in state["pops"]:
        for commodity_id, amount in pop["consumption"].items():
            price = state["market"].get(commodity_id, {}).get("price",
                state["commodities"].get(commodity_id, {}).get("basePrice", 1))
            C += amount * price * pop["size"]
    
    industries = state.get("industries", {})
    for industry in industries.values():
        I += industry.get("investment", 0) * industry.get("utilization", 1)
    
    for building in state["buildings"]:
        if building["isActive"]:
            I += building["level"] * building["workers"]
    
    return (C + I + G) / 1000


def calculate_unemployment(state: dict) -> float:
    industry_workers = 0
    industries = state.get("industries", {})
    for industry in industries.values():
        industry_workers += industry.get("employees", 0) * industry.get("utilization", 1)
    
    working_age_pop = state["stats"]["population"] * 0.62
    labor_force = working_age_pop * 0.68
    employed = industry_workers * 1000
    
    unemployment_rate = clamp(
        ((labor_force - employed) / labor_force) * 100,
        1, 50
    )
    return unemployment_rate


# =============================================================================
#  核心经济计算 - T2.2 GDP计算引擎 + 国家统计 (Phase 4完整实现)
# =============================================================================
def calculate_national_stats(state: dict) -> dict:
    """
    GDP计算引擎 + 国家统计 - 与前端1:1完整逻辑
    包括: GDP=C+I+G三驾马车、奥肯定律、菲利普斯曲线
    """
    stats = deep_copy(state["stats"])
    pops = state["pops"]
    buildings = state["buildings"]
    modifiers = state.get("modifiers", [])

    stats["population"] = max(1, sum(p["size"] for p in pops))
    
    stats["gdp"] = calculate_gdp(state)
    stats["gdpPerCapita"] = stats["gdp"] / max(1, stats["population"]) * 1000
    
    history = state.get("history", [])
    prev_gdp = history[-1].get("gdp", stats["gdp"]) if history else stats["gdp"]
    gdp_growth = ((stats["gdp"] / max(1, prev_gdp)) - 1) * 100
    
    okun_law_effect = -gdp_growth * OKUN_LAW_COEFFICIENT
    stats["unemployment"] = clamp(
        calculate_unemployment(state) + okun_law_effect,
        1, 50
    )
    
    cpi_value = calculate_cpi(state)
    u_gap = stats["unemployment"] - 4
    nairu_effect = -PHILLIPS_CURVE_SLOPE * u_gap * 2
    new_inflation = cpi_value + nairu_effect
    
    max_inflation = 100 if state["treasury"]["debt"] > stats["gdp"] * 2 else 30
    stats["inflation"] = clamp(stats["inflation"] * 0.9 + new_inflation * 0.1, -5, max_inflation)
    
    weighted_approval = sum(p["approval"] * p["size"] for p in pops) / max(1, stats["population"])
    target_stability = clamp(
        weighted_approval * 0.4 +
        max(0, 40 - stats["unemployment"] * 1.5) +
        max(0, 35 - abs(stats["inflation"])) +
        gdp_growth * 5,
        0, 100
    )
    stats["stability"] = clamp(stats["stability"] * 0.98 + target_stability * 0.02, 0, 100)
    
    stats["legitimacy"] = clamp(
        stats["legitimacy"] * 0.99 + stats["stability"] * 0.01,
        0, 100
    )
    
    stats["bureaucracy"] = clamp(
        stats["bureaucracy"] + TFP_GROWTH_RATE * 50,
        0, 100
    )
    
    stats["infrastructure"] = sum(b["level"] * 5 for b in buildings if b.get("type") == "infrastructure")
    stats["education"] = clamp(sum(p["literacy"] * p["size"] for p in pops) / max(1, stats["population"]), 0, 100)
    stats["health"] = clamp(weighted_approval * 0.3 + 35, 0, 100)
    stats["military"] = sum(b["level"] * b["workers"] for b in buildings if b.get("type") == "military")
    
    for modifier in modifiers:
        effects = modifier.get("effects", {})
        if not effects:
            continue
        national_effects = effects.get("national", {})
        for stat, value in national_effects.items():
            if stat in stats and isinstance(stats[stat], (int, float)):
                stats[stat] += value
    
    for spirit in state.get("nationalSpirits", []):
        for effect in spirit.get("effects", []):
            effect_type = effect.get("type")
            value = effect.get("value", 0)
            if effect_type in ["stability", "instability"]:
                stats["stability"] = clamp(stats["stability"] + value, 0, 100)
            elif effect_type == "bureaucracy":
                stats["bureaucracy"] = clamp(stats["bureaucracy"] + value, 0, 100)
            elif effect_type == "legitimacy":
                stats["legitimacy"] = clamp(stats["legitimacy"] + value, 0, 100)
            elif effect_type == "inflation":
                stats["inflation"] = clamp(stats["inflation"] + value, -5, 100)
            elif effect_type == "unemployment":
                stats["unemployment"] = clamp(stats["unemployment"] + value, 0, 50)
    
    stats["stability"] = clamp(stats["stability"], 0, 100)
    stats["legitimacy"] = clamp(stats["legitimacy"], 0, 100)
    stats["bureaucracy"] = clamp(stats["bureaucracy"], 0, 100)
    stats["unemployment"] = clamp(stats["unemployment"], 1, 50)
    stats["inflation"] = clamp(stats["inflation"], -5, 100)
    
    return stats


# =============================================================================
#  核心经济计算 - T2.3 商品市场供需定价
# =============================================================================
def calculate_supply_demand(state: dict) -> dict:
    """
    商品市场供需定价（最核心、最复杂的部分）
    1:1 移植自前端 calculateSupplyDemand
    """
    market = state["market"]
    buildings = state["buildings"]
    pops = state["pops"]

    for commodity_id in market:
        market[commodity_id]["supply"] = 0
        market[commodity_id]["demand"] = 0

    for b in buildings:
        if not b["isActive"]:
            continue

        effective_workers = b["workers"] * b["efficiency"]

        for input_id, base_qty in b["inputs"].items():
            if input_id in market:
                market[input_id]["demand"] += base_qty * effective_workers * 0.01

        for output_id, base_qty in b["outputs"].items():
            if output_id in market:
                produced = base_qty * effective_workers * 0.01
                market[output_id]["supply"] += produced
                market[output_id]["stock"] += produced

    for p in pops:
        pop_size_factor = p["size"] * p["standardOfLiving"] / 100 * 0.00001

        for need_id, base_qty in p["needs"].items():
            if need_id in market:
                market[need_id]["demand"] += base_qty * pop_size_factor

    for commodity_id in market:
        m = market[commodity_id]
        commodity = state["commodities"].get(commodity_id, {})
        base_price = commodity.get("basePrice", 1)
        elasticity = commodity.get("elasticity", 0.5)
        min_price = commodity.get("minPrice", base_price * 0.2)
        max_price = commodity.get("maxPrice", base_price * 5.0)

        supply = m["supply"]
        demand = m["demand"]
        stock = m["stock"]

        ratio = supply / max(0.1, demand)

        if ratio < 0.5:
            new_price = base_price * (1 + elasticity * 2)
            m["priceTrend"] = "rising"
        elif ratio < 0.8:
            new_price = base_price * (1 + elasticity * 0.5)
            m["priceTrend"] = "rising"
        elif ratio < 1.2:
            new_price = base_price
            m["priceTrend"] = "stable"
        elif ratio < 2.0:
            new_price = base_price * (1 - elasticity * 0.3)
            m["priceTrend"] = "falling"
        else:
            new_price = base_price * max(0.2, 1 - elasticity)
            m["priceTrend"] = "falling"

        smoothing = 0.9
        m["price"] = clamp(
            m["price"] * smoothing + new_price * (1 - smoothing),
            min_price,
            max_price
        )

        consumed = min(stock, demand)
        m["stock"] = max(0, stock - consumed + supply - consumed)

        if len(m["priceHistory"]) >= 30:
            m["priceHistory"] = m["priceHistory"][1:]
        m["priceHistory"].append(round(m["price"], 4))

    return market


def calculate_cpi(state: dict) -> float:
    CPI_WEIGHTS = {
        "grain": 0.35, "cloth": 0.15, "meat": 0.15, "wine": 0.10,
        "tools": 0.10, "coal": 0.05, "iron": 0.05, "wood": 0.03,
        "medicine": 0.02,
    }
    cpi = 0.0
    for commodity_id, weight in CPI_WEIGHTS.items():
        commodity = state["commodities"].get(commodity_id)
        market = state["market"].get(commodity_id)
        if not commodity or not market:
            continue
        price_ratio = market["price"] / max(0.01, commodity.get("basePrice", 1))
        cpi += price_ratio * weight
    return (cpi - 1) * 100


TFP_GROWTH_RATE = 0.0002


def safe_div(a: float, b: float, fallback: float = 1.0) -> float:
    if b == 0 or not math.isfinite(b):
        return fallback
    result = a / b
    return result if math.isfinite(result) else fallback


# =============================================================================
#  核心经济计算 - 人口系统 (Phase 3-T1: 完整实现)
# =============================================================================
def calculate_pop_changes(state: dict) -> List[dict]:
    """
    人口每日变化 - 与前端1:1完整逻辑
    包括: CPI计算、实际工资、生活必需品满足度、生育率/死亡率模型
    """
    pops = state["pops"]
    stats = state["stats"]
    market = state["market"]
    modifiers = state.get("modifiers", [])
    
    cpi = calculate_cpi(state)
    inflation_factor = cpi / 100 + 1

    new_pops = []

    for p in pops:
        pop = deep_copy(p)
        
        real_wage = pop["income"] / max(1, inflation_factor)
        
        essential_goods_satisfied = True
        total_need_cost = 0.0
        
        for commodity_id, need in pop["needs"].items():
            m = market.get(commodity_id)
            if not m or need == 0:
                continue
            price = m["price"]
            total_need_cost += need * price
            affordability = safe_div(real_wage, need * price, 1.0)
            
            if affordability < 0.5 or m["stock"] < need * pop["size"] / 100:
                essential_goods_satisfied = False
        
        subsistence_ratio = safe_div(real_wage, total_need_cost, 1.0)
        
        base_mortality = 0.00005
        base_fertility = 0.00006
        
        mortality = base_mortality
        fertility = base_fertility
        
        if subsistence_ratio < 0.5:
            mortality *= 3
            fertility *= 0.2
        elif subsistence_ratio < 1:
            mortality *= 1.5
            fertility *= 0.6
        elif subsistence_ratio < 2:
            fertility *= 1.2
        else:
            fertility *= 0.8
        
        life_expectancy_boost = pop["standardOfLiving"] / 50000
        mortality *= max(0.3, 1 - life_expectancy_boost)
        
        literacy_boost = pop["literacy"] / 200
        fertility *= max(0.5, 1 - literacy_boost)
        
        net_growth_rate = fertility - mortality
        pop["size"] = int(pop["size"] * (1 + net_growth_rate))
        
        if essential_goods_satisfied and subsistence_ratio > 1.2:
            pop["standardOfLiving"] = clamp(pop["standardOfLiving"] + 0.05, 0, 100)
            pop["approval"] = clamp(pop["approval"] + 0.02, 0, 100)
        elif not essential_goods_satisfied or subsistence_ratio < 0.8:
            pop["standardOfLiving"] = clamp(pop["standardOfLiving"] - 0.1, 0, 100)
            pop["approval"] = clamp(pop["approval"] - 0.15, 0, 100)
        
        unemployment_effect = (stats["unemployment"] - 5) / 100
        pop["approval"] = clamp(pop["approval"] - unemployment_effect * 0.5, 0, 100)
        
        savings_rate = clamp(0.1 + (real_wage - 10) / 100, 0.01, 0.5)
        pop["wealth"] += real_wage * savings_rate
        pop["wealth"] = max(0, pop["wealth"])
        
        pop["income"] = real_wage * (1 + TFP_GROWTH_RATE)
        pop["income"] = max(1, pop["income"])
        
        for modifier in modifiers:
            effects = modifier.get("effects", {})
            if not effects:
                continue
            pop_effects = effects.get("pops", {})
            if pop_effects.get("income"):
                pop["income"] *= (1 + pop_effects["income"] / 100)
            if pop_effects.get("approval"):
                pop["approval"] = clamp(pop["approval"] + pop_effects["approval"], 0, 100)
            if pop_effects.get("consumption"):
                for cid in pop["consumption"]:
                    pop["consumption"][cid] *= (1 + pop_effects["consumption"] / 100)
        
        new_pops.append(pop)
    
    return new_pops


# =============================================================================
#  核心经济计算 - 建筑生产与雇佣逻辑 (Phase 3-T2: 完整实现)
#  包括: 收入成本计算、利润率、效率动态调整、雇佣/解雇逻辑
# =============================================================================
def calculate_building_profitability(state: dict) -> List[dict]:
    """
    建筑盈利能力计算 - 与前端1:1完整逻辑
    包括: 工资率、TFP加成、工人利用率、利润率影响效率
    """
    buildings = state["buildings"]
    market = state["market"]
    commodities = state["commodities"]
    modifiers = state.get("modifiers", [])

    new_buildings = []

    WAGE_RATE = 3

    for b in buildings:
        building = deep_copy(b)

        if not building["isActive"]:
            building["profitability"] = 0.0
            new_buildings.append(building)
            continue

        revenue = 0.0
        costs = building["operatingCosts"] * building["level"]

        costs += building["workers"] * WAGE_RATE / 10

        worker_utilization = building["workers"] / max(1, building["maxWorkers"])
        tfp_boost = 1 + state["stats"]["bureaucracy"] / 500

        for output_id, amount in building["outputs"].items():
            price = market.get(output_id, {}).get("price", 
                  commodities.get(output_id, {}).get("basePrice", 1))
            produced = amount * building["level"] * building["efficiency"] * worker_utilization * tfp_boost
            revenue += produced * price

        for input_id, amount in building["inputs"].items():
            price = market.get(input_id, {}).get("price",
                  commodities.get(input_id, {}).get("basePrice", 1))
            costs += amount * building["level"] * price

        profitability = revenue - costs

        profit_margin = safe_div(profitability, revenue, 0)
        new_efficiency = 0.7 + profit_margin * 0.5

        building["profitability"] = round(profitability, 2)
        building["efficiency"] = clamp(new_efficiency, 0.3, 1.5)

        for modifier in modifiers:
            effects = modifier.get("effects", {})
            if not effects:
                continue
            building_effects = effects.get("buildings", {})
            if building_effects.get("efficiency"):
                building["efficiency"] *= (1 + building_effects["efficiency"] / 100)
            if building_effects.get("output"):
                for output_id in building["outputs"]:
                    building["outputs"][output_id] *= (1 + building_effects["output"] / 100)

        new_buildings.append(building)

    return new_buildings


# =============================================================================
#  日期推进函数
# =============================================================================
def advance_date(date: dict) -> dict:
    """
    日期推进逻辑
    1:1 与前端一致
    """
    new_date = deep_copy(date)
    new_date["day"] += 1

    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    dim = days_in_month[new_date["month"] - 1]

    if new_date["year"] % 4 == 0 and new_date["month"] == 2:
        dim = 29

    if new_date["day"] > dim:
        new_date["day"] = 1
        new_date["month"] += 1

    if new_date["month"] > 12:
        new_date["month"] = 1
        new_date["year"] += 1

    return new_date


# =============================================================================
#  主 Tick 函数 - 纯函数确定性计算 (Phase 4-5 完整实现)
# =============================================================================
def execute_single_tick_full(state: dict) -> Tuple[dict, float]:
    """
    完整单 Tick 计算 - 与前端1:1完整逻辑
    包含: 完整计算顺序、Modifier生命周期管理、历史记录、政策进度

    返回: (new_state, processing_time_ms)
    """
    start_time = time.time()
    new_state = deep_copy(state)

    if new_state.get("gameStatus") != "running":
        return new_state, 0

    new_state["tick"] += 1

    is_new_day = new_state["tick"] % 24 == 0

    if is_new_day:
        new_state["day"] += 1
        new_state["date"] = advance_date(new_state["date"])

        new_state["market"] = calculate_supply_demand(new_state)
        new_state["pops"] = calculate_pop_changes(new_state)
        new_state["buildings"] = calculate_building_profitability(new_state)
        new_state["treasury"] = calculate_treasury(new_state)
        new_state["stats"] = calculate_national_stats(new_state)

        history_point = {
            "day": new_state["day"],
            "gdp": new_state["stats"]["gdp"],
            "inflation": new_state["stats"]["inflation"],
            "unemployment": new_state["stats"]["unemployment"],
            "treasury": new_state["treasury"]["balance"],
            "debt": new_state["treasury"]["debt"],
            "stability": new_state["stats"]["stability"],
            "population": new_state["stats"]["population"],
        }
        new_state["history"] = new_state.get("history", [])[-3650:] + [history_point]

        new_state["politicalCapital"] = min(
            999,
            new_state["politicalCapital"] + new_state["dailyPoliticalGain"]
        )

        new_state["modifiers"] = [
            {**m, "duration": m["duration"] - 1}
            for m in new_state.get("modifiers", [])
            if m.get("duration", float("inf")) > 1
        ]

    processing_ms = (time.time() - start_time) * 1000

    return new_state, round(processing_ms, 2)
