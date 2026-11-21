/**
 * Global Academic Places & Trajectories Data
 * 供 3D 地球与 2D 交互地图零延迟、零 CORS 跨域直读
 * 包含求学履历、学术会议、野外样区、访学旅行与轨迹流动连线
 */
window.GLOBE_PLACES_DATA = {
  "version": "2.0",
  "author": "Jiale Guo (郭家乐)",
  "lastUpdated": "2026-11-18",
  "categories": [
    {
      "id": "all",
      "labelEn": "All",
      "labelZh": "全部",
      "color": "#38bdf8"
    },
    {
      "id": "academic",
      "labelEn": "Education & Work",
      "labelZh": "求学与工作",
      "color": "#38bdf8"
    },
    {
      "id": "conference",
      "labelEn": "Conferences & Talks",
      "labelZh": "会议与报告",
      "color": "#f59e0b"
    },
    {
      "id": "fieldwork",
      "labelEn": "Fieldwork Sites",
      "labelZh": "野外考察样区",
      "color": "#10b981"
    },
    {
      "id": "footprint",
      "labelEn": "Travel & Photos",
      "labelZh": "访学旅行",
      "color": "#ec4899"
    }
  ],
  "places": [
    {
      "id": "phd-dads",
      "category": "academic",
      "name": "Ph.D. Study (DADS Program)",
      "nameZh": "公派留学博士 (DADS 项目)",
      "institution": "Data Analytics and Decision Sciences (DADS)",
      "institutionZh": "数据分析与决策科学博士项目 (CSC 资助)",
      "lat": 45.4781,
      "lng": 9.2275,
      "altitude": 0.06,
      "period": "2027 - 2031 (Expected)",
      "titleEn": "Ph.D. Student in Data Analytics & Decision Sciences",
      "titleZh": "公派留学博士生 (CSC 资助)",
      "descriptionEn": "Ph.D. research sponsored by China Scholarship Council (CSC). Research focus: Geospatial Big Data, Health Geography, Environmental & Heat Exposure, Human Mobility, Geospatial Foundation Models.",
      "descriptionZh": "国家留学基金委（CSC）资助公派留学博士项目。研究方向涵盖地理时空大数据、健康地理、环境暴露、热暴露、人类移动性与地理空间基础模型。",
      "badge": "Incoming Ph.D. / 博士阶段",
      "image": null,
      "isHub": true
    },
    {
      "id": "milan-polimi",
      "category": "academic",
      "name": "Milan, Italy",
      "nameZh": "意大利，米兰",
      "institution": "Politecnico di Milano",
      "institutionZh": "米兰理工大学",
      "lat": 45.4781,
      "lng": 9.2275,
      "altitude": 0.05,
      "period": "09.2024 - 2026",
      "titleEn": "M.S. in Geoinformatics Engineering",
      "titleZh": "地理信息工程硕士在读",
      "descriptionEn": "Master student in Geoinformatics Engineering at Politecnico di Milano. Research on GeoAI, multimodal urban perception, human mobility, and spatial computing.",
      "descriptionZh": "米兰理工大学地理信息工程硕士在读，研究方向为空间人工智能（GeoAI）、多模态城市感知、人类移动性与空间计算。",
      "badge": "Current / 硕士就读",
      "image": "images/institutions/polimi.png",
      "isHub": true
    },
    {
      "id": "lanzhou-cas",
      "category": "academic",
      "name": "Lanzhou, China",
      "nameZh": "中国，兰州",
      "institution": "Chinese Academy of Sciences",
      "institutionZh": "中国科学院",
      "lat": 36.0611,
      "lng": 103.8343,
      "altitude": 0.04,
      "period": "10.2021 - 06.2022",
      "titleEn": "Research Assistant - SHUD Lab",
      "titleZh": "研究助理 - SHUD水文实验室",
      "descriptionEn": "Hydrological simulation and eco-environmental modeling using SHUD and SWAT models for the Qinghai Lake basin.",
      "descriptionZh": "在中国科学院寒区旱区环境与工程研究所开展水文模拟研究，运用 SHUD 与 SWAT 模型模拟青海湖流域水循环过程。",
      "badge": "Research / 科研助理",
      "image": "images/institutions/CAS.png"
    },
    {
      "id": "qinghai-lake",
      "category": "fieldwork",
      "name": "Qinghai Lake Watershed, China",
      "nameZh": "青海湖流域",
      "institution": "Field Observation & Watershed Modeling",
      "institutionZh": "流域生态水文野外样区",
      "lat": 36.9,
      "lng": 100.16,
      "altitude": 0.03,
      "period": "2021 - 2022",
      "titleEn": "Watershed Hydrological Modeling",
      "titleZh": "流域水文生态模拟研究",
      "descriptionEn": "Field observations and land-use hydrological response analysis in the Qinghai Lake alpine watershed.",
      "descriptionZh": "针对青海湖流域高寒生态系统，研究土地利用变化对流域产汇流水文过程的影响机制。",
      "badge": "Field Site / 野外样区",
      "image": "images/books/shud_cover.png"
    },
    {
      "id": "suzhou-sip",
      "category": "academic",
      "name": "Suzhou, China",
      "nameZh": "中国，苏州",
      "institution": "Suzhou Industrial Park Surveying & Mapping Co., Ltd.",
      "institutionZh": "苏州工业园区测绘地理信息有限公司",
      "lat": 31.2989,
      "lng": 120.6726,
      "altitude": 0.04,
      "period": "01.2023 - 07.2024",
      "titleEn": "Geospatial Data Engineer",
      "titleZh": "地理空间数据工程师",
      "descriptionEn": "Remote sensing imagery processing, land cover classification, and spatial big data engineering (Top 5% Outstanding Employee).",
      "descriptionZh": "从事高分辨率遥感影像解译、林地湿地要素提取与自然资源空间数据工程工作，荣获优秀新员工（前5%）。",
      "badge": "Work / 工作经历",
      "image": "images/institutions/sipsg_logo.png"
    },
    {
      "id": "cuhk",
      "category": "academic",
      "name": "Hong Kong, China",
      "nameZh": "中国香港",
      "institution": "The Chinese University of Hong Kong",
      "institutionZh": "香港中文大学",
      "lat": 22.4167,
      "lng": 114.21,
      "altitude": 0.04,
      "period": "Academic Collaboration",
      "titleEn": "Joint Training & Collaboration",
      "titleZh": "联合培养与合作",
      "descriptionEn": "Academic joint training and research collaboration at The Chinese University of Hong Kong.",
      "descriptionZh": "在香港中文大学开展学术联合培养与研究合作。",
      "badge": "Collaboration / 合作交流",
      "image": "images/institutions/cuhk.png"
    },
    {
      "id": "chuzhou-university",
      "category": "academic",
      "name": "Chuzhou, China",
      "nameZh": "中国，滁州",
      "institution": "Chuzhou University",
      "institutionZh": "滁州学院",
      "lat": 32.3013,
      "lng": 118.3171,
      "altitude": 0.04,
      "period": "09.2017 - 06.2021",
      "titleEn": "B.A. in Geography",
      "titleZh": "地理科学学士",
      "descriptionEn": "Bachelor degree in Geography. Thesis on 3D GIS spatio-temporal PM2.5 pattern mining and meteorological drought analysis in Jianghuai Watershed.",
      "descriptionZh": "毕业于滁州学院地理科学专业。开展基于3D GIS的PM2.5时空演变分析，以及江淮分水岭干旱特征与农田塘坝系统研究。",
      "badge": "Education / 本科阶段",
      "image": "images/institutions/chuzhou university.png"
    },
    {
      "id": "xiamen-gis2025",
      "category": "conference",
      "name": "Xiamen, China",
      "nameZh": "中国，厦门",
      "institution": "GIS 2025 Annual Conference",
      "institutionZh": "第二十届地理信息科学理论与方法学术年会",
      "lat": 24.4798,
      "lng": 118.0894,
      "altitude": 0.04,
      "period": "Nov 2025",
      "titleEn": "GIS Theory and Methods Annual Conference",
      "titleZh": "第二十届地理信息科学理论与方法学术年会",
      "descriptionEn": "Attended conference sessions on geospatial information theory and smart society applications.",
      "descriptionZh": "参加第二十届地理信息科学理论与方法学术年会，交流地理空间信息赋能智慧社会前沿议题。",
      "badge": "Conference / 学术会议",
      "image": "presentations/Conferences/GIS2025/"
    },
    {
      "id": "xian-geosus2025",
      "category": "conference",
      "name": "Xi'an, China",
      "nameZh": "中国，西安",
      "institution": "GEOSUS 2025 International Conference",
      "institutionZh": "2025年地理学与可持续发展国际会议",
      "lat": 34.3416,
      "lng": 108.9398,
      "altitude": 0.04,
      "period": "Oct 2025",
      "titleEn": "Geography and Sustainability Conference",
      "titleZh": "2025年地理学与可持续发展国际会议",
      "descriptionEn": "Participated in discussions on human-environment interactions and geographical sustainability.",
      "descriptionZh": "参加2025年地理学与可持续发展国际会议，参与人地系统耦合与可持续发展研讨。",
      "badge": "Conference / 国际会议",
      "image": "presentations/Conferences/GEOSUS2025/"
    },
    {
      "id": "beijing-gsoc-seminar",
      "category": "conference",
      "name": "Beijing / Virtual",
      "nameZh": "北京 / 线上研讨",
      "institution": "ABMind & Mesa GSoC 2026 Program",
      "institutionZh": "ABMind GSoC 2026 Mesa 培训项目",
      "lat": 39.9042,
      "lng": 116.4074,
      "altitude": 0.04,
      "period": "Jan 2026",
      "titleEn": "Invited Seminar: AI-Driven Research Programming",
      "titleZh": "特邀讲座：AI驱动科研编程实战指南",
      "descriptionEn": "Technical presentation on research programming and agent-based modeling (Mesa) for GSoC 2026 participants.",
      "descriptionZh": "受邀为主讲 ABMind 2026 谷歌编程之夏（GSoC）培训项目作关于科研编程与智能体建模（Mesa）的专题讲座。",
      "badge": "Invited Talk / 特邀讲座",
      "image": null
    },
    {
      "id": "como-alps",
      "category": "footprint",
      "name": "Lake Como & Italian Alps",
      "nameZh": "意大利，科莫湖与阿尔卑斯山前",
      "institution": "Geomorphology & Alpine Landscape",
      "institutionZh": "阿尔卑斯地貌与人居环境考察",
      "lat": 45.8081,
      "lng": 9.0852,
      "altitude": 0.03,
      "period": "2024 - 2025",
      "titleEn": "Alpine Landscape Study",
      "titleZh": "阿尔卑斯山前湖泊与聚落地貌考察",
      "descriptionEn": "Field observation of alpine glacial geomorphology and human settlements around Lake Como.",
      "descriptionZh": "考察阿尔卑斯前沿冰蚀湖泊地貌特征与山地人居聚落空间形态。",
      "badge": "Field Trip / 考察与摄影",
      "image": null
    }
  ],
  "trajectories": [
    {
      "from": "chuzhou-university",
      "to": "lanzhou-cas",
      "label": "2021: Chuzhou -> CAS Lanzhou",
      "color": "rgba(56, 189, 248, 0.7)"
    },
    {
      "from": "lanzhou-cas",
      "to": "suzhou-sip",
      "label": "2023: CAS -> Suzhou Industrial Park",
      "color": "rgba(56, 189, 248, 0.7)"
    },
    {
      "from": "suzhou-sip",
      "to": "cuhk",
      "label": "Suzhou -> CUHK Joint Training & Collaboration",
      "color": "rgba(56, 189, 248, 0.7)"
    },
    {
      "from": "cuhk",
      "to": "milan-polimi",
      "label": "2024: CUHK -> Politecnico di Milano",
      "color": "rgba(245, 158, 11, 0.85)"
    },
    {
      "from": "milan-polimi",
      "to": "phd-dads",
      "label": "2027: Polimi -> CSC DADS Ph.D.",
      "color": "rgba(16, 185, 129, 0.85)"
    },
    {
      "from": "milan-polimi",
      "to": "xian-geosus2025",
      "label": "2025: Milan -> Xi'an (GEOSUS 2025)",
      "color": "rgba(56, 189, 248, 0.7)"
    },
    {
      "from": "milan-polimi",
      "to": "xiamen-gis2025",
      "label": "2025: Milan -> Xiamen (GIS 2025)",
      "color": "rgba(56, 189, 248, 0.7)"
    },
    {
      "from": "milan-polimi",
      "to": "beijing-gsoc-seminar",
      "label": "2026: Milan -> Beijing (ABMind Seminar)",
      "color": "rgba(245, 158, 11, 0.7)"
    }
  ]
};
