import { readFileSync } from 'fs'

import { mock } from 'intermock'
import { Collector } from './Collector'

class Faker {
  public static async fake(inter: string): Promise<string> {
    const { fileName } = Collector.getSelectedFile()
    const interfaces = this.extractInterName(inter)
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

  private static extractInterName(data: string): Array<string> {
    const regexp = /^interface\s+([\S]+?)\b/gm
    const iterator = data.matchAll(regexp)

    return [...iterator].map(arr => arr[1])
  }
}

export { Faker }
