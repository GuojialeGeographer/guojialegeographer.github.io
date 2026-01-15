/**
 * Presentations Renderer
 * 动态渲染演示文稿列表（按类别分区：Conference / Course / Seminar）
 */

// 数据加载工具
const loadPresentationsData = typeof DataLoader !== 'undefined'
    ? (url) => DataLoader.loadJSON(url)
    : async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };

let allPresentations = [];

// 固定的分区配置
const PRESENTATION_SECTIONS = [
    {
        id: 'conference',
        titleEn: 'Conferences & Academic Presentations',
        titleZh: '学术会议与学术报告',
        descriptionEn: 'Conference talks and academic presentations.',
        descriptionZh: '学术会议报告与学术演讲。'
    },
    {
        id: 'course',
        titleEn: 'Course Lectures',
        titleZh: '课程讲授',
        descriptionEn: 'Course-related lectures and in-class presentations.',
        descriptionZh: '课程相关的课堂讲授与课程展示。'
    },
    {
        id: 'seminar',
        titleEn: 'Seminars & Community Talks',
        titleZh: '研讨会与社区分享',
        descriptionEn: 'Invited seminars and community / open-source related sharing.',
        descriptionZh: '受邀研讨会及社区 / 开源相关分享。'
    }
];

async function renderPresentations() {
    const container = document.getElementById('presentations-container');
    if (!container) {
        console.warn('Presentations container not found');
        return;
    }

    // 显示加载状态
    if (typeof LoadingState !== 'undefined') {
        LoadingState.show(container);
    }

    try {
        const data = await loadPresentationsData('data/presentations.json');

        if (!data.presentations || data.presentations.length === 0) {
            if (typeof LoadingState !== 'undefined') {
                LoadingState.showEmpty(container);
            } else {
                container.innerHTML = '<p class="text-muted text-center py-4">No presentations available.</p>';
            }
            return;
        }

        // 保存并按 order 排序
        allPresentations = data.presentations.slice().sort((a, b) => (a.order || 0) - (b.order || 0));

        // 按 type 分组（conference / course / seminar）
        const grouped = PRESENTATION_SECTIONS.reduce((acc, sec) => {
            acc[sec.id] = [];
            return acc;
        }, {});

        allPresentations.forEach(p => {
            const key = p.type || 'conference';
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(p);
        });

        // 渲染分区
        renderSections(container, grouped);

        // 初始化标签按钮行为（高亮分区而不是过滤单个卡片）
        initSectionFilters();

        // 懒加载
        if (typeof LazyLoad !== 'undefined') {
            LazyLoad.init();
        }

    } catch (error) {
        console.error('Error loading presentations:', error);
        if (typeof LoadingState !== 'undefined') {
            LoadingState.showError(container);
        } else {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <span lang="en">Failed to load presentations. Please refresh the page.</span>
                    <span lang="zh">加载演示文稿列表失败，请刷新页面。</span>
                </div>
            `;
        }
    }
}

function renderSections(container, grouped) {
    container.innerHTML = '';

    PRESENTATION_SECTIONS.forEach(section => {
        const items = grouped[section.id] || [];
        if (items.length === 0) return; // 没有该类别则跳过

        const sectionWrapper = document.createElement('div');
        sectionWrapper.className = 'presentation-section mb-5';
        sectionWrapper.setAttribute('data-category', section.id);

        // 标题与说明
        const header = document.createElement('div');
        header.className = 'mb-3';

        const h6 = document.createElement('h6');
        h6.className = 'mb-1';

        const titleEn = document.createElement('span');
        titleEn.setAttribute('lang', 'en');
        titleEn.textContent = section.titleEn;

        const titleZh = document.createElement('span');
        titleZh.setAttribute('lang', 'zh');
        titleZh.textContent = section.titleZh;

        h6.appendChild(titleEn);
        h6.appendChild(titleZh);

        const desc = document.createElement('p');
        desc.className = 'small text-muted mb-0';

        const descEn = document.createElement('span');
        descEn.setAttribute('lang', 'en');
        descEn.textContent = section.descriptionEn;

        const descZh = document.createElement('span');
        descZh.setAttribute('lang', 'zh');
        descZh.textContent = section.descriptionZh;

        desc.appendChild(descEn);
        desc.appendChild(descZh);

        header.appendChild(h6);
        header.appendChild(desc);
        sectionWrapper.appendChild(header);

        // 卡片列表
        const row = document.createElement('div');
        row.className = 'row';

        items.forEach(presentation => {
            const col = createPresentationCard(presentation);
            row.appendChild(col);
        });

        sectionWrapper.appendChild(row);
        container.appendChild(sectionWrapper);
    });
}

function initSectionFilters() {
    const filterButtons = document.querySelectorAll('.tag-btn[data-tag]');
    const sections = document.querySelectorAll('.presentation-section');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');

            // 更新按钮状态
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 显示/隐藏分区
            sections.forEach(section => {
                const cat = section.getAttribute('data-category');
                if (tag === 'all' || tag === cat) {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            });

            // 将第一个可见分区滚动到视口
            const firstVisible = Array.from(sections).find(sec => sec.style.display !== 'none');
            if (firstVisible) {
                firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function createPresentationCard(presentation) {
    const col = document.createElement('div');
    col.className = 'col-md-10 col-lg-8 mx-auto presentation-item mb-4';

    const card = document.createElement('div');
    card.className = 'card presentation-card';

    // 图片
    if (presentation.image) {
        const img = document.createElement('img');
        img.className = 'presentation-cover';
        img.alt = presentation.image.alt.en;

        if (typeof LazyLoad !== 'undefined') {
            LazyLoad.setupImage(img, presentation.image.src, presentation.image.alt.en);
        } else {
            img.src = presentation.image.src;
            img.loading = 'lazy';
            img.onerror = function() {
                this.src = 'images/placeholder.svg';
            };
        }

        card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'card-body';

    // 边框颜色（根据类型）
    const typeColorMap = {
        'conference': '#007bff',
        'course': '#28a745',
        'seminar': '#ffc107',
        'workshop': '#17a2b8',
        'project': '#6f42c1'
    };
    const borderColor = presentation.tagColor || typeColorMap[presentation.type];
    if (borderColor && !presentation.image) {
        body.style.borderLeft = `4px solid ${borderColor}`;
        body.style.paddingLeft = '1.25rem';
    }

    // 标签
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'presentation-tags';

    const tag = document.createElement('span');
    tag.className = 'tag';
    if (borderColor) {
        tag.style.backgroundColor = borderColor;
        tag.style.color = 'white';
    }

    const icon = document.createElement('i');
    const iconMap = {
        'conference': 'fas fa-users',
        'course': 'fas fa-graduation-cap',
        'seminar': 'fas fa-chalkboard-teacher',
        'workshop': 'fas fa-tools',
        'project': 'fas fa-project-diagram'
    };
    icon.className = iconMap[presentation.type] || 'fas fa-presentation';
    tag.appendChild(icon);
    tag.appendChild(document.createTextNode(' '));

    const tagEn = document.createElement('span');
    tagEn.setAttribute('lang', 'en');
    tagEn.textContent = presentation.type.charAt(0).toUpperCase() + presentation.type.slice(1);

    const tagZh = document.createElement('span');
    tagZh.setAttribute('lang', 'zh');
    const tagZhMap = {
        'conference': '会议',
        'course': '课程',
        'seminar': '研讨会',
        'workshop': '工作坊',
        'project': '项目'
    };
    tagZh.textContent = tagZhMap[presentation.type] || presentation.type;

    tag.appendChild(tagEn);
    tag.appendChild(tagZh);
    tagsDiv.appendChild(tag);
    body.appendChild(tagsDiv);

    // 标题
    const title = document.createElement('h5');
    title.className = 'card-title';

    const hasDetailsLink = presentation.links && presentation.links[0] && presentation.links[0].type === 'details';
    if (hasDetailsLink) {
        const titleLink = document.createElement('a');
        titleLink.href = presentation.links[0].url;
        titleLink.className = 'text-dark';

        const titleEn = document.createElement('span');
        titleEn.setAttribute('lang', 'en');
        titleEn.textContent = presentation.title.en;

        const titleZh = document.createElement('span');
        titleZh.setAttribute('lang', 'zh');
        titleZh.textContent = presentation.title.zh;

        titleLink.appendChild(titleEn);
        titleLink.appendChild(titleZh);
        title.appendChild(titleLink);
    } else {
        const titleEn = document.createElement('span');
        titleEn.setAttribute('lang', 'en');
        titleEn.textContent = presentation.title.en;

        const titleZh = document.createElement('span');
        titleZh.setAttribute('lang', 'zh');
        titleZh.textContent = presentation.title.zh;

        title.appendChild(titleEn);
        title.appendChild(titleZh);
    }
    body.appendChild(title);

    // 副标题（如 ABMind 研讨会）
    if (presentation.subtitle) {
        const subtitle = document.createElement('p');
        subtitle.className = 'card-text small text-muted';

        const subtitleEn = document.createElement('span');
        subtitleEn.setAttribute('lang', 'en');
        subtitleEn.textContent = presentation.subtitle.en;

        const subtitleZh = document.createElement('span');
        subtitleZh.setAttribute('lang', 'zh');
        subtitleZh.textContent = presentation.subtitle.zh;

        subtitle.appendChild(subtitleEn);
        subtitle.appendChild(subtitleZh);
        body.appendChild(subtitle);
    }

    // 日期 + 地点
    if (presentation.date || presentation.location) {
        const dateInfo = document.createElement('p');
        dateInfo.className = 'card-text small text-muted';

        if (presentation.date) {
            const calendarIcon = document.createElement('i');
            calendarIcon.className = 'fas fa-calendar';
            dateInfo.appendChild(calendarIcon);

            const dateEn = document.createElement('span');
            dateEn.setAttribute('lang', 'en');
            dateEn.textContent = ` ${presentation.date.en}`;

            const dateZh = document.createElement('span');
            dateZh.setAttribute('lang', 'zh');
            dateZh.textContent = ` ${presentation.date.zh}`;

            dateInfo.appendChild(dateEn);
            dateInfo.appendChild(dateZh);
        }

        if (presentation.location) {
            const locationSpan = document.createElement('span');
            locationSpan.className = 'ml-3';

            const locationIcon = document.createElement('i');
            locationIcon.className = 'fas fa-map-marker-alt';
            locationSpan.appendChild(locationIcon);

            const locEn = document.createElement('span');
            locEn.setAttribute('lang', 'en');
            locEn.textContent = ` ${presentation.location.en}`;

            const locZh = document.createElement('span');
            locZh.setAttribute('lang', 'zh');
            locZh.textContent = ` ${presentation.location.zh}`;

            locationSpan.appendChild(locEn);
            locationSpan.appendChild(locZh);
            dateInfo.appendChild(locationSpan);
        }

        body.appendChild(dateInfo);
    }

    // 主题
    if (presentation.theme) {
        const theme = document.createElement('p');
        theme.className = 'card-text';

        const strong = document.createElement('strong');
        const labelEn = document.createElement('span');
        labelEn.setAttribute('lang', 'en');
        labelEn.textContent = 'Theme:';
        const labelZh = document.createElement('span');
        labelZh.setAttribute('lang', 'zh');
        labelZh.textContent = '主题：';
        strong.appendChild(labelEn);
        strong.appendChild(document.createTextNode(' '));
        strong.appendChild(labelZh);

        theme.appendChild(strong);

        const themeEn = document.createElement('span');
        themeEn.setAttribute('lang', 'en');
        themeEn.textContent = ` ${presentation.theme.en}`;
        const themeZh = document.createElement('span');
        themeZh.setAttribute('lang', 'zh');
        themeZh.textContent = ` ${presentation.theme.zh}`;

        theme.appendChild(themeEn);
        theme.appendChild(themeZh);
        body.appendChild(theme);
    }

    // 描述
    if (presentation.description) {
        const desc = document.createElement('p');
        desc.className = 'card-text small';

        const descEn = document.createElement('span');
        descEn.setAttribute('lang', 'en');
        descEn.textContent = presentation.description.en;

        const descZh = document.createElement('span');
        descZh.setAttribute('lang', 'zh');
        descZh.textContent = presentation.description.zh;

        desc.appendChild(descEn);
        desc.appendChild(descZh);
        body.appendChild(desc);
    }

    // 链接按钮
    if (presentation.links && presentation.links.length > 0) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'd-flex flex-wrap mt-3';

        presentation.links.forEach(link => {
            // details 已在标题中使用
            if (link.type === 'details') return;

            const btn = document.createElement('a');
            btn.href = link.url;
            btn.target = '_blank';
            btn.className = 'btn btn-sm btn-outline-primary mr-2 mb-2';

            if (link.lang) {
                btn.setAttribute('lang', link.lang);
            }

            if (link.icon) {
                const icon = document.createElement('i');
                icon.className = link.icon;
                btn.appendChild(icon);
                btn.appendChild(document.createTextNode(' '));
            }

            const textEn = document.createElement('span');
            textEn.setAttribute('lang', 'en');
            textEn.textContent = link.text.en;

            const textZh = document.createElement('span');
            textZh.setAttribute('lang', 'zh');
            textZh.textContent = link.text.zh;

            btn.appendChild(textEn);
            btn.appendChild(textZh);
            linksDiv.appendChild(btn);
        });

        if (linksDiv.children.length > 0) {
            body.appendChild(linksDiv);
        }
    }

    card.appendChild(body);
    col.appendChild(card);
    return col;
}

// 页面加载完成后渲染
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPresentations);
} else {
    renderPresentations();
}
