import eta from './processors/eta.js'
import noGlobalVars from './rules/no-global-vars.js'

export default {
  processors: {
    eta: eta
  },
  rules: {
    'no-global-vars': noGlobalVars
  },
  configs: {
    recommended: {
      rules: {
        'eta/no-global-vars': 'off'
      }
    },
    strict: {
      rules: {
        'eta/no-global-vars': 'error'
      }
    }
  }
}
