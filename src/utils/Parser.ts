import JsonToTS from 'json-to-ts'
import * as humps from 'humps'

// 策略模式
class Parser {
  private static async validateLength(text: string) {
    if (text.length === 0) {
      return Promise.reject(new Error('Nothing selected'))
    } else {
      return text
    }
  }

  // todo，贪婪匹配最外面的{}里的内容；eval需要安全
  private static async parseJson(json: string) {
    const tryEval = (str: any) => eval(`const a = ${str}; a`)

    try {
      return humps.camelizeKeys(JSON.parse(json))
    } catch (ignored) {}

    try {
      return tryEval(json)
    } catch (error) {
      console.log(error)
      return new Error('Selected string is not a valid JSON')
    }
  }

  private static async jsonToTS(input: {} | Array<{}>) {
    return JsonToTS(input).reduce((a, b) => `${a}\n\n${b}`)
  }

  public static async parse(text: string) {
    return this.validateLength(text).then(this.parseJson).then(this.jsonToTS)
  }
}

export { Parser }
