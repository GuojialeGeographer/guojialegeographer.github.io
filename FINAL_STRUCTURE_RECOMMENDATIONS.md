# 网站结构最终修改建议报告

**生成日期**: 2025-11-15  
**状态**: 待审核与实施  
**版本**: 1.0

---

## 📊 执行摘要

本报告基于对当前网站结构的全面分析，结合对话中提出的所有需求，提供了一套完整的网站结构规范化方案。报告旨在解决当前存在的结构不一致、命名不规范、内容分类混乱等问题，使网站更加规范、易维护、易扩展。

### 核心目标
1. ✅ **已完成**: 将会议整合到Presentations文件夹结构下
2. 🔄 **待完成**: 统一命名规范（大小写、kebab-case）
3. 🔄 **待完成**: 清理未使用文件夹
4. 🔄 **待完成**: 整合分散的内容（papers→publications, GISphere→news）
5. 🔄 **待完成**: 统一资源路径（Images→images）

---

## 📋 当前状态分析

### ✅ 已完成的工作

#### 1. 会议整合到Presentations ✅
- **完成时间**: 2025-01-XX
- **操作**: 
  - 移动 `conferences/GIS2025/` → `Presentations/Conferences/GIS2025/`
  - 移动 `conferences/GEOSUS2025/` → `Presentations/Conferences/GEOSUS2025/`
  - 更新所有链接引用
  - 在 `presentations.html` 中整合会议内容
  - 添加URL参数支持（`?tag=conference`）
  - 优化会议卡片显示样式
- **当前状态**: 会议已正确显示在Presentations页面，可通过Tag筛选

#### 2. 内容分类优化 ✅
- **完成**: GEOSUS 2025从workshop更正为conference
- **完成**: GISphere从conferences移至news（逻辑上，但文件夹未移动）

### ⚠️ 当前存在的问题

#### 1. 文件夹命名不一致
```
当前状态:
- Presentations/ (大写) ❌
- Images/ (大写) ❌
- Projects/ (大写) ✅
- CV/ (大写) ❌
- conferences/ (小写) ✅
- books/ (小写) ✅
- papers/ (小写) ✅
```

#### 2. 内容分类混乱
```
问题:
- papers/ 和 publications.html 分离
- 未使用的文件夹: doc/, report/, tmp/, tutorial/, video/, poster/
```

#### 3. 项目命名不规范
```
问题示例:
- Air_Pollution_Exporsure/ (下划线+拼写错误)
- NLP_Sentiment Analysis/ (下划线+空格)
- Spatial-temporal pattern mining of Air Pollution/ (空格)
- 30DayMapChallenge/ (驼峰命名)
```

#### 4. 资源路径不统一
```
当前:
- Images/ (大写，根目录)
- Presentations/Courses/.../images/ (小写，子目录)
- Projects/.../Images/ (大写，项目内)
```

---

## 🎯 建议的最终结构

### 目标结构（理想状态）

```
guojialegeographer.github.io/
├── index.html                          # 主页
├── style.css                           # 全局样式
├── README.md                           # 项目说明
├── FINAL_STRUCTURE_RECOMMENDATIONS.md # 本报告
│
│
├── images/                             # 全局公用图片资源（统一小写）
│   ├── personal/                       # 个人头像、照片（网站公用）
│   ├── institutions/                   # 机构logo（网站公用）
│   └── placeholders/                   # 占位图（网站公用）
│   # 注意：其他图片（books、papers、presentations、projects等）
│   # 应放在各自内容文件夹下的 images/ 子文件夹内
│
├── publications/                       # 出版物（统一）
│   ├── publications.html              # 或 index.html（主列表页）
│   └── [paper-slug]/                  # 每篇论文一个文件夹
│       ├── index.html                 # 论文详情页
│       ├── images/                    # 论文相关图片
│       └── [paper-title].md          # 论文markdown（如需要）
│
├── projects/                           # 项目（统一小写）
│   ├── projects.html                   # 或 index.html（主列表页）
│   ├── 30-day-map-challenge/          # 统一命名
│   │   └── images/                    # 项目图片（放在各自文件夹下）
│   ├── air-pollution-exposure/         # 修正拼写和命名
│   │   └── images/                    # 项目图片
│   ├── nlp-sentiment-analysis/         # 统一命名
│   │   └── images/                    # 项目图片
│   ├── spatial-temporal-air-pollution/ # 统一命名
│   │   └── images/                    # 项目图片
│   ├── svi-data-processing/           # 统一命名
│   │   └── images/                    # 项目图片
│   └── undergraduate-thesis/          # 统一命名
│       └── images/                    # 项目图片
│
├── books/                              # 书籍和笔记（已规范）
│   ├── books.html                      # 或 index.html
│   ├── book-viewer.html
│   └── [book-slug]/                   # 每本书一个文件夹
│       └── images/                    # 书籍相关图片（放在各自文件夹下）
│
├── presentations/                      # 演示文稿（统一小写）
│   ├── presentations.html              # 或 index.html
│   ├── conferences/                   # 会议（已整合）
│   │   ├── gis-2025/
│   │   │   └── images/                # 会议图片（放在各自文件夹下）
│   │   ├── geosus-2025/
│   │   │   └── images/                # 会议图片
│   ├── courses/                        # 课程
│   │   └── [course-slug]/
│   │       └── images/                # 课程图片（放在各自文件夹下）
│   ├── workshops/                      # 工作坊
│   │   └── [workshop-slug]/
│   │       └── images/                # 工作坊图片
│   └── seminars/                       # 研讨会
│       └── [seminar-slug]/
│           └── images/                # 研讨会图片
│
│
├── news/                               # 新闻和动态（新建）
│   ├── news.html                       # 或 index.html
│   └── gisphere-research-achievements/ # GISphere学术成果
│       ├── index.html
│       └── images/
│
├── cv/                                 # 简历（统一小写）
│   ├── CV_JialeGuo.pdf
│   ├── cv.tex
│   └── 个人简历-郭家乐.pdf
│
├── travel/                             # 旅行板块（新增）
│   ├── travel.html                     # 或 index.html（主列表页）
│   ├── map.html                        # 地图展示页面
│   └── [location-slug]/                # 每个地点一个文件夹
│       ├── index.html                  # 地点详情页
│       ├── images/                     # 该地点的照片
│       │   ├── [photo1].jpg
│       │   ├── [photo2].jpg
│       │   └── ...
│       └── location-info.json          # 地点信息（坐标、描述等，用于地图）
│
└── [工具文件夹]/
    ├── talkmap/                        # 访客地图（保留）
    └── [其他必要的工具文件夹]
```

---

## 🔄 详细迁移计划

### Phase 1: 高优先级 - 内容重组（部分完成）

#### ✅ 1.1 Conferences整合到Presentations（已完成）
- **状态**: ✅ 完成
- **操作**: 
  - ✅ 移动会议文件夹到 `Presentations/Conferences/`
  - ✅ 更新所有链接引用
  - ✅ 在presentations.html中整合会议内容
  - ✅ 添加URL参数支持

#### 🔄 1.2 GISphere移动到News（待执行）
- **当前**: `conferences/GISphere/`
- **目标**: `news/gisphere-research-achievements/`
- **操作步骤**:
  1. 创建 `news/` 文件夹（如果不存在）
  2. 移动 `conferences/GISphere/` → `news/gisphere-research-achievements/`
  3. 更新所有链接引用：
     - `index.html`
     - `news.html`
     - 其他引用GISphere的页面
  4. 更新导航栏链接
  5. 验证所有路径正确

#### 🔄 1.3 Papers整合到Publications（待执行）
- **当前**: `papers/` 和 `publications.html` 分离
- **目标**: 统一使用 `publications/`
- **操作步骤**:
  1. 创建 `publications/` 文件夹
  2. 移动 `papers/` 内容到 `publications/`
  3. 移动 `publications.html` → `publications/index.html` 或保留在根目录
  4. 更新所有链接引用
  5. 统一命名规范（使用kebab-case）

### Phase 2: 中优先级 - 命名规范化

#### 🔄 2.1 Presentations文件夹重命名（待执行）
- **当前**: `Presentations/` (大写)
- **目标**: `presentations/` (小写)
- **注意事项**: 
  - GitHub Pages在某些系统上对大小写敏感
  - 需要更新所有引用路径
  - 建议在非工作时间执行，避免影响访问
- **操作步骤**:
  1. 备份当前文件夹
  2. 重命名 `Presentations/` → `presentations/`
  3. 更新所有HTML文件中的路径引用
  4. 更新图片路径引用
  5. 测试所有链接
  6. 提交并推送更改

#### 🔄 2.2 Images文件夹重命名（待执行）
- **当前**: `Images/` (大写)
- **目标**: `images/` (小写)
- **操作步骤**:
  1. 重命名 `Images/` → `images/`
  2. 全局搜索并替换所有图片路径引用
  3. 更新CSS文件中的图片路径
  4. 验证所有图片正常显示

#### 🔄 2.3 CV文件夹重命名（待执行）
- **当前**: `CV/` (大写)
- **目标**: `cv/` (小写)
- **操作步骤**:
  1. 重命名 `CV/` → `cv/`
  2. 更新所有引用链接

#### 🔄 2.4 项目文件夹命名规范化（待执行）
- **当前问题**:
  - `Air_Pollution_Exporsure/` → 应改为 `air-pollution-exposure/`（修正拼写）
  - `NLP_Sentiment Analysis/` → 应改为 `nlp-sentiment-analysis/`
  - `Spatial-temporal pattern mining of Air Pollution/` → 应改为 `spatial-temporal-air-pollution/`
  - `SVI_Data_Processing/` → 应改为 `svi-data-processing/`
  - `30DayMapChallenge/` → 可改为 `30-day-map-challenge/` 或保持（如果常用）
- **操作步骤**:
  1. 逐个重命名项目文件夹
  2. 更新 `projects.html` 中的链接
  3. 更新项目内部链接
  4. 更新 `index.html` 中的项目链接

### Phase 3: 低优先级 - 清理与优化

#### 🔄 3.1 清理未使用的文件夹（待执行）
- **待检查文件夹**:
  - `doc/` - 检查是否为空或未使用
  - `report/` - 检查是否为空或未使用
  - `tmp/` - 临时文件夹，可删除
  - `tutorial/` - 检查是否为空或未使用
  - `video/` - 检查是否为空或未使用
  - `poster/` - 检查是否为空或未使用
- **操作步骤**:
  1. 检查每个文件夹的内容
  2. 确认是否被引用
  3. 备份重要内容（如有）
  4. 删除未使用的文件夹
  5. 更新 `.gitignore`（如需要）

#### 🔄 3.2 统一资源结构（待执行）
- **目标**: 确保所有内容文件夹都有统一的子结构
- **标准结构**:
  ```
  [content-item]/
  ├── index.html          # 详情页
  ├── images/             # 相关图片
  ├── README.md           # 说明文档（可选）
  └── [其他资源文件]
  ```

#### 🔄 3.3 图片资源整合（待执行）
- **目标**: 统一图片资源位置
- **规则**:
  - **全局公用图片** → `images/` 根目录
    - 个人头像、照片（网站公用）
    - 机构logo（网站公用）
    - 占位图（网站公用）
  - **内容特定图片** → 各内容文件夹下的 `images/` 子文件夹
    - 书籍图片 → `books/[book-slug]/images/`
    - 论文图片 → `publications/[paper-slug]/images/`
    - 项目图片 → `projects/[project-name]/images/`
    - 演示文稿图片 → `presentations/[category]/[item-slug]/images/`
    - 旅行照片 → `travel/[location-slug]/images/`
    - 新闻图片 → `news/[news-slug]/images/`

#### 🔄 3.4 新增旅行板块（待执行）
- **目标**: 创建旅行板块，展示去过的地点，支持地图可视化
- **功能需求**:
  - 地点列表页面（`travel.html`）
  - 地图展示页面（`travel/map.html`）
  - 每个地点的详情页（`travel/[location-slug]/index.html`）
  - 地点照片展示
  - 地图标记和交互
- **技术建议**:
  - 使用Leaflet.js或Mapbox GL JS进行地图展示
  - 地点信息存储为JSON格式（坐标、名称、描述、照片路径等）
  - 支持筛选和搜索功能
- **操作步骤**:
  1. 创建 `travel/` 文件夹
  2. 创建 `travel.html` 主列表页
  3. 创建 `travel/map.html` 地图展示页
  4. 为每个地点创建文件夹和详情页
  5. 上传地点照片到各自的 `images/` 文件夹
  6. 创建地点信息JSON文件
  7. 实现地图标记和交互功能
  8. 添加到导航栏

---

## 📝 命名规范标准

### 文件夹命名规范
- ✅ **使用小写字母**
- ✅ **多个单词使用短横线分隔**（kebab-case）
- ✅ **避免空格和下划线**
- ✅ **避免特殊字符**

**示例**:
- ✅ `geospatial-data-science/`
- ✅ `gis-2025-conference/`
- ✅ `air-pollution-exposure/`
- ❌ `Geospatial_Data_Science/`
- ❌ `GIS2025Conference/`
- ❌ `Air_Pollution_Exporsure/`

### 文件命名规范
- **HTML文件**: 
  - 列表页: `[page-name].html` (如 `publications.html`)
  - 详情页: `index.html` (在内容文件夹内)
- **Markdown文件**: `[content-title].md`
- **图片文件**: `[descriptive-name].[ext]` (小写，使用短横线)

### URL结构规范
- **列表页**: `/publications.html` 或 `/publications/`
- **详情页**: `/publications/[paper-slug]/` 或 `/publications/[paper-slug]/index.html`
- **资源文件**: `/images/[category]/[filename]`

---

## 🏷️ Tag系统规范

### Tag分类体系
- **类型标签**: `conference`, `workshop`, `seminar`, `course`, `research`, `publication`, `news`, `project`
- **主题标签**: `gis`, `sustainability`, `remote-sensing`, `urban-computing`, `geospatial-data-science`
- **年份标签**: `2025`, `2024`, `2023`
- **其他标签**: `award`, `collaboration`, `education`, `open-source`

### Tag使用规则
1. 每个内容项至少有一个类型标签
2. 可以有多个主题标签
3. 年份标签用于时间筛选
4. Tag存储在HTML的 `<meta name="tags">` 中
5. Tag显示在内容卡片上

### Tag显示规范
- 类型标签使用不同颜色区分
- Conference: 蓝色 (#007bff)
- Workshop: 绿色 (#28a745)
- Course: 紫色 (#6f42c1)
- Research: 橙色 (#fd7e14)

---

## 🔗 链接管理规范

### 相对路径规范
- **从列表页到详情页**: `[content-slug]/`
- **从详情页返回列表页**: `../` 或 `../../[list-page].html`
- **全局资源**: `/images/` 或 `../../images/`
- **同级资源**: `./images/` 或 `images/`

### 链接更新检查清单
执行迁移后，必须检查并更新以下位置的链接：
- [ ] `index.html` 中的所有链接
- [ ] 各列表页的链接（`publications.html`, `projects.html`, 等）
- [ ] 详情页的返回链接
- [ ] 导航栏链接（所有页面的导航栏）
- [ ] 图片引用路径（HTML和CSS）
- [ ] JavaScript文件中的路径引用

---

## ⚠️ 重要注意事项

### 1. GitHub Pages大小写敏感性
- **问题**: GitHub Pages在某些系统（如Linux）上对文件名大小写敏感
- **解决方案**: 
  - 统一使用小写命名
  - 重命名后立即测试部署
  - 考虑使用 `.htaccess` 或重定向（如需要）

### 2. 链接失效风险
- **风险**: 重命名文件夹可能导致外部链接失效
- **解决方案**:
  - 使用Git重命名（`git mv`）保留历史
  - 创建重定向页面（如需要）
  - 更新所有内部链接

### 3. 备份策略
- **必须**: 在执行任何大规模迁移前创建完整备份
- **建议**: 
  - 创建Git分支进行测试
  - 使用 `git tag` 标记重要版本
  - 保留迁移前的快照

### 4. 渐进式迁移
- **建议**: 不要一次性完成所有迁移
- **策略**: 
  - 按优先级分阶段执行
  - 每个阶段完成后测试
  - 确认无误后再进行下一阶段

---

## 📅 实施时间表建议

### 第一阶段（1-2周）
1. ✅ 完成会议整合（已完成）
2. 🔄 移动GISphere到news
3. 🔄 重命名Images为images
4. 🔄 重命名CV为cv

### 第二阶段（2-3周）
1. 🔄 整合papers到publications
2. 🔄 重命名Presentations为presentations
3. 🔄 规范化项目文件夹命名

### 第三阶段（3-4周）
1. 🔄 清理未使用文件夹
2. 🔄 统一资源结构
3. 🔄 图片资源整合（按新规则）
4. 🔄 完善Tag系统
5. 🔄 添加README文档

### 第四阶段（4-5周）- 新增功能
1. 🔄 创建旅行板块结构
2. 🔄 实现地图展示功能
3. 🔄 添加地点详情页模板
4. 🔄 上传和整理旅行照片
5. 🔄 集成到导航栏

---

## ✅ 验证检查清单

每个阶段完成后，必须验证：

### 功能验证
- [ ] 所有页面可以正常访问
- [ ] 所有链接正常工作
- [ ] 所有图片正常显示
- [ ] Tag筛选功能正常
- [ ] 导航栏在所有页面正常工作
- [ ] 语言切换功能正常
- [ ] 主题切换功能正常

### 技术验证
- [ ] 无404错误
- [ ] 无控制台错误
- [ ] 无linter错误
- [ ] GitHub Pages部署成功
- [ ] 移动端显示正常
- [ ] 浏览器兼容性测试通过

### 内容验证
- [ ] 所有内容完整显示
- [ ] 格式正确
- [ ] 链接指向正确位置
- [ ] 图片路径正确

---

## 🎨 额外优化建议

### 1. 创建内容索引文件
在根目录创建 `CONTENT_INDEX.md`，自动或手动维护所有内容项的索引：
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
为每种内容类型创建标准模板组件，确保：
- 统一的导航结构
- 统一的返回链接
- 统一的Tag显示
- 统一的样式和布局

### 3. 自动化工具
考虑创建脚本来自动：
- 生成内容索引
- 检查链接有效性
- 验证Tag一致性
- 批量重命名和路径更新

### 4. 文档完善
为每个主要文件夹添加 `README.md`，说明：
- 文件夹用途
- 内容组织方式
- 命名规范
- 更新指南

---

## 📊 预期收益

### 短期收益
- ✅ 结构更清晰，易于理解
- ✅ 命名规范统一，易于维护
- ✅ 内容分类明确，易于查找
- ✅ 减少混淆和错误

### 长期收益
- ✅ 易于扩展新内容
- ✅ 降低维护成本
- ✅ 提高开发效率
- ✅ 改善用户体验
- ✅ 便于团队协作

---

## 🔚 总结

本报告提供了完整的网站结构规范化方案，包括：

1. **当前状态分析**: 详细列出了已完成和待完成的工作
2. **目标结构**: 清晰的理想文件夹结构
3. **详细迁移计划**: 分阶段的实施步骤
4. **命名规范**: 统一的命名标准
5. **注意事项**: 重要的风险和解决方案
6. **验证清单**: 确保迁移成功的检查项

### 下一步行动
1. **审核本报告**: 确认所有建议符合需求
2. **制定详细计划**: 根据实际情况调整时间表
3. **开始执行**: 按照优先级逐步实施
4. **持续验证**: 每个阶段完成后进行测试

---

**报告生成**: AI Assistant  
**最后更新**: 2025-01-XX  
**状态**: 待审核  
**版本**: 1.0

---

## 📎 附录

### A. 当前文件夹结构快照
```
主要文件夹:
- books/ ✅
- conferences/ (部分内容已移至Presentations)
- CV/ ⚠️
- Images/ ⚠️
- papers/ ⚠️
- Presentations/ ⚠️
- Projects/ ⚠️
- talkmap/ ✅
- [其他工具文件夹]
```

### B. 关键文件列表
- `index.html` - 主页
- `publications.html` - 出版物列表
- `projects.html` - 项目列表
- `books.html` - 书籍列表
- `presentations.html` - 演示文稿列表
- `news.html` - 新闻列表
- `conferences.html` - 会议页面（已整合到presentations）
- `style.css` - 全局样式

### C. 参考文档
- `README.md` - 项目说明
- Git提交历史 - 查看已完成的工作

### D. 图片资源组织规则（重要更新）

#### 根目录 images/ 文件夹
**仅用于网站全局公用图片**：
- `images/personal/` - 个人头像、照片（在多个页面使用）
- `images/institutions/` - 机构logo（在多个页面使用）
- `images/placeholders/` - 占位图（通用）

#### 内容特定图片
**所有内容相关的图片应放在各自文件夹下的 `images/` 子文件夹内**：
- `books/[book-slug]/images/` - 书籍封面、内容图片
- `publications/[paper-slug]/images/` - 论文图表、截图
- `projects/[project-name]/images/` - 项目截图、结果图
- `presentations/[category]/[item-slug]/images/` - 演示文稿相关图片
- `travel/[location-slug]/images/` - 旅行地点照片
- `news/[news-slug]/images/` - 新闻相关图片

**原则**: 如果图片只属于某个特定内容项，就放在该内容项的 `images/` 文件夹下；如果图片在多个页面使用，才放在根目录的 `images/` 下。

### E. 旅行板块详细规划

#### 功能特性
1. **地点列表页** (`travel.html`)
   - 展示所有去过的地点
   - 支持按国家/地区筛选
   - 支持按时间排序
   - 显示地点缩略图和基本信息

2. **地图展示页** (`travel/map.html`)
   - 交互式地图（Leaflet/Mapbox）
   - 标记所有去过的地点
   - 点击标记显示地点信息
   - 支持筛选和搜索
   - 可选的路线展示

3. **地点详情页** (`travel/[location-slug]/index.html`)
   - 地点名称和描述
   - 照片画廊
   - 访问时间
   - 地理位置信息
   - 相关链接（如需要）

#### 数据结构建议
```json
// travel/locations.json 或各地点文件夹下的 location-info.json
{
  "locations": [
    {
      "slug": "beijing-china",
      "name": {
        "en": "Beijing, China",
        "zh": "北京，中国"
      },
      "coordinates": {
        "lat": 39.9042,
        "lng": 116.4074
      },
      "visitDate": "2023-05-15",
      "description": {
        "en": "Capital city of China",
        "zh": "中国首都"
      },
      "photos": [
        "images/photo1.jpg",
        "images/photo2.jpg"
      ],
      "tags": ["china", "capital", "2023"]
    }
  ]
}
```

#### 技术实现建议
- **地图库**: Leaflet.js（轻量级，免费）或 Mapbox GL JS（功能强大，需要API key）
- **照片展示**: 使用现有的图片查看器或创建新的画廊组件
- **数据存储**: JSON文件或Markdown front matter
- **响应式设计**: 确保移动端地图体验良好

---

**如需进一步讨论或修改，请随时提出！**

