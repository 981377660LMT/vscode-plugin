const a = `const o = {
  name_ss: 'as',
  foo:{}
sd}`

// [\s\S]匹配任意字符包括换行符
const foo = a.match(/\{([\s\S]+)\}/gm)

console.log(foo, foo![0])
