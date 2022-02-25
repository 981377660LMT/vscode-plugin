interface VSCode {
  postMessage(message: any): void
}

declare function acquireVsCodeApi(): VSCode

declare const vscode: VSCode
