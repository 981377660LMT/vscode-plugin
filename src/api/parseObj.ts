const a = `const o = {
  name_ss: 'as',
  foo:{}
sd}`

const foo = a.match(/\{([\s\S]+)\}/gm)

console.log(foo, foo![0])
