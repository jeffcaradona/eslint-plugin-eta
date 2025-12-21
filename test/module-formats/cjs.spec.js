const plugin = require('../../dist/index.cjs').default

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

  it('should have correct processor functionality', () => {
    expect(typeof plugin.processors.eta.preprocess).toBe('function')
    expect(typeof plugin.processors.eta.postprocess).toBe('function')
  })
})
