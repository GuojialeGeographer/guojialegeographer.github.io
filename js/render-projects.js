/**
 * Projects Renderer
 * 动态渲染项目列表（优化版：支持缓存、懒加载、错误处理）
 */

// 加载工具函数（如果已加载）
const loadData = typeof DataLoader !== 'undefined' 
    ? (url) => DataLoader.loadJSON(url)
    : async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };

async function renderProjects() {
    // 防重复执行（某些情况下脚本可能被意外触发两次）
    if (window.__renderProjectsRan) {
        console.warn('renderProjects already executed, skipping...');
        return;
    }
    window.__renderProjectsRan = true;

    const container = document.getElementById('projects-container');
    if (!container) {
        console.warn('Projects container not found');
        return;
    }
    
    // 强制清空容器，移除所有现有内容（包括可能的重复项目）
    container.innerHTML = '';
    
    // 显示加载状态
    if (typeof LoadingState !== 'undefined') {
        LoadingState.show(container);
    }
    
    try {
        // 清除 DataLoader 缓存（如果存在）
        if (typeof DataLoader !== 'undefined' && DataLoader.clearCache) {
            DataLoader.clearCache('data/projects.json');
        }
        
        // 添加时间戳防止浏览器缓存
        const cacheBuster = '?v=' + Date.now();
        const dataUrl = 'data/projects.json' + cacheBuster;
        
        // 禁用 DataLoader 缓存，强制重新加载
        const data = typeof DataLoader !== 'undefined'
            ? await DataLoader.loadJSON(dataUrl, { useCache: false })
            : await loadData(dataUrl);
        
        // 检查数据是否为空
        if (!data.projects || data.projects.length === 0) {
            if (typeof LoadingState !== 'undefined') {
                LoadingState.showEmpty(container);
            } else {
                container.innerHTML = '<p class="text-muted text-center py-4">No projects available.</p>';
            }
            return;
        }
        
        // 根据 id 去重，避免重复项目渲染
        const uniqueProjects = [];
        const seenIds = new Set();
        for (const project of data.projects) {
            const pid = project.id || JSON.stringify(project);
            if (!seenIds.has(pid)) {
                seenIds.add(pid);
                uniqueProjects.push(project);
            } else {
                console.warn('Duplicate project detected:', pid);
            }
        }
        
        // 再次清空容器（确保没有残留内容）
        container.innerHTML = '';
        
        // 渲染每个项目
        uniqueProjects.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
        });
        
        // 初始化懒加载
        if (typeof LazyLoad !== 'undefined') {
            LazyLoad.init();
        }
        
        // 添加SEO结构化数据
        if (typeof SEO !== 'undefined') {
            SEO.addProjectsStructuredData(uniqueProjects);
        }
        
    } catch (error) {
        console.error('Error loading projects:', error);
        if (typeof LoadingState !== 'undefined') {
            LoadingState.showError(container);
        } else {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <span lang="en">Failed to load projects. Please refresh the page.</span>
                    <span lang="zh">加载项目列表失败，请刷新页面。</span>
                </div>
            `;
        }
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'row no-gutters border-bottom border-gray mb-4 pb-4';
    
    // 图片列
    const imageCol = document.createElement('div');
    imageCol.className = 'col-md-4 mb-3 mb-md-0';
    
    const image = document.createElement('img');
    image.alt = project.image.alt.en;
    image.className = 'img-fluid rounded';
    
    // 使用懒加载
    if (typeof LazyLoad !== 'undefined') {
        LazyLoad.setupImage(image, project.image.src, project.image.alt.en);
    } else {
        image.src = project.image.src;
        image.loading = 'lazy';
        image.onerror = function() {
            this.src = 'images/placeholder.svg';
        };
    }
    
    imageCol.appendChild(image);
    
    // 内容列
    const contentCol = document.createElement('div');
    contentCol.className = 'col-md-8 pl-md-4';
    
    // 标题
    const title = document.createElement('h5');
    title.style.fontWeight = 'bold'; // 确保标题加粗显示
    
    // 如果有链接，创建链接
    if (project.links && project.links.length > 0) {
        const firstLink = project.links.find(link => link.type === 'project' || link.type === 'thesis');
        if (firstLink) {
            const titleLink = document.createElement('a');
            titleLink.href = firstLink.url;
            titleLink.target = '_blank';
            
            const titleEn = document.createElement('span');
            titleEn.setAttribute('lang', 'en');
            titleEn.textContent = project.title.en;
            
            const titleZh = document.createElement('span');
            titleZh.setAttribute('lang', 'zh');
            titleZh.textContent = project.title.zh;
            
            titleLink.appendChild(titleEn);
            titleLink.appendChild(titleZh);
            title.appendChild(titleLink);
        } else {
            const titleEn = document.createElement('span');
            titleEn.setAttribute('lang', 'en');
            titleEn.textContent = project.title.en;
            
            const titleZh = document.createElement('span');
            titleZh.setAttribute('lang', 'zh');
            titleZh.textContent = project.title.zh;
            
            title.appendChild(titleEn);
            title.appendChild(titleZh);
        }
    } else {
        const titleEn = document.createElement('span');
        titleEn.setAttribute('lang', 'en');
        titleEn.textContent = project.title.en;
        
        const titleZh = document.createElement('span');
        titleZh.setAttribute('lang', 'zh');
        titleZh.textContent = project.title.zh;
        
        title.appendChild(titleEn);
        title.appendChild(titleZh);
    }
    
    // 时间线
    const timeline = document.createElement('p');
    timeline.className = 'text-muted small';
    const timelineText = project.timeline.end === 'Present' 
        ? `${project.timeline.start} - <span lang="en">Present</span><span lang="zh">进行中</span>`
        : `${project.timeline.start} - ${project.timeline.end}`;
    timeline.innerHTML = `Timeline: ${timelineText}`;
    
    // 描述
    const description = document.createElement('p');
    const descEn = document.createElement('span');
    descEn.setAttribute('lang', 'en');
    descEn.textContent = project.description.en;
    
    const descZh = document.createElement('span');
    descZh.setAttribute('lang', 'zh');
    descZh.textContent = project.description.zh;
    
    description.appendChild(descEn);
    description.appendChild(descZh);
    
    // 链接按钮
    if (project.links && project.links.length > 0) {
        const linksDiv = document.createElement('div');
        
        project.links.forEach((link, linkIndex) => {
            const btn = document.createElement('a');
            btn.href = link.url;
            btn.target = '_blank';
            btn.className = 'btn btn-sm btn-outline-secondary mr-2';
            if (link.type === 'gallery') {
                btn.className = 'btn btn-sm btn-outline-info mr-2';
            } else if (link.type === 'competition') {
                btn.className = 'btn btn-sm btn-outline-primary mr-2';
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
        
        contentCol.appendChild(title);
        contentCol.appendChild(timeline);
        contentCol.appendChild(description);
        contentCol.appendChild(linksDiv);
    } else {
        contentCol.appendChild(title);
        contentCol.appendChild(timeline);
        contentCol.appendChild(description);
    }
    
    card.appendChild(imageCol);
    card.appendChild(contentCol);
    
    return card;
}

// 页面加载完成后渲染
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}
