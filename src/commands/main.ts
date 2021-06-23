import * as vscode from 'vscode'
import { Uri, window, workspace } from 'vscode'

import { App } from '../types/types'
import { TemplateCreator } from '../utils/file'
import { getPascalCase, invalidFileNames } from '../utils/util'

interface Command {
  name: string
  extName: 'vue' | 'tsx'
  templateType: App['templateType']
}

const createTemplate = (command: Command) =>
  vscode.commands.registerCommand(command.name, (uri: Uri) =>
    workspace === undefined
      ? window.showErrorMessage('Please select a workspace first')
      : window
          .showInputBox({
            placeHolder: 'Please enter component name',
          })
          .then<any>(input => {
            if (input === undefined) {
              return
            }

            const inputArr = input.split(/\s+/).filter(s => s)
            inputArr.forEach(componentName => {
              if (!invalidFileNames.test(componentName)) {
                return new TemplateCreator({
                  uri,
                  componentName: getPascalCase(componentName),
                  fileName: getPascalCase(componentName) + `.${command.extName}`,
                  templateType: command.templateType,
                }).createTemplate()
              } else {
                return window.showErrorMessage(`Invalid component name ${componentName}`)
              }
            })
          })
  )

const createReactTemplate = createTemplate({
  name: 'extension.createReactComponent',
  extName: 'tsx',
  templateType: 'react',
})

const createVue2Template = createTemplate({
  name: 'extension.createVue2Component',
  extName: 'vue',
  templateType: 'vue2',
})

const createVue3Template = createTemplate({
  name: 'extension.createVue3Component',
  extName: 'vue',
  templateType: 'vue3',
})

export { createReactTemplate, createVue2Template, createVue3Template }
