// 布尔值
let buer: boolean;
buer = true;

// 数字
let num: number;
num = 10;

// 字符串
let str: string;
str = "你好, 世界!";

// 数组
let shuzu: number[];
shuzu = [1, 2, 3, 4, 54, 6];

// 元组
let fuck: [number, string, any];
fuck = [10, "hello world!", ["nihao"]];
fuck.push(["nihao", 1]);
console.log(fuck);

// 数组和元组的区别 :
// 1. 当数组不指定any类型时, 数组所有的数据必须是一种数据类型
// 2. 数组里边的个数是没有限制的, 元组是有限制的

// 枚举  : 枚举类型可以为一组数值赋予友好的名字
enum mei_ju {
  xxx = 1,
  blue = "测试",
  yellow = 0,
}
console.log(mei_ju);

let shanxin: mei_ju;
shanxin = mei_ju.blue;

// any
let gongliming: any;
gongliming = ["123", "woaini", { nihao: 123 }];

let list: any[] = [1, true, "free"];
console.log(list[2]);

// viod
function my_fuc(message: string = "fuckyou"): void {
  console.log(message);
}
my_fuc("I Love You!");
my_fuc();

// 断言 as
let w_string: any = [1, 2, 3, 4, 5];
let str_length: number = w_string.length;
// let str_length: number = (w_string as string).length
console.log(str_length);

// 联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;  

// 接口
//
interface jiekou {
  str: string;
  num: number;
}
// 1
const interface_fuc = (data: jiekou) => {
  console.log("我是数字:" + data.num + ",字符串是:" + data.str);
};
interface_fuc({ str: "woaini", num: 10 });

// 2
const interface_fuc2 = (data: jiekou) => {
  console.log("我是数字:" + data.num);
};
interface_fuc2({ str: "woaini", num: 10 });

// 3 可选参数
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquareConfig): { color: string; area1: number } {
  let newSquare = { color: "white", area1: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area1 = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
console.log(mySquare);

// 4. 只读
interface point{
    readonly inhao:number,
    readonly table:string
}

let obj:point = {inhao:13,table:'12'}

// 防止传参多个的时候
interface point2{
    readonly inhao:number,
    readonly table:string,
    [propName: string]:any
}

let obj2:point = {inhao:13,table:'12'}

// 6. 继承
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;


// 7. 混合类
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
console.log(c);


