import { Uri } from 'vscode'

type TemplateType = 'vue2' | 'vue3' | 'react'

/**
 * @example {componentName:`Foo`, fileName:`Foo.tsx`, templateType:`react`, uri:...}
 */
interface App {
  componentName: string
  fileName: string
  templateType: TemplateType
  uri: Uri
}

interface TemplateData {
  componentName: string
}

export { App, TemplateData }
