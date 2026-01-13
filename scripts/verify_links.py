#!/usr/bin/env python3
"""
验证所有HTML文件中的本地链接是否有效
"""
import os
import re
from pathlib import Path
from urllib.parse import urlparse, unquote

def find_html_files(root_dir):
    """查找所有HTML文件"""
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        # 跳过.git和node_modules
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__']]
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def extract_links(html_file):
    """提取HTML文件中的所有本地链接"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"⚠️  无法读取 {html_file}: {e}")
        return []
    
    # 匹配 href 和 src 属性
    patterns = [
        r'href=["\']([^"\']+)["\']',
        r'src=["\']([^"\']+)["\']'
    ]
    
    links = []
    for pattern in patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            # 过滤外部链接和特殊协议
            if match.startswith('http://') or match.startswith('https://') or \
               match.startswith('//') or match.startswith('mailto:') or \
               match.startswith('tel:') or match.startswith('javascript:') or \
               match.startswith('#'):
                continue
            links.append(match)
    
    return links

def verify_link(link, base_file):
    """验证链接是否有效"""
    # 处理相对路径
    base_dir = os.path.dirname(os.path.abspath(base_file))
    
    # 移除查询参数和锚点
    link_path = link.split('?')[0].split('#')[0]
    
    # 处理URL编码
    link_path = unquote(link_path)
    
    # 构建完整路径
    if link_path.startswith('/'):
        # 绝对路径（相对于项目根目录）
        target_path = os.path.join(os.path.dirname(base_dir), link_path.lstrip('/'))
    else:
        # 相对路径
        target_path = os.path.normpath(os.path.join(base_dir, link_path))
    
    # 检查文件或目录是否存在
    if os.path.exists(target_path):
        return True, None
    
    # 检查是否是目录（可能缺少index.html）
    if os.path.isdir(target_path):
        # 检查是否有index.html
        index_path = os.path.join(target_path, 'index.html')
        if os.path.exists(index_path):
            return True, None
        return False, "目录存在但缺少index.html"
    
    return False, "文件不存在"

def main():
    """主函数"""
    root_dir = '.'
    html_files = find_html_files(root_dir)
    
    print(f"🔍 找到 {len(html_files)} 个HTML文件")
    print("=" * 60)
    
    errors = []
    total_links = 0
    valid_links = 0
    
    for html_file in html_files:
        links = extract_links(html_file)
        total_links += len(links)
        
        for link in links:
            is_valid, error_msg = verify_link(link, html_file)
            if is_valid:
                valid_links += 1
            else:
                rel_file = os.path.relpath(html_file, root_dir)
                errors.append({
                    'file': rel_file,
                    'link': link,
                    'error': error_msg or '文件不存在'
                })
    
    print(f"\n📊 统计:")
    print(f"  总链接数: {total_links}")
    print(f"  有效链接: {valid_links}")
    print(f"  无效链接: {len(errors)}")
    
    if errors:
        print(f"\n❌ 发现 {len(errors)} 个无效链接:")
        print("=" * 60)
        for error in errors[:20]:  # 只显示前20个
            print(f"  {error['file']}")
            print(f"    → {error['link']}")
            print(f"    错误: {error['error']}")
            print()
        
        if len(errors) > 20:
            print(f"  ... 还有 {len(errors) - 20} 个错误未显示")
        
        return 1
    else:
        print("\n✅ 所有链接验证通过！")
        return 0

if __name__ == '__main__':
    exit(main())
