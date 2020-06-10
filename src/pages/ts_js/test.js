"use strict";
// 元组
var fuck;
fuck = [10, 'hello world!', ['nihao']];
fuck.push(['nihao', 1]);
console.log(fuck);
// 枚举
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
gongliming = ['123', 'woaini', { nihao: 123 }];
var list = [1, true, "free"];
console.log(list[2]);
// viod
function my_fuc(message) {
    if (message === void 0) { message = "fuckyou"; }
    console.log(message);
}
my_fuc('I Love You!');
my_fuc();
// 断言 as
var w_string = [1, 2, 3, 4, 5];
var str_length = w_string.length;
// let str_length: number = (w_string as string).length
console.log(str_length);
