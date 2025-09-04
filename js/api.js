// 模拟API接口
const API = {
    // 获取免费体验天数
    getFreeDays: function() {
        return new Promise((resolve) => {
            // 模拟网络请求
            setTimeout(() => {
                // 实际项目中这里会从后端获取数据
                resolve({
                    success: true,
                    data: {
                        days: 7 // 后端可修改的天数
                    }
                });
            }, 500);
        });
    },

    // 用户登录
    login: function(phone, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 模拟登录验证
                if (phone && password) {
                    resolve({
                        success: true,
                        data: {
                            token: 'user_token_123456',
                            userInfo: {
                                id: 1,
                                name: '张三',
                                phone: phone,
                                membership: '金牌会员',
                                expireDate: '2024-12-31'
                            }
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: '手机号或密码错误'
                    });
                }
            }, 1000);
        });
    },

    // 获取用户奖品信息
    getUserPrizes: function(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: [
                        { id: 1, name: '品牌健身包', image: 'prize1.jpg', status: '已领取' },
                        { id: 2, name: '智能运动水壶', image: 'prize2.jpg', status: '待领取' },
                        { id: 3, name: '速干运动毛巾', image: 'prize3.jpg', status: '已过期' }
                    ]
                });
            }, 800);
        });
    },

    // 获取用户订单
    getUserOrders: function(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: [
                        { id: '20230801001', product: '月卡', price: 299, status: '已完成', date: '2023-08-01' },
                        { id: '20230715002', product: '季度卡', price: 799, status: '已完成', date: '2023-07-15' },
                        { id: '20230601003', product: '年卡', price: 2999, status: '已完成', date: '2023-06-01' }
                    ]
                });
            }, 800);
        });
    },

    // 获取商城商品
    getShopProducts: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: [
                        { id: 1, name: '蛋白粉', price: 299, image: 'product1.jpg', category: '营养补剂' },
                        { id: 2, name: '运动鞋', price: 599, image: 'product2.jpg', category: '运动装备' },
                        { id: 3, name: '瑜伽垫', price: 129, image: 'product3.jpg', category: '运动装备' },
                        { id: 4, name: '运动水壶', price: 89, image: 'product4.jpg', category: '运动配件' }
                    ]
                });
            }, 800);
        });
    }
};
