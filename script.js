// 塔罗占卜网站前端脚本 - 纯前端版本

// 全局变量
let currentQuestion = '';
let currentQuestionType = '';
let selectedCards = [];
let readingResult = null;
let historyData = [];
let favoritesData = [];
let musicPlaying = false;

// 塔罗牌数据
const tarotCards = [
    // 大阿尔卡那
    {
        id: 0,
        name: '愚者',
        uprightMeaning: '新的开始、纯真、自由精神、无拘无束',
        reversedMeaning: '鲁莽、天真、冒险、缺乏经验',
        type: 'major',
        loveScore: 5,
        moodScore: 15,
        keywords: ['开始', '自由', '纯真', '探索'],
        emoji: '🃏'
    },
    {
        id: 1,
        name: '魔术师',
        uprightMeaning: '意志力、技能、集中、主动创造',
        reversedMeaning: '操控、欺骗、缺乏技巧、意志薄弱',
        type: 'major',
        loveScore: 8,
        moodScore: 20,
        keywords: ['创造', '意志', '资源', '行动'],
        emoji: '🎩'
    },
    {
        id: 2,
        name: '女祭司',
        uprightMeaning: '直觉、潜意识、神秘、内在智慧',
        reversedMeaning: '秘密、隐藏议程、表面化、直觉封闭',
        type: 'major',
        loveScore: 6,
        moodScore: 10,
        keywords: ['直觉', '智慧', '神秘', '洞察'],
        emoji: '🔮'
    },
    {
        id: 3,
        name: '皇后',
        uprightMeaning: '丰盛、女性力量、创造、滋养',
        reversedMeaning: '依赖、创造力受阻、过度保护、停滞',
        type: 'major',
        loveScore: 9,
        moodScore: 25,
        keywords: ['丰盛', '创造', '母性', '自然'],
        emoji: '👸'
    },
    {
        id: 4,
        name: '皇帝',
        uprightMeaning: '权威、结构、控制、领导力',
        reversedMeaning: '支配、缺乏纪律、僵化、过度控制',
        type: 'major',
        loveScore: 7,
        moodScore: 5,
        keywords: ['权威', '结构', '控制', '领导'],
        emoji: '🤴'
    },
    {
        id: 5,
        name: '教皇',
        uprightMeaning: '传统、教育、信仰、指导',
        reversedMeaning: '反叛、新思想、挑战传统、自由思考',
        type: 'major',
        loveScore: 6,
        moodScore: 0,
        keywords: ['传统', '智慧', '指导', '信仰'],
        emoji: '⚡'
    },
    {
        id: 6,
        name: '恋人',
        uprightMeaning: '爱情、关系、价值观选择、和谐',
        reversedMeaning: '冲突、失衡、错误选择、关系破裂',
        type: 'major',
        loveScore: 10,
        moodScore: 30,
        keywords: ['爱情', '关系', '选择', '和谐'],
        emoji: '💕'
    },
    {
        id: 7,
        name: '战车',
        uprightMeaning: '胜利、意志力、自律、前进',
        reversedMeaning: '失控、缺乏方向、侵略性、意志薄弱',
        type: 'major',
        loveScore: 4,
        moodScore: 15,
        keywords: ['胜利', '意志', '决心', '前进'],
        emoji: '🏰'
    },
    {
        id: 8,
        name: '力量',
        uprightMeaning: '内在力量、勇气、耐心、温柔控制',
        reversedMeaning: '软弱、缺乏自信、自我怀疑、暴力',
        type: 'major',
        loveScore: 7,
        moodScore: 20,
        keywords: ['力量', '勇气', '耐心', '控制'],
        emoji: '⚖️'
    },
    {
        id: 9,
        name: '隐士',
        uprightMeaning: '内省、独处、内在探索、灵魂指引',
        reversedMeaning: '孤立、退缩、孤独、脱离现实',
        type: 'major',
        loveScore: 3,
        moodScore: -10,
        keywords: ['内省', '独处', '智慧', '指引'],
        emoji: '🔃'
    },
    {
        id: 10,
        name: '命运之轮',
        uprightMeaning: '运气、变化、循环、命运转折',
        reversedMeaning: '厄运、抗拒变化、停滞、外部控制',
        type: 'major',
        loveScore: 6,
        moodScore: 10,
        keywords: ['命运', '变化', '循环', '机会'],
        emoji: '⚰️'
    },
    {
        id: 11,
        name: '正义',
        uprightMeaning: '公正、真理、法律、因果报应',
        reversedMeaning: '不公、偏见、不诚实、逃避责任',
        type: 'major',
        loveScore: 6,
        moodScore: 5,
        keywords: ['正义', '平衡', '责任', '真相'],
        emoji: '💪'
    },
    {
        id: 12,
        name: '倒吊人',
        uprightMeaning: '牺牲、等待、新视角、放下',
        reversedMeaning: '无意义的牺牲、拖延、徒劳、抗拒改变',
        type: 'major',
        loveScore: 2,
        moodScore: -15,
        keywords: ['牺牲', '等待', '新视角', '放下'],
        emoji: '🔙'
    },
    {
        id: 13,
        name: '死神',
        uprightMeaning: '结束、转变、重生、告别过去',
        reversedMeaning: '抗拒改变、恐惧变化、停滞、痛苦',
        type: 'major',
        loveScore: 1,
        moodScore: -20,
        keywords: ['结束', '转变', '重生', '更新'],
        emoji: '🔄'
    },
    {
        id: 14,
        name: '节制',
        uprightMeaning: '平衡、调节、耐心、和谐',
        reversedMeaning: '失衡、过度、不耐烦、冲突',
        type: 'major',
        loveScore: 8,
        moodScore: 15,
        keywords: ['平衡', '调节', '耐心', '和谐'],
        emoji: '🌊'
    },
    {
        id: 15,
        name: '恶魔',
        uprightMeaning: '束缚、成瘾、物质主义、欲望',
        reversedMeaning: '解脱、自由、突破限制、重获自由',
        type: 'major',
        loveScore: 0,
        moodScore: -25,
        keywords: ['束缚', '欲望', '成瘾', '限制'],
        emoji: '👹'
    },
    {
        id: 16,
        name: '塔',
        uprightMeaning: '突变、灾难、觉醒、彻底改变',
        reversedMeaning: '逃避灾难、恐惧改变、拖延危机',
        type: 'major',
        loveScore: 0,
        moodScore: -30,
        keywords: ['突变', '灾难', '觉醒', '改变'],
        emoji: '🌟'
    },
    {
        id: 17,
        name: '星星',
        uprightMeaning: '希望、灵感、治愈、指引',
        reversedMeaning: '绝望、失去信念、缺乏灵感',
        type: 'major',
        loveScore: 8,
        moodScore: 25,
        keywords: ['希望', '灵感', '治愈', '指引'],
        emoji: '⭐'
    },
    {
        id: 18,
        name: '月亮',
        uprightMeaning: '幻觉、恐惧、潜意识、直觉',
        reversedMeaning: '恐惧释放、真相显露、克服恐惧',
        type: 'major',
        loveScore: 5,
        moodScore: -5,
        keywords: ['幻觉', '恐惧', '潜意识', '直觉'],
        emoji: '🌙'
    },
    {
        id: 19,
        name: '太阳',
        uprightMeaning: '喜悦、成功、清晰、活力',
        reversedMeaning: '暂时的挫折、消极、缺乏清晰度',
        type: 'major',
        loveScore: 10,
        moodScore: 40,
        keywords: ['喜悦', '成功', '清晰', '活力'],
        emoji: '☀️'
    },
    {
        id: 20,
        name: '审判',
        uprightMeaning: '重生、清算、宽恕、觉醒',
        reversedMeaning: '自我怀疑、逃避清算、拖延审判',
        type: 'major',
        loveScore: 7,
        moodScore: 10,
        keywords: ['重生', '清算', '宽恕', '觉醒'],
        emoji: '🎺'
    },
    {
        id: 21,
        name: '世界',
        uprightMeaning: '完成、成就、整合、圆满',
        reversedMeaning: '未完成、缺乏成就、延迟结束',
        type: 'major',
        loveScore: 9,
        moodScore: 35,
        keywords: ['完成', '成就', '整合', '圆满'],
        emoji: '🌍'
    }
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createMagicParticles();
    loadSavedData();
});

// 初始化应用
function initializeApp() {
    // 绑定事件监听器
    const customInput = document.getElementById('customQuestionInput');
    if (customInput) {
        customInput.addEventListener('input', updateCharCount);
        customInput.addEventListener('focus', () => {
            updateSubmitButton();
        });
        customInput.addEventListener('blur', () => {
            updateSubmitButton();
        });
    }

    // 添加键盘快捷键
    document.addEventListener('keydown', handleKeyPress);

    // 启动计数器动画
    startCounters();

    // 加载保存的数据
    loadSavedData();

    // 初始化按钮状态
    updateSubmitButton();
    updateNavigationButtons();
    updateProgressBar();
    updateBreadcrumbNavigation();

    // 初始化增强功能
    enhanceCardSelection();
    addTouchFeedback();
    enhanceKeyboardNavigation();

    // 页面加载动画
    setTimeout(() => {
        document.body.classList.add('loaded');
        showToast('欢迎来到塔罗牌世界！✨', 'success');
    }, 100);
}

// 创建魔法粒子效果
function createMagicParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'magic-particles';
    document.body.appendChild(particlesContainer);

    setInterval(() => {
        if (Math.random() > 0.7) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = Math.random() * 6 + 2 + 'px';
    particle.style.animationDuration = Math.random() * 3 + 4 + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';

    container.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 7000);
}

// 启动计数器动画
function startCounters() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2秒动画
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// 开始占卜
function startFortune() {
    const heroSection = document.getElementById('heroSection');
    const questionSection = document.getElementById('questionSection');

    // 使用页面转换动画
    if (heroSection && !heroSection.classList.contains('hidden')) {
        addPageTransition(heroSection, questionSection);
    } else {
        hideAllSections();
        questionSection.classList.remove('hidden');
    }

    // 更新进度条和导航
    updateProgressBar(25);
    updateNavigationButtons();
    updateBreadcrumbNavigation();

    // 添加动画效果
    setTimeout(() => {
        document.querySelectorAll('.question-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease-out';
            }, index * 100);
        });
    }, 100);
}

// 选择问题类型
function selectQuestionType(type, defaultQuestion) {
    currentQuestionType = type;
    currentQuestion = defaultQuestion;

    // 高亮选中的卡片
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // 显示选中反馈
    showToast(`已选择：${defaultQuestion}`, 'success');

    // 延迟进入占卜界面
    setTimeout(() => {
        startFortuneSession();
    }, 500);
}

// 自定义问题
function customQuestion() {
    const questionSection = document.getElementById('questionSection');
    const customQuestionSection = document.getElementById('customQuestionSection');

    addPageTransition(questionSection, customQuestionSection);
    updateNavigationButtons();
    updateBreadcrumbNavigation();

    // 重置输入框状态
    const input = document.getElementById('customQuestionInput');
    if (input) {
        input.value = '';
        input.focus();
        updateCharCount();
        updateSubmitButton();
    }
}

// 返回问题类型选择
function backToQuestionTypes() {
    const customQuestionSection = document.getElementById('customQuestionSection');
    const questionSection = document.getElementById('questionSection');

    addPageTransition(customQuestionSection, questionSection);
    updateNavigationButtons();
    updateBreadcrumbNavigation();
    updateProgressBar(25);
}

// 提交自定义问题
function submitCustomQuestion() {
    const input = document.getElementById('customQuestionInput');
    const question = input.value.trim();

    if (question.length < 5) {
        showToast('请输入至少5个字符的问题', 'warning');
        input.focus();
        return;
    }

    currentQuestion = question;
    currentQuestionType = analyzeQuestionType(question);

    // 显示确认反馈
    showToast(`问题已确认：${question}`, 'success');

    // 延迟进入抽牌页面
    setTimeout(() => {
        startFortuneSession();
    }, 500);
}

// 分析问题类型
function analyzeQuestionType(question) {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('喜欢') || lowerQuestion.includes('爱') || lowerQuestion.includes('感情')) {
        return 'love';
    } else if (lowerQuestion.includes('工作') || lowerQuestion.includes('事业')) {
        return 'career';
    } else if (lowerQuestion.includes('朋友') || lowerQuestion.includes('人际')) {
        return 'social';
    } else if (lowerQuestion.includes('成长') || lowerQuestion.includes('发展')) {
        return 'growth';
    }

    return 'general';
}

// 开始占卜会话
function startFortuneSession() {
    const questionSection = document.getElementById('questionSection');
    const customQuestionSection = document.getElementById('customQuestionSection');
    const fortuneSection = document.getElementById('fortuneSection');

    // 确定从哪个页面切换过来
    const fromSection = !questionSection.classList.contains('hidden') ? questionSection : customQuestionSection;

    // 使用页面转换动画
    addPageTransition(fromSection, fortuneSection);

    // 显示问题
    document.querySelector('#fortuneSection .text-center p').textContent =
        `正在为"${currentQuestion}"进行塔罗占卜...`;

    // 初始化抽牌
    selectedCards = [];
    updateSelectedCardsDisplay();

    // 更新进度条和导航
    updateProgressBar(50);
    updateNavigationButtons();
    updateBreadcrumbNavigation();
    optimizeCardDrawingFlow();
}

// 抽牌
async function drawCard() {
    if (selectedCards.length >= 3) {
        showToast('已经选择了3张牌', 'info');
        return;
    }

    // 禁用抽牌按钮并更新状态
    const drawBtn = document.getElementById('drawCardBtn');
    const originalText = drawBtn.innerHTML;
    drawBtn.disabled = true;
    drawBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>抽牌中...';

    // 显示增强加载效果
    showEnhancedLoading('塔罗牌正在选择你...');

    // 模拟抽牌动画
    await animateCardDraw();

    // 随机选择一张牌
    const randomCard = getRandomCard();
    const position = Math.random() > 0.7 ? 'reversed' : 'upright';

    selectedCards.push({
        ...randomCard,
        position: position,
        slot: selectedCards.length + 1
    });

    // 更新显示
    updateSelectedCardsDisplay();
    optimizeCardDrawingFlow();

    // 隐藏加载效果
    hideEnhancedLoading();

    // 重新启用按钮
    drawBtn.disabled = false;
    drawBtn.innerHTML = originalText;

    // 更新进度条
    const progress = 50 + (selectedCards.length * 16.67); // 50-100%
    updateProgressBar(progress);

    // 如果选够了3张牌，显示开始解读按钮
    if (selectedCards.length === 3) {
        document.getElementById('startReadingBtn').classList.remove('hidden');
        document.getElementById('drawCardBtn').disabled = true;
        updateNavigationButtons();
        showToast('✨ 3张牌已抽完，点击开始解读查看结果！', 'success');
    }
}

// 抽牌动画
async function animateCardDraw() {
    return new Promise(resolve => {
        const cardDeck = document.getElementById('cardDeck');

        // 添加动画效果
        cardDeck.style.animation = 'glow 1s ease-in-out';

        setTimeout(() => {
            cardDeck.style.animation = '';
            resolve();
        }, 1000);
    });
}

// 获取随机牌
function getRandomCard() {
    // 过滤掉已选的牌
    const availableCards = tarotCards.filter(card =>
        !selectedCards.some(selected => selected.id === card.id)
    );

    return availableCards[Math.floor(Math.random() * availableCards.length)];
}

// 更新已选牌显示
function updateSelectedCardsDisplay() {
    const container = document.getElementById('selectedCards');
    container.innerHTML = '';

    selectedCards.forEach((card, index) => {
        const cardElement = createSelectedCardElement(card, index);
        container.appendChild(cardElement);
    });
}

// 创建已选牌元素
function createSelectedCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'tarot-card selected';
    cardDiv.style.animation = `slideInUp 0.5s ease-out ${index * 0.2}s`;

    const meaning = card.position === 'upright' ? card.uprightMeaning : card.reversedMeaning;
    const positionText = card.position === 'upright' ? '正位' : '逆位';

    cardDiv.innerHTML = `
        <div class="tarot-card-back ${card.position === 'reversed' ? 'reversed' : ''}">
            <div class="text-center">
                <div class="text-4xl mb-2">${card.emoji}</div>
                <div class="font-bold">${card.name}</div>
                <div class="text-sm mt-1">${positionText}</div>
            </div>
        </div>
        <div class="mt-4 text-center">
            <div class="text-sm text-purple-200">第${card.slot}张牌</div>
        </div>
    `;

    return cardDiv;
}

// 开始解读
async function startReading() {
    const fortuneSection = document.getElementById('fortuneSection');
    const resultSection = document.getElementById('resultSection');

    // 更新进度条
    updateProgressBar(75);

    // 使用页面转换动画
    addPageTransition(fortuneSection, resultSection);

    // 显示加载状态
    showLoadingState();

    // 更新面包屑导航
    updateBreadcrumbNavigation();

    // 模拟API调用
    await performReading();

    // 显示结果
    displayReadingResult();

    // 完成进度条
    updateProgressBar(100);
}

// 显示加载状态
function showLoadingState() {
    const resultSection = document.getElementById('resultSection');
    resultSection.innerHTML = `
        <div class="text-center py-16">
            <div class="loading-spinner mx-auto mb-8"></div>
            <h3 class="text-2xl font-bold mb-4">塔罗牌正在解读中...</h3>
            <p class="text-purple-200">请稍候，神秘的指引正在显现</p>
        </div>
    `;
}

// 执行占卜（模拟API调用）
async function performReading() {
    return new Promise(resolve => {
        setTimeout(() => {
            // 生成占卜结果
            readingResult = generateReadingResult();
            resolve();
        }, 3000);
    });
}

// 生成占卜结果
function generateReadingResult() {
    const loveScore = calculateLoveScore();
    const moodScore = calculateMoodScore();

    return {
        id: Date.now(),
        question: currentQuestion,
        questionType: currentQuestionType,
        cards: selectedCards,
        interpretation: generateInterpretation(),
        loveScore: loveScore,
        moodScore: moodScore,
        advice: generateAdvice(),
        prediction: generatePrediction(),
        timestamp: new Date().toISOString(),
        isFavorite: false
    };
}

// 计算爱情指数
function calculateLoveScore() {
    let score = 50;

    selectedCards.forEach(card => {
        score += card.loveScore;
        if (card.position === 'upright') score += 10;
        if (card.position === 'reversed') score -= 5;
    });

    return Math.max(0, Math.min(100, score + Math.floor(Math.random() * 20)));
}

// 计算情绪指数
function calculateMoodScore() {
    let score = 0;

    selectedCards.forEach(card => {
        score += card.moodScore;
        if (card.position === 'reversed') score *= -1;
    });

    return Math.max(-100, Math.min(100, score + Math.floor(Math.random() * 40) - 20));
}

// 生成解读
function generateInterpretation() {
    const interpretations = [];

    const positions = ['过去的情况', '现在的状态', '未来的发展'];

    selectedCards.forEach((card, index) => {
        const meaning = card.position === 'upright' ? card.uprightMeaning : card.reversedMeaning;
        interpretations.push({
            position: positions[index],
            cardName: card.name,
            meaning: meaning,
            interpretation: `在${positions[index]}，${card.name}牌${card.position === 'upright' ? '正位' : '逆位'}出现，${meaning}。这表明你需要关注这方面的能量。`
        });
    });

    return interpretations;
}

// 生成建议
function generateAdvice() {
    const advices = {
        love: [
            '保持真诚的心，相信爱情的美好。塔罗牌显示你需要更开放地表达自己的感受。',
            '缘分正在靠近你，但要保持耐心和积极的心态。',
            '先学会爱自己，真正的爱情才会降临。',
            '现在的你很有魅力，相信自己的价值，美好的爱情即将到来。'
        ],
        career: [
            '现在是展现你才能的最佳时机，勇敢地抓住机会。',
            '保持专注和坚持，成功就在不远处等待着你。',
            '学习新技能将为你的事业带来新的突破。',
            '你的努力将会得到回报，继续保持积极的态度。'
        ],
        social: [
            '在人际关系中，建议你多倾听他人，保持真诚的沟通。',
            '友谊需要经营，主动联系老朋友，结交新朋友。',
            '保持开放的心态，你会吸引到志同道合的朋友。'
        ],
        growth: [
            '保持积极的心态，相信未来的可能性。',
            '倾听内心的声音，它会为你指引正确的方向。',
            '每一次挑战都是成长的机会，勇敢面对它们。',
            '现在是学习和成长的最好时机，投资自己永远不会错。'
        ],
        general: [
            '保持积极的心态，相信未来的可能性。',
            '倾听内心的声音，它会为你指引正确的方向。',
            '每一次挑战都是成长的机会。',
            '相信自己的直觉，它会给你正确的指引。'
        ]
    };

    const typeAdvices = advices[currentQuestionType] || advices.general;
    return typeAdvices[Math.floor(Math.random() * typeAdvices.length)];
}

// 生成预测
function generatePrediction() {
    const positiveCards = selectedCards.filter(card => card.position === 'upright').length;
    const ratio = positiveCards / selectedCards.length;

    return {
        positive: ratio > 0.5,
        timeframe: ratio > 0.7 ? '短期内（1-3个月）' : ratio > 0.3 ? '中期（3-6个月）' : '长期来看',
        likelihood: ratio > 0.7 ? '很高' : ratio > 0.5 ? '较高' : ratio > 0.3 ? '中等' : '较低',
        keyFactors: selectedCards.map(card => card.name)
    };
}

// 显示占卜结果
function displayReadingResult() {
    // 重新构建结果HTML
    const resultSection = document.getElementById('resultSection');
    resultSection.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
                <h3 class="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    塔罗解读结果
                </h3>
                <div class="text-xl text-purple-200 mb-4">${readingResult.question}</div>
            </div>

            <!-- 牌阵结果展示 -->
            <div class="grid md:grid-cols-3 gap-6 mb-12">
                ${readingResult.cards.map((card, index) => `
                    <div class="result-card">
                        <div class="text-center mb-4">
                            <div class="text-4xl mb-2">${card.emoji}</div>
                            <h4 class="text-xl font-bold">${card.name}</h4>
                            <div class="text-sm text-purple-200">${card.position === 'upright' ? '正位' : '逆位'}</div>
                        </div>
                        <div class="card-position">${readingResult.interpretation[index].position}</div>
                        <div class="card-meaning">${readingResult.interpretation[index].interpretation}</div>
                    </div>
                `).join('')}
            </div>

            <!-- 详细解读 -->
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-20 mb-8">
                <h4 class="text-2xl font-bold mb-6">详细解读</h4>
                <div class="text-lg leading-relaxed text-purple-100">
                    ${readingResult.interpretation.map(interp => `<p class="mb-4">${interp.interpretation}</p>`).join('')}
                </div>
            </div>

            <!-- 建议和预测 -->
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-20 mb-8">
                <h4 class="text-2xl font-bold mb-6">建议与指引</h4>
                <p class="text-lg text-purple-100 mb-4">${readingResult.advice}</p>
                <div class="border-t border-white border-opacity-20 pt-4">
                    <p class="text-purple-200">
                        <strong>预测：</strong>
                        ${readingResult.prediction.positive ? '积极的' : '需要谨慎的'}结果，可能性为${readingResult.prediction.likelihood}，
                        时间框架：${readingResult.prediction.timeframe}。
                        关键因素：${readingResult.prediction.keyFactors.join('、')}。
                    </p>
                </div>
            </div>

            <!-- 评分展示 -->
            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold">爱情指数</h5>
                        <i class="fas fa-heart text-2xl"></i>
                    </div>
                    <div class="flex items-center">
                        <div class="flex-1 bg-white bg-opacity-30 rounded-full h-4">
                            <div class="love-score-bar bg-gradient-to-r from-pink-400 to-red-400 h-full rounded-full transition-all duration-1000" style="width: 0%"></div>
                        </div>
                        <span class="ml-4 text-2xl font-bold">${readingResult.loveScore}%</span>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold">情绪指数</h5>
                        <i class="fas fa-smile text-2xl"></i>
                    </div>
                    <div class="flex items-center">
                        <div class="flex-1 bg-white bg-opacity-30 rounded-full h-4">
                            <div class="mood-score-bar bg-gradient-to-r from-blue-400 to-green-400 h-full rounded-full transition-all duration-1000" style="width: 0%"></div>
                        </div>
                        <span class="ml-4 text-2xl font-bold">${readingResult.moodScore > 0 ? '+' : ''}${readingResult.moodScore}%</span>
                    </div>
                </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex justify-center space-x-4">
                <button onclick="shareResult()" class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full transition-all transform hover:scale-105">
                    <i class="fas fa-share-alt mr-2"></i>
                    分享结果
                </button>
                <button onclick="saveResult()" class="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-6 py-3 rounded-full transition-all transform hover:scale-105">
                    <i class="fas fa-save mr-2"></i>
                    保存结果
                </button>
                <button onclick="toggleFavorite(${readingResult.id})" class="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 py-3 rounded-full transition-all transform hover:scale-105">
                    <i class="fas fa-star mr-2"></i>
                    ${readingResult.isFavorite ? '取消收藏' : '添加收藏'}
                </button>
                <button onclick="restart()" class="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-full transition-all">
                    <i class="fas fa-redo mr-2"></i>
                    重新占卜
                </button>
            </div>
        </div>
    `;

    // 动画显示分数条
    setTimeout(() => {
        const loveBar = document.querySelector('.love-score-bar');
        const moodBar = document.querySelector('.mood-score-bar');

        if (loveBar) {
            loveBar.style.width = readingResult.loveScore + '%';
        }

        if (moodBar) {
            const moodWidth = Math.abs(readingResult.moodScore);
            moodBar.style.width = moodWidth + '%';
        }
    }, 500);

    // 添加卡片动画
    setTimeout(() => {
        document.querySelectorAll('.result-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease-out';
            }, index * 100);
        });
    }, 100);

    // 更新导航按钮
    updateNavigationButtons();
    updateBreadcrumbNavigation();

    // 显示完成提示
    setTimeout(() => {
        showToast('🔮 塔罗解读已完成，希望对你有帮助！', 'success');
    }, 2000);
}

// 分享结果
function shareResult() {
    if (navigator.share) {
        navigator.share({
            title: '塔罗牌占卜结果',
            text: `我刚刚进行了塔罗占卜！问题：${readingResult.question}\n爱情指数：${readingResult.loveScore}%\n情绪指数：${readingResult.moodScore > 0 ? '+' : ''}${readingResult.moodScore}%`,
            url: window.location.href
        });
    } else {
        // 复制到剪贴板
        const text = `我刚刚进行了塔罗占卜！\n问题：${readingResult.question}\n爱情指数：${readingResult.loveScore}%\n情绪指数：${readingResult.moodScore > 0 ? '+' : ''}${readingResult.moodScore}%`;
        navigator.clipboard.writeText(text).then(() => {
            showToast('占卜结果已复制到剪贴板', 'success');
        });
    }
}

// 保存结果
function saveResult() {
    if (!readingResult) {
        showToast('没有可保存的结果', 'warning');
        return;
    }

    // 添加到历史记录
    historyData.unshift(readingResult);
    if (historyData.length > 50) {
        historyData = historyData.slice(0, 50);
    }

    // 保存到本地存储
    try {
        localStorage.setItem('tarotHistory', JSON.stringify(historyData));
        showToast('占卜结果已保存到历史记录', 'success');

        // 更新历史记录徽章
        updateHistoryBadge();
    } catch (error) {
        console.error('保存失败:', error);
        showToast('保存失败，请检查浏览器设置', 'error');
    }
}

// 显示历史记录
function showHistory() {
    const currentSection = document.getElementById(getCurrentSection() + 'Section');
    const historySection = document.getElementById('historySection');

    // 安全检查
    if (!historySection) {
        console.error('历史记录区域未找到');
        showToast('历史记录页面加载失败', 'error');
        return;
    }

    // 简化页面切换，避免复杂的过渡动画
    hideAllSections();
    historySection.classList.remove('hidden');

    updateNavigationButtons();
    updateBreadcrumbNavigation();

    const historyList = document.getElementById('historyList');
    if (!historyList) {
        console.error('历史记录列表容器未找到');
        return;
    }

    if (historyData.length === 0) {
        historyList.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-history text-4xl text-purple-400 mb-4"></i>
                <p class="text-purple-200">还没有占卜记录</p>
                <p class="text-sm text-purple-300 mt-2">开始你的第一次塔罗占卜吧！</p>
                <button onclick="backToHome()" class="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition-all transform hover:scale-105 mt-4">
                    <i class="fas fa-home mr-2"></i>
                    开始占卜
                </button>
            </div>
        `;
    } else {
        historyList.innerHTML = historyData.map((item, index) => `
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all cursor-pointer history-item" data-id="${item.id}">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <h4 class="font-bold mb-2">${item.question}</h4>
                        <p class="text-sm text-purple-200">${new Date(item.timestamp).toLocaleString('zh-CN')}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="viewHistoryResult(${item.id})" class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-sm transition-colors">
                            查看
                        </button>
                        <button onclick="deleteHistory(${item.id})" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm transition-colors">
                            删除
                        </button>
                    </div>
                </div>
                <div class="flex space-x-4 text-sm">
                    <span class="flex items-center"><i class="fas fa-heart mr-1"></i>爱情指数: ${item.loveScore}%</span>
                    <span class="flex items-center"><i class="fas fa-smile mr-1"></i>情绪指数: ${item.moodScore > 0 ? '+' : ''}${item.moodScore}%</span>
                </div>
            </div>
        `).join('');

        // 重新绑定事件监听器
        bindHistoryItemEvents();
    }
}

// 显示收藏列表
function showFavorites() {
    const currentSection = document.getElementById(getCurrentSection() + 'Section');
    const favoritesSection = document.getElementById('favoritesSection');

    // 安全检查
    if (!favoritesSection) {
        console.error('收藏区域未找到');
        showToast('收藏页面加载失败', 'error');
        return;
    }

    // 简化页面切换，避免复杂的过渡动画
    hideAllSections();
    favoritesSection.classList.remove('hidden');

    updateNavigationButtons();
    updateBreadcrumbNavigation();

    const favoritesList = document.getElementById('favoritesList');
    if (!favoritesList) {
        console.error('收藏列表容器未找到');
        return;
    }

    const favorites = historyData.filter(item => item.isFavorite);

    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-bookmark text-4xl text-purple-400 mb-4"></i>
                <p class="text-purple-200">还没有收藏的占卜结果</p>
                <p class="text-sm text-purple-300 mt-2">在占卜结果页面点击收藏按钮来添加收藏</p>
                <button onclick="backToHome()" class="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition-all transform hover:scale-105 mt-4">
                    <i class="fas fa-home mr-2"></i>
                    开始占卜
                </button>
            </div>
        `;
    } else {
        favoritesList.innerHTML = favorites.map(item => `
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all cursor-pointer favorite-item" data-id="${item.id}">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <h4 class="font-bold mb-2">${item.question}</h4>
                        <p class="text-sm text-purple-200">${new Date(item.timestamp).toLocaleString('zh-CN')}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="event.stopPropagation(); viewHistoryResult(${item.id})" class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-sm transition-colors">
                            查看
                        </button>
                        <button onclick="event.stopPropagation(); toggleFavorite(${item.id})" class="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg text-sm transition-colors">
                            取消收藏
                        </button>
                    </div>
                </div>
                <div class="flex space-x-4 text-sm">
                    <span class="flex items-center"><i class="fas fa-heart mr-1"></i>爱情指数: ${item.loveScore}%</span>
                    <span class="flex items-center"><i class="fas fa-smile mr-1"></i>情绪指数: ${item.moodScore > 0 ? '+' : ''}${item.moodScore}%</span>
                </div>
            </div>
        `).join('');

        // 绑定收藏项点击事件
        bindFavoriteItemEvents();
    }

    // 更新收藏徽章
    updateFavoritesBadge();

    showToast('收藏列表已加载', 'success');
}

// 绑定历史记录项事件
function bindHistoryItemEvents() {
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果点击的是按钮，不触发项目点击事件
            if (e.target.closest('button')) {
                return;
            }

            const id = parseInt(this.dataset.id);
            viewHistoryResult(id);
        });
    });
}

// 绑定收藏项事件
function bindFavoriteItemEvents() {
    const favoriteItems = document.querySelectorAll('.favorite-item');
    favoriteItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果点击的是按钮，不触发项目点击事件
            if (e.target.closest('button')) {
                return;
            }

            const id = parseInt(this.dataset.id);
            viewHistoryResult(id);
        });
    });
}

// 更新历史记录徽章
function updateHistoryBadge() {
    const historyBadge = document.querySelector('.history-badge');
    if (historyBadge) {
        if (historyData.length > 0) {
            historyBadge.textContent = historyData.length;
            historyBadge.style.display = 'inline-block';
        } else {
            historyBadge.style.display = 'none';
        }
    }
}

// 更新收藏徽章
function updateFavoritesBadge() {
    const favoritesCount = historyData.filter(item => item.isFavorite).length;
    const favoritesBadge = document.querySelector('.favorites-badge');
    if (favoritesBadge) {
        if (favoritesCount > 0) {
            favoritesBadge.textContent = favoritesCount;
            favoritesBadge.style.display = 'inline-block';
        } else {
            favoritesBadge.style.display = 'none';
        }
    }
}

// 查看历史结果
function viewHistoryResult(id) {
    const result = historyData.find(item => item.id === id);
    if (result) {
        readingResult = result;

        // 安全切换到结果页面
        hideAllSections();
        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            resultSection.classList.remove('hidden');
        }

        displayReadingResult();
        updateNavigationButtons();
        updateBreadcrumbNavigation();

        showToast('历史记录已加载', 'success');
    } else {
        showToast('找不到该历史记录', 'error');
    }
}

// 删除历史记录
function deleteHistory(id) {
    historyData = historyData.filter(item => item.id !== id);
    localStorage.setItem('tarotHistory', JSON.stringify(historyData));
    showHistory(); // 刷新显示
    showToast('已删除该记录', 'success');
}

// 切换收藏状态
function toggleFavorite(id) {
    const result = historyData.find(item => item.id === id);
    if (result) {
        result.isFavorite = !result.isFavorite;
        localStorage.setItem('tarotHistory', JSON.stringify(historyData));
        showToast(result.isFavorite ? '已添加到收藏' : '已取消收藏', 'success');

        // 更新收藏徽章
        updateFavoritesBadge();

        // 如果当前在结果页面，刷新结果显示
        if (readingResult && readingResult.id === id) {
            readingResult.isFavorite = result.isFavorite;
            displayReadingResult();
        }
    }
}

// 了解塔罗
function learnMore() {
    hideAllSections();
    document.getElementById('learnSection').classList.remove('hidden');
}

// 返回首页
function backToHome() {
    // 检查是否已经在首页
    const currentSection = getCurrentSection();
    if (currentSection === 'hero') {
        showToast('已经在首页了', 'info');
        return;
    }

    // 安全切换到首页
    hideAllSections();
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
        heroSection.classList.remove('hidden');
    }

    updateNavigationButtons();
    updateBreadcrumbNavigation();
    updateProgressBar(0);

    // 重置状态
    currentQuestion = '';
    currentQuestionType = '';
    selectedCards = [];
    readingResult = null;

    showToast('已返回首页', 'success');
}

// 重新开始
function restart() {
    // 安全切换到首页
    hideAllSections();
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
        heroSection.classList.remove('hidden');
    }

    // 重置所有状态
    currentQuestion = '';
    currentQuestionType = '';
    selectedCards = [];
    readingResult = null;

    updateNavigationButtons();
    updateBreadcrumbNavigation();
    updateProgressBar(0);

    showToast('已重新开始，祝你好运！✨', 'info');
}

// 音乐控制
function toggleMusic() {
    const audio = document.getElementById('bgMusic');

    if (musicPlaying) {
        audio.pause();
        showToast('音乐已关闭', 'info');
    } else {
        audio.play().catch(e => {
            console.log('无法播放音乐');
        });
        showToast('音乐已开启', 'info');
    }

    musicPlaying = !musicPlaying;
}

// 加载保存的数据
function loadSavedData() {
    const savedHistory = localStorage.getItem('tarotHistory');
    if (savedHistory) {
        historyData = JSON.parse(savedHistory);
    }
}

// 工具函数
function hideAllSections() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
}

function updateCharCount() {
    const input = document.getElementById('customQuestionInput');
    const count = document.getElementById('charCount');
    count.textContent = input.value.length;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;

    if (type === 'warning') {
        toast.style.background = 'linear-gradient(135deg, #f59e0b, #dc2626)';
    } else if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #dc2626, #991b1b)';
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// 键盘快捷键
function handleKeyPress(event) {
    if (event.key === 'Escape') {
        restart();
    } else if (event.key === 'Enter' && event.ctrlKey) {
        if (document.getElementById('customQuestionSection').classList.contains('hidden') === false) {
            submitCustomQuestion();
        } else if (selectedCards.length === 3) {
            startReading();
        }
    }
}

// 更新进度条
function updateProgressBar(progress = 0) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (progressBar) {
        progressBar.style.width = progress + '%';

        // 根据进度更新颜色
        if (progress < 33) {
            progressBar.className = 'h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500';
        } else if (progress < 66) {
            progressBar.className = 'h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500';
        } else {
            progressBar.className = 'h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full transition-all duration-500';
        }
    }

    if (progressText) {
        progressText.textContent = Math.round(progress) + '%';
    }
}

// 更新提交按钮状态
function updateSubmitButton() {
    const submitBtn = document.getElementById('submitCustomQuestionBtn');
    const customInput = document.getElementById('customQuestionInput');

    if (submitBtn && customInput) {
        const isValid = customInput.value.trim().length >= 5;

        submitBtn.disabled = !isValid;

        if (isValid) {
            submitBtn.className = submitBtn.className.replace('opacity-50 cursor-not-allowed', 'opacity-100 cursor-pointer hover:scale-105');
            submitBtn.innerHTML = '<i class="fas fa-magic mr-2"></i>开始占卜';
        } else {
            submitBtn.className = submitBtn.className.replace('opacity-100 cursor-pointer hover:scale-105', 'opacity-50 cursor-not-allowed');
            submitBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>请输入问题';
        }
    }
}

// 更新导航按钮状态
function updateNavigationButtons() {
    const currentSection = getCurrentSection();
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (backBtn) {
        // 根据当前页面决定返回按钮的行为
        if (currentSection === 'questionSection') {
            backBtn.onclick = backToHome;
            backBtn.innerHTML = '<i class="fas fa-home mr-2"></i>返回首页';
        } else if (currentSection === 'customQuestionSection') {
            backBtn.onclick = backToQuestionTypes;
            backBtn.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>返回问题';
        } else if (currentSection === 'fortuneSection') {
            backBtn.onclick = () => {
                if (selectedCards.length > 0) {
                    // 如果已抽牌，确认是否要重新开始
                    if (confirm('确定要重新开始吗？已抽的牌将被清空。')) {
                        startFortune();
                    }
                } else {
                    backToQuestionTypes();
                }
            };
            backBtn.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>重新选择';
        } else if (currentSection === 'resultSection') {
            backBtn.onclick = restart;
            backBtn.innerHTML = '<i class="fas fa-redo mr-2"></i>重新占卜';
        }
    }

    // 更新下一步按钮（如果存在）
    if (nextBtn) {
        if (currentSection === 'fortuneSection' && selectedCards.length === 3) {
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = startReading;
        } else {
            nextBtn.classList.add('hidden');
        }
    }
}

// 获取当前可见的页面部分
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    for (let section of sections) {
        if (!section.classList.contains('hidden')) {
            return section.id.replace('Section', '');
        }
    }
    return 'hero';
}

// 更新面包屑导航
function updateBreadcrumbNavigation() {
    const breadcrumb = document.getElementById('breadcrumb');
    const currentSection = getCurrentSection();

    if (breadcrumb) {
        let breadcrumbHTML = '<nav class="flex items-center space-x-2 text-sm text-purple-200">';

        // 首页
        if (currentSection === 'hero') {
            breadcrumbHTML += '<span class="text-white font-semibold">首页</span>';
        } else {
            breadcrumbHTML += '<button onclick="backToHome()" class="hover:text-white transition-colors">首页</button>';
        }

        // 问题选择
        if (currentSection === 'question' || currentSection === 'customQuestion' ||
            currentSection === 'fortune' || currentSection === 'result') {
            breadcrumbHTML += '<i class="fas fa-chevron-right text-xs"></i>';
            if (currentSection === 'question') {
                breadcrumbHTML += '<span class="text-white font-semibold">选择问题</span>';
            } else {
                breadcrumbHTML += '<button onclick="backToQuestionTypes()" class="hover:text-white transition-colors">选择问题</button>';
            }
        }

        // 自定义问题
        if (currentSection === 'customQuestion') {
            breadcrumbHTML += '<i class="fas fa-chevron-right text-xs"></i>';
            breadcrumbHTML += '<span class="text-white font-semibold">自定义问题</span>';
        }

        // 抽牌
        if (currentSection === 'fortune') {
            breadcrumbHTML += '<i class="fas fa-chevron-right text-xs"></i>';
            breadcrumbHTML += '<span class="text-white font-semibold">抽取塔罗牌</span>';
        }

        // 结果
        if (currentSection === 'result') {
            breadcrumbHTML += '<i class="fas fa-chevron-right text-xs"></i>';
            breadcrumbHTML += '<span class="text-white font-semibold">占卜结果</span>';
        }

        breadcrumbHTML += '</nav>';
        breadcrumb.innerHTML = breadcrumbHTML;
    }
}

// 增强的卡片选择反馈
function enhanceCardSelection() {
    const drawBtn = document.getElementById('drawCardBtn');
    const cardDeck = document.getElementById('cardDeck');

    if (drawBtn && cardDeck) {
        // 添加悬停效果
        drawBtn.addEventListener('mouseenter', () => {
            if (selectedCards.length < 3) {
                cardDeck.classList.add('glow-effect');
                drawBtn.classList.add('animate-pulse');
            }
        });

        drawBtn.addEventListener('mouseleave', () => {
            cardDeck.classList.remove('glow-effect');
            drawBtn.classList.remove('animate-pulse');
        });

        // 添加点击反馈
        drawBtn.addEventListener('click', () => {
            if (selectedCards.length < 3) {
                drawBtn.classList.add('scale-95');
                cardDeck.classList.add('card-select-animation');

                setTimeout(() => {
                    drawBtn.classList.remove('scale-95');
                    cardDeck.classList.remove('card-select-animation');
                }, 200);
            }
        });
    }
}

// 添加触摸反馈（移动端优化）
function addTouchFeedback() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            e.target.classList.add('scale-95');
        });

        button.addEventListener('touchend', (e) => {
            setTimeout(() => {
                e.target.classList.remove('scale-95');
            }, 100);
        });
    });
}

// 优化抽牌流程
function optimizeCardDrawingFlow() {
    const slots = document.querySelectorAll('.card-slot');

    slots.forEach((slot, index) => {
        // 添加插槽发光效果
        if (selectedCards.length === index) {
            slot.classList.add('glow-effect');
        } else {
            slot.classList.remove('glow-effect');
        }
    });

    // 更新抽牌按钮文本
    const drawBtn = document.getElementById('drawCardBtn');
    if (drawBtn) {
        const remaining = 3 - selectedCards.length;
        if (remaining > 0) {
            drawBtn.innerHTML = `<i class="fas fa-hand-sparkles mr-2"></i>抽取第${selectedCards.length + 1}张牌`;
            drawBtn.disabled = false;
        } else {
            drawBtn.innerHTML = '<i class="fas fa-check mr-2"></i>已抽完3张牌';
            drawBtn.disabled = true;
        }
    }
}

// 增强加载状态显示
function showEnhancedLoading(message = '正在处理中...') {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm';
    loadingOverlay.innerHTML = `
        <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 text-center">
            <div class="loading-spinner mx-auto mb-4"></div>
            <p class="text-xl font-semibold mb-2">${message}</p>
            <p class="text-purple-200 text-sm">请稍候，神秘的指引正在显现...</p>
        </div>
    `;

    document.body.appendChild(loadingOverlay);
}

function hideEnhancedLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.3s ease-out';

        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
}

// 添加页面转换动画
function addPageTransition(fromSection, toSection) {
    fromSection.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    fromSection.style.opacity = '0';
    fromSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        fromSection.classList.add('hidden');
        toSection.classList.remove('hidden');

        toSection.style.opacity = '0';
        toSection.style.transform = 'translateY(20px)';
        toSection.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

        setTimeout(() => {
            toSection.style.opacity = '1';
            toSection.style.transform = 'translateY(0)';
        }, 50);
    }, 300);
}

// 增强键盘导航
function enhanceKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        // 数字键快速选择问题类型
        if (event.key >= '1' && event.key <= '5') {
            const questionCards = document.querySelectorAll('.question-card');
            const index = parseInt(event.key) - 1;

            if (index < questionCards.length && !questionCards[index].classList.contains('hidden')) {
                questionCards[index].click();
            }
        }

        // 空格键抽牌
        if (event.key === ' ' && getCurrentSection() === 'fortune') {
            event.preventDefault();
            if (selectedCards.length < 3) {
                drawCard();
            } else if (selectedCards.length === 3) {
                startReading();
            }
        }

        // 方向键导航历史记录
        if (getCurrentSection() === 'history') {
            const historyItems = document.querySelectorAll('#historyList > div');
            let currentIndex = Array.from(historyItems).findIndex(item => item.classList.contains('selected'));

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                currentIndex = Math.min(currentIndex + 1, historyItems.length - 1);
                selectHistoryItem(currentIndex);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                currentIndex = Math.max(currentIndex - 1, 0);
                selectHistoryItem(currentIndex);
            } else if (event.key === 'Enter' && currentIndex >= 0) {
                const viewBtn = historyItems[currentIndex].querySelector('button');
                if (viewBtn) viewBtn.click();
            }
        }
    });
}

// 选择历史记录项
function selectHistoryItem(index) {
    const historyItems = document.querySelectorAll('#historyList > div');

    historyItems.forEach((item, i) => {
        item.classList.remove('selected', 'ring-2', 'ring-purple-400');
    });

    if (index >= 0 && index < historyItems.length) {
        historyItems[index].classList.add('selected', 'ring-2', 'ring-purple-400');
        historyItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}