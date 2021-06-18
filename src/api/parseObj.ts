const a = `const o = {
  name_ss: 'as',
  foo:{}
sd}`

const demo = `
dasdasdasfs
'class Clock 
{  public ncurrentTime: Date;  
  constructor(h: number, m: number) 
  { }}'
class B{}
`

// [\s\S]匹配任意字符包括换行符
// const foo = a.match(/\{([\s\S]+)\}/gm)
// console.log(foo, foo![0])

const bar = demo.match(/class([\s\S]+)}/gm)
console.log(bar, bar![0])
