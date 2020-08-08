window.addEventListener('load', function () {
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var wrap = document.querySelector('.wrap');
    var wrapWidth = wrap.offsetWidth;
    //鼠标进入 显示 左右按钮 鼠标离开 隐藏左右按钮
    wrap.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
    })
    wrap.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
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
        li.setAttribute('index',i);
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
           
            //    console.log(wrapWidth);
            animation(ul,-index*wrapWidth);
        })
    }
    //克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮 移动图片
    var num = 0;
    right.addEventListener('click',function(){
        num++;
        if(num == ul.children.length){
            ul.style.left = 0;
            num = 0;
        }
        else{
            animation(ul,-num*wrapWidth);
        }
       
    })
})