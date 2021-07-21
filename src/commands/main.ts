import { tmpdir } from 'os'
import { join } from 'path'

import * as vscode from 'vscode'

import { Collector } from '../utils/Collector'
import { Displayer } from '../utils/Displayer'
import { Faker } from '../utils/Faker'
import { Parser } from '../utils/Parser'

const dataToInterface = vscode.commands.registerCommand('ts-mock.dataToInterface', () =>
  Collector.getSelectedText()
    .then(data => new Parser(data).parse())
    .then(parsedInter => new Displayer(parsedInter, join(tmpdir(), 'result.ts')).displayToFile())
    .catch(Displayer.showError)
)

const interfaceToData = vscode.commands.registerCommand('ts-mock.interfaceToData', () => {
  Collector.getSelectedText()
    .then(inter => new Faker(inter).fake())
    .then(fakeData => new Displayer(fakeData, join(tmpdir(), 'result.json')).displayToFile())
    .then(Displayer.formatDocument)
    .catch(Displayer.showError)
})

export { interfaceToData, dataToInterface }
