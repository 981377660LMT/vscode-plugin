import * as vscode from 'vscode'
import { ReactPanel } from './ReactPanel'
import { SidebarProvider } from './SidebarProvider'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "video-editor" is now active!')

  context.subscriptions.push(
    vscode.commands.registerCommand('video-editor.show', () => {
      ReactPanel.createOrShowInstance(context.extensionUri)
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('video-editor.dispose', () => {
      if (ReactPanel.currentPanel) {
        ReactPanel.currentPanel.dispose()
      }
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('video-editor.refresh', () => {
      ReactPanel.kill()
      ReactPanel.createOrShowInstance(context.extensionUri)
      // devtools只在panel打开后才可调用，这里需要nextTick一下
      setTimeout(() => {
        vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools')
      }, 500)
    })
  )

  // sideBar，当前充当导航按钮的作用
  vscode.window.registerWebviewViewProvider('video-editor', new SidebarProvider())
}

export function deactivate() {}
