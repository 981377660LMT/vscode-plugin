import * as vscode from 'vscode'
import { Uri } from 'vscode'

/**
 * Manages react webview panels
 */
class ReactPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  static instance: ReactPanel | undefined
  static readonly viewType = 'react-video-editor'

  private readonly panel: vscode.WebviewPanel
  private readonly webview: vscode.Webview
  private readonly extensionUri: vscode.Uri
  private disposables: vscode.Disposable[] = []

  private readonly _onDidReceiveMessage = new vscode.EventEmitter<Webview.Message>()
  readonly onDidReceiveMessage = this._onDidReceiveMessage.event
  private readonly _onDidChangeViewState =
    new vscode.EventEmitter<vscode.WebviewPanelOnDidChangeViewStateEvent>()
  readonly onDidChangeViewState = this._onDidChangeViewState.event

  /**
   * @description 创建webview单例
   */
  static createOrShowInstance(extensionUri: vscode.Uri): ReactPanel {
    const column = vscode.window.activeTextEditor?.viewColumn

    if (ReactPanel.instance) {
      ReactPanel.instance.panel.reveal(column)
      return ReactPanel.instance
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      ReactPanel.viewType,
      'Video Editor',
      column ?? vscode.ViewColumn.One,
      {
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
    return ReactPanel.instance
  }

  static kill(): void {
    ReactPanel.instance?.dispose()
    ReactPanel.instance = undefined
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.panel = panel
    this.webview = this.panel.webview
    this.extensionUri = extensionUri

    // Set panel icon
    this.panel.iconPath = vscode.Uri.joinPath(this.extensionUri, 'media', 'react-panel.svg')

    this.initLifeCycle()
    this.listenMessageFromWebview()
    this.webview.html = this.getHtmlForWebview()
  }

  /**
   *
   * @param action 向webview发送的消息
   */
  postMessageToWebview(action: ReactPanel.Message): void {
    ReactPanel.instance?.webview.postMessage(action)
  }

  asWebviewUri(localResource: Uri): Uri {
    return this.webview.asWebviewUri(localResource)
  }

  dispose(): void {
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

  // 注意销毁 webview 时应提示是否要关闭
  private initLifeCycle(): void {
    this.panel.onDidChangeViewState(
      e => {
        this._onDidChangeViewState.fire(e)
      },
      null,
      this.disposables
    )

    this.disposables.push(this._onDidChangeViewState)

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables)
  }

  private listenMessageFromWebview(): void {
    this.webview.onDidReceiveMessage(
      (message: Webview.Message) => {
        this._onDidReceiveMessage.fire(message)
      },
      null,
      this.disposables
    )

    this.disposables.push(this._onDidReceiveMessage)
  }

  /**
   * @description webview配置
   */
  private getHtmlForWebview(): string {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = this.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'webview-dist', 'js', 'bundle.js')
    )

    const tailwindUri = this.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'webview-dist', 'css', 'tailwind.css')
    )

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce()
    // console.log(webview.cspSource) https://*.vscode-webview.net

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <!--
        Use a content security policy to only allow loading images from https or from our extension directory,
        and only allow scripts that have a specific nonce.
      -->
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${this.webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';
      img-src https: ${this.webview.cspSource}; media-src blob: ${this.webview.cspSource};">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Video Editor</title>
      <link href="${tailwindUri}" rel="stylesheet">
    </head>
    <body>
      <div id="root"></div>
      <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
      </script>
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
