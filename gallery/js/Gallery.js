/**
 * Created by sipan.don on 2016/3/8.
 */
// 1.0 反面控制
function turn(ele) {
    var className = ele.className;
    var n=ele.id.split('_')[1];

    if(!/photo_center/.test(className)){
        return resort(n);
    }

    if (/photo_front/.test(className)) {
        className = className.replace(/photo_front/, "photo_back");
        common('#nav_'+n).className+=' i_back ';
    }
    else {
        className = className.replace(/photo_back/, "photo_front");
        common('#nav_'+n).className=common('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
    }
    return ele.className = className;
}
//3.0通用函数
function common(selector) {
    var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';
    console.log(method);
    return document[method](selector.substr(1));
}
//随机生成一个值 0~ data.length
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);

    var diff = max - min;

    var number = Math.ceil(Math.random() * diff + min);
    return number;


}
//4.0加载数据
var data = data;
function AddPhotos() {
    var template = common('#wrap').innerHTML;
    var html = [];
    var nav = [];
    for (var s in data) {
        var _html = template.replace("{{index}}", s)
            .replace("{{image}}", data[s].img)
            .replace("{{caption}}", data[s].caption)
            .replace("{{desc}}", data[s].desc);
        html.push(_html);
        nav.push('<span id="nav_' + s + '" onclick="turn(common(\'#photo_' + s + '\'))" class="i">&nbsp;</span>')
    }
    html.push('<div class="nav">' + nav.join('') + '</div>');
    common('#wrap').innerHTML = html.join('');
    resort(random([0, data.length]));
}
AddPhotos();
//5.0 排序
function resort(n) {
    var _photo = common('.photo');
    var photos = [];
    for (var s = 0; s < _photo.length; s++) {
        _photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/, ' ');
        _photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/, ' ');
        _photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/, ' ');

        _photo[s].className+=' photo_front ';
        _photo[s].style.top ='';
        _photo[s].style.left ='';
        _photo[s].style['-webkit-transform'] ='rotate(0deg)';



        photos.push(_photo[s]);
    }


    var photo_center = common('#photo_' + n);
    photo_center.className += ' photo_center';
    photo_center = photos.splice(n, 1)[0];

    var photo_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photo_right = photos;
    var ranges = range();
    for (var s = 0; s < photo_left.length; s++) {
        var photo = photo_left[s];
        photo.style.left = random(ranges.left.x) + 'px';
        photo.style.top = random(ranges.left.y) + 'px';

        photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg)';
    }//左分区
    for (var s = 0; s < photo_right.length; s++) {
        var photo = photo_right[s];
        photo.style.left = random(ranges.right.x) + 'px';
        photo.style.top = random(ranges.right.y) + 'px';
        photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg)';
    }//右分区

    var navs=common('.i');
    for(var s=0;s<navs.length;s++){
        navs[s].className=navs[s].className.replace(/\s*i_current\s*/,' ');
        navs[s].className=navs[s].className.replace(/\s*i_back\s*/,' ');
    }
    common('#nav_' + n).className += ' i_current ';
    console.log(photo_left.length, photo_right.length);
}
//6.0计算左右分区的范围 {left:{x:[],y:[]},right:{x:[],y:[]}}
function range() {
    var range = {left: {x: [], y: []}, right: {x: [], y: []}};
    var wrap = {
        w: common('#wrap').clientWidth,
        h: common('#wrap').clientHeight
    }
    var photo = {
        w: common('.photo')[0].clientWidth,
        h: common('.photo')[0].clientHeight
    }

    range.left.x = [0 - photo.w, wrap.w / 2 - photo.w / 2];
    range.left.y = [0 - photo.h, wrap.h];

    range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w];
    range.right.y = range.left.y
    range.wrap = wrap;
    range.photo = photo;


    return range;
}
