#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# =============================================================================
#  后端全面验证脚本
# =============================================================================
import sys
from typing import List, Dict, Any

def color_print(text: str, color: str = "white"):
    colors = {
        "green": "\033[92m",
        "red": "\033[91m",
        "yellow": "\033[93m",
        "blue": "\033[94m",
        "white": "\033[0m",
    }
    print(f"{colors.get(color, colors['white'])}{text}{colors['white']}")

def run_check(name: str, check_fn) -> bool:
    try:
        check_fn()
        color_print(f"  ✅ {name}", "green")
        return True
    except Exception as e:
        color_print(f"  ❌ {name}: {str(e)}", "red")
        return False

def main():
    color_print("\n" + "="*60, "blue")
    color_print("  🧪 MindMirror 后端全面验证套件", "blue")
    color_print("="*60 + "\n", "blue")

    all_passed = True
    results = []

    color_print("📦 模块导入测试", "yellow")

    def check_calculators():
        from calculators import list_calculators, get_calculator
        assert len(list_calculators()) >= 4, "计算器数量不足"

    results.append(run_check("计算器核心模块", check_calculators))

    def check_database():
        from database import Base, engine, User, AssessmentResult
        from database import AssessmentType, NormData, ItemAnalysis
        assert Base is not None
        assert engine is not None

    results.append(run_check("数据库ORM模型", check_database))

    def check_api():
        from api.assessment import router
        from api.auth import router as auth_router
        from api.analytics import router as analytics_router
        from api.game import router as game_router
        assert len(router.routes) >= 3

    results.append(run_check("API路由模块", check_api))

    def check_schemas():
        from schemas import assessment_schemas
        assert assessment_schemas is not None

    results.append(run_check("Pydantic数据验证", check_schemas))

    def check_utils():
        from utils import norms
        assert norms.NORM_DATA is not None
        assert "ocean-bigfive" in norms.NORM_DATA

    results.append(run_check("常模数据工具", check_utils))

    color_print("\n🧮 计算器功能测试", "yellow")

    def test_bigfive():
        from calculators import get_calculator
        calc = get_calculator("ocean-bigfive")
        answers = {str(i): 3 for i in range(1, 51)}
        result = calc(answers)
        assert len(result.dimensions) == 5
        assert result.assessment_id == "ocean-bigfive"

    results.append(run_check("大五人格计算器", test_bigfive))

    def test_dark():
        from calculators import get_calculator
        calc = get_calculator("dark-triad")
        answers = {f"dark-{i}": 3 for i in range(1, 28)}
        result = calc(answers)
        assert len(result.dimensions) == 3
        assert "darkness_level" in result.type_profile

    results.append(run_check("黑暗三角计算器", test_dark))

    def test_eq():
        from calculators import get_calculator
        calc = get_calculator("eq-goleman")
        answers = {f"eq-{i}": 3 for i in range(1, 34)}
        result = calc(answers)
        assert len(result.dimensions) == 4
        assert result.overall_score > 0

    results.append(run_check("情绪智力计算器", test_eq))

    def test_ecr():
        from calculators import get_calculator
        calc = get_calculator("ecr-attachment")
        answers = {f"ecr-{i}": 3 for i in range(1, 37)}
        result = calc(answers)
        assert len(result.dimensions) == 2
        assert "attachment_style" in result.type_profile

    results.append(run_check("依恋风格计算器", test_ecr))

    def test_iq():
        from calculators import get_calculator
        calc = get_calculator("iq-ravens")
        answers = {f"iq-{i}": 3 for i in range(1, 61)}
        result = calc(answers)
        assert len(result.dimensions) == 1
        assert result.overall_score > 0

    results.append(run_check("瑞文智商计算器", test_iq))

    def test_ideology():
        from calculators import get_calculator
        calc = get_calculator("ideology-9square")
        answers = {f"ideo-{i}": 3 for i in range(1, 51)}
        result = calc(answers)
        assert len(result.dimensions) == 4
        assert "sector" in result.type_profile

    results.append(run_check("意识形态九宫格计算器", test_ideology))

    def test_fubao():
        from calculators import get_calculator
        calc = get_calculator("fubao-index")
        answers = {f"fubao-{i}": 3 for i in range(1, 31)}
        result = calc(answers)
        assert len(result.dimensions) == 3
        assert result.overall_score > 0

    results.append(run_check("福报指数计算器", test_fubao))

    def test_burnout():
        from calculators import get_calculator
        calc = get_calculator("burnout-mbi")
        answers = {str(i): 2 for i in range(1, 23)}
        result = calc(answers)
        assert len(result.dimensions) == 3
        assert len(result.development_advice) > 0

    results.append(run_check("职业倦怠计算器", test_burnout))

    def test_sas():
        from calculators import get_calculator
        calc = get_calculator("sas-standard")
        answers = {f"sas-{i}": 3 for i in range(1, 51)}
        result = calc(answers)
        assert len(result.dimensions) == 4
        assert result.assessment_id == "sas-standard"

    results.append(run_check("焦虑计算器", test_sas))

    def test_holland():
        from calculators import get_calculator
        calc = get_calculator("holland-sds")
        answers = {str(i): 2 for i in range(1, 61)}
        result = calc(answers)
        assert "holland_code" in result.type_profile
        assert len(result.career_suggestions) > 0

    results.append(run_check("霍兰德计算器", test_holland))

    color_print("\n🛡️  错误处理测试", "yellow")

    def test_invalid_id():
        from calculators import get_calculator
        try:
            get_calculator("invalid-id-12345")
            assert False, "应该抛出异常"
        except ValueError:
            pass

    results.append(run_check("无效测评ID处理", test_invalid_id))

    def test_empty_answers():
        from calculators import get_calculator
        calc = get_calculator("ocean-bigfive")
        try:
            calc({})
            assert False, "应该抛出异常"
        except ValueError:
            pass

    results.append(run_check("空答案处理", test_empty_answers))

    color_print("\n" + "="*60, "blue")

    passed = sum(results)
    total = len(results)

    if passed == total:
        color_print(f"\n🎉 全部 {total}/{total} 项验证通过！", "green")
    else:
        color_print(f"\n⚠️  {passed}/{total} 项通过，{total-passed}项失败", "yellow")
        all_passed = False

    color_print("\n📋 计算器清单:", "blue")
    from calculators import list_calculators
    for c in list_calculators():
        color_print(f"  - {c['id']}: {c['name']} ({c['question_count']}题)", "white")

    color_print("\n" + "="*60, "blue")

    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
