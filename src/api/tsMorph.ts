import { mock } from 'intermock'
import * as fs from 'fs'
import { join } from 'path'
const filePath = join(__dirname, 'interface.ts')
const data = mock({
  output: 'json',
  language: 'typescript',
  // Used for testing mode,
  // isFixedMode: true,
  // isOptionalAlwaysEnabled: true,
  files: [['./interface.ts', fs.readFileSync(filePath, 'utf-8')]],
  // Specific interfaces to write to output
  // interfaces: ['Foo'],
  // Array of file tuples. (filename, data)
  //  files?: ['',''];
})

console.log(data)
