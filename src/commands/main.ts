import * as vscode from 'vscode'
import { Collector } from '../utils/Collector'
import { Displayer } from '../utils/Displayer'
import { Parser } from '../utils/parser'

// 在webview中打开
const dataToInterface = vscode.commands.registerCommand('ts-interface-mock.dataToInterface', uri =>
  Collector.getSelectedText()
    .then(Parser.parse)
    .then(parsedData => new Displayer(parsedData).displayToFile())
    .catch(vscode.window.showErrorMessage)
)

// 在webview中打开
const interfaceToData = vscode.commands.registerCommand(
  'ts-interface-mock.interfaceToData',
  uri => {
    console.log(uri)
  }
)

export { interfaceToData, dataToInterface }
