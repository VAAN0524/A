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

    // 更新问题显示
    if (typeof currentQuestion !== 'undefined' && currentQuestion) {
        const questionDisplay = document.getElementById('currentQuestionDisplay');
        if (questionDisplay) {
            questionDisplay.textContent = t('diviningFor', { question: currentQuestion });
        }
    }

    // 更新抽牌界面文本
    updateCardDrawingTexts();

    // 更新导航按钮文本
    updateNavigationTexts();
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
    // 更新面包屑导航
    const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
    breadcrumbItems.forEach((item, index) => {
        if (index === 0) item.textContent = t('home');
        if (index === 1) item.textContent = t('selectQuestionType');
        if (index === 2) item.textContent = t('customQuestion');
    });

    // 更新返回按钮
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        const buttonText = homeButton.querySelector('span');
        if (buttonText) {
            buttonText.textContent = t('home');
        }
        homeButton.setAttribute('title', t('backToHome'));
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 等待更长时间确保所有脚本都加载完成
    setTimeout(function() {
        // 直接调用updateDynamicTexts，因为它现在应该已经被定义了
        try {
            updateDynamicTexts();
        } catch (error) {
            console.log('updateDynamicTexts not yet available:', error);
        }
    }, 500);
});