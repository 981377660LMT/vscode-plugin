import * as vscode from 'vscode'
import { COMMAND } from './constants'

class SidebarProvider implements vscode.WebviewViewProvider {
  resolveWebviewView(
    sidebar: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext<unknown>,
    _token: vscode.CancellationToken
  ): void | Thenable<void> {
    this.hidden(sidebar)
  }

  private hidden(sidebar: vscode.WebviewView): void {
    const closeSidebar = () => vscode.commands.executeCommand(COMMAND.CLOSE_SIDEBAR)
    const showWebview = () => vscode.commands.executeCommand(COMMAND.SHOW_WEBVIEW)

    if (sidebar.visible) {
      closeSidebar()
      showWebview()
    }

    sidebar.onDidChangeVisibility(() => {
      if (sidebar.visible) {
        closeSidebar()
        showWebview()
      }
    })
  }
}

export { SidebarProvider }
