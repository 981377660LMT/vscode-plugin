import { Position, Uri, workspace, WorkspaceEdit } from 'vscode'

const invalidFileNames = /^(\d|\-)|[\\\s+={}\(\)\[\]"`/;,:.*?'<>|#$%^@!~&]|\-$/

const getPascalCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getCamelCase = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

const findOneFile = async (fileName: string) =>
  workspace.findFiles(`**/${fileName}`, '**/node_modules/**', 1)

const insertTextToFile = async (uri: Uri, position: Position, text: string) => {
  const edit = new WorkspaceEdit()
  edit.insert(uri, position, text)
  workspace.applyEdit(edit)
}

export { getCamelCase, getPascalCase, findOneFile, insertTextToFile, invalidFileNames }
