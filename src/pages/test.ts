// 元组
let fuck: [number, string, any] 
fuck = [10, 'hello world!', ['nihao']]
fuck.push(['nihao',1])
console.log(fuck);


// 枚举
enum mei_ju {
    xxx = 1,
    blue = '测试',
    yellow = 0
}
console.log(mei_ju);


let shanxin: mei_ju
shanxin = mei_ju.blue


// any
let gongliming: any
gongliming = ['123', 'woaini',{nihao:123}]

let list: any[] = [1, true, "free"];
console.log(list[2]);

