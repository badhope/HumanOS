#!/usr/bin/env python3
import requests

BASE_URL = "http://localhost:8000"

def test_health():
    r = requests.get(f"{BASE_URL}/health")
    print("Health Check:", r.status_code, r.text)

def test_list():
    r = requests.get(f"{BASE_URL}/api/v1/assessment/list")
    print("List Check:", r.status_code)
    data = r.json()
    print("计算器数量:", len(data["calculators"]))
    return data

def test_calculate():
    answers = {str(i): 3 for i in range(1, 51)}
    r = requests.post(
        f"{BASE_URL}/api/v1/assessment/calculate/ocean-bigfive",
        json={"answers": answers, "include_norm": True, "include_interpretation": True}
    )
    print("Calculate Check:", r.status_code)
    if r.status_code == 200:
        print("计算成功:", r.json()["assessment_name"])
        print("维度数量:", len(r.json()["dimensions"]))

if __name__ == "__main__":
    print("="*60)
    print("  🚀 API 功能测试")
    print("="*60)
    test_health()
    print()
    data = test_list()
    print()
    test_calculate()
    print()
    print("="*60)
    print("  ✅ 所有 API 测试完成")
    print("="*60)
