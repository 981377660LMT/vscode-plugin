import * as vscode from 'vscode'

class SidebarProvider implements vscode.WebviewViewProvider {
  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this.hidden(webviewView)
  }

  private hidden(webviewView: vscode.WebviewView): void {
    const toggleSidebarVisibility = () =>
      vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility')
    const showWebview = () => vscode.commands.executeCommand('video-editor.show')

    if (webviewView.visible) {
      toggleSidebarVisibility()
      showWebview()
    }

    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        toggleSidebarVisibility()
        showWebview()
      }
    })
  }
}

export { SidebarProvider }
