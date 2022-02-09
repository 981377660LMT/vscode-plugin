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
    const toggleSidebarVisibility = () => vscode.commands.executeCommand(COMMAND.TOGGLE_SIDEBAR)
    const showWebview = () => vscode.commands.executeCommand(COMMAND.SHOW_WEBVIEW)

    if (sidebar.visible) {
      toggleSidebarVisibility()
      showWebview()
    }

    sidebar.onDidChangeVisibility(() => {
      if (sidebar.visible) {
        toggleSidebarVisibility()
        showWebview()
      }
    })
  }
}

export { SidebarProvider }
