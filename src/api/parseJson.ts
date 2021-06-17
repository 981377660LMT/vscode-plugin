// import parseJson from 'parse-json'

// const json = '{\n\t"foo": true,\n}'

// try {
//   parseJson(json)
// } catch (error: any) {
//   console.log(error.codeFrame)
// }

const tryEval = (str: any) => eval(`const a = ${str}; a`)

// const v = tryEval('{\r\n  name:' as '\r\n}')
// console.log(v)
console.log(JSON.parse('{\r\n  name:' as '\r\n}'))
