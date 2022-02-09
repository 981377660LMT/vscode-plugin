import * as vscode from 'vscode'

/**
 * Manages react webview panels
 */
class ReactPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  static instance: ReactPanel | undefined
  static readonly viewType = 'react'
  private readonly panel: vscode.WebviewPanel
  private readonly extensionUri: vscode.Uri
  private disposables: vscode.Disposable[] = []

  /**
   * @description 创建webview单例
   */
  static createOrShowInstance(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor?.viewColumn

    // If we already have a panel, show it .
    if (ReactPanel.instance) {
      ReactPanel.instance.panel.reveal(column)
      // ReactPanel.currentPanel.update()
      return
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      ReactPanel.viewType,
      'Video Editor',
      column ?? vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,
        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'webview-dist'),
          vscode.Uri.joinPath(extensionUri, 'extension-dist'),
        ],
        retainContextWhenHidden: true,
      }
    )

    ReactPanel.instance = new ReactPanel(panel, extensionUri)
  }

  static kill() {
    ReactPanel.instance?.dispose()
    ReactPanel.instance = undefined
  }

  static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    ReactPanel.instance = new ReactPanel(panel, extensionUri)
  }

  // 注意销毁 webview 时应提示是否要关闭
  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.panel = panel
    this.extensionUri = extensionUri

    // Set the webview's initial html content
    this.setup()

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables)

    // // Handle messages from the webview
    // this._panel.webview.onDidReceiveMessage(
    //   (message) => {
    //     switch (message.command) {
    //       case "alert":
    //         vscode.window.showErrorMessage(message.text);
    //         return;
    //     }
    //   },
    //   null,
    //   this._disposables
    // );
  }

  dispose() {
    ReactPanel.instance = undefined

    // Clean up our resources
    this.panel.dispose()

    while (this.disposables.length) {
      const x = this.disposables.pop()
      if (x) {
        x.dispose()
      }
    }
  }

  private async setup() {
    const webview = this.panel.webview

    this.panel.webview.html = this.getHtmlForWebview(webview)
    webview.onDidReceiveMessage(async data => {
      switch (data.type) {
        // case 'report': {
        //   const message = await vscode.window.showInputBox({
        //     placeHolder: 'why are you reporting this user?',
        //   })
        //   if (message) {
        //     await mutationNoErr(`/report`, { message, ...data.value })
        //     webview.postMessage({
        //       command: 'report-done',
        //       data,
        //     })
        //     vscode.window.showInformationMessage('Thank you for reporting!')
        //   }
        //   break
        // }
        // case 'set-window-info': {
        //   const { displayName, flair } = data.value
        //   this._panel.title = displayName
        //   if (flair in flairMap) {
        //     const both = vscode.Uri.parse(
        //       `https://flair.benawad.com/` + flairMap[flair as keyof typeof flairMap]
        //     )
        //     this._panel.iconPath = {
        //       light: both,
        //       dark: both,
        //     }
        //   }
        //   break
        // }
        case 'onInfo': {
          if (!data.value) {
            return
          }
          vscode.window.showInformationMessage(data.value)
          break
        }
        case 'onError': {
          if (!data.value) {
            return
          }
          vscode.window.showErrorMessage(data.value)
          break
        }
        // case 'tokens': {
        //   await Util.globalState.update(accessTokenKey, data.accessToken)
        //   await Util.globalState.update(refreshTokenKey, data.refreshToken)
        //   break
        // }
      }
    })
  }

  /**
   * @description webview配置
   */
  private getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'webview-dist', 'js', 'bundle.js')
    )

    const tailwindUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'webview-dist', 'css', 'tailwind.css')
    )

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce()

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <!--
        Use a content security policy to only allow loading images from https or from our extension directory,
        and only allow scripts that have a specific nonce.
      -->
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Video Editor</title>
      <link href="${tailwindUri}" rel="stylesheet">
    </head>
    <body>
      <div id="root"></div>
      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`
  }
}

function getNonce() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export { ReactPanel }
