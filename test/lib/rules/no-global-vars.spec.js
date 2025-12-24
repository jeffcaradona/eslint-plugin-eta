import { RuleTester } from 'eslint'
import noGlobalVars from '../../../lib/rules/no-global-vars.js'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
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
        code: 'it.name',
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        }
      },
      {
        code: 'it.value + 5',
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        }
      },
      {
        code: 'function test() { const local = 5; return local; }',
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        }
      },
      {
        code: 'if (true) { let temp = 10; }',
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        }
      },
      {
        code: '(() => { const inner = 1; return inner; })()',
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        }
      }
    ],

    invalid: [
      {
        code: "const name = 'bill';",
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        },
        errors: [
          {
            messageId: 'noGlobalVars',
            data: { name: 'name' }
          }
        ]
      },
      {
        code: "let userName = 'john';",
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        },
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
          ecmaVersion: 2020,
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
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module'
        },
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
