/**
 * Publications Renderer
 * 动态渲染论文列表（优化版：支持缓存、懒加载、错误处理）
 */

// 加载工具函数（支持 DataLoader、Fetch 以及本地 window.PUBLICATIONS_DATA 备选）
const loadData = async (url) => {
    if (typeof DataLoader !== 'undefined') {
        try {
            return await DataLoader.loadJSON(url);
        } catch (e) {
            if (typeof window !== 'undefined' && window.PUBLICATIONS_DATA) return window.PUBLICATIONS_DATA;
            throw e;
        }
    }
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (e) {
        if (typeof window !== 'undefined' && window.PUBLICATIONS_DATA) return window.PUBLICATIONS_DATA;
        throw e;
    }
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
    const idxEn = pub.venue.indexed
        ? ` <span class="text-muted">(${pub.venue.indexed.en})</span>`
        : '';
    venueEn.innerHTML = `<i>${pub.status.en}, </i><a href="${pub.venue.link}" target="_blank" class="text-primary"><i>${pub.venue.name.en}</i></a>${idxEn}`;
    
    const venueZh = document.createElement('span');
    venueZh.setAttribute('lang', 'zh');
    const idxZh = pub.venue.indexed
        ? ` <span class="text-muted">（${pub.venue.indexed.zh}）</span>`
        : '';
    venueZh.innerHTML = `<i>${pub.status.zh}，</i><a href="${pub.venue.link}" target="_blank" class="text-primary"><i>${pub.venue.name.zh}</i></a>${idxZh}`;
    
    venue.appendChild(venueEn);
    venue.appendChild(venueZh);
    
    contentCol.appendChild(title);
    contentCol.appendChild(authors);
    
    // 作者单位脚注（与正文脚注序号一致）
    const affBlock = buildAuthorAffiliationsBlock(pub.authors);
    if (affBlock) {
        contentCol.appendChild(affBlock);
    }
    
    contentCol.appendChild(venue);
    
    // 可选：PDF / 知网 / DOI / 谷歌学术等外链
    if (pub.links && (pub.links.pdf || pub.links.cnki || pub.links.doi || pub.links.scholar)) {
        const actions = document.createElement('p');
        actions.className = 'mt-2 mb-0';
        
        if (pub.links.doi) {
            const doiBtn = document.createElement('a');
            doiBtn.href = pub.links.doi;
            doiBtn.target = '_blank';
            doiBtn.rel = 'noopener noreferrer';
            doiBtn.className = 'btn btn-sm btn-outline-primary mr-2 mb-1';
            doiBtn.setAttribute('aria-label', 'Publisher / DOI');
            const doiIcon = document.createElement('i');
            doiIcon.className = 'fas fa-external-link-alt';
            doiBtn.appendChild(doiIcon);
            doiBtn.appendChild(document.createTextNode(' '));
            const doiEn = document.createElement('span');
            doiEn.setAttribute('lang', 'en');
            doiEn.textContent = 'Publisher / DOI';
            const doiZh = document.createElement('span');
            doiZh.setAttribute('lang', 'zh');
            doiZh.textContent = '期刊全文 / DOI';
            doiBtn.appendChild(doiEn);
            doiBtn.appendChild(doiZh);
            actions.appendChild(doiBtn);
        }

        if (pub.links.pdf) {
            const pdfBtn = document.createElement('a');
            pdfBtn.href = pub.links.pdf;
            pdfBtn.target = '_blank';
            pdfBtn.rel = 'noopener noreferrer';
            pdfBtn.className = 'btn btn-sm btn-outline-primary mr-2 mb-1';
            pdfBtn.setAttribute('aria-label', 'Open PDF');
            const pdfIcon = document.createElement('i');
            pdfIcon.className = 'fas fa-file-pdf';
            pdfBtn.appendChild(pdfIcon);
            pdfBtn.appendChild(document.createTextNode(' '));
            const pdfEn = document.createElement('span');
            pdfEn.setAttribute('lang', 'en');
            pdfEn.textContent = 'PDF';
            const pdfZh = document.createElement('span');
            pdfZh.setAttribute('lang', 'zh');
            pdfZh.textContent = 'PDF 全文';
            pdfBtn.appendChild(pdfEn);
            pdfBtn.appendChild(pdfZh);
            actions.appendChild(pdfBtn);
        }
        
        if (pub.links.cnki) {
            const cnkiBtn = document.createElement('a');
            cnkiBtn.href = pub.links.cnki;
            cnkiBtn.target = '_blank';
            cnkiBtn.rel = 'noopener noreferrer';
            cnkiBtn.className = 'btn btn-sm btn-outline-secondary mr-2 mb-1';
            cnkiBtn.setAttribute('aria-label', 'Open CNKI');
            const cnkiIcon = document.createElement('i');
            cnkiIcon.className = 'fas fa-external-link-alt';
            cnkiBtn.appendChild(cnkiIcon);
            cnkiBtn.appendChild(document.createTextNode(' '));
            const cnkiEn = document.createElement('span');
            cnkiEn.setAttribute('lang', 'en');
            cnkiEn.textContent = 'CNKI';
            const cnkiZh = document.createElement('span');
            cnkiZh.setAttribute('lang', 'zh');
            cnkiZh.textContent = '中国知网';
            cnkiBtn.appendChild(cnkiEn);
            cnkiBtn.appendChild(cnkiZh);
            actions.appendChild(cnkiBtn);
        }

        if (pub.links.scholar) {
            const scholarBtn = document.createElement('a');
            scholarBtn.href = pub.links.scholar;
            scholarBtn.target = '_blank';
            scholarBtn.rel = 'noopener noreferrer';
            scholarBtn.className = 'btn btn-sm btn-outline-secondary mr-2 mb-1';
            scholarBtn.setAttribute('aria-label', 'Google Scholar');
            const scholarIcon = document.createElement('i');
            scholarIcon.className = 'ai ai-google-scholar';
            scholarBtn.appendChild(scholarIcon);
            scholarBtn.appendChild(document.createTextNode(' '));
            const scholarEn = document.createElement('span');
            scholarEn.setAttribute('lang', 'en');
            scholarEn.textContent = 'Google Scholar';
            const scholarZh = document.createElement('span');
            scholarZh.setAttribute('lang', 'zh');
            scholarZh.textContent = '谷歌学术';
            scholarBtn.appendChild(scholarEn);
            scholarBtn.appendChild(scholarZh);
            actions.appendChild(scholarBtn);
        }
        
        contentCol.appendChild(actions);
    }
    
    card.appendChild(imageCol);
    card.appendChild(contentCol);
    
    return card;
}

function buildAuthorAffiliationsBlock(authors) {
    const uniqueAffiliations = new Map();
    authors.forEach((author) => {
        if (!author.orgIndex || (!author.affiliationEn && !author.affiliationZh)) return;
        const key = `${author.orgIndex}|${author.affiliationEn || ''}|${author.affiliationZh || ''}`;
        if (!uniqueAffiliations.has(key)) uniqueAffiliations.set(key, author);
    });
    const lines = Array.from(uniqueAffiliations.values())
        .sort((a, b) => (a.orgIndex || 0) - (b.orgIndex || 0));
    if (!lines.length) {
        return null;
    }
    const wrap = document.createElement('p');
    wrap.className = 'mb-2 small text-muted';
    const en = document.createElement('span');
    en.setAttribute('lang', 'en');
    en.innerHTML = lines
        .map((a) => `<span class="text-nowrap">${a.orgIndex}. ${a.affiliationEn || ''}</span>`)
        .join('<br>');
    const zh = document.createElement('span');
    zh.setAttribute('lang', 'zh');
    zh.innerHTML = lines
        .map((a) => `<span class="text-nowrap">${a.orgIndex}. ${a.affiliationZh || ''}</span>`)
        .join('<br>');
    wrap.appendChild(en);
    wrap.appendChild(zh);
    return wrap;
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
        
        if (author.orgIndex) {
            html += `<sup>${author.orgIndex}</sup>`;
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
