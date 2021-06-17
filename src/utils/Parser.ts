import JsonToTS from 'json-to-ts'
import * as humps from 'humps'

// 策略模式
class Parser {
  public static async parse(text: string): Promise<string> {
    return this.validateLength(text).then(this.parseJson).then(this.camelize).then(this.toTS)
  }

  private static async validateLength(text: string) {
    if (text.length === 0) {
      return Promise.reject(new Error('Nothing selected'))
    } else {
      return text
    }
  }

  private static async parseJson(json: string): Promise<{}> {
    const tryEval = (str: any) => eval(`const a = ${str}; a`)

    try {
      return JSON.parse(json)
    } catch (ignored) {}

    try {
      return tryEval(json)
    } catch (ignored) {}

    // extract {}
    try {
      const matchedObj = json.match(/\{([\s\S]+)\}/gm)
      return tryEval(matchedObj)
    } catch (error) {
      throw new Error('fail to parse...')
    }
  }

  private static async camelize(obj: {} | Array<{}>) {
    return humps.camelizeKeys(obj)
  }

  private static async toTS(input: {} | Array<{}>) {
    return JsonToTS(input).reduce((a, b) => `${a}\n\n${b}`)
  }
}

export { Parser }
