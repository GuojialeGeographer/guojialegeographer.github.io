/**
 * News Renderer
 * 动态渲染新闻列表（优化版：支持缓存、错误处理）
 */

// 加载工具函数（如果已加载）
const loadData = typeof DataLoader !== 'undefined' 
    ? (url) => DataLoader.loadJSON(url)
    : async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };

async function renderNews() {
    const container = document.getElementById('news-container');
    if (!container) {
        console.warn('News container not found');
        return;
    }
    
    // 显示加载状态
    if (typeof LoadingState !== 'undefined') {
        LoadingState.show(container);
    }
    
    try {
        const data = await loadData('data/news.json');
        
        // 检查数据是否为空
        if (!data.news || data.news.length === 0) {
            if (typeof LoadingState !== 'undefined') {
                LoadingState.showEmpty(container);
            } else {
                container.innerHTML = '<p class="text-muted text-center py-4">No news available.</p>';
            }
            return;
        }
        
        // 按年份分组
        const newsByYear = {};
        data.news.forEach(item => {
            if (!newsByYear[item.year]) {
                newsByYear[item.year] = [];
            }
            newsByYear[item.year].push(item);
        });
        
        // 按年份降序排列
        const years = Object.keys(newsByYear).sort((a, b) => b - a);
        
        // 清空容器
        container.innerHTML = '';
        
        // 渲染每年的新闻
        years.forEach(year => {
            const yearNews = newsByYear[year];
            // 按月份降序排列（如果有月份）
            yearNews.sort((a, b) => {
                if (a.month === null && b.month === null) return 0;
                if (a.month === null) return 1;
                if (b.month === null) return -1;
                return b.month - a.month;
            });
            
            yearNews.forEach(newsItem => {
                const newsCard = createNewsCard(year, newsItem);
                container.appendChild(newsCard);
            });
        });
        
    } catch (error) {
        console.error('Error loading news:', error);
        if (typeof LoadingState !== 'undefined') {
            LoadingState.showError(container);
        } else {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <span lang="en">Failed to load news. Please refresh the page.</span>
                    <span lang="zh">加载新闻列表失败，请刷新页面。</span>
                </div>
            `;
        }
    }
}

function createNewsCard(year, newsItem) {
    const card = document.createElement('div');
    card.className = 'media py-1';
    
    // 年份标签
    const yearLabel = document.createElement('div');
    yearLabel.className = 'mr-3 text-muted my-1';
    yearLabel.textContent = year;
    
    // 内容区域
    const mediaBody = document.createElement('div');
    mediaBody.className = 'media-body';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'my-1 d-flex';
    
    // 新闻内容
    const contentWrapper = document.createElement('div');
    
    const contentEn = document.createElement('span');
    contentEn.setAttribute('lang', 'en');
    contentEn.innerHTML = newsItem.content.en;
    
    const contentZh = document.createElement('span');
    contentZh.setAttribute('lang', 'zh');
    contentZh.innerHTML = newsItem.content.zh;
    
    contentWrapper.appendChild(contentEn);
    contentWrapper.appendChild(contentZh);
    
    // 日期标签
    const dateLabel = document.createElement('div');
    dateLabel.className = 'ml-auto mt-auto text-muted no-break';
    
    const dateEn = document.createElement('span');
    dateEn.setAttribute('lang', 'en');
    
    const dateZh = document.createElement('span');
    dateZh.setAttribute('lang', 'zh');
    
    if (newsItem.month !== null) {
        const monthNames = {
            en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        };
        dateEn.innerHTML = `<i>${monthNames.en[newsItem.month - 1]} ${year}</i>`;
        dateZh.innerHTML = `<i>${year}年${monthNames.zh[newsItem.month - 1]}</i>`;
    } else {
        dateEn.innerHTML = `<i>${year}</i>`;
        dateZh.innerHTML = `<i>${year}年</i>`;
    }
    
    dateLabel.appendChild(dateEn);
    dateLabel.appendChild(dateZh);
    
    contentDiv.appendChild(contentWrapper);
    contentDiv.appendChild(dateLabel);
    
    mediaBody.appendChild(contentDiv);
    
    card.appendChild(yearLabel);
    card.appendChild(mediaBody);
    
    return card;
}

// 页面加载完成后渲染
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNews);
} else {
    renderNews();
}
