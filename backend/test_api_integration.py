#!/usr/bin/env python3
# =============================================================================
#  API集成测试脚本
# =============================================================================
import requests
import json

def main():
    print("=" * 60)
    print("🧪 API集成测试")
    print("=" * 60)

    base_url = "http://localhost:8000/api/v1/game"

    print("\n1️⃣  测试引擎指标...")
    r = requests.get(f"{base_url}/engine/metrics")
    print(f"   状态: {r.status_code}")
    print(f"   响应: {r.json()}")
    assert r.status_code == 200, "引擎指标检查失败"

    print("\n2️⃣  创建游戏会话...")
    r = requests.post(f"{base_url}/session/create")
    print(f"   状态: {r.status_code}")
    session = r.json()
    session_id = session["session_id"]
    print(f"   Session ID: {session_id}")
    assert r.status_code == 200, "创建会话失败"

    print("\n3️⃣  准备初始状态...")
    state = {
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
            "gold": 100000, "debt": 0, "income": 0, "expenses": 0, "balance": 0,
            "interestRate": 0.03,
            "taxes": {"income": 15, "land": 10, "trade": 5, "luxury": 20},
            "subsidies": {"agriculture": 0, "industry": 0, "poor": 0.5},
        },
        "commodities": {
            "grain": {"basePrice": 1, "minPrice": 0.2, "maxPrice": 5.0, "elasticity": 0.5},
            "cloth": {"basePrice": 3, "minPrice": 0.5, "maxPrice": 15.0, "elasticity": 0.4},
            "coal": {"basePrice": 2, "minPrice": 0.3, "maxPrice": 10.0, "elasticity": 0.6},
        },
        "market": {
            "grain": {"supply": 1000, "demand": 800, "stock": 5000, "price": 1.0, "priceTrend": "stable", "priceHistory": [1.0]},
            "cloth": {"supply": 200, "demand": 250, "stock": 800, "price": 3.0, "priceTrend": "stable", "priceHistory": [3.0]},
            "coal": {"supply": 300, "demand": 280, "stock": 1200, "price": 2.0, "priceTrend": "stable", "priceHistory": [2.0]},
        },
        "pops": [
            {
                "id": "farmers", "name": "农民", "size": 50000,
                "income": 8.5, "wealth": 100.0,
                "standardOfLiving": 35.0, "approval": 60.0, "literacy": 30.0,
                "needs": {"grain": 2.0, "cloth": 0.3},
                "consumption": {"grain": 1.8, "cloth": 0.2},
            },
        ],
        "buildings": [
            {
                "id": "farm_1", "name": "国营农场", "type": "agriculture",
                "level": 10, "isActive": True,
                "workers": 200, "maxWorkers": 500,
                "efficiency": 0.75, "profitability": 0.0, "operatingCosts": 50,
                "inputs": {}, "outputs": {"grain": 10.0},
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

    print("   初始状态准备完成")

    print("\n4️⃣  执行24 Tick (1天)...")
    r = requests.post(
        f"{base_url}/tick/{session_id}",
        json={"state": state, "steps": 24}
    )
    print(f"   状态: {r.status_code}")
    result = r.json()
    print(f"   处理时间: {result['processing_time_ms']:.2f}ms")
    print(f"   最终 Tick: {result['state']['tick']}")
    print(f"   最终 Day: {result['state']['day']}")
    print(f"   最终 GDP: {result['state']['stats']['gdp']:.2f}")
    print(f"   最终 黄金: {result['state']['treasury']['gold']:.2f}")
    print(f"   最终 稳定度: {result['state']['stats']['stability']:.1f}")
    print(f"   计算来源: {result['source']}")
    assert r.status_code == 200, "执行Tick失败"
    assert result["state"]["tick"] == 24, "Tick计数错误"
    assert result["state"]["day"] == 1, "Day计数错误"

    print("\n5️⃣  执行批量 100 Tick...")
    r = requests.post(
        f"{base_url}/tick/{session_id}",
        json={"state": result["state"], "steps": 100}
    )
    print(f"   状态: {r.status_code}")
    result2 = r.json()
    print(f"   处理时间: {result2['processing_time_ms']:.2f}ms ({result2['processing_time_ms']/100:.3f}ms/tick)")
    print(f"   最终 Tick: {result2['state']['tick']}")
    print(f"   计算来源: {result2['source']}")
    assert r.status_code == 200, "批量Tick失败"

    print("\n" + "=" * 60)
    print("🎉 所有API集成测试通过!")
    print("=" * 60)

    print("\n📊 性能总结:")
    print(f"   单 Tick 平均: {result2['processing_time_ms']/100:.3f}ms")
    print(f"   每秒可计算: {int(1000 * 100 / result2['processing_time_ms'])} ticks")


if __name__ == "__main__":
    main()
