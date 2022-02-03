import * as vscode from 'vscode'
import { ReactPanel } from './ReactPanel'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "funny-editor" is now active!')

  context.subscriptions.push(
    vscode.commands.registerCommand('funny-editor.helloWorld', () => {
      ReactPanel.createOrShowInstance(context.extensionUri)
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('funny-editor.doRefactor', () => {
      if (ReactPanel.currentPanel) {
        ReactPanel.currentPanel.dispose()
      }
    })
  )
}

export function deactivate() {}
