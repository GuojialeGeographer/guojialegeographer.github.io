/**
 * SEO Utility
 * SEO优化工具函数：添加结构化数据、改进meta标签
 */

const SEO = {
    /**
     * 添加结构化数据（JSON-LD）
     * @param {Object} data - 结构化数据对象
     */
    addStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    },
    
    /**
     * 为Publications页面添加结构化数据
     * @param {Array} publications - 论文列表
     */
    addPublicationsStructuredData(publications) {
        const person = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jiale Guo",
            "alternateName": "郭家乐",
            "url": "https://guojialegeographer.github.io",
            "jobTitle": "Graduate Student",
            "worksFor": {
                "@type": "Organization",
                "name": "Politecnico di Milano"
            }
        };
        
        const articles = publications.map(pub => ({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            "headline": pub.title.en,
            "alternateHeadline": pub.title.zh,
            "author": pub.authors.map(author => ({
                "@type": "Person",
                "name": author.name
            })),
            "datePublished": `${pub.year}-01-01`,
            "publisher": {
                "@type": "Organization",
                "name": pub.venue.name.en
            },
            "inLanguage": ["en", "zh"]
        }));
        
        // 添加Person数据
        this.addStructuredData(person);
        
        // 添加Articles数据
        articles.forEach(article => {
            this.addStructuredData(article);
        });
    },
    
    /**
     * 为Projects页面添加结构化数据
     * @param {Array} projects - 项目列表
     */
    addProjectsStructuredData(projects) {
        const projectsData = projects.map(project => ({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title.en,
            "alternateName": project.title.zh,
            "description": project.description.en,
            "dateCreated": project.timeline.start,
            "inLanguage": ["en", "zh"]
        }));
        
        projectsData.forEach(project => {
            this.addStructuredData(project);
        });
    },
    
    /**
     * 更新meta标签
     * @param {Object} meta - meta标签对象
     */
    updateMetaTags(meta) {
        // 更新或创建description
        if (meta.description) {
            let descTag = document.querySelector('meta[name="description"]');
            if (!descTag) {
                descTag = document.createElement('meta');
                descTag.name = 'description';
                document.head.appendChild(descTag);
            }
            descTag.content = meta.description;
        }
        
        // 更新或创建keywords
        if (meta.keywords) {
            let keywordsTag = document.querySelector('meta[name="keywords"]');
            if (!keywordsTag) {
                keywordsTag = document.createElement('meta');
                keywordsTag.name = 'keywords';
                document.head.appendChild(keywordsTag);
            }
            keywordsTag.content = meta.keywords;
        }
        
        // 更新Open Graph标签
        if (meta.og) {
            Object.keys(meta.og).forEach(key => {
                let ogTag = document.querySelector(`meta[property="og:${key}"]`);
                if (!ogTag) {
                    ogTag = document.createElement('meta');
                    ogTag.setAttribute('property', `og:${key}`);
                    document.head.appendChild(ogTag);
                }
                ogTag.content = meta.og[key];
            });
        }
    }
};
