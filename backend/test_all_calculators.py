#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# =============================================================================
#  所有22个计算器全面验证脚本
# =============================================================================
import sys

def color_print(text, color="white"):
    colors = {
        "green": "\033[92m",
        "red": "\033[91m",
        "yellow": "\033[93m",
        "blue": "\033[94m",
        "white": "\033[0m",
    }
    print(f"{colors.get(color, colors['white'])}{text}{colors['white']}")

def run_check(name, check_fn):
    try:
        check_fn()
        color_print(f"  ✅ {name}", "green")
        return True
    except Exception as e:
        color_print(f"  ❌ {name}: {str(e)}", "red")
        import traceback
        traceback.print_exc()
        return False

def main():
    color_print("\n" + "="*60, "blue")
    color_print("  🧪 所有测评计算器验证套件", "blue")
    color_print("="*60 + "\n", "blue")

    results = []

    color_print("📦 第一步: 列出所有计算器", "yellow")
    
    from calculators import list_calculators, get_calculator
    all_calcs = list_calculators()
    color_print(f"\n共发现 {len(all_calcs)} 个计算器:\n", "blue")
    for c in all_calcs:
        color_print(f"  - {c['id']}: {c['name']} ({c['question_count']}题)", "white")

    color_print("\n" + "="*60, "yellow")
    color_print("🧮 第二步: 逐个运行计算器测试", "yellow")
    color_print("="*60 + "\n", "yellow")

    test_cases = [
        ("ocean-bigfive", 50, 5),
        ("burnout-mbi", 22, 3),
        ("sas-standard", 50, 4),
        ("holland-sds", 48, 6),
        ("dark-triad", 27, 3),
        ("eq-goleman", 33, 4),
        ("ecr-attachment", 36, 2),
        ("iq-ravens", 60, 1),
        ("ideology-9square", 50, 4),
        ("fubao-index", 30, 3),
        ("slacking-purity", 25, 5),
        ("foodie-level", 24, 5),
        ("internet-addiction", 28, 6),
        ("life-meaning", 25, 6),
        ("patriotism-purity", 25, 5),
        ("sexual-experience", 25, 5),
        ("gma-maturity", 30, 6),
        ("cast-parenting", 32, 4),
        ("philo-spectrum", 30, 6),
        ("onepiece-bounty", 25, 6),
        ("lacan-diagnosis", 28, 6),
        ("pua-resistance", 25, 6),
    ]

    passed = 0
    failed = 0

    for calc_id, q_count, dim_count in test_cases:
        def create_test(cid, qc, dc):
            def _test():
                calc = get_calculator(cid)
                answers = {str(i): 3 for i in range(1, qc + 1)}
                result = calc(answers)
                assert result.assessment_id == cid
                assert len(result.dimensions) == dc
            return _test

        if run_check(calc_id, create_test(calc_id, q_count, dim_count)):
            passed += 1
        else:
            failed += 1

    color_print("\n" + "="*60, "blue")
    color_print(f"  📊 测试结果: {passed} 通过, {failed} 失败", "blue" if failed == 0 else "yellow")
    color_print("="*60 + "\n", "blue")

    if failed == 0:
        color_print("🎉 所有计算器测试通过！后端移植完成！", "green")
    else:
        color_print(f"⚠️  有 {failed} 个计算器需要修复", "red")

    return failed == 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
