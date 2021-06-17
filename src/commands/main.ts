import { tmpdir } from 'os'
import { join } from 'path'
import * as vscode from 'vscode'
import { commands, Uri, window } from 'vscode'
import { Collector } from '../utils/Collector'
import { Displayer } from '../utils/Displayer'
import { Faker } from '../utils/Faker'
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
      window.showErrorMessage(err.message)
    })
)

const interfaceToData = vscode.commands.registerCommand(
  'ts-interface-mock.interfaceToData',
  (uri: Uri) => {
    Collector.getSelectedText()
      .then(text => {
        console.log(text, 1111)
        return Faker.fake(text)
      })
      .then(fakeData => {
        console.log(fakeData, 222)
        return new Displayer(fakeData, join(tmpdir(), 'result.json')).displayToFile()
      })
      .then(() => commands.executeCommand('editor.action.formatDocument'))
      .catch(err => {
        console.log(err, 3333)
        window.showErrorMessage(err.message)
      })
  }
)

export { interfaceToData, dataToInterface }
