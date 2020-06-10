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

// viod
 function my_fuc(message: string = "fuckyou"):void{
    console.log(message);
 }
 my_fuc('I Love You!')
 my_fuc()

 // 断言 as
let w_string: any = [1,2,3,4,5]
let str_length: number = w_string.length
// let str_length: number = (w_string as string).length
console.log(str_length);
