declare namespace Webview {
  // 来自Webview的信息
  type MessageType = 'START' | 'PAUSE'

  interface Message {
    type: MessageType

    // TODO:Mapping payload 模仿ts里的mapping写法
    payload: any
  }

  interface StartMessage extends Message {
    type: 'START'
    payload: {
      message: string
    }
  }

  interface PauseMessage extends Message {
    type: 'PAUSE'
  }
}

export = Webview
export as namespace Webview
