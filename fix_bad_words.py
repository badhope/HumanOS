#!/usr/bin/env python3
"""
批量修复测评文件中的不适当内容
将脏话替换为文明用语
"""

import os
import re

# 需要替换的不适当内容
BAD_WORDS = {
    '傻逼': '不懂欣赏的人',
    '操': '太糟糕了',
    'SB': '缺乏品味',
    'sb': '缺乏品味',
    '屁': '话',
}

def fix_file(filepath):
    """修复单个文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    for bad_word, replacement in BAD_WORDS.items():
        if bad_word in content:
            count = content.count(bad_word)
            content = content.replace(bad_word, replacement)
            changes += count
            print(f"  替换 '{bad_word}' -> '{replacement}': {count} 次")
    
    if changes > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ 已修复 {changes} 处")
    else:
        print(f"  ✨ 无需修复")
    
    return changes

def main():
    """主函数"""
    assessments_dir = '/workspace/src/data/assessments'
    files_to_fix = [
        'dark-triad.ts',
        'fubao-index.ts', 
        'gma-maturity.ts',
        'ecr-attachment.ts',
        'holland-sds.ts',
        'mental-age.ts',
        'pua-resistance.ts',
        'sbti-personality.ts',
        'sexual-experience.ts',
        'slacking-purity.ts',
    ]
    
    print("=" * 60)
    print("批量修复测评文件中的不适当内容")
    print("=" * 60)
    print()
    
    total_changes = 0
    
    for filename in files_to_fix:
        filepath = os.path.join(assessments_dir, filename)
        if os.path.exists(filepath):
            print(f"📄 {filename}")
            changes = fix_file(filepath)
            total_changes += changes
            print()
        else:
            print(f"❌ 未找到文件: {filename}")
    
    print("=" * 60)
    print(f"修复完成！共修复 {total_changes} 处不适当内容")
    print("=" * 60)

if __name__ == '__main__':
    main()
