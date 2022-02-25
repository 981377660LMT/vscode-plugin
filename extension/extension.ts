import * as vscode from 'vscode'
import { COMMAND } from './constants'
import { ReactPanel } from './ReactPanel'
import { SidebarProvider } from './SidebarProvider'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND.SHOW_WEBVIEW, () => {
      const webview = ReactPanel.createOrShowInstance(context.extensionUri)

      webview.onDidReceiveMessage(async event => {
        const { type, payload } = event
        // 此处应该不断add type 和 回调函数 用户选择视频并传入video
        switch (type) {
          case 'START':
            const select = await vscode.window.showOpenDialog({
              canSelectFolders: false,
              canSelectMany: false,
              title: '选择视频',
              filters: { video: ['mp4'] },
            })

            if (select === void 0) {
              return
            }

            // https://file%2B.vscode-resource.vscode-webview.net/e%3A/test/vscode-plugin-study/%E8%87%AA%E5%B7%B1%E7%9A%84%E6%8F%92%E4%BB%B6%E9%9B%86/funny-editor/funny-editor/webview/assets/part-100.mp4?version%3D1645807416128
            // https://file%2B.vscode-resource.vscode-webview.net/c%3A/Users/caomeinaixi/Desktop/video/2019/src/videos/merge-videos/part-102.mp4?version%3D1645807696639
            const videoSrc = webview
              .asWebviewUri(select[0])
              .with({ query: `version=${Date.now().toString()}` })
              .toString()

            console.log(videoSrc)
            webview.postMessageToWebview({
              type: 'START',
              payload: {
                videoSrc,
              },
            })
            break

          default:
            break
        }
      })
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
