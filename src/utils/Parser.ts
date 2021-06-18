import * as humps from 'humps'
import JsonToTS from 'json-to-ts'

import { parseClass } from '../lib/parseClass'

class Parser {
  constructor(private data: string) {
    this.validateLength(data)
  }

  public async parse(): Promise<string> {
    const parsedData = await this.parseData(this.data)
    return typeof parsedData === 'string' ? parsedData : Parser.toTS(Parser.camelize(parsedData))
  }

  public static camelize(obj: object | Array<object>) {
    return humps.camelizeKeys(obj)
  }

  public static toTS(input: object | Array<object>) {
    return JsonToTS(input).reduce((a, b) => `${a}\n\n${b}`)
  }

  private validateLength(data: string) {
    if (data.length === 0) {
      throw new Error('Nothing selected')
    }
    return this.data
  }

  private async parseData(json: string): Promise<string | object> {
    const tryEval = (str: string) => eval(`const a = ${str}; a`)

    // parse as json
    try {
      return JSON.parse(json)
    } catch (ignored) {}

    // parse as object
    try {
      const matchedObj = json.match(/\{([\s\S]+)\}/gm)![0]
      return tryEval(matchedObj)
    } catch (ignored) {}

    // parse as class
    try {
      const matchedClass = json.match(/class([\s\S]+)}/gm)![0]
      const parsedClass = await parseClass(matchedClass)
      return parsedClass
    } catch (error) {
      throw new Error('fail to parse...')
    }
  }
}

export { Parser }
