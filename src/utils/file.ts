import { dirname, join } from 'path'
import { TextEncoder } from 'util'

import * as fse from 'fs-extra'
import { FileType, window, workspace, Uri, commands } from 'vscode'
import { render } from 'ejs'

import { App, TemplateData } from '../types/types'

class TemplateCreator {
  constructor(private readonly app: App) {}

  public async createTemplate() {
    if (fse.existsSync(join(this.app.uri.fsPath, this.app.fileName))) {
      return window.showErrorMessage('A file already exists with given name...')
    } else {
      const stats = await workspace.fs.stat(this.app.uri)
      const targetFilePath =
        stats.type === FileType.Directory
          ? join(this.app.uri.path, this.app.fileName)
          : join(dirname(this.app.uri.path), this.app.fileName)

      return this.renderTemplate()
        .then(renderedTemplate => this.writeTemplate(targetFilePath, renderedTemplate))
        .catch(err => {
          console.log(err)
        })
    }
  }

  private async renderTemplate() {
    return fse
      .readFile(join(__dirname, `/templates/${this.app.templateType}.ejs`), 'utf-8')
      .then(template => {
        const templateData: TemplateData = {
          componentName: this.app.componentName,
        }
        return render(template, templateData)
      })
  }

  private async writeTemplate(targetFilePath: string, renderedTemplate: string) {
    return workspace.fs.writeFile(
      Uri.file(targetFilePath),
      new TextEncoder().encode(renderedTemplate)
    )
  }
}

export { TemplateCreator }
