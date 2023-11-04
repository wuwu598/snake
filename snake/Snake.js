(function () {
    // 定义数组elements，用于保存蛇的每一节身体元素的引用
    var elements = [];

    // 蛇的构造函数
    function Snake(width, height, direction) {
        // 初始化蛇的宽度、高度、初始身体以及运动的方向
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ];
        this.direction = direction || "right";
    }

    // 在Snake.prototype上添加init方法，用于初始化蛇并将其渲染到页面上
    Snake.prototype.init = function (map) {
        remove(); // 先将之前生成的蛇身元素从页面上移除
        // 遍历蛇的每一节身体，依次创建div元素代表蛇的身体，并将其设置为绝对定位的
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px"; // 计算每一节身体的实际left坐标
            div.style.top = obj.y * this.height + "px"; // 计算每一节身体的实际top坐标
            div.style.backgroundColor = obj.color;
            elements.push(div); // 将蛇身元素的引用保存到数组elements中
        }
    };

    // 在Snake.prototype上添加move方法，用于控制蛇的移动
    Snake.prototype.move = function (food, map) {
        var i = this.body.length - 1; // 蛇尾的下标
        for (; i > 0; i--) { // 遍历蛇身从后往前依次将后一节身体的坐标赋值给前一节
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
           switch (this.direction) {
            case "right":
                this.body[0].x += 1; // 头部向右移动一格
                break;
            case "left":
                this.body[0].x -= 1; // 头部向左移动一格
                break;
            case "top":
                this.body[0].y -= 1; // 头部向上移动一格
                break;
            case "bottom":
                this.body[0].y += 1; // 头部向下移动一格
                break;
        }
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        // 如果头部的坐标和食物的坐标重合，蛇要吃到食物
        if(headX==food.x&&headY==food.y){
            var last=this.body[this.body.length-1];
            // 将蛇尾的颜色复制给新添加的身体，并将其加入到蛇身中
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            food.init(map); // 重新生成一个新的食物元素
        }
    };

    // 私有函数remove，用于将元素从页面上移除
    function remove() {
        // 遍历数组elements，依次将其对应的元素从页面上移除
        for (var i = elements.length - 1; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1); // 将其从数组elements中移除
        }
    }

    // 将Snake暴露出去，便于外部使用
    window.Snake = Snake;
}());
