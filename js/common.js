/**
 * Common JavaScript Functions
 * 公共JavaScript功能：主题切换、语言切换等
 * 
 * 这个文件包含了所有页面共享的功能，避免代码重复
 */

(function() {
    'use strict';
    
    /**
     * 初始化主题切换功能
     */
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const themeIcon = themeToggle.querySelector('i');
        if (!themeIcon) return;
        
        // 检查保存的主题偏好或使用默认值
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // 更新按钮图标
        updateThemeIcon(currentTheme, themeIcon);
        
        // 切换主题按钮点击事件
        themeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcon(newTheme, themeIcon);
        });
    }
    
    /**
     * 更新主题图标
     * @param {string} theme - 当前主题 ('light' 或 'dark')
     * @param {HTMLElement} icon - 图标元素
     */
    function updateThemeIcon(theme, icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    /**
     * 初始化语言切换功能
     */
    function initLanguage() {
        const langToggle = document.getElementById('lang-toggle');
        if (!langToggle) return;
        
        // 检查保存的语言偏好或使用默认值
        const currentLang = localStorage.getItem('lang') || 'en';
        document.documentElement.setAttribute('data-lang', currentLang);
        
        // 切换语言按钮点击事件
        langToggle.addEventListener('click', function() {
            const lang = document.documentElement.getAttribute('data-lang');
            const newLang = lang === 'en' ? 'zh' : 'en';
            
            document.documentElement.setAttribute('data-lang', newLang);
            localStorage.setItem('lang', newLang);
        });
    }
    
    /**
     * 初始化所有公共功能
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initTheme();
                initLanguage();
            });
        } else {
            // DOM已经加载完成
            initTheme();
            initLanguage();
        }
    }
    
    // 启动初始化
    init();
})();
