import * as fs from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { commands, Uri, ViewColumn, window } from 'vscode'

const defaultTemFilePath = join(tmpdir(), 'result.ts')

class Displayer {
  private data: string
  private tmpFilePath: string
  private tmpFileUri: Uri
  constructor(data: string, tmpFilePath: string = defaultTemFilePath) {
    this.data = data
    this.tmpFilePath = tmpFilePath
    this.tmpFileUri = Uri.file(tmpFilePath)
  }

  public async displayToFile() {
    return this.writeDataToFile(this.data).then(this.showViewColumn)
  }

  public async displayToTextEditor() {
    const { activeTextEditor } = window
    return activeTextEditor!.edit(editBuilder => {
      editBuilder.replace(activeTextEditor!.selection, this.data)
    })
  }

  private static getViewColumn() {
    const activeEditor = window.activeTextEditor
    return activeEditor ? ViewColumn.One : ViewColumn.Beside
  }

  private async showViewColumn() {
    return commands.executeCommand('vscode.open', this.tmpFileUri, Displayer.getViewColumn())
  }

  private async writeDataToFile(data: string) {
    return fs.writeFileSync(this.tmpFilePath, data)
  }
}

export { Displayer }
