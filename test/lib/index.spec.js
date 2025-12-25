import EtaEslint from '../../lib/index.js'

describe('EtaEslint', () => {
  it('should be an object', () => {
    expect(typeof EtaEslint).toBe('object')
  })
  describe('.processors', () => {
    it('should be an object', () => {
      expect(typeof EtaEslint.processors).toBe('object')
    })
    describe('.eta', () => {
      it('should be an object', () => {
        expect(typeof EtaEslint.processors.eta).toBe('object')
      })
    })
  })
  describe('.rules', () => {
    it('should be an object', () => {
      expect(typeof EtaEslint.rules).toBe('object')
    })
    describe('.no-global-vars', () => {
      it('should be an object', () => {
        expect(typeof EtaEslint.rules['no-global-vars']).toBe('object')
      })
      it('should have a create function', () => {
        expect(typeof EtaEslint.rules['no-global-vars'].create).toBe('function')
      })
      it('should have meta information', () => {
        expect(typeof EtaEslint.rules['no-global-vars'].meta).toBe('object')
      })
    })
  })
  describe('.configs', () => {
    it('should be an object', () => {
      expect(typeof EtaEslint.configs).toBe('object')
    })
    describe('.recommended', () => {
      it('should be an object', () => {
        expect(typeof EtaEslint.configs.recommended).toBe('object')
      })
      it('should have rules', () => {
        expect(typeof EtaEslint.configs.recommended.rules).toBe('object')
      })
    })
    describe('.strict', () => {
      it('should be an object', () => {
        expect(typeof EtaEslint.configs.strict).toBe('object')
      })
      it('should have rules', () => {
        expect(typeof EtaEslint.configs.strict.rules).toBe('object')
      })
    })
  })
})
