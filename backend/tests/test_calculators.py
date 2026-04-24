# =============================================================================
#  计算器单元测试
# =============================================================================
import pytest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from calculators import get_calculator, list_calculators
import json

class TestCalculators:
    """测评计算器测试套件"""
    
    def test_list_calculators(self):
        """测试计算器列表"""
        calculators = list_calculators()
        assert len(calculators) >= 4
        calculator_ids = [c["id"] for c in calculators]
        assert "ocean-bigfive" in calculator_ids
        assert "burnout-mbi" in calculator_ids
        assert "sas-standard" in calculator_ids
        assert "holland-sds" in calculator_ids
    
    def test_bigfive_calculator(self):
        """测试大五人格计算器"""
        calc = get_calculator("ocean-bigfive")
        assert calc.assessment_id == "ocean-bigfive"
        
        answers = {str(i): 3 for i in range(1, 51)}
        result = calc(answers)
        assert len(result.dimensions) == 5
        
        dim_ids = [d.dimension_id for d in result.dimensions]
        assert "O" in dim_ids
        assert "C" in dim_ids
        assert "E" in dim_ids
    
    def test_burnout_calculator(self):
        """测试职业倦怠计算器"""
        calc = get_calculator("burnout-mbi")
        
        answers = {str(i): 2 for i in range(1, 23)}
        result = calc(answers)
        
        ee_score = None
        for d in result.dimensions:
            if d.dimension_id == "EE":
                ee_score = d
                break
        
        assert ee_score is not None
        assert result.interpretation is not None
        assert len(result.development_advice) > 0
    
    def test_sas_calculator(self):
        """测试焦虑计算器"""
        calc = get_calculator("sas-standard")
        
        answers = {str(i): 2 for i in range(1, 21)}
        result = calc(answers)
        
        assert result.overall_score is not None
        assert len(result.development_advice) > 0
    
    def test_holland_calculator(self):
        """测试霍兰德计算器"""
        calc = get_calculator("holland-sds")
        
        answers = {str(i): 2 for i in range(1, 61)}
        result = calc(answers)
        
        assert result.type_profile is not None
        assert "holland_code" in result.type_profile
        assert len(result.career_suggestions) > 0
    
    def test_invalid_calculator_id(self):
        """测试无效的测评ID"""
        import pytest
        with pytest.raises(ValueError):
            get_calculator("invalid-id")
    
    def test_empty_answers(self):
        """测试空答案"""
        calc = get_calculator("ocean-bigfive")
        import pytest
        with pytest.raises(ValueError):
            calc({})
    
    def test_result_structure(self):
        """测试结果结构完整性"""
        calc = get_calculator("ocean-bigfive")
        answers = {str(i): 3 for i in range(1, 51)}
        result = calc(answers)
        
        assert result.assessment_id == "ocean-bigfive"
        assert hasattr(result, "strengths")
        assert hasattr(result, "blind_spots")
        assert hasattr(result, "development_advice")
        
        for dim in result.dimensions:
            assert hasattr(dim, "raw_score")
            assert hasattr(dim, "percentile") is not None
            assert hasattr(dim, "level") != ""


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
