interface WebviewMessage {
  type: WebviewMessageType
  data?: WebviewDataData | WebviewSpectrogramData | WebviewErrorData
}

const WebviewMessageType = {
  Ready: 'ready',
  Prepare: 'prepare',
  Data: 'data',
  Spectrogram: 'spectrogram',
  Error: 'error',
} as const

type WebviewMessageType = typeof WebviewMessageType[keyof typeof WebviewMessageType]

interface WebviewDataData {
  start: number
  end: number
}

interface WebviewSpectrogramData {
  channel: number
  start: number
  end: number
}

interface WebviewErrorData {
  message: string
}
