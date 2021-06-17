import { readFileSync } from 'fs'

import { mock } from 'intermock'

import { Collector } from './Collector'

class Faker {
  constructor(private inter: string) {}

  public async fake(): Promise<string> {
    const { fileName } = Collector.getSelectedFile()
    const interfaces = this.extractInterName()
    const option = {
      output: 'json',
      files: [[fileName, readFileSync(fileName, 'utf-8')]],
    } as Partial<Parameters<typeof mock>[0]>

    if (interfaces.length > 0) {
      Object.assign(option, { interfaces })
    }

    const mockData = mock(option)

    return mockData as string
  }

  private extractInterName(): Array<string> {
    const regExp = /^interface\s+([\S]+?)\b/gm
    const iterator = this.inter.matchAll(regExp)

    return [...iterator].map(arr => arr[1])
  }
}

export { Faker }
