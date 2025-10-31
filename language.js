// 语言功能扩展 - 在translations.js之后加载，覆盖script.js中的函数

// 覆盖script.js中的toggleLanguage函数
function toggleLanguage() {
    const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    switchLanguage(newLanguage);

    // 更新当前问题文本
    if (typeof currentQuestion !== 'undefined' && currentQuestion) {
        const questionElement = document.getElementById('currentQuestionDisplay');
        if (questionElement) {
            questionElement.textContent = t('diviningFor', { question: currentQuestion });
        }
    }

    // 显示切换提示
    showToast(currentLanguage === 'zh' ? '已切换到中文' : 'Switched to English', 'success');
}

// 更新所有动态文本的函数
function updateDynamicTexts() {
    // 更新进度指示器文本
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = t('diviningProgress');
    }

    // 更新问题显示（强制更新所有可能的问题显示元素）
    if (typeof currentQuestion !== 'undefined' && currentQuestion) {
        // 更新主要的问题显示
        const questionDisplay = document.getElementById('currentQuestionDisplay');
        if (questionDisplay) {
            questionDisplay.textContent = t('diviningFor', { question: currentQuestion });
        }

        // 更新其他可能的问题显示元素
        const allQuestionDisplays = document.querySelectorAll('[id*="question"], [id*="Question"]');
        allQuestionDisplays.forEach(element => {
            if (element.textContent.includes('正在为') || element.textContent.includes('Performing')) {
                element.textContent = t('diviningFor', { question: currentQuestion });
            }
        });
    }

    // 更新抽牌界面文本
    updateCardDrawingTexts();

    // 更新导航按钮文本
    updateNavigationTexts();

    // 更新所有按钮中的span文本
    document.querySelectorAll('button span').forEach(span => {
        const parentButton = span.parentElement;
        if (parentButton && parentButton.onclick) {
            const buttonText = span.textContent.trim();
            // 根据按钮的onclick函数或类名来确定应该使用的翻译键
            if (parentButton.onclick && parentButton.onclick.toString().includes('backToHome')) {
                span.textContent = t('home');
            }
        }
    });
}

// 更新抽牌界面文本
function updateCardDrawingTexts() {
    const cardDeckMain = document.getElementById('cardDeckMain');
    if (cardDeckMain) {
        const isComplete = typeof selectedCards !== 'undefined' && selectedCards.length >= 3;
        if (isComplete) {
            const inner = cardDeckMain.querySelector('.text-center');
            if (inner) {
                inner.innerHTML = `<i class="fas fa-check text-4xl text-green-400 mb-2"></i><div class="text-xs font-bold text-green-400">${t('drawComplete')}</div>`;
            }
        } else {
            const inner = cardDeckMain.querySelector('.text-center');
            if (inner && !cardDeckMain.classList.contains('loading')) {
                inner.innerHTML = `<i class="fas fa-moon text-4xl text-purple-200 mb-2"></i><div class="text-xs font-bold">${t('clickToDraw')}</div>`;
            }
        }
    }

    // 更新开始解读按钮
    const startReadingBtn = document.getElementById('startReadingBtn');
    if (startReadingBtn) {
        const btnText = startReadingBtn.querySelector('span');
        if (btnText) {
            btnText.textContent = t('startReading');
        }
    }
}

// 更新导航按钮文本
function updateNavigationTexts() {
    // 更新所有带有data-i18n属性的导航元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key && ['home', 'selectQuestionType', 'customQuestion', 'backToHome'].includes(key)) {
            element.textContent = t(key);
        }
    });

    // 更新面包屑导航（对于没有data-i18n属性的动态生成内容）
    const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
    breadcrumbItems.forEach((item, index) => {
        if (index === 0 && !item.hasAttribute('data-i18n')) {
            item.textContent = t('home');
        }
        if (index === 1 && !item.hasAttribute('data-i18n')) {
            item.textContent = t('selectQuestionType');
        }
        if (index === 2 && !item.hasAttribute('data-i18n')) {
            item.textContent = t('customQuestion');
        }
    });

    // 更新所有返回按钮和首页按钮
    const homeButtons = document.querySelectorAll('button');
    homeButtons.forEach(button => {
        const text = button.textContent.trim();
        if ((text === '首页' || text === 'Home') && !button.querySelector('span[data-i18n]')) {
            const span = button.querySelector('span') || button;
            span.textContent = t('home');
        }
    });

    // 更新按钮的title属性
    document.querySelectorAll('[title]').forEach(element => {
        const title = element.getAttribute('title');
        if (title === '返回首页' || title === 'Back to Home') {
            element.setAttribute('title', t('backToHome'));
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 等待更长时间确保所有脚本都加载完成
    setTimeout(function() {
        // 重新定义toggleLanguage函数，确保它正确工作
        window.toggleLanguage = function() {
            const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';

            // 调用switchLanguage函数
            if (typeof switchLanguage === 'function') {
                switchLanguage(newLanguage);
            } else {
                console.error('switchLanguage function not found');
                return;
            }

            // 更新当前问题文本
            if (typeof currentQuestion !== 'undefined' && currentQuestion) {
                const questionElement = document.getElementById('currentQuestionDisplay');
                if (questionElement && typeof t === 'function') {
                    questionElement.textContent = t('diviningFor', { question: currentQuestion });
                }
            }

            // 显示切换提示
            const message = currentLanguage === 'zh' ? '已切换到中文' : 'Switched to English';

            // 显示提示消息
            if (typeof showToast === 'function') {
                showToast(message, 'success');
            } else {
                alert(message);
            }

            console.log('Language switched to:', newLanguage);
        };

        // 直接调用updateDynamicTexts
        try {
            updateDynamicTexts();
        } catch (error) {
            console.log('updateDynamicTexts not yet available:', error);
        }
    }, 500);
});