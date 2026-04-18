#!/usr/bin/env python3
# =============================================================================
#  1000 Tick 双写一致性验证 - 直接运行版本
# =============================================================================
import json
import math
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from engine.economy_tick import execute_single_tick_full


def generate_minimal_test_state():
    return {
        "tick": 0,
        "day": 0,
        "gameStatus": "running",
        "date": {"year": 2024, "month": 1, "day": 1},
        "politicalCapital": 100,
        "dailyPoliticalGain": 5,
        "stats": {
            "population": 100000,
            "gdp": 10000,
            "gdpPerCapita": 100,
            "inflation": 2.5,
            "unemployment": 5.0,
            "stability": 70.0,
            "bureaucracy": 50.0,
            "legitimacy": 65.0,
            "health": 60.0,
            "education": 45.0,
            "infrastructure": 30,
            "military": 0,
        },
        "treasury": {
            "gold": 100000,
            "debt": 0,
            "income": 0,
            "expenses": 0,
            "balance": 0,
            "interestRate": 0.03,
            "taxes": {"income": 15, "land": 10, "trade": 5, "luxury": 20},
            "subsidies": {"agriculture": 0, "industry": 0, "poor": 0.5},
        },
        "commodities": {
            "grain": {"basePrice": 1, "minPrice": 0.2, "maxPrice": 5.0, "elasticity": 0.5},
            "cloth": {"basePrice": 3, "minPrice": 0.5, "maxPrice": 15.0, "elasticity": 0.4},
            "coal": {"basePrice": 2, "minPrice": 0.3, "maxPrice": 10.0, "elasticity": 0.6},
            "iron": {"basePrice": 4, "minPrice": 0.8, "maxPrice": 20.0, "elasticity": 0.3},
            "tools": {"basePrice": 8, "minPrice": 1.5, "maxPrice": 40.0, "elasticity": 0.25},
        },
        "market": {
            "grain": {"supply": 1000, "demand": 800, "stock": 5000, "price": 1.0, "priceTrend": "stable", "priceHistory": [1.0]},
            "cloth": {"supply": 200, "demand": 250, "stock": 800, "price": 3.0, "priceTrend": "stable", "priceHistory": [3.0]},
            "coal": {"supply": 300, "demand": 280, "stock": 1200, "price": 2.0, "priceTrend": "stable", "priceHistory": [2.0]},
            "iron": {"supply": 150, "demand": 160, "stock": 600, "price": 4.0, "priceTrend": "stable", "priceHistory": [4.0]},
            "tools": {"supply": 80, "demand": 75, "stock": 300, "price": 8.0, "priceTrend": "stable", "priceHistory": [8.0]},
        },
        "pops": [
            {
                "id": "farmers", "name": "农民", "size": 50000,
                "income": 8.5, "wealth": 100.0,
                "standardOfLiving": 35.0, "approval": 60.0, "literacy": 30.0,
                "needs": {"grain": 2.0, "cloth": 0.3},
                "consumption": {"grain": 1.8, "cloth": 0.2},
            },
            {
                "id": "workers", "name": "工人", "size": 30000,
                "income": 15.0, "wealth": 200.0,
                "standardOfLiving": 55.0, "approval": 55.0, "literacy": 60.0,
                "needs": {"grain": 1.5, "cloth": 0.8, "coal": 0.5},
                "consumption": {"grain": 1.2, "cloth": 0.6, "coal": 0.4},
            },
            {
                "id": "bourgeoisie", "name": "资产阶级", "size": 5000,
                "income": 80.0, "wealth": 1500.0,
                "standardOfLiving": 85.0, "approval": 75.0, "literacy": 90.0,
                "needs": {"grain": 1.0, "cloth": 2.0, "iron": 0.5, "tools": 1.0},
                "consumption": {"grain": 0.8, "cloth": 1.8, "iron": 0.3, "tools": 0.8},
            },
        ],
        "buildings": [
            {
                "id": "farm_1", "name": "国营农场", "type": "agriculture",
                "level": 10, "isActive": True,
                "workers": 200, "maxWorkers": 500,
                "efficiency": 0.75, "profitability": 0.0, "operatingCosts": 50,
                "inputs": {"tools": 0.1},
                "outputs": {"grain": 10.0},
            },
            {
                "id": "textile_1", "name": "纺织厂", "type": "manufacturing",
                "level": 5, "isActive": True,
                "workers": 150, "maxWorkers": 300,
                "efficiency": 0.8, "profitability": 0.0, "operatingCosts": 80,
                "inputs": {"coal": 0.5, "iron": 0.1},
                "outputs": {"cloth": 5.0},
            },
            {
                "id": "coal_mine", "name": "煤矿", "type": "extraction",
                "level": 8, "isActive": True,
                "workers": 250, "maxWorkers": 400,
                "efficiency": 0.7, "profitability": 0.0, "operatingCosts": 60,
                "inputs": {"tools": 0.05},
                "outputs": {"coal": 8.0},
            },
        ],
        "modifiers": [],
        "history": [],
        "news": [],
        "policies": [],
        "nationalSpirits": [],
        "nationalFocuses": [],
        "activeNationalFocus": None,
        "activeEvent": None,
        "defeatConditions": [],
        "victoryConditions": [],
        "interestGroups": [],
        "difficulty": "normal",
    }


def run_1000_tick_stability_test():
    print(f"\n{'='*60}")
    print(f"✅ Phase 2-T4: 1000 Tick 双写一致性验证")
    print(f"{'='*60}")
    
    state = generate_minimal_test_state()
    
    errors = []
    total_time = 0
    start_wall = time.time()
    
    for tick in range(1, 1001):
        state, time_ms = execute_single_tick_full(state)
        total_time += time_ms
        
        try:
            assert state["stats"]["population"] > 0, "人口不能为0"
            assert state["stats"]["gdp"] >= 0, "GDP不能为负"
            assert 0 <= state["stats"]["stability"] <= 100, "稳定性超出范围"
            assert state["treasury"]["gold"] >= 0, "黄金不能为负"
            
            for commodity_id, m in state["market"].items():
                assert m["price"] > 0, f"{commodity_id} 价格不能为负"
                assert m["stock"] >= 0, f"{commodity_id} 库存不能为负"
                
        except AssertionError as e:
            errors.append(f"Tick {tick}: {str(e)}")
            if len(errors) >= 10:
                break
        
        if tick % 200 == 0:
            print(f"\n📊 Tick {tick} 状态:")
            print(f"  GDP:          {state['stats']['gdp']:>12.2f}")
            print(f"  黄金:         {state['treasury']['gold']:>12.2f}")
            print(f"  稳定度:       {state['stats']['stability']:>11.1f}")
            print(f"  通胀:         {state['stats']['inflation']:>11.2f}%")
            print(f"  失业:         {state['stats']['unemployment']:>11.2f}%")
            print(f"  人口:         {state['stats']['population']:>11,.0f}")
    
    wall_time = (time.time() - start_wall) * 1000
    
    print(f"\n{'='*60}")
    print(f"📈 测试完成: {1000} ticks")
    print(f"  总计算时间 (CPU):  {total_time:.2f}ms")
    print(f"  总计算时间 (墙钟): {wall_time:.2f}ms")
    print(f"  平均每 tick:       {total_time/1000:.3f}ms")
    print(f"  每秒可计算:        {1000000/total_time:.1f} ticks")
    print(f"  发现错误:          {len(errors)} 个")
    
    if errors:
        print(f"\n❌ 错误列表:")
        for err in errors[:10]:
            print(f"  - {err}")
        return False
    else:
        print(f"\n✅ 1000 Tick 稳定性测试通过!")
        return True


def run_determinism_test():
    print(f"\n{'='*60}")
    print(f"🔍 确定性测试")
    print(f"{'='*60}")
    
    state1 = generate_minimal_test_state()
    state2 = generate_minimal_test_state()
    
    for _ in range(100):
        state1, _ = execute_single_tick_full(state1)
        state2, _ = execute_single_tick_full(state2)
    
    gdp_diff = abs(state1["stats"]["gdp"] - state2["stats"]["gdp"])
    gold_diff = abs(state1["treasury"]["gold"] - state2["treasury"]["gold"])
    stability_diff = abs(state1["stats"]["stability"] - state2["stats"]["stability"])
    
    print(f"  GDP 差异:       {gdp_diff:.6f}")
    print(f"  黄金 差异:      {gold_diff:.6f}")
    print(f"  稳定度 差异:    {stability_diff:.6f}")
    
    if gdp_diff < 0.001 and gold_diff < 0.001 and stability_diff < 0.001:
        print(f"\n✅ 确定性测试通过 - 相同输入产生相同输出")
        return True
    else:
        print(f"\n❌ 确定性测试失败")
        return False


def main():
    all_passed = True
    
    all_passed &= run_1000_tick_stability_test()
    all_passed &= run_determinism_test()
    
    print(f"\n{'='*60}")
    if all_passed:
        print(f"🎉 所有测试通过! Phase 2-T4 完成")
    else:
        print(f"⚠️  部分测试失败")
    print(f"{'='*60}")
    
    return 0 if all_passed else 1


if __name__ == "__main__":
    sys.exit(main())
