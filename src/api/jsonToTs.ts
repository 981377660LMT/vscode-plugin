import JsonToTS from 'json-to-ts'

// ("Only (Object) and (Array of Object) are supported");
const Root = {
  cats: [{ name: 'Kittin', age: 23 }, { name: 'Mittin' }],
  favoriteNumber: 42,
  favoriteWord: 'Hello',
  foo: [{}],
}

// JsonToTS(Root, { rootName: 'root' }).forEach(typeInterface => {
//   console.log(typeInterface, '\n')
// })
console.log(JsonToTS(Root).reduce((a, b) => `${a}\n\n${b}`))
// interface Root {
//   cats: Cat[]
//   favoriteNumber: number
//   favoriteWord: string
//   foo: Foo[]
// }

// interface Foo {}

// interface Cat {
//   name: string
//   age?: number
// }
