/**
 * Loading State Utility
 * 加载状态管理工具函数
 */

const LoadingState = {
    /**
     * 显示加载状态
     * @param {HTMLElement} container - 容器元素
     */
    show(container) {
        if (!container) return;
        
        container.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">
                        <span lang="en">Loading...</span>
                        <span lang="zh">加载中...</span>
                    </span>
                </div>
                <p class="mt-2 text-muted small">
                    <span lang="en">Please wait...</span>
                    <span lang="zh">请稍候...</span>
                </p>
            </div>
        `;
    },
    
    /**
     * 显示错误状态
     * @param {HTMLElement} container - 容器元素
     * @param {string} message - 错误消息（可选）
     */
    showError(container, message = null) {
        if (!container) return;
        
        const errorMsg = message || `
            <span lang="en">Failed to load content. Please refresh the page.</span>
            <span lang="zh">加载内容失败，请刷新页面。</span>
        `;
        
        container.innerHTML = `
            <div class="alert alert-warning">
                <h6 class="alert-heading">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span lang="en">Error</span>
                    <span lang="zh">错误</span>
                </h6>
                <p class="mb-0">${errorMsg}</p>
                <hr>
                <button class="btn btn-sm btn-outline-primary" onclick="location.reload()">
                    <span lang="en">Refresh Page</span>
                    <span lang="zh">刷新页面</span>
                </button>
            </div>
        `;
    },
    
    /**
     * 显示空状态
     * @param {HTMLElement} container - 容器元素
     * @param {string} message - 空状态消息（可选）
     */
    showEmpty(container, message = null) {
        if (!container) return;
        
        const emptyMsg = message || `
            <span lang="en">No content available.</span>
            <span lang="zh">暂无内容。</span>
        `;
        
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <p class="text-muted">${emptyMsg}</p>
            </div>
        `;
    },
    
    /**
     * 清除加载状态
     * @param {HTMLElement} container - 容器元素
     */
    clear(container) {
        if (!container) return;
        container.innerHTML = '';
    }
};
