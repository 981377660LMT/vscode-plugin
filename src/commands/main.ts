import * as vscode from 'vscode'
import { Collector } from '../utils/Collector'
import { Displayer } from '../utils/Displayer'
import { Parser } from '../utils/parser'

// 在webview中打开
const dataToInterface = vscode.commands.registerCommand('ts-interface-mock.dataToInterface', uri =>
  Collector.getSelectedText()
    .then(text => {
      console.log(text, 1111)
      return Parser.parse(text)
    })
    .then(parsedData => {
      console.log(parsedData, 222)
      const displayer = new Displayer(parsedData)
      displayer.displayToFile()
    })
    .catch(err => {
      console.log(err, 3333)
      vscode.window.showErrorMessage(err.message)
    })
)

// 在webview中打开
const interfaceToData = vscode.commands.registerCommand(
  'ts-interface-mock.interfaceToData',
  uri => {
    console.log(uri)
  }
)

export { interfaceToData, dataToInterface }
