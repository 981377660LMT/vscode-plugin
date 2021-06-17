import { window } from 'vscode'
import * as copyPaste from 'copy-paste'

class Collector {
  public static async getSelectedText() {
    const { selection, document } = window.activeTextEditor!
    return document.getText(selection).trim()
  }

  public static async getClipboardText(): Promise<string> {
    try {
      return copyPaste.paste().trim()
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}

export { Collector }
