#!/usr/bin/env python3
"""
全面检查所有测评文件的结构和问题
检查内容包括：
1. 文件结构完整性
2. 题目数量
3. 选项格式一致性
4. 计算器函数存在性
5. 潜在的内容问题
"""

import os
import re
import json

def read_file(filepath):
    """读取文件内容"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def analyze_assessment_file(filepath):
    """分析单个测评文件"""
    content = read_file(filepath)
    
    # 提取基本信息
    match_id = re.search(r"id:\s*['\"]([^'\"]+)['\"]", content)
    match_title = re.search(r"title:\s*['\"]([^'\"]+)['\"]", content)
    match_category = re.search(r"category:\s*['\"]([^'\"]+)['\"]", content)
    match_questions = re.search(r"questions:\s*\[([\s\S]*?)\]", content)
    
    result = {
        'file': os.path.basename(filepath),
        'id': match_id.group(1) if match_id else None,
        'title': match_title.group(1) if match_title else None,
        'category': match_category.group(1) if match_category else None,
        'question_count': 0,
        'has_calculator': False,
        'issues': [],
        'warnings': []
    }
    
    # 检查计算器
    if 'resultCalculator:' in content:
        result['has_calculator'] = True
    else:
        result['warnings'].append('缺少 resultCalculator')
    
    # 统计题目数量
    if match_questions:
        questions_content = match_questions.group(1)
        # 统计题目（以 { id: 开头的）
        question_matches = re.findall(r"\{\s*id:\s*['\"]", questions_content)
        result['question_count'] = len(question_matches)
    
    # 检查潜在问题
    # 1. 检查是否有不适当内容
    inappropriate_patterns = [
        r'傻屌', r'傻逼', r'操', r'尼玛', r'卧槽', r'妈蛋', r'狗屁',
        r'傻逼', r'智障', r'脑残', r'逗比', r'傻逼', r'SB', r'sb'
    ]
    
    for pattern in inappropriate_patterns:
        if re.search(pattern, content, re.IGNORECASE):
            result['issues'].append(f'发现不适当内容: {pattern}')
    
    # 2. 检查空题目或空选项
    if result['question_count'] == 0:
        result['issues'].append('题目数量为0')
    
    # 3. 检查ID和文件名是否匹配
    expected_id = os.path.basename(filepath).replace('.ts', '')
    if result['id'] != expected_id:
        result['warnings'].append(f'ID与文件名不匹配: {result["id"]} != {expected_id}')
    
    # 4. 检查选项格式
    option_matches = re.findall(r'options:\s*\[([^\]]+)\]', content)
    for idx, options_content in enumerate(option_matches):
        option_count = len(re.findall(r'\{.*?\}', options_content))
        if option_count == 0:
            result['warnings'].append(f'第{idx+1}题缺少选项')
    
    # 5. 检查MBTI/SBTI混淆
    if 'MBTI' in result['title'] and 'sbti' in result['id']:
        result['warnings'].append('标题使用MBTI但ID使用sbti，可能存在混淆')
    
    return result

def main():
    """主检查函数"""
    assessments_dir = '/workspace/src/data/assessments'
    files = sorted([f for f in os.listdir(assessments_dir) if f.endswith('.ts') and f != 'index.ts'])
    
    print("=" * 80)
    print("全面检查所有测评文件")
    print("=" * 80)
    print(f"共发现 {len(files)} 个测评文件")
    print()
    
    all_results = []
    total_questions = 0
    files_with_issues = 0
    files_with_warnings = 0
    
    for filename in files:
        filepath = os.path.join(assessments_dir, filename)
        result = analyze_assessment_file(filepath)
        all_results.append(result)
        
        total_questions += result['question_count']
        
        if result['issues']:
            files_with_issues += 1
        if result['warnings']:
            files_with_warnings += 1
    
    # 输出详细结果
    print("📋 测评文件详细信息:")
    print("-" * 80)
    
    for result in all_results:
        status = "✅" if not result['issues'] else "❌"
        print(f"{status} {result['file']}")
        print(f"   ID: {result['id']}")
        print(f"   标题: {result['title']}")
        print(f"   分类: {result['category']}")
        print(f"   题目数: {result['question_count']}")
        print(f"   有计算器: {'是' if result['has_calculator'] else '否'}")
        
        if result['issues']:
            print(f"   ⚠️ 问题:")
            for issue in result['issues']:
                print(f"      - {issue}")
        
        if result['warnings']:
            print(f"   💡 警告:")
            for warning in result['warnings']:
                print(f"      - {warning}")
        
        print()
    
    # 汇总统计
    print("=" * 80)
    print("📊 汇总统计")
    print("=" * 80)
    print(f"总测评数: {len(files)}")
    print(f"总题目数: {total_questions}")
    print(f"有问题的文件: {files_with_issues}")
    print(f"有警告的文件: {files_with_warnings}")
    print(f"平均每题数: {total_questions / len(files):.1f}")
    print()
    
    # 分类统计
    categories = {}
    for result in all_results:
        cat = result['category'] or '未分类'
        if cat not in categories:
            categories[cat] = {'count': 0, 'questions': 0}
        categories[cat]['count'] += 1
        categories[cat]['questions'] += result['question_count']
    
    print("📁 分类统计")
    print("-" * 80)
    for cat, data in sorted(categories.items()):
        print(f"{cat}: {data['count']} 个测评, {data['questions']} 道题")
    print()
    
    # 输出问题汇总
    if files_with_issues > 0:
        print("🚨 问题汇总")
        print("-" * 80)
        for result in all_results:
            if result['issues']:
                print(f"{result['file']}:")
                for issue in result['issues']:
                    print(f"  - {issue}")
        print()
    
    # 保存报告
    report = {
        'summary': {
            'total_files': len(files),
            'total_questions': total_questions,
            'files_with_issues': files_with_issues,
            'files_with_warnings': files_with_warnings
        },
        'categories': categories,
        'details': all_results
    }
    
    with open('/tmp/assessment_analysis_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"📄 详细报告已保存到: /tmp/assessment_analysis_report.json")

if __name__ == '__main__':
    main()
