import * as humps from 'humps'
import JsonToTS from 'json-to-ts'

class Parser {
  constructor(private data: string) {
    this.validateLength()
  }

  public async parse(): Promise<string> {
    const parsedData = this.parseData().data as unknown as object
    return Parser.toTS(Parser.camelize(parsedData))
  }

  public static camelize(obj: {} | Array<{}>) {
    return humps.camelizeKeys(obj)
  }

  public static toTS(input: {} | Array<{}>) {
    return JsonToTS(input).reduce((a, b) => `${a}\n\n${b}`)
  }

  private validateLength() {
    if (this.data.length === 0) {
      throw new Error('Nothing selected')
    }

    return this
  }

  private parseData() {
    const tryEval = (str: any) => eval(`const a = ${str}; a`)

    try {
      this.data = JSON.parse(this.data)
    } catch (ignored) {}

    try {
      this.data = tryEval(this.data)
    } catch (ignored) {}

    // extract {}
    try {
      const matchedObj = this.data.match(/\{([\s\S]+)\}/gm)
      this.data = tryEval(matchedObj)
    } catch (error) {
      throw new Error('fail to parse...')
    }

    return this
  }
}

export { Parser }
