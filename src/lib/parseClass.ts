import {
  ClassDeclaration,
  MethodDeclaration,
  PropertyDeclaration,
  TypescriptParser,
} from 'typescript-parser'

const getDeclarations = async (code: string) => {
  const parser = new TypescriptParser()
  const parsedCode = await parser.parseSource(code)
  console.log(parsedCode)
  return parsedCode.declarations
}

const constructInterface = (classDeclarationObj: ClassDeclaration) => {
  const className =
    classDeclarationObj.name.charAt(0).toUpperCase() + classDeclarationObj.name.substring(1)
  const classProps = getProperties(classDeclarationObj)
  const classMethods = getMethods(classDeclarationObj)
  console.log(`interface I${className} {\n${classProps}${classMethods}}\n`)

  return `interface I${className} {\n${classProps}${classMethods}}\n`
}

const isPublicFacing = (i: PropertyDeclaration | MethodDeclaration): boolean => {
  // return public and instance props/methods
  return i.visibility !== 0 && i.visibility !== 1 && !i.isStatic
}

const getProperties = (cd: ClassDeclaration): string => {
  return cd.properties
    .filter(isPublicFacing)
    .map(p => {
      return `  ${p.name}${p.isOptional ? '?' : ''}: ${p.type || 'unknown'}\n`
    })
    .join('')
}

const getMethods = (cd: ClassDeclaration): string => {
  return cd.methods
    .filter(isPublicFacing)
    .map(m => {
      const params = m.parameters
        .map(p => {
          return `${p.name}: ${p.type}`
        })
        .join(', ')

      return `  ${m.name}: (${params.length > 0 ? `${params}` : ''}) => ${m.type || 'unknown'}\n`
    })
    .join('')
}

const parseClass = async (data: string) => {
  const classDeclaration = (await getDeclarations(data))[0]
  return constructInterface(classDeclaration as ClassDeclaration)
}

export { parseClass }
