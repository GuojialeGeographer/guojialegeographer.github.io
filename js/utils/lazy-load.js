/**
 * Lazy Load Utility
 * 图片懒加载工具函数
 */

const LazyLoad = {
    /**
     * 初始化懒加载
     * 使用Intersection Observer API实现图片懒加载
     */
    init() {
        // 检查浏览器支持
        if (!('IntersectionObserver' in window)) {
            // 不支持IntersectionObserver，直接加载所有图片
            this.loadAllImages();
            return;
        }
        
        // 创建IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // 提前50px开始加载
        });
        
        // 观察所有带data-src属性的图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    },
    
    /**
     * 加载单个图片
     * @param {HTMLImageElement} img - 图片元素
     */
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    },
    
    /**
     * 加载所有图片（降级方案）
     */
    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    },
    
    /**
     * 为图片元素设置懒加载
     * @param {HTMLImageElement} img - 图片元素
     * @param {string} src - 图片URL
     * @param {string} alt - 替代文本
     * @param {string} placeholder - 占位图URL
     */
    setupImage(img, src, alt, placeholder = 'images/placeholder.svg') {
        img.setAttribute('data-src', src);
        img.src = placeholder; // 先加载占位图
        img.alt = alt || '';
        img.loading = 'lazy'; // 浏览器原生懒加载（作为后备）
        
        // 错误处理
        img.onerror = function() {
            this.src = placeholder;
        };
    }
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LazyLoad.init());
} else {
    LazyLoad.init();
}
