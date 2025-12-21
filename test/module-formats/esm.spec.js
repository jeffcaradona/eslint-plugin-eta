import { describe, it, expect } from '@jest/globals'
import plugin from '../../dist/index.js'

describe('ESM import', () => {
  it('should load plugin via ESM import', () => {
    expect(plugin).toBeDefined()
    expect(plugin.processors).toBeDefined()
    expect(plugin.processors.eta).toBeDefined()
  })

  it('should have required processor properties', () => {
    const { processors } = plugin
    expect(processors.eta).toHaveProperty('preprocess')
    expect(processors.eta).toHaveProperty('postprocess')
  })

  it('should have plugin metadata', () => {
    expect(plugin.meta).toBeDefined()
    expect(plugin.meta.name).toBeDefined()
    expect(plugin.meta.version).toBeDefined()
  })
})
