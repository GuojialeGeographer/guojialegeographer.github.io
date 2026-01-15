/**
 * Data Loader Utility
 * 数据加载工具函数：提供缓存、错误处理、重试机制
 */

const DataLoader = {
    // 缓存存储
    cache: new Map(),
    
    // 缓存过期时间（毫秒），默认5分钟
    cacheExpiry: 5 * 60 * 1000,
    
    /**
     * 加载JSON数据（带缓存）
     * @param {string} url - 数据URL
     * @param {Object} options - 选项
     * @returns {Promise<Object>} 数据对象
     */
    async loadJSON(url, options = {}) {
        const {
            useCache = true,
            retryCount = 2,
            retryDelay = 1000
        } = options;
        
        // 检查缓存
        if (useCache && this.cache.has(url)) {
            const cached = this.cache.get(url);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                return cached.data;
            }
            // 缓存过期，删除
            this.cache.delete(url);
        }
        
        // 尝试加载数据
        let lastError;
        for (let attempt = 0; attempt <= retryCount; attempt++) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Cache-Control': 'max-age=300' // 5分钟浏览器缓存
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // 存入缓存
                if (useCache) {
                    this.cache.set(url, {
                        data: data,
                        timestamp: Date.now()
                    });
                }
                
                return data;
            } catch (error) {
                lastError = error;
                if (attempt < retryCount) {
                    // 等待后重试
                    await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
                }
            }
        }
        
        throw lastError;
    },
    
    /**
     * 清除缓存
     * @param {string} url - 可选，指定URL，否则清除所有
     */
    clearCache(url) {
        if (url) {
            this.cache.delete(url);
        } else {
            this.cache.clear();
        }
    }
};
