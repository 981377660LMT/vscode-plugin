import Webview from '../../typings/Webview'

interface VSCode {
  postMessage(message: Webview.Message): void
  getState(): any
  setState(state: any): void
}

declare global {
  // export function acquireVsCodeApi(): VSCode
  export const vscode: VSCode
}
