"use strict";
// 布尔值
var buer;
buer = true;
// 数字
var num;
num = 10;
// 字符串
var str;
str = "你好, 世界!";
// 数组
var shuzu;
shuzu = [1, 2, 3, 4, 54, 6];
// 元组
var fuck;
fuck = [10, "hello world!", ["nihao"]];
fuck.push(["nihao", 1]);
console.log(fuck);
// 数组和元组的区别 :
// 1. 当数组不指定any类型时, 数组所有的数据必须是一种数据类型
// 2. 数组里边的个数是没有限制的, 元组是有限制的
// 枚举  : 枚举类型可以为一组数值赋予友好的名字
var mei_ju;
(function (mei_ju) {
    mei_ju[mei_ju["xxx"] = 1] = "xxx";
    mei_ju["blue"] = "\u6D4B\u8BD5";
    mei_ju[mei_ju["yellow"] = 0] = "yellow";
})(mei_ju || (mei_ju = {}));
console.log(mei_ju);
var shanxin;
shanxin = mei_ju.blue;
// any
var gongliming;
gongliming = ["123", "woaini", { nihao: 123 }];
var list = [1, true, "free"];
console.log(list[2]);
// viod
function my_fuc(message) {
    if (message === void 0) { message = "fuckyou"; }
    console.log(message);
}
my_fuc("I Love You!");
my_fuc();
// 断言 as
var w_string = [1, 2, 3, 4, 5];
var str_length = w_string.length;
// let str_length: number = (w_string as string).length
console.log(str_length);
// 联合类型
var myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 1
var interface_fuc = function (data) {
    console.log("我是数字:" + data.num + ",字符串是:" + data.str);
};
interface_fuc({ str: "woaini", num: 10 });
// 2
var interface_fuc2 = function (data) {
    console.log("我是数字:" + data.num);
};
interface_fuc2({ str: "woaini", num: 10 });
function createSquare(config) {
    var newSquare = { color: "white", area1: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area1 = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
console.log(mySquare);
var obj = { inhao: 13, table: '12' };
var obj2 = { inhao: 13, table: '12' };
var square = {};
square.color = "blue";
square.sideLength = 10;
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
console.log(c);
