(function () {
    // 定义数组elements，用于保存食物元素的引用
    var elements = [];

    // 食物构造函数
    function Food(x, y, width, height, color) {
        // 初始化食物的坐标、宽度、高度和颜色
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }

    // 在Food.prototype上添加init方法，用于初始化食物并将其渲染到页面上
    Food.prototype.init = function (map) {
        remove(); // 先将之前生成的食物元素从页面上移除
        var div = document.createElement("div"); // 创建一个div元素，并将其作为食物元素
        map.appendChild(div); // 将食物元素添加到地图上
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        div.style.position = "absolute"; // 设置元素的定位方式为绝对定位
        // 随机生成食物的坐标，并将其设置到食物元素的left和top属性中
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        elements.push(div); // 将食物元素的引用保存到数组elements中
    };

    // 私有函数remove，用于将元素从页面上移除
    function remove() {
        // 遍历数组elements，依次将其对应的元素从页面上移除
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1); // 将其从数组elements中移除
        }
    }

    // 将Food暴露出去，便于外部使用
    window.Food = Food;
}());
