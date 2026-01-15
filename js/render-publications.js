/**
 * Publications Renderer
 * 动态渲染论文列表（优化版：支持缓存、懒加载、错误处理）
 */

// 加载工具函数（如果已加载）
const loadData = typeof DataLoader !== 'undefined' 
    ? (url) => DataLoader.loadJSON(url)
    : async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };

async function renderPublications() {
    const container = document.getElementById('publications-container');
    if (!container) {
        console.warn('Publications container not found');
        return;
    }
    
    // 显示加载状态
    if (typeof LoadingState !== 'undefined') {
        LoadingState.show(container);
    }
    
    try {
        const data = await loadData('data/publications.json');
        
        // 检查数据是否为空
        if (!data.publications || data.publications.length === 0) {
            if (typeof LoadingState !== 'undefined') {
                LoadingState.showEmpty(container);
            } else {
                container.innerHTML = '<p class="text-muted text-center py-4">No publications available.</p>';
            }
            return;
        }
        
        // 按年份分组
        const publicationsByYear = {};
        data.publications.forEach(pub => {
            if (!publicationsByYear[pub.year]) {
                publicationsByYear[pub.year] = [];
            }
            publicationsByYear[pub.year].push(pub);
        });
        
        // 按年份降序排列
        const years = Object.keys(publicationsByYear).sort((a, b) => b - a);
        
        // 清空容器
        container.innerHTML = '';
        
        // 渲染每年的论文
        years.forEach(year => {
            const yearSection = createYearSection(year, publicationsByYear[year]);
            container.appendChild(yearSection);
        });
        
        // 初始化懒加载
        if (typeof LazyLoad !== 'undefined') {
            LazyLoad.init();
        }
        
        // 添加SEO结构化数据
        if (typeof SEO !== 'undefined') {
            SEO.addPublicationsStructuredData(data.publications);
        }
        
    } catch (error) {
        console.error('Error loading publications:', error);
        if (typeof LoadingState !== 'undefined') {
            LoadingState.showError(container);
        } else {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <span lang="en">Failed to load publications. Please refresh the page.</span>
                    <span lang="zh">加载论文列表失败，请刷新页面。</span>
                </div>
            `;
        }
    }
}

function createYearSection(year, publications) {
    const section = document.createElement('div');
    section.className = 'mb-4';
    
    const yearHeader = document.createElement('h6');
    yearHeader.className = 'text-muted mb-3';
    yearHeader.textContent = year;
    
    section.appendChild(yearHeader);
    
    publications.forEach(publication => {
        const paperCard = createPublicationCard(publication);
        section.appendChild(paperCard);
    });
    
    return section;
}

function createPublicationCard(pub) {
    const card = document.createElement('div');
    card.className = 'row no-gutters border-bottom border-gray mb-3 pb-3';
    
    // 图片列
    const imageCol = document.createElement('div');
    imageCol.className = 'col-md-4 col-xl-3 mb-md-0 p-md-3';
    
    const imageLink = document.createElement('a');
    imageLink.href = pub.detailPage;
    imageLink.className = 'paper-image-link';
    
    const image = document.createElement('img');
    image.alt = pub.image.alt.en;
    image.className = 'w-100 rounded-sm';
    
    // 使用懒加载
    if (typeof LazyLoad !== 'undefined') {
        LazyLoad.setupImage(image, pub.image.src, pub.image.alt.en);
    } else {
        image.src = pub.image.src;
        image.loading = 'lazy';
        image.onerror = function() {
            this.src = 'images/placeholder.svg';
        };
    }
    
    imageLink.appendChild(image);
    imageCol.appendChild(imageLink);
    
    // 内容列
    const contentCol = document.createElement('div');
    contentCol.className = 'col-md-8 col-xl-9 p-3 pl-md-0';
    
    // 标题
    const title = document.createElement('h5');
    title.className = 'mt-0 mb-1 font-weight-normal';
    
    const titleLink = document.createElement('a');
    titleLink.href = pub.detailPage;
    titleLink.className = 'paper-link';
    
    const titleEn = document.createElement('span');
    titleEn.setAttribute('lang', 'en');
    titleEn.textContent = pub.title.en;
    
    const titleZh = document.createElement('span');
    titleZh.setAttribute('lang', 'zh');
    titleZh.textContent = pub.title.zh;
    
    titleLink.appendChild(titleEn);
    titleLink.appendChild(titleZh);
    title.appendChild(titleLink);
    
    // 作者
    const authors = document.createElement('p');
    authors.className = 'mt-0 mb-0 small';
    
    const authorsEn = document.createElement('span');
    authorsEn.setAttribute('lang', 'en');
    authorsEn.innerHTML = formatAuthors(pub.authors, 'en');
    
    const authorsZh = document.createElement('span');
    authorsZh.setAttribute('lang', 'zh');
    authorsZh.innerHTML = formatAuthors(pub.authors, 'zh');
    
    authors.appendChild(authorsEn);
    authors.appendChild(authorsZh);
    
    // 期刊/会议信息
    const venue = document.createElement('p');
    venue.className = 'mt-2 mb-0 small';
    
    const venueEn = document.createElement('span');
    venueEn.setAttribute('lang', 'en');
    venueEn.innerHTML = `<i>${pub.status.en}, </i><a href="${pub.venue.link}" target="_blank" class="text-primary"><i>${pub.venue.name.en}</i></a>`;
    
    const venueZh = document.createElement('span');
    venueZh.setAttribute('lang', 'zh');
    venueZh.innerHTML = `<i>${pub.status.zh}，</i><a href="${pub.venue.link}" target="_blank" class="text-primary"><i>${pub.venue.name.zh}</i></a>`;
    
    venue.appendChild(venueEn);
    venue.appendChild(venueZh);
    
    contentCol.appendChild(title);
    contentCol.appendChild(authors);
    contentCol.appendChild(venue);
    
    card.appendChild(imageCol);
    card.appendChild(contentCol);
    
    return card;
}

function formatAuthors(authors, lang) {
    return authors.map((author, index) => {
        const name = lang === 'zh' ? (author.nameZh || author.name) : author.name;
        const isLast = index === authors.length - 1;
        const isCorresponding = author.corresponding;
        
        let html = '';
        if (author.link) {
            html = `<a href="${author.link}" target="_blank" class="text-dark">${name}</a>`;
        } else {
            html = name;
        }
        
        if (author.isMe) {
            html = `<strong>${html}</strong>`;
        }
        
        if (isCorresponding) {
            html += `<span style="background-color: #fffacd;">#</span>`;
            if (lang === 'en') {
                html += ` <span style="background-color: #fffacd;">(# corresponding author)</span>`;
            } else {
                html += ` <span style="background-color: #fffacd;">(# 通讯作者)</span>`;
            }
        }
        
        if (!isLast) {
            html += lang === 'zh' ? '，' : ', ';
        }
        
        return html;
    }).join('');
}

// 页面加载完成后渲染
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPublications);
} else {
    renderPublications();
}
