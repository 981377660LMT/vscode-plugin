// @ts-check

'use strict'

const fs = require('fs')
const path = require('path')

const root = fs.realpathSync(process.cwd())

const extensionSrc = path.resolve(root, 'extension')
const extensionDist = path.resolve(root, 'extension-dist')

const webviewSrc = path.resolve(root, 'webview')
const webviewDist = path.resolve(root, 'webview-dist')

module.exports = {
  root,
  extensionSrc,
  extensionDist,
  webviewSrc,
  webviewDist,
}
