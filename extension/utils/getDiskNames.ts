import * as vscode from 'vscode'
import { getDiskInfoSync } from 'node-disk-info'

/**
 *
 * @returns 操作系统的磁盘信息
 * @description 用于 webview 的 localResourceRoots 限制
 */
function getDiskNames(): string[] {
  try {
    return getDiskInfoSync().map(drive => drive.mounted)
  } catch {
    vscode.window.showErrorMessage('failed to get disk names')
    return []
  }
}

export { getDiskNames }
