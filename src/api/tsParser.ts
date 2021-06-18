import { logger } from './logger'
import {
  ClassDeclaration,
  MethodDeclaration,
  PropertyDeclaration,
  TypescriptParser,
} from 'typescript-parser'

export interface IConstructedInterface {
  name: string
  value: string
}

export function constructInterface(cd: ClassDeclaration): IConstructedInterface {
  // 将类名帕斯卡化
  const className = cd.name.charAt(0).toUpperCase() + cd.name.substring(1)
  const classProps = getProperties(cd)
  const classMethods = getMethods(cd)

  return {
    name: `I${className}`,
    value: `interface I${className} {\n${classProps}${classMethods}}\n`,
  }
}

export async function getDeclarations(code: string) {
  const parser = new TypescriptParser()
  const parsedCode = await parser.parseSource(code)
  console.log(code)
  console.dir(parsedCode.declarations, { depth: null })
  return parsedCode.declarations
}

export function isPublicFacing(i: PropertyDeclaration | MethodDeclaration): boolean {
  return i.visibility !== 0 && i.visibility !== 1 && !i.isStatic
}

export function getProperties(cd: ClassDeclaration): string {
  return (
    cd.properties
      // .filter(isPublicFacing)
      .map(p => {
        return `  ${p.name}${p.isOptional ? '?' : ''}: ${p.type || 'unknown'}\n`
      })
      .join('')
  )
}

export function getMethods(cd: ClassDeclaration): string {
  return (
    cd.methods
      // .filter(isPublicFacing)
      .map(m => {
        const params = m.parameters
          .map(p => {
            return `${p.name}: ${p.type}`
          })
          .join(', ')

        return `  ${m.name}: (${params.length > 0 ? `${params}` : ''}) => ${m.type || 'unknown'}\n`
      })
      .join('')
  )
}

const code = `

class Displayer {
  private data: string
  private tmpFilePath: string
  private tmpFileUri: Uri
  public foo:number
  protected bar:any

  constructor(data: string, tmpFilePath: string = defaultTmpFilePath) {
    this.data = data
    this.tmpFilePath = tmpFilePath
    this.tmpFileUri = Uri.file(tmpFilePath)
  }

  public async displayToFile() {
    return this.writeDataToFile(this.data).then(this.showViewColumn.bind(this))
  }

  public async displayToTextEditor() {
    const { activeTextEditor } = window
    return activeTextEditor!.edit(editBuilder => {
      editBuilder.replace(activeTextEditor!.selection, this.data)
    })
  }

  public static formatDocument() {
    commands.executeCommand('editor.action.formatDocument')
  }

  public static showError(err: Error):abc {
    window.showErrorMessage(err.message)
  }

  private static getViewColumn() {
    const activeEditor = window.activeTextEditor!
    switch (activeEditor.viewColumn) {
      case ViewColumn.One:
        return ViewColumn.Two
      case ViewColumn.Two:
        return ViewColumn.Three
      default:
        return ViewColumn.Beside
    }
  }

  private async showViewColumn() {
    commands.executeCommand('vscode.open', this.tmpFileUri, Displayer.getViewColumn())
  }

  private async writeDataToFile(data: string) {
    fs.writeFileSync(this.tmpFilePath, data)
  }
}

`

const demo = `
'class Clock 
{  public ncurrentTime: Date;  
  constructor(h: number, m: number) 
  { }}'

`
getDeclarations(demo).then(data => {
  const foo = data
  logger('a.ts').log(constructInterface(foo[0] as ClassDeclaration).value)
})
