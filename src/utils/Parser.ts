import JsonToTS from 'json-to-ts'

// 策略模式
class Parser {
  private static async validateLength(text: string) {
    if (text.length === 0) {
      return Promise.reject(new Error('Nothing selected'))
    } else {
      return text
    }
  }

  private static async parseJson(json: string) {
    const tryEval = (str: any) => eval(`const a = ${str}; a`)

    try {
      return JSON.parse(json)
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
