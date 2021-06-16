import * as vscode from 'vscode'

import { createReactTemplate, createVue2Template, createVue3Template } from './commands/main'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(createVue2Template, createVue3Template, createReactTemplate)
}

export function deactivate() {}
