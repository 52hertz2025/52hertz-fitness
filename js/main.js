// 主要功能逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initPage();

    // 绑定事件
    bindEvents();
});

// 初始化页面
function initPage() {
    // 获取免费体验天数
    loadFreeDays();

    // 初始化轮播效果
    initCarousels();

    // 添加页面特效
    addPageEffects();
}

// 获取免费体验天数
function loadFreeDays() {
    API.getFreeDays().then(response => {
        if (response.success) {
            document.getElementById('freeDays').textContent = response.data.days;
        }
    });
}

// 初始化轮播效果
function initCarousels() {
    // 活动轮播自动播放
    let activityIndex = 0;
    const activityCarousel = document.querySelector('.activities-carousel');
    const activityItems = document.querySelectorAll('.activity-item');

    if (activityItems.length > 1) {
        setInterval(() => {
            activityIndex = (activityIndex + 1) % activityItems.length;
            activityCarousel.scrollLeft = activityItems[activityIndex].offsetLeft;
        }, 5000);
    }

    // 奖品轮播自动播放
    let prizeIndex = 0;
    const prizeCarousel = document.querySelector('.prizes-carousel');
    const prizeItems = document.querySelectorAll('.prize-item');

    if (prizeItems.length > 1) {
        setInterval(() => {
            prizeIndex = (prizeIndex + 1) % prizeItems.length;
            prizeCarousel.scrollLeft = prizeItems[prizeIndex].offsetLeft;
        }, 4000);
    }
}

// 添加页面特效
function addPageEffects() {
    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // 为需要动画的元素添加观察
    document.querySelectorAll('.section-title, .activity-item, .coach-card, .prize-item, .video-item').forEach(el => {
        observer.observe(el);
    });

    // 添加鼠标悬停效果
    document.querySelectorAll('.activity-item, .coach-card, .prize-item, .video-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 绑定事件
function bindEvents() {
    // 立即加入按钮
    document.getElementById('joinNow').addEventListener('click', function() {
        document.getElementById('loginModal').style.display = 'block';
    });

    // 获取健身卡按钮
    document.getElementById('getCardBtn').addEventListener('click', function() {
        const phone = document.getElementById('phoneInput').value;
        if (validatePhone(phone)) {
            alert(`已发送健身卡到手机号：${phone}，请查收短信`);
            document.getElementById('phoneInput').value = '';
        } else {
            alert('请输入正确的手机号');
        }
    });

    // 登录链接
    document.getElementById('loginLink').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginModal').style.display = 'block';
    });

    // 注册链接
    document.getElementById('registerLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('注册功能正在开发中，敬请期待！');
    });

    // 模态框关闭
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('loginModal').style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('loginModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 登录表单提交
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;

        if (validatePhone(phone) && password) {
            // 显示加载状态
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '登录中...';
            submitBtn.disabled = true;

            // 调用登录API
            API.login(phone, password).then(response => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                if (response.success) {
                    // 登录成功
                    localStorage.setItem('userToken', response.data.token);
                    localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
                    alert(`欢迎回来，${response.data.userInfo.name}！`);
                    document.getElementById('loginModal').style.display = 'none';
                    // 可以跳转到个人中心或其他页面
                } else {
                    alert(response.message || '登录失败，请重试');
                }
            });
        } else {
            alert('请输入正确的手机号和密码');
        }
    });

    // 视频播放
    document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoTitle = this.nextElementSibling.textContent;
            alert(`即将播放视频：${videoTitle}\n（实际项目中会打开视频播放器）`);
        });
    });
}

// 验证手机号
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 页面滚动特效
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    // 头部阴影效果
    const header = document.querySelector('.header');
    if (scrollPosition > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    // 返回顶部按钮（如果需要）
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (scrollPosition > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
});
// 在文件末尾或适当位置添加以下代码

// 移动端菜单切换功能
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        // 点击导航链接后关闭菜单
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// 触摸滑动支持
function initTouchSupport() {
    const carousels = document.querySelectorAll('.activities-carousel, .prizes-carousel');

    carousels.forEach(carousel => {
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture(carousel, touchStartX, touchEndX);
        }, { passive: true });
    });
}

function handleSwipeGesture(carousel, startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动
            carousel.scrollBy({ left: 200, behavior: 'smooth' });
        } else {
            // 向右滑动
            carousel.scrollBy({ left: -200, behavior: 'smooth' });
        }
    }
}

// 防止iOS缩放
function preventIOSScale() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
        });
    }
}

// 页面加载完成后初始化移动端功能
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initTouchSupport();
    preventIOSScale();
    // ... 其他现有代码
});

// 添加移动端特定的事件监听
document.addEventListener('touchstart', function() {}, { passive: true });
