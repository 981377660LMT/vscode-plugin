import * as vscode from 'vscode'

// 注入reactPanel 的 html 模板
const getAPIUserGender = () => {
  const gender = vscode.workspace.getConfiguration('webviewReact').get('userApiGender', 'male')
  return gender
}

export { getAPIUserGender }
