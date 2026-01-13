# 地图服务使用说明

## 访客地图数据源

| Data Type | Source / API Provider | Usage in Website |
|-----------|----------------------|------------------|
| **Map Base Image** | NASA World Map (Local Image) | 使用本地存储的NASA世界地图图片作为底图，显示全球访客分布 |
| **Visitor Statistics** | Flag Counter API | 获取按国家/地区统计的访客数据，包括访问次数和国旗标识 |
| **Country Coordinates** | OpenStreetMap Nominatim API | 用于获取国家地理坐标（经纬度），将访客数据映射到地图上 |

---

## 详细说明

### 1. 地图底图
- **服务**: NASA World Map (本地图片)
- **类型**: 静态图片文件
- **位置**: `talkmap/images/world_map.jpg`
- **用途**: 作为访客地图的底图背景
- **特点**: 
  - 本地存储，无需API调用
  - 无使用限制
  - 加载速度快

### 2. 访客统计数据
- **服务**: Flag Counter
- **类型**: 免费访客统计服务
- **API**: `https://s11.flagcounter.com/count2/RXMK/...`
- **用途**: 
  - 统计按国家/地区的独立访客数（UV）
  - 显示页面浏览量（PV）
  - 提供国旗标识
- **特点**: 
  - 公共/免费服务
  - 无需API密钥
  - 实时更新

### 3. 国家坐标数据
- **服务**: OpenStreetMap Nominatim API
- **类型**: 地理编码服务
- **API**: `https://nominatim.openstreetmap.org/search?country=...`
- **用途**: 
  - 获取国家的地理坐标（经纬度）
  - 将访客标记定位到地图上的正确位置
- **特点**: 
  - 公共/免费服务
  - 需要遵守使用政策（Rate limiting）
  - 用于辅助工具（auto-country-coords.js）

---

## 技术实现

### 地图渲染方式
- **方法**: 静态图片 + JavaScript叠加标记
- **流程**:
  1. 加载本地NASA世界地图图片作为底图
  2. 从Flag Counter获取访客统计数据
  3. 使用国家坐标数据将访客标记定位到地图上
  4. 通过JavaScript动态创建红色圆形标记叠加在地图上

### 数据更新
- **访客数据**: 由Flag Counter自动更新
- **地图标记**: 通过硬编码的访客数据数组手动更新
- **国家坐标**: 使用OpenStreetMap Nominatim API获取（辅助工具）

---

## 注意事项

1. **NASA图片**: 本地存储，无需担心服务中断
2. **Flag Counter**: 免费服务，但可能有使用限制
3. **OpenStreetMap Nominatim**: 需要遵守使用政策，避免频繁请求

---

**最后更新**: 2026-01-01
