import * as fs from 'fs'
import { window } from 'vscode'
import * as copyPaste from 'copy-paste'

class Collector {
  public static async getSelectedText() {
    const { selection, document } = window.activeTextEditor!
    return document.getText(selection).trim()
  }

  public static async getClipboardText() {
    return copyPaste.paste().trim()
  }

  public static getSelectedFile() {
    const { document } = window.activeTextEditor!
    return document.fileName.endsWith('json')
      ? fs.readFileSync(document.fileName, 'utf8').toString()
      : ''
  }
}

export { Collector }
