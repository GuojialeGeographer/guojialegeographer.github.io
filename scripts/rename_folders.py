#!/usr/bin/env python3
"""
批量重命名Git中的文件夹路径（处理macOS大小写不敏感问题）
"""
import subprocess
import sys
import os

def git_mv_files(old_prefix, new_prefix):
    """批量重命名Git中的文件路径"""
    # 获取所有需要重命名的文件
    result = subprocess.run(['git', 'ls-files'], capture_output=True, text=True, check=True)
    files = [f for f in result.stdout.strip().split('\n') if f.startswith(old_prefix + '/')]
    
    if not files:
        print(f"没有找到以 {old_prefix}/ 开头的文件")
        return
    
    print(f"找到 {len(files)} 个文件需要重命名: {old_prefix}/ -> {new_prefix}/")
    
    # 使用临时中间名称来避免大小写冲突
    temp_prefix = old_prefix + '_temp_rename'
    
    # 第一步：重命名为临时名称
    print(f"步骤1: 重命名为临时名称 {temp_prefix}/...")
    for file_path in files:
        new_path = file_path.replace(old_prefix + '/', temp_prefix + '/', 1)
        try:
            subprocess.run(['git', 'mv', file_path, new_path], check=True, capture_output=True)
        except subprocess.CalledProcessError as e:
            print(f"警告: 重命名 {file_path} 失败: {e.stderr.decode()}")
    
    # 第二步：从临时名称重命名为目标名称
    print(f"步骤2: 从临时名称重命名为 {new_prefix}/...")
    result = subprocess.run(['git', 'ls-files'], capture_output=True, text=True, check=True)
    temp_files = [f for f in result.stdout.strip().split('\n') if f.startswith(temp_prefix + '/')]
    
    for file_path in temp_files:
        new_path = file_path.replace(temp_prefix + '/', new_prefix + '/', 1)
        try:
            subprocess.run(['git', 'mv', file_path, new_path], check=True, capture_output=True)
        except subprocess.CalledProcessError as e:
            print(f"警告: 重命名 {file_path} 失败: {e.stderr.decode()}")
    
    print(f"✅ 完成 {old_prefix}/ -> {new_prefix}/ 的重命名")

def main():
    """主函数"""
    # 确保在项目根目录
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    # 需要重命名的文件夹映射
    folders = {
        'Present': 'presentations',
        'Projects': 'projects',
        'Images': 'images'
    }
    
    print("开始批量重命名Git文件夹...")
    print("=" * 50)
    
    for old_name, new_name in folders.items():
        print(f"\n处理: {old_name}/ -> {new_name}/")
        git_mv_files(old_name, new_name)
    
    print("\n" + "=" * 50)
    print("✅ 所有文件夹重命名完成！")
    print("\n下一步: 运行 git status 查看更改，然后提交")

if __name__ == '__main__':
    main()
