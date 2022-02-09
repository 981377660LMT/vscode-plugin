import * as vscode from 'vscode'
import { COMMAND } from './constants'
import { ReactPanel } from './ReactPanel'
import { SidebarProvider } from './SidebarProvider'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND.SHOW_WEBVIEW, () => {
      ReactPanel.createOrShowInstance(context.extensionUri)
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND.DISPOSE_WEBVIEW, () => {
      if (ReactPanel.instance) {
        ReactPanel.instance.dispose()
      }
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND.REFRESH_WEBVIEW, () => {
      ReactPanel.kill()
      ReactPanel.createOrShowInstance(context.extensionUri)
      // devtools只在panel打开后才可调用，这里需要nextTick一下
      setTimeout(() => {
        vscode.commands.executeCommand(COMMAND.OPEN_DEVTOOLS)
      }, 500)
    })
  )

  // sideBar，当前充当导航按钮的作用
  vscode.window.registerWebviewViewProvider('video-editor', new SidebarProvider())
}

export function deactivate() {}
