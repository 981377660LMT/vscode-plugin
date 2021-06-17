import * as vscode from 'vscode'

import { dataToInterface, interfaceToData } from './commands/main'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(dataToInterface, interfaceToData)
}

export function deactivate() {}
