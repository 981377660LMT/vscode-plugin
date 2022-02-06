// import * as vscode from 'vscode'

// export class HelloWorldPanel {
//   /**
//    * Track the currently panel. Only allow a single panel to exist at a time.
//    */
//   static currentPanel: HelloWorldPanel | undefined
//   static readonly viewType = 'hello-world'
//   private readonly panel: vscode.WebviewPanel
//   private readonly extensionUri: vscode.Uri
//   private disposables: vscode.Disposable[] = []

//   /**
//    * @description 创建webview单例
//    */
//   static createOrShowInstance(extensionUri: vscode.Uri) {
//     const column = vscode.window.activeTextEditor?.viewColumn

//     // If we already have a panel, show it.
//     if (HelloWorldPanel.currentPanel) {
//       HelloWorldPanel.currentPanel.panel.reveal(column)
//       HelloWorldPanel.currentPanel.update()
//       return
//     }

//     // Otherwise, create a new panel.
//     const panel = vscode.window.createWebviewPanel(
//       HelloWorldPanel.viewType,
//       'Hello World Demo',
//       column ?? vscode.ViewColumn.One,
//       {
//         // Enable javascript in the webview
//         enableScripts: true,
//         // And restrict the webview to only loading content from our extension's `media` directory.
//         localResourceRoots: [
//           vscode.Uri.joinPath(extensionUri, 'media'),
//           vscode.Uri.joinPath(extensionUri, 'out/compiled'),
//         ],
//       }
//     )

//     HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri)
//   }

//   static kill() {
//     HelloWorldPanel.currentPanel?.dispose()
//     HelloWorldPanel.currentPanel = undefined
//   }

//   static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
//     HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri)
//   }

//   private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
//     this.panel = panel
//     this.extensionUri = extensionUri

//     // Set the webview's initial html content
//     this.update()

//     // Listen for when the panel is disposed
//     // This happens when the user closes the panel or when the panel is closed programatically
//     this.panel.onDidDispose(() => this.dispose(), null, this.disposables)

//     // // Handle messages from the webview
//     // this._panel.webview.onDidReceiveMessage(
//     //   (message) => {
//     //     switch (message.command) {
//     //       case "alert":
//     //         vscode.window.showErrorMessage(message.text);
//     //         return;
//     //     }
//     //   },
//     //   null,
//     //   this._disposables
//     // );
//   }

//   dispose() {
//     HelloWorldPanel.currentPanel = undefined

//     // Clean up our resources
//     this.panel.dispose()

//     while (this.disposables.length) {
//       const x = this.disposables.pop()
//       if (x) {
//         x.dispose()
//       }
//     }
//   }

//   private async update() {
//     const webview = this.panel.webview

//     this.panel.webview.html = this.getHtmlForWebview(webview)
//     webview.onDidReceiveMessage(async data => {
//       switch (data.type) {
//         // case 'report': {
//         //   const message = await vscode.window.showInputBox({
//         //     placeHolder: 'why are you reporting this user?',
//         //   })
//         //   if (message) {
//         //     await mutationNoErr(`/report`, { message, ...data.value })
//         //     webview.postMessage({
//         //       command: 'report-done',
//         //       data,
//         //     })
//         //     vscode.window.showInformationMessage('Thank you for reporting!')
//         //   }
//         //   break
//         // }
//         // case 'set-window-info': {
//         //   const { displayName, flair } = data.value
//         //   this._panel.title = displayName
//         //   if (flair in flairMap) {
//         //     const both = vscode.Uri.parse(
//         //       `https://flair.benawad.com/` + flairMap[flair as keyof typeof flairMap]
//         //     )
//         //     this._panel.iconPath = {
//         //       light: both,
//         //       dark: both,
//         //     }
//         //   }
//         //   break
//         // }
//         case 'onInfo': {
//           if (!data.value) {
//             return
//           }
//           vscode.window.showInformationMessage(data.value)
//           break
//         }
//         case 'onError': {
//           if (!data.value) {
//             return
//           }
//           vscode.window.showErrorMessage(data.value)
//           break
//         }
//         // case 'tokens': {
//         //   await Util.globalState.update(accessTokenKey, data.accessToken)
//         //   await Util.globalState.update(refreshTokenKey, data.refreshToken)
//         //   break
//         // }
//       }
//     })
//   }

//   /**
//    * @description webview配置
//    */
//   private getHtmlForWebview(webview: vscode.Webview) {
//     // // And the uri we use to load this script in the webview
//     const scriptUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(this.extensionUri, 'out', 'compiled/swiper.js')
//     )

//     // Local path to css styles
//     const styleResetPath = vscode.Uri.joinPath(this.extensionUri, 'media', 'reset.css')
//     const stylesPathMainPath = vscode.Uri.joinPath(this.extensionUri, 'media', 'vscode.css')
//     // Uri to load styles into webview
//     const stylesResetUri = webview.asWebviewUri(styleResetPath)
//     const stylesMainUri = webview.asWebviewUri(stylesPathMainPath)
//     const cssUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(this.extensionUri, 'out', 'compiled/swiper.css')
//     )

//     // Use a nonce to only allow specific scripts to be run

//     return `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">

//       <!--
//         Use a content security policy to only allow loading images from https or from our extension directory,
//         and only allow scripts that have a specific nonce.
//       -->
//       <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

//       <meta name="viewport" content="width=device-width, initial-scale=1.0">

//       <link href="${styleResetUri}" rel="stylesheet">
//       <link href="${styleVSCodeUri}" rel="stylesheet">
//       <link href="${styleMainUri}" rel="stylesheet">

//       <title>Cat Colors</title>
//     </head>
//     <body>
//       <ul class="color-list">
//       </ul>

//       <button class="add-color-button">Add Color</button>

//       <script nonce="${nonce}" src="${scriptUri}"></script>
//     </body>
//     </html>`
//   }
// }
