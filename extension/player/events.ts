import * as vscode from 'vscode'

import { ReactPanel } from '../ReactPanel'

// todo:refractor 改为策略模式或者观察者模式 可以不断增添 而不是switch里一长串写下来
function handleEvents(webview: ReactPanel) {
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
}

export { handleEvents }
