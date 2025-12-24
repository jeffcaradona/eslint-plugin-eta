import { RuleTester } from 'eslint'
import noGlobalVars from '../../../lib/rules/no-global-vars.js'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  }
})

describe('no-global-vars', () => {
  it('should be a valid rule', () => {
    expect(typeof noGlobalVars).toBe('object')
    expect(typeof noGlobalVars.create).toBe('function')
    expect(typeof noGlobalVars.meta).toBe('object')
  })

  ruleTester.run('no-global-vars', noGlobalVars, {
    valid: [
      {
        code: 'it.name'
      },
      {
        code: 'it.value + 5'
      },
      {
        code: 'function test() { const local = 5; return local; }'
      },
      {
        code: 'if (true) { let temp = 10; }'
      },
      {
        code: '(() => { const inner = 1; return inner; })()'
      }
    ],

    invalid: [
      {
        code: "const name = 'bill';",
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'name' }
          }
        ]
      },
      {
        code: "let userName = 'john';",
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'userName' }
          }
        ]
      },
      {
        code: "var globalVar = 'test';",
        languageOptions: {
          ecmaVersion: 2022,
          sourceType: 'script'
        },
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'globalVar' }
          }
        ]
      },
      {
        code: 'const a = 1, b = 2;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'a' }
          },
          {
            messageId: 'noGlobalVars',
            data: { name: 'b' }
          }
        ]
      },
      {
        code: 'const {x, y} = obj;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'x' }
          },
          {
            messageId: 'noGlobalVars',
            data: { name: 'y' }
          }
        ]
      },
      {
        code: 'const [first, second] = array;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'first' }
          },
          {
            messageId: 'noGlobalVars',
            data: { name: 'second' }
          }
        ]
      },
      {
        code: 'const {a: aliasedA, ...rest} = obj;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'aliasedA' }
          },
          {
            messageId: 'noGlobalVars',
            data: { name: 'rest' }
          }
        ]
      },
      {
        code: 'const [head, ...tail] = array;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'head' }
          },
          {
            messageId: 'noGlobalVars',
            data: { name: 'tail' }
          }
        ]
      },
      {
        code: 'const {nested: {deep}} = obj;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'deep' }
          }
        ]
      },
      {
        code: 'const {x = 10, y = 20} = obj;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'x' }
          },
          {
            messageId: 'noGlobalVars',
            data: { name: 'y' }
          }
        ]
      },
      {
        code: 'const [a = 1, b = 2] = array;',
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'a' }
          },
          {
            messageId: 'noGlobalVars',
            data: { name: 'b' }
          }
        ]
      }
    ]
  })
})
