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
        symbol: '🌻',
        // 使用精美的CSS样式代替图片
        cardDesign: {
            background: 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
            border: '#FF8E53',
            element: '空气',
            number: '0',
            suitSymbol: '☀️'
        }
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
        symbol: '🌟',
        // 使用精美的CSS样式代替图片
        cardDesign: {
            background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
            border: '#A855F7',
            element: '火',
            number: 'I',
            suitSymbol: '🔮'
        }
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
        symbol: '🌙',
        // 使用精美的CSS样式代替图片
        cardDesign: {
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            border: '#7C3AED',
            element: '水',
            number: 'II',
            suitSymbol: '🌊'
        }
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
        symbol: '🌸',
        // 使用精美的CSS样式代替图片
        cardDesign: {
            background: 'linear-gradient(135deg, #10B981, #059669)',
            border: '#059669',
            element: '土',
            number: 'III',
            suitSymbol: '🌿'
        }
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
        symbol: '👑',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
            border: '#B91C1C',
            element: '火',
            number: 'IV',
            suitSymbol: '⚡'
        }
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
        symbol: '🏛️',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #6B7280, #4B5563)',
            border: '#374151',
            element: '土',
            number: 'V',
            suitSymbol: '🔑'
        }
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
        symbol: '💕',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            border: '#B45309',
            element: '空气',
            number: 'VI',
            suitSymbol: '🕊️'
        }
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
        symbol: '🏆',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #84CC16, #65A30D)',
            border: '#4D7C0F',
            element: '水',
            number: 'VII',
            suitSymbol: '🛡️'
        }
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
        symbol: '🦁',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #F97316, #EA580C)',
            border: '#C2410C',
            element: '火',
            number: 'VIII',
            suitSymbol: '❤️'
        }
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
        symbol: '🏮',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #64748B, #475569)',
            border: '#334155',
            element: '土',
            number: 'IX',
            suitSymbol: '🔦'
        }
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
        symbol: '🎯',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #9333EA, #C084FC)',
            border: '#7C3AED',
            element: '火',
            number: 'X',
            suitSymbol: '⚙️'
        }
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
        symbol: '⚖️',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #6B7280, #9CA3AF)',
            border: '#4B5563',
            element: '空气',
            number: 'XI',
            suitSymbol: '⚔️'
        }
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
        symbol: '🔄',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
            border: '#0369A1',
            element: '水',
            number: 'XII',
            suitSymbol: '🌲'
        }
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
        symbol: '🦋',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #1F2937, #374151)',
            border: '#111827',
            element: '水',
            number: 'XIII',
            suitSymbol: '🌅'
        }
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
        symbol: '🏺',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
            border: '#D97706',
            element: '水',
            number: 'XIV',
            suitSymbol: '🍶'
        }
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
        symbol: '⛓️',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #991B1B, #7F1D1D)',
            border: '#450A0A',
            element: '土',
            number: 'XV',
            suitSymbol: '🔥'
        }
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
        symbol: '⚡',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #7C2D12, #EA580C)',
            border: '#92400E',
            element: '火',
            number: 'XVI',
            suitSymbol: '🏔️'
        }
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
        symbol: '✨',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
            border: '#1D4ED8',
            element: '空气',
            number: 'XVII',
            suitSymbol: '💫'
        }
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
        symbol: '🌙',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
            border: '#5B21B6',
            element: '水',
            number: 'XVIII',
            suitSymbol: '🌕'
        }
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
        symbol: '🌟',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
            border: '#D97706',
            element: '火',
            number: 'XIX',
            suitSymbol: '☀️'
        }
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
        symbol: '📯',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #059669, #10B981)',
            border: '#047857',
            element: '火',
            number: 'XX',
            suitSymbol: '🌈'
        }
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
        symbol: '🌍',
        // 使用精美的CSS样式代替图片,
        cardDesign: {
            background: 'linear-gradient(135deg, #BE185D, #EC4899)',
            border: '#9F1239',
            element: '土',
            number: 'XXI',
            suitSymbol: '🎊'
        }
    }
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createMagicParticles();
    loadSavedData();

    // 添加页面状态检查，防止空白页面
    setTimeout(() => {
        const heroSection = document.getElementById('heroSection');
        const sections = document.querySelectorAll('section');
        let visibleSectionCount = 0;

        sections.forEach(section => {
            const style = window.getComputedStyle(section);
            if (style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                !section.classList.contains('hidden')) {
                visibleSectionCount++;
            }
        });

        // 如果没有可见的section，确保显示heroSection
        if (visibleSectionCount === 0 && heroSection) {
            console.warn('检测到页面空白，自动显示首页');
            heroSection.classList.remove('hidden');
            heroSection.style.display = 'block';
            heroSection.style.visibility = 'visible';
            heroSection.style.opacity = '1';
        }
    }, 1000);
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

// 更新已选牌显示 - 优化为横版布局，卡牌依次出现在左上、中间、右上，移动设备上简化布局
function updateSelectedCardsDisplay() {
    const container = document.getElementById('selectedCards');
    container.innerHTML = '';

    // 检测是否为移动设备
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        // 移动设备：使用水平排列
        container.style.position = 'relative';
        container.style.height = '160px';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.gap = '15px';
        container.style.overflowX = 'auto';
    } else {
        // 桌面设备：使用左上、中间、右上的定位
        container.style.position = 'relative';
        container.style.height = '200px';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.gap = '30px';
    }

    selectedCards.forEach((card, index) => {
        setTimeout(() => {
            const cardElement = createSelectedCardElement(card, index, isMobile);
            container.appendChild(cardElement);

            // 立即显示卡牌并开始翻转动画
            setTimeout(() => {
                cardElement.style.opacity = '1';

                if (isMobile) {
                    // 移动设备：简单的缩放翻转
                    cardElement.style.transform = 'scale(1) rotateY(0deg)';
                } else {
                    // 桌面设备：定位到特定位置
                    const positions = [
                        'translateX(-50%) scale(1) rotateY(0deg)',    // 左上
                        'translateX(-50%) scale(1) rotateY(0deg)',    // 中间
                        'translateX(-50%) scale(1) rotateY(0deg)'     // 右上
                    ];
                    const pos = positions[index] || positions[1];
                    cardElement.style.transform = pos;
                }

                // 同时翻转内部卡牌
                const innerCard = cardElement.querySelector('.premium-tarot-card');
                if (innerCard) {
                    innerCard.style.transform = 'rotateY(0deg)';
                    innerCard.classList.add('card-flip-in');
                }
            }, 100);
        }, index * 400); // 每400ms出现一张牌
    });
}

// 创建已选牌元素 - 实现左上、中间、右上定位，支持移动设备
function createSelectedCardElement(card, index, isMobile = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'tarot-card selected';
    cardDiv.style.opacity = '0';
    cardDiv.style.transform = 'scale(0.8) rotateY(180deg)';
    cardDiv.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    if (isMobile) {
        // 移动设备：使用相对定位，水平排列
        cardDiv.style.position = 'relative';
        cardDiv.style.display = 'inline-block';
        cardDiv.style.transform = 'scale(0.8) rotateY(180deg)';
    } else {
        // 桌面设备：使用绝对定位
        cardDiv.style.position = 'absolute';

        // 根据索引设置位置（左上、中间、右上）
        const positions = [
            { top: '20px', left: '20%', transform: 'translateX(-50%)' },    // 左上
            { top: '60px', left: '50%', transform: 'translateX(-50%)' },    // 中间
            { top: '20px', left: '80%', transform: 'translateX(-50%)' }     // 右上
        ];

        const pos = positions[index] || positions[1]; // 默认使用中间位置

        cardDiv.style.top = pos.top;
        cardDiv.style.left = pos.left;
        cardDiv.style.transform = pos.transform + ' scale(0.8) rotateY(180deg)';
    }

    const meaning = card.position === 'upright' ? card.uprightMeaning : card.reversedMeaning;
    const positionText = card.position === 'upright' ? '正位' : '逆位';

    // 使用新的卡牌设计
    const cardDesign = card.cardDesign || {
        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        border: '#7C3AED',
        element: '神秘',
        number: card.id,
        suitSymbol: card.symbol || '🌟'
    };

    // 根据设备类型设置不同的卡牌尺寸
    const cardSize = isMobile
        ? { width: '100px', height: '150px' }
        : { width: '120px', height: '180px' };

    const labelPosition = isMobile
        ? 'position: static; margin-top: 8px;'
        : 'position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); white-space: nowrap;';

    // 使用精美的CSS样式，适应不同设备尺寸
    cardDiv.innerHTML = `
        <div class="premium-tarot-card compact ${card.position === 'reversed' ? 'reversed' : ''}"
             style="background: ${cardDesign.background};
                    border: 3px solid ${cardDesign.border};
                    width: ${cardSize.width};
                    height: ${cardSize.height};
                    transform-style: preserve-3d;
                    backface-visibility: hidden;
                    transform: rotateY(180deg);">
            <div class="card-header">
                <div class="card-number">${cardDesign.number}</div>
                <div class="card-element">${cardDesign.element}</div>
            </div>
            <div class="card-symbol">
                <div class="symbol-main">${card.symbol || '🌟'}</div>
                <div class="symbol-decoration">${cardDesign.suitSymbol}</div>
            </div>
            <div class="card-info">
                <div class="card-name">${card.name}</div>
                <div class="card-position">${positionText}</div>
            </div>
            <div class="card-glow"></div>
        </div>
        <div class="mt-2 text-center" style="${labelPosition}">
            <div class="text-xs text-purple-200 font-medium">第${card.slot}张牌</div>
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
    const smoothScore = calculateLoveScore(); // 保持原有计算逻辑，但语义为顺利指数
    const moodScore = calculateMoodScore();

    return {
        id: Date.now(),
        question: currentQuestion,
        questionType: currentQuestionType,
        cards: selectedCards,
        interpretation: generateInterpretation(),
        loveScore: smoothScore, // 保持字段名以兼容现有代码
        moodScore: moodScore,
        advice: generateAdvice(),
        prediction: generatePrediction(),
        timestamp: new Date().toISOString(),
        isFavorite: false
    };
}

// 计算顺利指数（原爱情指数逻辑）
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

// 深度塔罗解读系统
function generateInterpretation() {
    const interpretations = [];
    const positions = ['过去的情况', '现在的状态', '未来的发展'];
    const timeContext = {
        '过去的情况': '在过去的影响层面',
        '现在的状态': '在当下的能量场中',
        '未来的发展': '在未来的可能性维度'
    };

    selectedCards.forEach((card, index) => {
        const meaning = card.position === 'upright' ? card.uprightMeaning : card.reversedMeaning;
        const psychologicalInsight = getPsychologicalInsight(card, index);
        const spiritualGuidance = getSpiritualGuidance(card, index);
        const practicalAdvice = getPracticalAdvice(card, index);

        interpretations.push({
            position: positions[index],
            cardName: card.name,
            meaning: meaning,
            psychological: psychologicalInsight,
            spiritual: spiritualGuidance,
            practical: practicalAdvice,
            interpretation: generateDepthInterpretation(card, index, positions[index], timeContext[positions[index]])
        });
    });

    // 添加牌面组合的深层洞察
    const combinationInsight = generateCombinationInsight();
    if (combinationInsight) {
        interpretations.push({
            position: '整体牌阵',
            cardName: '综合洞察',
            meaning: '牌面组合揭示的深层模式',
            combination: combinationInsight,
            interpretation: combinationInsight.summary
        });
    }

    return interpretations;
}

// 生成深度解读文案
function generateDepthInterpretation(card, index, position, timeContext) {
    const positionKey = card.position === 'upright' ? 'upright' : 'reversed';
    const coreThemes = getCardThemes(card.name, positionKey);

    let interpretation = `【${position}】${card.name}牌${card.position === 'upright' ? '正位' : '逆位'}\n\n`;

    interpretation += `🔮 **核心启示**：${timeContext}，${card.name}为你揭示了${coreThemes.main}的生命课题。`;

    if (card.position === 'reversed') {
        interpretation += `逆位的出现提醒你，需要特别关注${coreThemes.shadow}的内在模式。`;
    }

    interpretation += `\n\n💫 **深层含义**：${generateLayeredMeaning(card, positionKey)}`;

    return interpretation;
}

// 获取每张牌的心理深层洞察
function getPsychologicalInsight(card, position) {
    const insights = {
        '愚人': {
            upright: '你内心的孩童能量正在觉醒，需要相信直觉，勇敢踏出新的一步。这代表着你对未知世界的天然信任和探索欲。',
            reversed: '你可能正在压抑自己真实的渴望，害怕犯错或被评判。是时候释放内心的批判声音，重新连接那份纯真的勇气。'
        },
        '魔术师': {
            upright: '你拥有将想法转化为现实的所有资源。现在是运用意志力和创造力，主动塑造你想要的生活的时候。',
            reversed: '你可能感到无力或缺乏自信，怀疑自己的能力。记住，真正的魔法来自于对自己价值的确认和对梦想的坚持。'
        },
        '女祭司': {
            upright: '你的直觉力正在增强，潜意识中有重要的智慧等待被揭示。保持静心，倾听内心的声音。',
            reversed: '你可能忽略了自己的直觉，或者隐藏着重要的情感。是时候面对内心的真相，不再压抑真实的感受。'
        },
        '皇后': {
            upright: '丰盛的能量正在流向你。这提醒你要滋养自己，享受创造的喜悦，相信生活本身的慷慨。',
            reversed: '你可能感到缺乏安全感，或者过度依赖他人的认可。学会从内心寻找价值的确认，而不是外在的成就。'
        },
        '皇帝': {
            upright: '建立稳定结构和明确边界的时候到了。你有能力创造秩序，承担责任，成为自己生活的建筑师。',
            reversed: '控制欲或僵化的思维可能正在限制你。学习在稳定与灵活性之间找到平衡，真正的力量来自于适应性。'
        },
        '教皇': {
            upright: '传统智慧和灵性指导正在你的生活中扮演重要角色。无论是寻求导师还是成为他人的引路人，都要保持开放的心态。',
            reversed: '你可能正在质疑既有的信念体系，或者需要打破某些限制性的传统。相信内心的智慧，它知道什么对你最好。'
        },
        '恋人': {
            upright: '重要的选择正在摆在你面前，需要用心而不是头脑来做决定。真实的连接来自于价值观的和谐。',
            reversed: '你可能在关系中感到失衡，或者做出了违背自己价值观的选择。重新审视什么对你真正重要。'
        },
        '战车': {
            upright: '通过坚定的意志和清晰的目标，你能够克服障碍，前进到新的领域。你的内在驱动力正在增强。',
            reversed: '你可能在方向上感到困惑，或者内在的冲突正在消耗你的能量。暂停下来，重新确定自己的目标。'
        },
        '力量': {
            upright: '真正的力量来自于内心的勇气和温柔的控制。你正在学习用爱与理解来驯服内心的猛兽。',
            reversed: '你可能在怀疑自己的能力，或者用强硬的方式处理问题。记住，温柔比暴力更有力量。'
        },
        '隐士': {
            upright: '内在的智慧正在召唤你进入独处和反思。这是一个寻找内在指引，连接灵魂真理的时刻。',
            reversed: '你可能感到孤独或与世隔绝，但真正的答案不在外界而在内心。学会享受独处的价值。'
        },
        '命运之轮': {
            upright: '生活的循环正在转动，变化即将到来。这是一个顺应宇宙流动，抓住机遇的时刻。',
            reversed: '你可能抗拒变化，或者感到命运不公。记住，每个结束都孕育着新的开始。'
        },
        '正义': {
            upright: '因果法则正在运作，你需要为自己的选择负责。这是一个寻求平衡和公正的时刻。',
            reversed: '你可能面临不公正的情况，或者逃避责任。通过诚实和正直来恢复平衡。'
        },
        '倒吊人': {
            upright: '有时候需要放下旧有视角才能获得新的洞察。暂时的牺牲将带来更大的智慧。',
            reversed: '你可能为了错误的原因而牺牲，或者抗拒必要的改变。学会区分有意义的牺牲和自我折磨。'
        },
        '死神': {
            upright: '一个重要的结束和转变正在发生。这不是死亡，而是旧有模式的消亡，为新生命腾出空间。',
            reversed: '你可能抗拒改变，或者拖延不可避免的结束。记住，转化是生命成长的自然过程。'
        },
        '节制': {
            upright: '平衡各种能量是现在的关键。通过调和内在的对立面，你将找到内心的和谐。',
            reversed: '你可能感到失衡或极端化。学习在行动与静心、给予与接受之间找到中庸之道。'
        },
        '恶魔': {
            upright: '你可能被某种成瘾或负面模式所束缚。这是面对阴影，寻求解放的时刻。',
            reversed: '打破束缚的机会正在来临。你有力量摆脱限制性的信念和行为模式。'
        },
        '塔': {
            upright: '突变的时刻正在到来。现有的结构可能会崩塌，但这为真理的显露创造了机会。',
            reversed: '你可能逃避必要的改变，或者紧抓着不再安全的结构不放。让变化自然发生。'
        },
        '星星': {
            upright: '希望和灵感正在你的生命中流动。这是一个治愈和重新开始的时刻。',
            reversed: '你可能感到绝望或失去信念。即使在黑暗中，星光也在指引你前行。'
        },
        '月亮': {
            upright: '潜意识深处的情感和恐惧正在浮现。通过面对这些，你将获得更深的自我理解。',
            reversed: '你可能被幻觉或恐惧所困扰。学会区分想象与现实，相信内在的指引。'
        },
        '太阳': {
            upright: '喜悦、清晰和成功正在你的生活中绽放。这是一个充满活力和自信的时刻。',
            reversed: '暂时的挫折或阴霾正在遮蔽你的光芒。记住，太阳永远在那里，等待云层散去。'
        },
        '审判': {
            upright: '觉醒和重生的时刻正在到来。通过宽恕自己和他人，你将获得新的开始。',
            reversed: '你可能过于批判自己或他人。学会接受不完美，拥抱宽恕的力量。'
        },
        '世界': {
            upright: '一个重要的周期正在完成。你整合了经验，准备好开始新的旅程。',
            reversed: '你可能感到未完成或缺乏成就感。庆祝已经取得的进步，即使旅程尚未结束。'
        }
    };

    return insights[card.name]?.[card.position] || '深入的自我反思将帮助你理解这张牌在你的生命中的独特意义。';
}

// 获取灵性指引
function getSpiritualGuidance(card, position) {
    const guidance = {
        '愚人': '灵魂邀请你踏上一段新的旅程，相信宇宙的引导，保持对奇迹的开放态度。',
        '魔术师': '你是自己现实的创造者，宇宙正在提醒你有能力显化你的意图和愿望。',
        '女祭司': '神圣的女性智慧正在流动，通过冥想和静心来接收更高层面的指引。',
        '皇后': '大地母亲正在滋养你，与自然连接，感受生命的丰盛和创造力。',
        '皇帝': '建立神圣结构的时候到了，创造能够支持你灵性成长的稳定基础。',
        '教皇': '寻找灵性导师或成为他人的灯塔，传统中蕴含着古老的智慧。',
        '恋人': '通过爱的整合来疗愈分离的幻象，记住一切都是神圣的连接。',
        '战车': '通过专注的意志来驾驭灵性能量，让内在的光芒照亮前行的道路。',
        '力量': '温柔的灵性力量正在你的心中觉醒，学会用爱与慈悲来转化内在的阴影。',
        '隐士': '内在的灵性之光正在指引你，独处是与高我连接的珍贵时刻。',
        '命运之轮': '宇宙的周期正在你的生命中运作，顺应神圣的时机，相信一切都有其完美。',
        '正义': '业力法则正在平衡你的灵性债务，通过正直和诚实来净化你的能量场。',
        '倒吊人': '通过放下旧的视角，你将从更高的维度看待问题，获得灵性的觉醒。',
        '死神': '旧有自我的死亡是为了让更高版本的自己重生，这是神圣的转化过程。',
        '节制': '调和内在的阴阳能量，通过平衡来达到灵性的和谐统一。',
        '恶魔': '面对你的阴影面，通过觉察和接纳来转化束缚你的负面模式。',
        '塔': '旧有结构的崩塌是为了让真理的光芒照耀进来，这是灵性觉醒的雷声。',
        '星星': '希望之星正在你的夜空中闪耀，宇宙正在为你指引光明的道路。',
        '月亮': '潜意识中的灵性智慧正在觉醒，学会在神秘中导航，信任直觉的指引。',
        '太阳': '你的灵性之光正在全面绽放，这是一个充满喜悦、清晰和力量的时刻。',
        '审判': '灵性的觉醒正在召唤你，通过宽恕和接纳来获得重生和自由。',
        '世界': '你已经完成了一个重要的灵性周期，准备好整合智慧，开始新的神圣旅程。'
    };

    return guidance[card.name] || '这张牌在你的灵性旅程中具有独特的意义，静心冥想将带来更深层的理解。';
}

// 获取实用建议
function getPracticalAdvice(card, position) {
    const advice = {
        '愚人': position === 'upright'
            ? '尝试一些全新的体验，即使看起来有些"不理性"。相信你的第一直觉。'
            : '不要过度思考，有时候最好的行动就是简单地开始。',
        '魔术师': position === 'upright'
            ? '列出你的目标，然后采取具体的第一步。你拥有所需的一切资源。'
            : '关注你可以说服自己什么，而不是说服别人什么。',
        '女祭司': position === 'upright'
            ? '每天留出时间进行冥想或静心。记录你的梦境和直觉感受。'
            : '不要忽视内心的不安感，它们往往包含重要的信息。',
        '皇后': position === 'upright'
            ? '照顾好你的身体，创造舒适的环境，允许自己接受他人的关爱。'
            : '学会先滋养自己，然后再为他人付出。',
        '皇帝': position === 'upright'
            ? '建立明确的日常规则和长期目标。承担责任将带来更多自由。'
            : '学会设定健康的边界，不要试图控制一切。',
        '教皇': position === 'upright'
            ? '寻找值得信赖的导师或加入相关的学习社群。'
            : '质疑那些不再服务于你的旧信念和规则。',
        '恋人': position === 'upright'
            ? '基于你的价值观做决定，而不是基于他人的期望。'
            : '诚实地面对你的关系状况，必要时做出艰难但真实的选择。',
        '战车': position === 'upright'
            ? '保持对目标的专注，避免被分心。自律将带来胜利。'
            : '有时候最快的路是停下来重新确定方向。',
        '力量': position === 'upright'
            ? '用温柔的方式处理冲突，耐心和同情心比武力更有效。'
            : '学会接受自己的脆弱之处，真正的力量来自于内心的平静。',
        '隐士': position === 'upright'
            ? '安排独处的时间进行深度思考，远离外界的干扰。'
            : '不要因为孤独而匆忙做出决定，静心等待更好的时机。',
        '命运之轮': position === 'upright'
            ? '抓住出现的新机会，即使它们看起来很突然。'
            : '接受变化是生活的一部分，不要抗拒自然的循环。',
        '正义': position === 'upright'
            ? '为自己的决定承担责任，确保行为与价值观一致。'
            : '面对不公平时，保持诚实和正直来恢复平衡。',
        '倒吊人': position === 'upright'
            ? '尝试从不同的角度看待问题，也许会有新的发现。'
            : '确保你的牺牲是有意义的，不要为了错误的理由而付出。',
        '死神': position === 'upright'
            ? '主动清理不再需要的东西，为新的事物腾出空间。'
            : '学会接受结束，每一个结束都孕育着新的开始。',
        '节制': position === 'upright'
            ? '在不同方面之间找到平衡，避免极端化的行为。'
            : '耐心等待合适的时机，不要急于求成。',
        '恶魔': position === 'upright'
            ? '识别并面对你的依赖性或负面模式，寻求专业帮助。'
            : '打破不健康的习惯或关系，重新获得你的自由。',
        '塔': position === 'upright'
            ? '为意外的变化做好准备，它们可能会带来更好的结果。'
            : '不要抗拒必要的改变，让旧结构自然崩塌。',
        '星星': position === 'upright'
            ? '即使在困难时期也要保持希望，相信更好的明天。'
            : '重新连接你的梦想和理想，不要失去信念。',
        '月亮': position === 'upright'
            ? '探索你的潜意识，不要忽视直觉和梦境。'
            : '学会区分想象和现实，避免被恐惧所困。',
        '太阳': position === 'upright'
            ? '充分展现你的才华和自信，现在是成功的时刻。'
            : '不要让暂时的挫折影响你的长期目标。',
        '审判': position === 'upright'
            ? '原谅过去的错误，给自己一个重新开始的机会。'
            : '停止自我批判，接受不完美是成长的一部分。',
        '世界': position === 'upright'
            ? '庆祝你已经完成的成就，准备开始新的旅程。'
            : '认可自己已经取得的进步，即使还有更多要做。'
    };

    return advice[card.name] || '反思这张牌如何在你具体的情境中应用，个性化的答案将从中浮现。';
}

// 生成分层含义
function generateLayeredMeaning(card, positionKey) {
    const meanings = {
        '愚人': {
            upright: '这是一个全新开始的时刻，宇宙邀请你放下过去的包袱，以纯净的心灵迎接未知的可能性。你的灵魂渴望冒险和成长。',
            reversed: '内在的恐惧或外界的期望可能正在阻碍你表达真实的自己。是时候重新连接那份无限的潜能。'
        },
        '魔术师': {
            upright: '你正处于一个强大的显化时期，思想、言语和行动正在共同创造你的现实。要有意识地运用这份力量。',
            reversed: '你可能感到与自己的力量脱节，或者在使用这些力量时缺乏智慧。重新连接你的内在神性。'
        },
        '女祭司': {
            upright: '潜意识的大门正在打开，古老的女性智慧正在流动。信任你的直觉，它知道逻辑无法理解的事情。',
            reversed: '你可能过于依赖理性，忽略了情感和直觉的智慧。平衡阴阳两面的能量。'
        }
    };

    const cardMeaning = meanings[card.name]?.[positionKey];
    return cardMeaning || '深入冥想这张牌的象征意义，个性化的答案将从内在浮现。';
}

// 获取卡牌主题
function getCardThemes(cardName, positionKey) {
    const themes = {
        '愚人': {
            upright: {
                main: '新的开始和无限可能性',
                shadow: '对未知的恐惧和对责任的逃避'
            },
            reversed: {
                main: '重新连接纯真和勇气',
                shadow: '鲁莽行事或缺乏方向感'
            }
        },
        '魔术师': {
            upright: {
                main: '主动创造和意志力的显化',
                shadow: '潜在的操控倾向或傲慢'
            },
            reversed: {
                main: '重新获得个人力量',
                shadow: '能力不足感或欺骗倾向'
            }
        }
    };

    return themes[cardName]?.[positionKey] || {
        main: '正在探索的生命课题',
        shadow: '需要转化的阴影模式'
    };
}

// 生成牌面组合洞察
function generateCombinationInsight() {
    if (selectedCards.length < 2) return null;

    const allUpright = selectedCards.every(card => card.position === 'upright');
    const allReversed = selectedCards.every(card => card.position === 'reversed');
    const mixedPositions = !allUpright && !allReversed;

    let insight = { summary: '', patterns: [], recommendations: [] };

    if (allUpright) {
        insight.summary = '🌟 **强大的顺位能量**：所有牌面都呈现出积极的能量，这是一个极其有利的信号。宇宙正在为你铺平道路，现在最重要的是保持信心，继续前进。';
    } else if (allReversed) {
        insight.summary = '🔄 **重要的转化期**：所有牌面逆位出现，表明你正在经历一个深刻的内在转化期。这不是阻碍，而是灵魂邀请你重新审视和调整方向。';
    } else if (mixedPositions) {
        insight.summary = '⚖️ **平衡与整合**：正逆位的组合表明你正在学习整合内在的对立力量。这是一个成长和疗愈的重要过程。';
    }

    return insight;
}

// 生成深度个性化建议
function generateAdvice() {
    const cardAnalysis = analyzeSelectedCards();
    const contextualAdvice = getContextualAdvice(cardAnalysis);
    const actionableSteps = getActionableSteps(cardAnalysis);
    const affirmation = generateAffirmation(cardAnalysis);

    return {
        primary: contextualAdvice.primary,
        secondary: contextualAdvice.secondary,
        spiritual: contextualAdvice.spiritual,
        practical: actionableSteps,
        affirmation: affirmation,
        timeframe: getTimeframeAdvice(cardAnalysis)
    };
}

// 分析选中的牌
function analyzeSelectedCards() {
    const analysis = {
        dominantTheme: '',
        elementBalance: {},
        numerology: 0,
        majorArcanaCount: 0,
        positionBalance: { upright: 0, reversed: 0 },
        keyCards: [],
        challenges: [],
        strengths: []
    };

    let totalId = 0;
    let uprightCount = 0;
    let reversedCount = 0;

    selectedCards.forEach(card => {
        totalId += card.id;
        if (card.type === 'major') analysis.majorArcanaCount++;
        if (card.position === 'upright') uprightCount++;
        else reversedCount++;

        // 识别关键牌
        if (card.id <= 3 || card.name === '恋人' || card.name === '战车') {
            analysis.keyCards.push(card.name);
        }
    });

    analysis.positionBalance = { upright: uprightCount, reversed: reversedCount };
    analysis.numerology = totalId;

    // 分析主要主题
    analysis.dominantTheme = identifyDominantTheme();

    return analysis;
}

// 识别主导主题
function identifyDominantTheme() {
    const cardNames = selectedCards.map(card => card.name);

    if (cardNames.includes('愚人')) return '新的开始与探索';
    if (cardNames.includes('魔术师')) return '主动创造与显化';
    if (cardNames.includes('女祭司')) return '直觉与内在智慧';
    if (cardNames.includes('皇后')) return '丰盛与滋养';
    if (cardNames.includes('皇帝')) return '结构与权威';
    if (cardNames.includes('恋人')) return '选择与关系';
    if (cardNames.includes('战车')) return '意志与前进';

    return '成长与转变';
}

// 获取情境化建议
function getContextualAdvice(cardAnalysis) {
    const themeAdvice = {
        '新的开始与探索': {
            primary: '🌱 **拥抱新的开始**：宇宙正在邀请你踏上一段新的旅程。现在是放下过去、拥抱未知的最佳时机。',
            secondary: '保持好奇心和开放心态，不要让恐惧阻碍你探索生命的新可能性。',
            spiritual: '你的灵魂正在寻求扩展和成长。相信宇宙的时机，每一步都有其意义。'
        },
        '主动创造与显化': {
            primary: '✨ **成为现实的创造者**：你拥有将愿景转化为现实的所有力量。现在是时候运用你的创造才能。',
            secondary: '明确你的意图，专注你的能量，宇宙将支持你的显化过程。',
            spiritual: '你与神圣创造力的连接正在增强。记住，你的思想具有创造的力量。'
        },
        '直觉与内在智慧': {
            primary: '🔮 **信任你的内在指引**：你的直觉力正在觉醒。现在最重要的是学会倾听内心的声音。',
            secondary: '在静心中寻找答案，你的潜意识拥有超越逻辑的智慧。',
            spiritual: '神圣的女性智慧正在你生命中流动。通过冥想和反思来接收更高层面的指引。'
        },
        '丰盛与滋养': {
            primary: '🌸 **拥抱丰盛的能量**：生活正在为你准备丰盛的礼物。学会接受和享受生活的美好。',
            secondary: '先滋养自己，然后才能更好地滋养他人。自我关爱不是自私，而是必要的。',
            spiritual: '大地母亲的能量正在支持你。与自然连接，感受生命的无限慷慨。'
        }
    };

    const defaultAdvice = {
        primary: '🌟 **信任生命的旅程**：每一张牌都在为你提供成长的指引。保持开放和觉察。',
        secondary: '相信自己的直觉，它知道什么对你最好。内在的智慧将指引你前行。',
        spiritual: '你正在灵性觉醒的道路上前进。每一步都有其深刻的意义和目的。'
    };

    return themeAdvice[cardAnalysis.dominantTheme] || defaultAdvice;
}

// 获取可行动步骤
function getActionableSteps(cardAnalysis) {
    const steps = [];

    // 基于牌面位置平衡的建议
    if (cardAnalysis.positionBalance.reversed > cardAnalysis.positionBalance.upright) {
        steps.push('🔄 内在反思：花时间进行自我探索，识别需要释放的模式');
        steps.push('🧘 静心练习：每天进行冥想或瑜伽，平衡内在能量');
    } else {
        steps.push('🚀 积极行动：将想法转化为具体的行动计划');
        steps.push('🎯 目标设定：明确你的短期和长期目标');
    }

    // 基于主要主题的步骤
    const themeSteps = {
        '新的开始与探索': [
            '📝 写下你的愿望和目标',
            '🎨 尝试新的爱好或活动'
        ],
        '主动创造与显化': [
            '💭 创作愿景板',
            '⚡ 每天进行显化练习'
        ],
        '直觉与内在智慧': [
            '📖 开始写梦境日记',
            '🌙 进行新月仪式'
        ]
    };

    const specificSteps = themeSteps[cardAnalysis.dominantTheme] || [];
    steps.push(...specificSteps);

    return steps;
}

// 生成肯定语
function generateAffirmation(cardAnalysis) {
    const affirmations = {
        '新的开始与探索': '我拥抱新的开始，相信生命的无限可能性',
        '主动创造与显化': '我是自己现实的创造者，我拥有显化梦想的力量',
        '直觉与内在智慧': '我信任我的直觉，内在智慧指引我前行',
        '丰盛与滋养': '我值得拥有丰盛，我接受生活所有的美好'
    };

    return affirmations[cardAnalysis.dominantTheme] || '我相信自己的旅程，每一步都有其意义';
}

// 获取时间框架建议
function getTimeframeAdvice(cardAnalysis) {
    if (cardAnalysis.positionBalance.upright >= 2) {
        return {
            energy: '高能期',
            timeframe: '短期内（1-4周）',
            advice: '现在是行动的最佳时机，抓住这个能量高峰期'
        };
    } else if (cardAnalysis.positionBalance.reversed >= 2) {
        return {
            energy: '整合期',
            timeframe: '中期来看（1-3个月）',
            advice: '这是一个重要的内在整合期，耐心等待时机成熟'
        };
    } else {
        return {
            energy: '平衡期',
            timeframe: '渐进式发展',
            advice: '能量正在平衡，稳步前进将带来最佳结果'
        };
    }
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
                ${readingResult.cards.map((card, index) => {
                    const cardDesign = card.cardDesign || {
                        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                        border: '#7C3AED',
                        element: '神秘',
                        number: card.id,
                        suitSymbol: card.symbol || '🌟'
                    };
                    return `
                    <div class="premium-tarot-card ${card.position === 'reversed' ? 'reversed' : ''}"
                         style="background: ${cardDesign.background}; border: 3px solid ${cardDesign.border}; min-height: 220px;">
                        <div class="card-header">
                            <div class="card-number">${cardDesign.number}</div>
                            <div class="card-element">${cardDesign.element}</div>
                        </div>
                        <div class="card-symbol">
                            <div class="symbol-main">${card.symbol || '🌟'}</div>
                            <div class="symbol-decoration">${cardDesign.suitSymbol}</div>
                        </div>
                        <div class="card-info">
                            <div class="card-name">${card.name}</div>
                            <div class="card-position">${card.position === 'upright' ? '正位' : '逆位'}</div>
                        </div>
                        <div class="card-glow"></div>
                    </div>
                `;}).join('')}
            </div>

            <!-- 深度塔罗解读 -->
            <div class="space-y-8">
                <!-- 核心启示 -->
                <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-20">
                    <h4 class="text-3xl font-bold mb-6 flex items-center">
                        <span class="text-2xl mr-3">🔮</span>
                        深度塔罗解读
                    </h4>

                    <div class="space-y-6">
                        ${readingResult.interpretation.map(interp => `
                            <div class="bg-purple-900 bg-opacity-30 rounded-lg p-6 border-l-4 border-purple-400">
                                <h5 class="text-xl font-bold mb-3 text-purple-200">${interp.position}</h5>
                                <div class="text-lg leading-relaxed text-purple-100 whitespace-pre-line">${interp.interpretation}</div>

                                ${interp.psychological ? `
                                    <div class="mt-4 pt-4 border-t border-purple-700 border-opacity-50">
                                        <h6 class="font-semibold text-purple-200 mb-2">🧠 心理洞察</h6>
                                        <p class="text-purple-100">${interp.psychological}</p>
                                    </div>
                                ` : ''}

                                ${interp.spiritual ? `
                                    <div class="mt-4 pt-4 border-t border-purple-700 border-opacity-50">
                                        <h6 class="font-semibold text-purple-200 mb-2">✨ 灵性指引</h6>
                                        <p class="text-purple-100">${interp.spiritual}</p>
                                    </div>
                                ` : ''}

                                ${interp.practical ? `
                                    <div class="mt-4 pt-4 border-t border-purple-700 border-opacity-50">
                                        <h6 class="font-semibold text-purple-200 mb-2">🎯 实用建议</h6>
                                        <p class="text-purple-100">${interp.practical}</p>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 综合洞察 -->
                ${readingResult.interpretation.some(interp => interp.combination) ? `
                    <div class="bg-gradient-to-r from-purple-800 to-pink-800 bg-opacity-30 backdrop-blur-md rounded-xl p-8 border border-purple-300 border-opacity-30">
                        <h4 class="text-2xl font-bold mb-4 flex items-center">
                            <span class="text-2xl mr-3">⚡</span>
                            综合能量洞察
                        </h4>
                        <div class="text-lg leading-relaxed text-purple-100">
                            ${readingResult.interpretation.filter(interp => interp.combination).map(interp => interp.combination.summary).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- 深度建议系统 -->
                <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-20">
                    <h4 class="text-2xl font-bold mb-6 flex items-center">
                        <span class="text-2xl mr-3">🌟</span>
                        个性化指导方案
                    </h4>

                    ${readingResult.advice.primary ? `
                        <div class="mb-6">
                            <h5 class="text-xl font-semibold mb-3 text-purple-200">核心指引</h5>
                            <p class="text-lg text-purple-100">${readingResult.advice.primary}</p>
                        </div>
                    ` : ''}

                    ${readingResult.advice.secondary ? `
                        <div class="mb-6">
                            <h5 class="text-xl font-semibold mb-3 text-purple-200">辅助建议</h5>
                            <p class="text-lg text-purple-100">${readingResult.advice.secondary}</p>
                        </div>
                    ` : ''}

                    ${readingResult.advice.spiritual ? `
                        <div class="mb-6">
                            <h5 class="text-xl font-semibold mb-3 text-purple-200">🌙 灵性修行</h5>
                            <p class="text-lg text-purple-100">${readingResult.advice.spiritual}</p>
                        </div>
                    ` : ''}

                    ${readingResult.advice.practical && readingResult.advice.practical.length > 0 ? `
                        <div class="mb-6">
                            <h5 class="text-xl font-semibold mb-3 text-purple-200">📋 行动计划</h5>
                            <ul class="space-y-2 text-lg text-purple-100">
                                ${readingResult.advice.practical.map(step => `<li class="flex items-start"><span class="mr-2">${step.split(':')[0]}:</span><span>${step.split(':')[1] || step}</span></li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    ${readingResult.advice.affirmation ? `
                        <div class="bg-gradient-to-r from-purple-700 to-pink-700 bg-opacity-50 rounded-lg p-6 text-center">
                            <h5 class="text-xl font-semibold mb-3 text-purple-200">💫 今日肯定语</h5>
                            <p class="text-xl font-bold text-purple-100 italic">"${readingResult.advice.affirmation}"</p>
                        </div>
                    ` : ''}
                </div>

                <!-- 时间能量分析 -->
                <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-20">
                    <h4 class="text-2xl font-bold mb-6 flex items-center">
                        <span class="text-2xl mr-3">⏰</span>
                        时间能量预测
                    </h4>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 bg-opacity-50 rounded-lg p-6">
                            <h5 class="text-xl font-semibold mb-3">能量周期</h5>
                            <p class="text-lg mb-2">${readingResult.prediction.positive ? '✅ 积极向上' : '⚠️ 需要谨慎'}</p>
                            <p class="text-purple-200">可能性：${readingResult.prediction.likelihood}</p>
                        </div>

                        <div class="bg-gradient-to-r from-green-600 to-teal-600 bg-opacity-50 rounded-lg p-6">
                            <h5 class="text-xl font-semibold mb-3">时间框架</h5>
                            <p class="text-lg">${readingResult.prediction.timeframe}</p>
                            ${readingResult.advice.timeframe ? `<p class="text-purple-200 mt-2">${readingResult.advice.timeframe.advice}</p>` : ''}
                        </div>
                    </div>

                    <div class="mt-6">
                        <h5 class="text-xl font-semibold mb-3 text-purple-200">关键影响因素</h5>
                        <div class="flex flex-wrap gap-2">
                            ${readingResult.prediction.keyFactors.map(factor => `
                                <span class="bg-purple-700 bg-opacity-50 px-4 py-2 rounded-full text-purple-100">${factor}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 评分展示 -->
            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold">顺利指数</h5>
                        <i class="fas fa-check-circle text-2xl"></i>
                    </div>
                    <div class="flex items-center">
                        <div class="flex-1 bg-white bg-opacity-30 rounded-full h-4">
                            <div class="love-score-bar bg-gradient-to-r from-green-400 to-teal-400 h-full rounded-full transition-all duration-1000" style="width: 0%"></div>
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
            text: `我刚刚进行了塔罗占卜！问题：${readingResult.question}\n顺利指数：${readingResult.loveScore}%\n情绪指数：${readingResult.moodScore > 0 ? '+' : ''}${readingResult.moodScore}%`,
            url: window.location.href
        });
    } else {
        // 复制到剪贴板
        const text = `我刚刚进行了塔罗占卜！\n问题：${readingResult.question}\n顺利指数：${readingResult.loveScore}%\n情绪指数：${readingResult.moodScore > 0 ? '+' : ''}${readingResult.moodScore}%`;
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
                    <span class="flex items-center"><i class="fas fa-check-circle mr-1"></i>顺利指数: ${item.loveScore}%</span>
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
                    <span class="flex items-center"><i class="fas fa-check-circle mr-1"></i>顺利指数: ${item.loveScore}%</span>
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

// 重新开始 - 修复空白页面bug
function restart() {
    console.log('重启开始，当前状态:', {
        currentQuestion,
        currentQuestionType,
        selectedCards: selectedCards.length,
        hasResult: !!readingResult
    });

    try {
        // 保存当前状态，防止异常
        const currentVisibleSection = getCurrentSection();

        // 重置所有状态（先重置状态，再切换页面）
        currentQuestion = '';
        currentQuestionType = '';
        selectedCards = [];
        readingResult = null;

        // 安全隐藏所有section，但要确保heroSection存在
        const sections = document.querySelectorAll('section');
        console.log('隐藏所有section，找到', sections.length, '个section');

        sections.forEach((section, index) => {
            if (section.id !== 'heroSection') {
                section.classList.add('hidden');
                section.style.display = 'none';
                section.style.visibility = 'hidden';
                section.style.opacity = '0';
                console.log(`隐藏section ${index + 1}: ${section.id}`);
            } else {
                console.log(`保留section: ${section.id}`);
            }
        });

        // 强制显示首页 - 使用多种方法确保显示
        const heroSection = document.getElementById('heroSection');
        if (heroSection) {
            console.log('找到heroSection，开始显示');

            // 方法1: 移除hidden类
            heroSection.classList.remove('hidden');

            // 方法2: 强制设置样式（使用!important确保优先级）
            heroSection.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                transform: translateY(0) !important;
                position: static !important;
            `;

            // 方法3: 确保父元素也可见
            const parent = heroSection.parentElement;
            if (parent) {
                parent.style.display = 'block';
                parent.style.visibility = 'visible';
            }

            // 方法4: 强制重排
            void heroSection.offsetHeight;

            console.log('heroSection已显示:', {
                display: heroSection.style.display,
                visibility: heroSection.style.visibility,
                opacity: heroSection.style.opacity,
                classes: heroSection.className
            });

            // 方法5: 使用requestAnimationFrame确保在下一帧渲染
            requestAnimationFrame(() => {
                heroSection.style.display = 'block';
                heroSection.style.visibility = 'visible';
                heroSection.style.opacity = '1';
                console.log('requestAnimationFrame确认heroSection显示');
            });

        } else {
            console.error('找不到heroSection元素!');
            // 作为最后的手段，重新加载页面
            showToast('页面出现异常，正在重新加载...', 'warning');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            return;
        }

        // 更新UI状态
        updateNavigationButtons();
        updateBreadcrumbNavigation();
        updateProgressBar(0);

        // 清理残留内容
        setTimeout(() => {
            const selectedCardsContainer = document.getElementById('selectedCards');
            if (selectedCardsContainer) {
                selectedCardsContainer.innerHTML = '';
            }
            console.log('重启完成');
        }, 100);

        showToast('已重新开始，祝你好运！✨', 'info');

    } catch (error) {
        console.error('重启过程中发生错误:', error);
        console.log('重启失败，尝试重新加载页面');
        // 作为最后的手段，重新加载页面
        showToast('出现异常，正在重新加载页面...', 'warning');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
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
    const sections = document.querySelectorAll('section');
    console.log('隐藏所有section，找到', sections.length, '个section');

    sections.forEach((section, index) => {
        section.classList.add('hidden');
        // 确保样式被正确应用
        section.style.display = 'none';
        section.style.visibility = 'hidden';
        section.style.opacity = '0';
        console.log(`隐藏section ${index + 1}: ${section.id}`);
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

    // 控制首页按钮显示
    updateHomeButtonVisibility(currentSection);
}

// 更新首页按钮可见性
function updateHomeButtonVisibility(currentSection) {
    const homeButton = document.getElementById('homeButton');
    if (!homeButton) return;

    if (currentSection === 'hero') {
        // 在首页时隐藏首页按钮
        homeButton.style.display = 'none';
    } else {
        // 在其他页面时显示首页按钮
        homeButton.style.display = 'flex';
    }
}

// 获取当前可见的页面部分 - 增强版本
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    for (let section of sections) {
        const style = window.getComputedStyle(section);
        if (!section.classList.contains('hidden') &&
            style.display !== 'none' &&
            style.visibility !== 'hidden') {
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