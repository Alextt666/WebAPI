function animation(obj, target, callback) {
    // callback();

    //缓动算法： 步长等于 当前位置-目标位置/10 
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长每次计时都改变才可以 所以要写进计时器；
        //应该把步长改为整数 避免出现小数问题 向上取整
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // };
            callback&&callback();
        };
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
};

