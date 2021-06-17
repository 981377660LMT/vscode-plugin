import JsonToTS from 'json-to-ts'
import * as humps from 'humps'

// 策略模式
class Parser {
  constructor(private data: string) {
    this.validateLength(data)
  }

  public async parse(): Promise<string> {
    const parsedData = this.parseData(this.data)
    return Parser.toTS(Parser.camelize(parsedData))
  }

  public static camelize(obj: {} | Array<{}>) {
    return humps.camelizeKeys(obj)
  }

  public static toTS(input: {} | Array<{}>) {
    return JsonToTS(input).reduce((a, b) => `${a}\n\n${b}`)
  }

  private validateLength(data: string) {
    if (data.length === 0) {
      throw new Error('Nothing selected')
    }
    return this.data
  }

  private parseData(json: string) {
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
}

export { Parser }
