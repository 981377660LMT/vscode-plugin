import * as vscode from 'vscode'
import { Collector } from '../utils/Collector'
import { Displayer } from '../utils/Displayer'
import { Parser } from '../utils/parser'

const dataToInterface = vscode.commands.registerCommand('ts-interface-mock.dataToInterface', () =>
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

const interfaceToData = vscode.commands.registerCommand('ts-interface-mock.interfaceToData', () => {
  Collector.getSelectedText()
    .then(text => {
      console.log(text, 1111)
    })
    .catch(err => {
      console.log(err, 3333)
      vscode.window.showErrorMessage(err.message)
    })
})

export { interfaceToData, dataToInterface }
