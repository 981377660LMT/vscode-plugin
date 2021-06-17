const str = `
const obj = {
  name: 'cmnx',
  age: 3,
  foo: ['a', 'b', 'c'],
  bar: null,
  cat: undefined,
  dog: () => {},
  monkey: Symbol.for('monkey'),
  cow: new Map(),
  horse: { foo: 1 },
}

interface Student extends User {
  schoolRecord: SchoolRecord
}

interface Foo{
  name:string
}

interface Bar   {
  name:Foo[]
}
`
const regexp = /^interface\s+([\S]+?)\b/gm
const iterator = str.matchAll(regexp)

console.log([...iterator].map(arr => arr[1]))
// const foo = a.match(/\{([\s\S]+)\}/gm)
