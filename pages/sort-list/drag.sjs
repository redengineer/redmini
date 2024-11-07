
// 屏幕宽度信息
let windowWidth = 0
// 滚动距离
let scrollTop = 0
// 排序容器
let rect = null;
// 排序列表
let sortList = []

let line = 1
let column = 1

// 上线时需要删除console.log，否则会影响性能

function sync($1, $2, $3, list = []) {
    windowWidth = $1;
    scrollTop = $2;
    rect = $3;
    // 数据不要进行写操作
    sortList = [...list];

    // 划分格子
    if (rect.width && rect.height) {
       // 盒子 + 边距
       column = Math.floor(rect.width / rpx2px(128 + 16))
       line = Math.floor(rect.height / rpx2px(128 + 12))
    }
}

function rpx2px(rpx) {
    // rpx 值转 px 四舍五入
   return Math.round(parseFloat(rpx) * windowWidth / 750)
}

let startX = 0
let startY = 0
let lastLeft = 0
let lastTop = 0

function reset() {
    startX = 0
    startY = 0
    lastLeft = 0
    lastTop = 0
}

function dragStart(event, owner) {
    // 先关闭滚动，防止ios回弹效果
    owner.callMethod('disableScroll')
    let touch = event.touches[0] || event.changedTouches[0]
    startX = touch.pageX
    startY = touch.pageY
}

function moveElement(array, fromIndex, toIndex) {
    // 检查索引是否超出数组边界
    if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex > array.length) {
      console.error("Index out of bounds");
    }
    
    // 获取需要移动的元素
    const element = array[fromIndex];
  
    // 从原位置删除元素
    array.splice(fromIndex, 1);
  
    // 插入元素到目标位置之前
    array.splice(toIndex, 0, element);
  
    return array;
  }

function dragEnd(event, owner) {
    let touch = event.touches[0] || event.changedTouches[0]
    let pageX = touch.pageX
    let pageY = touch.pageY

    // 计算靠近了哪个元素, 以矩形框为基准
    const leftX = rect.left
    const topY = rect.top - scrollTop

    const relativeX = pageX - leftX;
    const relativeY = pageY - topY

    // 计算目标行列
    const targetColumn = Math.ceil(relativeX/ rpx2px(128 + 16))
    const targetLine = Math.ceil(relativeY / rpx2px(128 + 12))

    console.log('目标行列', targetColumn, targetLine);

    const instance = event.instance;
    // 获取到滚动的元素信息
    const dataset = instance.getDataset()

    const targetIndex = (targetLine - 1) * column + targetColumn - 1

    if (targetColumn <= column && targetLine <= line && targetColumn > 0 && targetLine > 0) {
        const moveItem = sortList[dataset.index]

        if (sortList[targetIndex] === undefined) {
            // 目标位置为空
            sortList.splice(dataset.index, 1);
            sortList[targetIndex] = moveItem
        } else {
            // 目标位置不为空，向后插入逻辑
            moveElement(sortList, dataset.index, targetIndex)
        }
        sortList = sortList.filter(Boolean)
        console.log('调整行列', dataset.index, targetIndex)
    }
    // 告知逻辑层数据调整，setData
    owner.callMethod('sortResult', { sortList })

    reset()
}

function dragMove(event, owner) {
    let touch = event.touches[0] || event.changedTouches[0]
    let pageX = touch.pageX
    let pageY = touch.pageY
    let left = pageX - startX + lastLeft
    let top = pageY - startY + lastTop
    startX = pageX
    startY = pageY
    lastLeft = left
    lastTop = top

    const instance = event.instance;

    instance.setStyle({
        left: left + 'px',
        top: top + 'px'
    })
}

module.exports = {
    sync,
    dragStart,
    dragEnd,
    dragMove,
}
