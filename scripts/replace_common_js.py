#!/usr/bin/env python3
"""
批量替换HTML文件中的主题切换和语言切换代码为公共JS引用
"""
import os
import re
import subprocess

def find_html_files(root_dir):
    """查找所有HTML文件"""
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        # 跳过.git和node_modules
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__', 'scripts']]
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def calculate_relative_path(file_path, root_dir):
    """计算从文件到根目录的相对路径"""
    file_dir = os.path.dirname(os.path.abspath(file_path))
    root_abs = os.path.abspath(root_dir)
    
    # 计算相对路径
    rel_path = os.path.relpath(root_abs, file_dir)
    if rel_path == '.':
        return 'js/common.js'
    else:
        return os.path.join(rel_path, 'js/common.js').replace('\\', '/')

def replace_script_block(content, js_path):
    """替换脚本块"""
    # 查找所有script标签
    script_start_pattern = r'<script>\s*document\.addEventListener\([\'"]DOMContentLoaded[\'"]'
    script_end_pattern = r'</script>'
    script_pattern = script_start_pattern + r'.*?' + script_end_pattern
    
    # 查找所有匹配
    matches = list(re.finditer(script_pattern, content, re.DOTALL))
    
    for match in reversed(matches):  # 从后往前替换，避免索引问题
        script_content = match.group(0)
        # 检查是否包含主题切换和语言切换的关键字
        if ('theme-toggle' in script_content or 'lang-toggle' in script_content) and \
           ('localStorage.getItem' in script_content or 'setAttribute' in script_content):
            # 替换整个script块
            replacement = f'<!-- Common JavaScript (Theme & Language Toggle) -->\n    <script src="{js_path}"></script>'
            content = content[:match.start()] + replacement + content[match.end():]
            return True, content
    
    return False, content

def replace_theme_lang_script(file_path, root_dir):
    """替换文件中的主题和语言切换脚本"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"⚠️  无法读取 {file_path}: {e}")
        return False
    
    original_content = content
    
    # 计算相对路径
    js_path = calculate_relative_path(file_path, root_dir)
    
    # 匹配主题切换和语言切换的脚本块（多种模式）
    # 使用更简单的方法：查找包含特定关键字的script标签
    script_start_pattern = r'<script>\s*document\.addEventListener\([\'"]DOMContentLoaded[\'"]'
    script_end_pattern = r'</script>'
    
    # 查找所有script标签
    script_pattern = script_start_pattern + r'.*?' + script_end_pattern
    
    # 检查是否包含主题和语言切换代码
    matches = list(re.finditer(script_pattern, content, re.DOTALL))
    
    for match in reversed(matches):  # 从后往前替换，避免索引问题
        script_content = match.group(0)
        # 检查是否包含主题切换和语言切换的关键字
        if ('theme-toggle' in script_content or 'lang-toggle' in script_content) and \
           ('localStorage.getItem' in script_content or 'setAttribute' in script_content):
            # 替换整个script块
            replacement = f'<!-- Common JavaScript (Theme & Language Toggle) -->\n    <script src="{js_path}"></script>'
            content = content[:match.start()] + replacement + content[match.end():]
            return True, content
    
    # 尝试匹配并替换
    replaced, new_content = replace_script_block(content, js_path)
    
    if replaced and new_content != original_content:
        content = new_content
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"⚠️  无法写入 {file_path}: {e}")
            return False
    
    return False

def main():
    root_dir = '.'
    html_files = find_html_files(root_dir)
    
    print(f"🔍 找到 {len(html_files)} 个HTML文件")
    print("=" * 60)
    
    replaced_count = 0
    skipped_count = 0
    
    for html_file in html_files:
        if replace_theme_lang_script(html_file, root_dir):
            rel_path = os.path.relpath(html_file, root_dir)
            print(f"✅ {rel_path}")
            replaced_count += 1
        else:
            # 检查是否已经使用了common.js
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'js/common.js' in content:
                    skipped_count += 1
            except:
                pass
    
    print("=" * 60)
    print(f"\n📊 统计:")
    print(f"  已替换: {replaced_count} 个文件")
    print(f"  已跳过: {skipped_count} 个文件（已使用common.js）")
    print(f"  总计: {len(html_files)} 个文件")

if __name__ == '__main__':
    main()
