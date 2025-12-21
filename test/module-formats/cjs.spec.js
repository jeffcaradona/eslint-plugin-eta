const plugin = require('../../dist/index.cjs')

describe('CJS require', () => {
  it('should load plugin via CommonJS require', () => {
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
