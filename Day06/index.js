window.addEventListener('load', function () {
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var wrap = document.querySelector('.wrap');
    var wrapWidth = wrap.offsetWidth;
    //动画函数
    function animation1(obj, target, callback) {
        // callback();

        //缓动算法： 步长等于 当前位置-目标位置/10 
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //步长每次计时都改变才可以 所以要写进计时器；
            //应该把步长改为整数 避免出现小数问题 向上取整
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            if (target < 0) {
                if (obj.offsetLeft <= (target + 10) || obj.offsetLeft == (target + 10)) {
                    clearInterval(obj.timer);
                    callback && callback();
                }
            }

            obj.style.left = obj.offsetLeft + step + 'px';
        }, 30);
    };
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
                callback && callback();
            };
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 30);
    };


    //鼠标进入 显示 左右按钮 鼠标离开 隐藏左右按钮
    wrap.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    //鼠标离开 
    wrap.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function () {
            right.click();
        }, 2000)
    })
    //动态生成小圆圈;
    var wrap = document.querySelector('.wrap');
    var ul = wrap.querySelector('ul');
    var ol = wrap.querySelector('ol');
    //    console.log(ul.children.length);
    for (let i = 0; i < ul.children.length; i++) {
        //生成li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        //把li写进ol
        ol.appendChild(li);
        li.addEventListener('click', function () {
            //干掉其他人 
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '';
            }
            //保留自己
            this.style.backgroundColor = 'white';

            //5.点击小圆圈 移动图片 移动的是ul不是li
            //ul 的移动距离 小圆圈的索引号乘以 图片的宽度（wrap的宽度）因为是向左移动所以是负值
            //点击某个li 就拿到当前li的索引号；
            var index = this.getAttribute('index');
            //需要将索引号也赋值给num；
            num = index;
            //还需要将索引号给到circle 控制小圆圈的位置
            circle = index;
            //    console.log(wrapWidth);
            animation(ul, -index * wrapWidth);
        })
    }
    //克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮 移动图片
    var num = 0;
    var flag = true;//flag是节流阀；
    //声明一个新的变量circle； 控制小圆圈的播放
    var circle = 0;
    right.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animation1(ul, -num * wrapWidth, function () {
                flag = true;
            });
            circle++;
            //如果circle == 4 就到了克隆的图片 这时候复原circle;
            if (circle == 4) {
                circle = 0;
            }
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '';
            }
            ol.children[circle].style.backgroundColor = 'white';

        }


    }
    )
    //点击左侧移动图片
    var num = 0;
    //声明一个新的变量circle； 控制小圆圈的播放
    var circle = 0;
    left.addEventListener('click', function () {

        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -(num - 1) * wrapWidth + 'px';
            }
            num--;
            animation(ul, -num * wrapWidth, function () {
                flag = true;
            });
            circle--;
            //如果circle < 0 就到了克隆的图片 这时候复原circle;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '';
            }
            ol.children[circle].style.backgroundColor = 'white';

        }

    })
    ol.children[0].style.backgroundColor = 'white';
    // 自动播放
    var timer = setInterval(function () {
        right.click();
    }, 3000);
})