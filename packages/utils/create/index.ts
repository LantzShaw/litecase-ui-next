import { BEM, createBEM } from './bem'

import { LC_PREFIX } from '../constants'

export type CreateNamespaceReturn = [BEM, string]

export function createNamespace(
  name: string,
  prefix?: string
): CreateNamespaceReturn {
  name = `${prefix || LC_PREFIX}-${name}`
  return [createBEM(name), name]
}
