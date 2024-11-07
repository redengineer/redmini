
function debounce(func, wait) {
    let timeout;

    return function(...args) {
      const context = this;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
}

Page({
    data: {
        list: [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
            {id: 5},
            {id: 6},
            {id: 7},
            {id: 8},
            {id: 9},
            {id: 10},
        ],
        key: 0,
        scrollY: true,

        windowWidth: 0,
        scrollTop: 0,
        rect: {}
    },
    onLoad() {
        console.log('onLoad')
        // 注意开启业务包预加载时，系统bridge调用需要放到生命周期中
        const systemInfo = xhs.getSystemInfoSync();
        this.setData({
            windowWidth: systemInfo.windowWidth
        })
    },
    onShow(){
        console.log('onShow')
        this.updateRect();
    },
    updateRect(){
        // 滚动时也需要更新
        console.log('updateRect')
        setTimeout(() => {
            xhs.createSelectorQuery().select('.form-input').boundingClientRect((rect) => {
                console.log('rect', rect);
                this.setData({
                    rect: rect,
                })
                // 保存容器信息
            }).exec();
        })
    },
    sortResult({ sortList }) {
        // 同步排序信息, 刷新列表
        this.setData({
            list: sortList,
            key: Math.random(),
            scrollY: true
        })
    },
    disableScroll(){
        console.log('disableScroll')
        this.setData({
            scrollY: false
        })
    },
    bindscroll:function(event){
        console.log('bindscroll', event.detail);
        // this.setData({
        //     scrollTop: event.detail.scrollTop
        // })
        // 滚动
    },
    bindscrolltoupper(event) {
        console.log('bindscrolltoupper', event.detail);
    },
    bindscrolltolower(event) {
        console.log('bindscrolltolower', event.detail);
    },
})