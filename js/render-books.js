/**
 * Books Renderer
 * 动态渲染书籍与学习笔记列表
 */

// 复用 DataLoader，如不可用则降级为直接 fetch
const loadBooksData = typeof DataLoader !== 'undefined'
    ? (url) => DataLoader.loadJSON(url)
    : async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    };

async function renderBooks() {
    const containerRow = document.querySelector('.card-body .row');
    if (!containerRow) {
        console.warn('Books container row not found');
        return;
    }

    // 显示加载状态
    if (typeof LoadingState !== 'undefined') {
        LoadingState.show(containerRow);
    }

    try {
        const data = await loadBooksData('data/books.json');

        if (!data.books || data.books.length === 0) {
            if (typeof LoadingState !== 'undefined') {
                LoadingState.showEmpty(containerRow);
            } else {
                containerRow.innerHTML = '<p class="text-muted text-center py-4">No books available.</p>';
            }
            return;
        }

        // 清空原有静态内容
        containerRow.innerHTML = '';

        // 渲染每一本书
        data.books.forEach(book => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';

            const card = document.createElement('div');
            card.className = 'card book-card h-100';

            // 封面图片
            const img = document.createElement('img');
            img.className = 'card-img-top book-cover';
            img.alt = book.image.alt.en;

            if (typeof LazyLoad !== 'undefined') {
                LazyLoad.setupImage(img, book.image.src, book.image.alt.en);
            } else {
                img.src = book.image.src;
                img.loading = 'lazy';
                img.onerror = function() {
                    this.src = 'images/placeholder.svg';
                };
            }

            card.appendChild(img);

            // card body
            const body = document.createElement('div');
            body.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';

            const titleEn = document.createElement('span');
            titleEn.setAttribute('lang', 'en');
            titleEn.textContent = book.title.en;

            const titleZh = document.createElement('span');
            titleZh.setAttribute('lang', 'zh');
            titleZh.textContent = book.title.zh;

            title.appendChild(titleEn);
            title.appendChild(titleZh);

            const desc = document.createElement('p');
            desc.className = 'card-text';

            const descEn = document.createElement('span');
            descEn.setAttribute('lang', 'en');
            descEn.textContent = book.description.en;

            const descZh = document.createElement('span');
            descZh.setAttribute('lang', 'zh');
            descZh.textContent = book.description.zh;

            desc.appendChild(descEn);
            desc.appendChild(descZh);

            const iconsDiv = document.createElement('div');
            iconsDiv.className = 'book-icons mt-3';

            if (book.links && book.links.length > 0) {
                book.links.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.target = '_blank';
                    a.className = 'btn btn-sm btn-outline-primary';

                    const icon = document.createElement('i');
                    icon.className = 'fas fa-book-reader';
                    a.appendChild(icon);
                    a.appendChild(document.createTextNode(' '));

                    const textEn = document.createElement('span');
                    textEn.setAttribute('lang', 'en');
                    textEn.textContent = link.text.en;

                    const textZh = document.createElement('span');
                    textZh.setAttribute('lang', 'zh');
                    textZh.textContent = link.text.zh;

                    a.appendChild(textEn);
                    a.appendChild(textZh);
                    iconsDiv.appendChild(a);
                });
            }

            body.appendChild(title);
            body.appendChild(desc);
            body.appendChild(iconsDiv);

            card.appendChild(body);

            // footer
            const footer = document.createElement('div');
            footer.className = 'card-footer';

            const small = document.createElement('small');
            small.className = 'text-muted';

            const yearEn = document.createElement('span');
            yearEn.setAttribute('lang', 'en');
            yearEn.textContent = `${book.category.en} - ${book.year}`;

            const yearZh = document.createElement('span');
            yearZh.setAttribute('lang', 'zh');
            yearZh.textContent = `${book.category.zh} - ${book.year}`;

            small.appendChild(yearEn);
            small.appendChild(yearZh);
            footer.appendChild(small);

            card.appendChild(footer);
            col.appendChild(card);
            containerRow.appendChild(col);
        });

        // 懒加载初始化
        if (typeof LazyLoad !== 'undefined') {
            LazyLoad.init();
        }

    } catch (error) {
        console.error('Error loading books:', error);
        if (typeof LoadingState !== 'undefined') {
            LoadingState.showError(containerRow);
        } else {
            containerRow.innerHTML = `
                <div class="alert alert-warning">
                    <span lang="en">Failed to load books. Please refresh the page.</span>
                    <span lang="zh">加载书籍列表失败，请刷新页面。</span>
                </div>
            `;
        }
    }
}

// 页面加载完成后渲染
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBooks);
} else {
    renderBooks();
}
