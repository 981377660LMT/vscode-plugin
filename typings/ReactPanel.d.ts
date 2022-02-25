declare namespace ReactPanel {
  // 来自ReactPanel的信息
  type MessageType = 'START' | 'PAUSE'

  interface Message {
    type: MessageType

    // TODO:Mapping payload
    payload: {
      videoSrc: string
    }
  }

  interface StartMessage extends Message {
    type: 'START'
    // payload: {

    // }
  }

  interface PauseMessage extends Message {
    type: 'PAUSE'
  }
}

export = ReactPanel
export as namespace ReactPanel
