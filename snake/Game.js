(function () {
    // 定义变量that并初始化为null，用于保存Game对象的引用
    var that = null;
  
    // Game构造函数
    function Game(map) {
      // 创建一个食物对象实例
      this.food = new Food();
      // 创建一个蛇对象实例
      this.snake = new Snake();
      // 获取页面中的地图元素
      this.map = map;
      // 将Game对象的引用保存到that变量中
      that = this;
    }
  
    // 在Game.prototype上添加init方法，用于初始化游戏
    Game.prototype.init = function () {
      // 初始化食物
      this.food.init(this.map);
      // 初始化蛇
      this.snake.init(this.map);
      // 开始走起来
      this.runSnake(this.food, this.map);
      // 绑定键盘事件
      this.bindKey();
    };
  
    // 在Game.prototype上添加runSnake方法，用于让蛇动起来
    Game.prototype.runSnake = function (food, map) {
      // 设置定时器，让蛇每隔一定时间去移动一次
      var timeId = setInterval(function () {
        // 移动蛇
        this.snake.move(food, map);
        // 初始化蛇，将蛇渲染到页面上
        this.snake.init(map);
        // 计算蛇头最大能到达的x和y值
        var maxX = map.offsetWidth / this.snake.width;
        var maxY = map.offsetHeight / this.snake.height;
        // 获取蛇头的坐标
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;
        // 判断蛇是否撞墙
        if (headX < 0 || headX >= maxX) {
          clearInterval(timeId); // 清除定时器，停止游戏
          alert("游戏结束");
        }
        if (headY < 0 || headY >= maxY) {
          clearInterval(timeId); // 清除定时器，停止游戏
          alert("游戏结束");
        }
      }.bind(that), 300); // 使用bind将this指向Game对象，并设置定时器间隔为300毫秒
    };
  
    // 在Game.prototype上添加bindKey方法，用于绑定键盘事件
    Game.prototype.bindKey = function () {
      document.addEventListener(
        "keydown",
        function (e) {
          switch (e.keyCode) {
            case 37: // 按下左箭头键
              this.snake.direction = "left"; // 修改蛇的方向为左
              break;
            case 38: // 按下上箭头键
              this.snake.direction = "top"; // 修改蛇的方向为上
              break;
            case 39: // 按下右箭头键
              this.snake.direction = "right"; // 修改蛇的方向为右
              break;
            case 40: // 按下下箭头键
              this.snake.direction = "bottom"; // 修改蛇的方向为下
              break;
          }
        }.bind(that),
        false
      ); // 使用bind将this指向Game对象，并设置useCapture为false
    };
  
    // 将Game暴露出去，便于外部使用
    window.Game = Game;
  })();
  