const tryEval = (str: any) => eval(`const a = ${str}; a`)

console.log(
  tryEval(`const o = {
  name_ss: 'as',
}`)
)

export {}
