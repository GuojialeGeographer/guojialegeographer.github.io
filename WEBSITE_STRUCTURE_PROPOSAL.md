# 网站结构规范化建议

## 📋 当前问题分析

### 1. 结构不一致问题
- **News**: 只有单个 `news.html` 文件，但 `conferences/GISphere/` 应该属于news内容
- **Presentations**: 存在 `Presentations/` 文件夹和 `presentations.html`，命名不一致（大小写）
- **Papers**: 存在 `papers/` 文件夹，但主要使用 `publications.html`
- **未使用的文件夹**: `doc/`, `report/`, `tmp/`, `tutorial/`, `video/`, `poster/` 等可能未被使用

### 2. 内容分类问题
- `conferences/GISphere/` 应该移动到 `news/` 下，因为它是学术成果新闻，不是会议
- 会议和新闻的边界需要更清晰

### 3. 资源组织问题
- `Images/` 使用了大写，但其他文件夹使用小写
- 图片资源分散在不同位置

## 🎯 建议的新结构框架

```
guojialegeographer.github.io/
├── index.html                    # 主页
├── style.css                     # 全局样式
├── README.md                     # 项目说明
│
├── assets/                       # 全局资源文件
│   ├── css/                      # 全局CSS（如需要）
│   ├── js/                       # 全局JavaScript
│   └── fonts/                    # 字体文件（如需要）
│
├── images/                       # 全局图片资源（统一小写）
│   ├── personal/                 # 个人照片
│   ├── institutions/             # 机构logo
│   ├── icons/                    # 图标
│   └── placeholders/             # 占位图
│
├── publications/                 # 出版物（统一使用publications）
│   ├── index.html                # 或 publications.html（主列表页）
│   └── [paper-slug]/             # 每篇论文一个文件夹
│       ├── index.html            # 论文详情页
│       ├── images/               # 论文相关图片
│       └── [paper-title].md      # 论文markdown（如需要）
│
├── projects/                     # 项目（统一小写）
│   ├── index.html                # 或 projects.html（主列表页）
│   └── [project-slug]/           # 每个项目一个文件夹
│       ├── index.html            # 项目详情页
│       ├── images/               # 项目图片
│       ├── pages/                # 项目子页面（如需要）
│       └── README.md             # 项目说明
│
├── books/                        # 书籍和笔记
│   ├── index.html                # 或 books.html（主列表页）
│   ├── book-viewer.html          # 书籍查看器
│   └── [book-slug]/              # 每本书一个文件夹
│       ├── index.html            # 书籍详情页
│       ├── images/               # 书籍封面等
│       └── [book-title].md      # 书籍内容markdown
│
├── presentations/                # 演示文稿（统一小写）
│   ├── index.html                # 或 presentations.html（主列表页）
│   └── [presentation-slug]/      # 每个演示一个文件夹
│       ├── index.html            # 演示详情页
│       ├── slides/               # PPT/PDF文件
│       ├── images/               # 演示相关图片
│       └── README.md             # 演示说明
│
├── conferences/                  # 会议和学术活动
│   ├── index.html                # 或 conferences.html（主列表页）
│   └── [conference-slug]/        # 每个会议一个文件夹
│       ├── index.html            # 会议详情页
│       ├── images/               # 会议相关图片
│       └── README.md             # 会议说明（如需要）
│
├── news/                         # 新闻和动态
│   ├── index.html                # 或 news.html（主列表页）
│   └── [news-slug]/              # 每条重要新闻一个文件夹
│       ├── index.html            # 新闻详情页
│       ├── images/               # 新闻相关图片
│       └── README.md             # 新闻说明（如需要）
│
├── cv/                           # 简历（统一小写）
│   ├── CV_JialeGuo.pdf
│   ├── cv.tex
│   └── 个人简历-郭家乐.pdf
│
└── [其他工具文件夹]/
    ├── talkmap/                  # 访客地图（保留）
    └── [其他必要的工具文件夹]
```

## 🔄 具体迁移计划

### Phase 1: 内容重组

#### 1.1 News内容整理
```
当前: conferences/GISphere/
建议: news/gisphere-research-achievements/
操作: 
  - 移动 conferences/GISphere/ → news/gisphere-research-achievements/
  - 更新所有链接引用
```

#### 1.2 Presentations统一命名
```
当前: Presentations/ (大写) 和 presentations.html
建议: presentations/ (小写) 和 presentations.html
操作:
  - 重命名 Presentations/ → presentations/
  - 更新所有链接引用
```

#### 1.3 Papers整合到Publications
```
当前: papers/ 和 publications.html
建议: 统一使用 publications/
操作:
  - 移动 papers/ 内容到 publications/
  - 统一命名规范
```

### Phase 2: 文件夹清理

#### 2.1 移除未使用的文件夹
检查并移除以下文件夹（如果确实未使用）：
- `doc/`
- `report/`
- `tmp/`
- `tutorial/`
- `video/`
- `poster/`

#### 2.2 统一命名规范
- 所有文件夹使用小写字母
- 多个单词使用短横线分隔（kebab-case）
- 例如：`air-pollution-exposure/` 而不是 `Air_Pollution_Exporsure/`

### Phase 3: 资源整合

#### 3.1 图片资源统一
```
当前: Images/ (大写)
建议: images/ (小写)
操作:
  - 重命名 Images/ → images/
  - 更新所有图片引用路径
```

#### 3.2 创建统一的资源结构
- 每个内容文件夹下都有 `images/` 子文件夹存放相关内容图片
- 全局共享的图片放在根目录的 `images/` 下

## 📝 命名规范

### 文件夹命名
- **使用小写字母**
- **多个单词使用短横线分隔**（kebab-case）
- **示例**:
  - ✅ `geospatial-data-science/`
  - ✅ `gis-2025-conference/`
  - ❌ `Geospatial_Data_Science/`
  - ❌ `GIS2025Conference/`

### 文件命名
- **HTML文件**: `index.html`（详情页）或 `[page-name].html`（列表页）
- **Markdown文件**: `[content-title].md`
- **图片文件**: `[descriptive-name].[ext]`

### URL结构
- **列表页**: `/publications.html` 或 `/publications/`
- **详情页**: `/publications/[paper-slug]/` 或 `/publications/[paper-slug]/index.html`

## 🏷️ Tag系统规范

### Tag分类
- **类型标签**: `conference`, `workshop`, `research`, `publication`, `news`
- **主题标签**: `gis`, `sustainability`, `remote-sensing`, `urban-computing`
- **年份标签**: `2025`, `2024`, `2023`
- **其他标签**: `award`, `collaboration`, `education`

### Tag使用规则
- 每个内容项至少有一个类型标签
- 可以有多个主题标签
- 年份标签用于时间筛选
- Tag存储在HTML的 `<meta name="tags">` 中

## 📂 内容组织原则

### 1. 每个主要页面类型都有对应的文件夹
- `publications/` - 出版物
- `projects/` - 项目
- `books/` - 书籍笔记
- `presentations/` - 演示文稿
- `conferences/` - 会议
- `news/` - 新闻

### 2. 每个内容项一个文件夹
- 便于管理相关资源（图片、文档等）
- 便于添加详细页面
- 便于版本控制

### 3. 统一的文件结构
每个内容项文件夹的标准结构：
```
[content-slug]/
├── index.html          # 详情页
├── images/             # 相关图片
├── README.md           # 说明文档（可选）
└── [其他资源文件]
```

## 🔗 链接管理

### 相对路径规范
- **从列表页到详情页**: `[content-slug]/`
- **从详情页返回列表页**: `../` 或 `../../[list-page].html`
- **全局资源**: `/images/` 或 `../../images/`

### 链接更新检查清单
迁移后需要更新以下位置的链接：
- [ ] `index.html` 中的所有链接
- [ ] 各列表页的链接
- [ ] 详情页的返回链接
- [ ] 导航栏链接
- [ ] 图片引用路径

## ✅ 实施优先级

### 高优先级（立即执行）
1. ✅ 移动 `conferences/GISphere/` → `news/gisphere-research-achievements/`
2. ✅ 统一 `Presentations/` → `presentations/`
3. ✅ 统一 `Images/` → `images/`

### 中优先级（近期执行）
4. 整合 `papers/` → `publications/`
5. 清理未使用的文件夹
6. 统一项目文件夹命名（如 `Air_Pollution_Exporsure/` → `air-pollution-exposure/`）

### 低优先级（长期优化）
7. 为所有内容项添加详情页文件夹结构
8. 完善Tag系统
9. 添加README文档到各个文件夹

## 🎨 额外建议

### 1. 创建内容清单文件
在根目录创建 `CONTENT_INDEX.md`，列出所有内容项及其位置：
```markdown
# 内容索引

## Publications
- [Paper Title 1](/publications/paper-slug-1/)
- [Paper Title 2](/publications/paper-slug-2/)

## Projects
- [Project Name 1](/projects/project-slug-1/)
...
```

### 2. 统一页面模板
为每种内容类型创建标准模板，确保：
- 统一的导航结构
- 统一的返回链接
- 统一的Tag显示
- 统一的样式

### 3. 自动化工具
考虑创建脚本来自动：
- 生成内容索引
- 检查链接有效性
- 验证Tag一致性

## 📌 注意事项

1. **备份**: 在执行任何迁移前，确保有完整的备份
2. **测试**: 每次迁移后测试所有链接和功能
3. **渐进式**: 可以分阶段执行，不必一次性完成所有迁移
4. **文档**: 记录所有更改，便于后续维护

---

**最后更新**: 2025-01-XX
**状态**: 待审核

