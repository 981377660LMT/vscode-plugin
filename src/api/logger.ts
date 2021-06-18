import { createWriteStream } from 'fs'
import path from 'path'

const logPath = (fileName: string = 'a.log') => path.join(__dirname, fileName)

export const logger = (fileName: string = 'a.log') =>
  new console.Console(createWriteStream(logPath(fileName), { flags: 'w', encoding: 'utf-8' }))
