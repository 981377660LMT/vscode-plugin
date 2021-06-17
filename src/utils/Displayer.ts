import * as fs from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

import { commands, Uri, ViewColumn, window } from 'vscode'

const defaultTmpFilePath = join(tmpdir(), 'result.ts')

class Displayer {
  private data: string
  private tmpFilePath: string
  private tmpFileUri: Uri

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

  public static showError(err: Error) {
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

export { Displayer }
