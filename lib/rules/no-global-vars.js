/**
 * @fileoverview Disallow global variable declarations in Eta templates
 * @author jeffcaradona
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow global variable declarations in Eta templates',
      recommended: false,
      url: 'https://github.com/jeffcaradona/eslint-plugin-eta#rules'
    },
    schema: [],
    messages: {
      noGlobalVars:
        'Global variable declaration "{{name}}" is not allowed in Eta templates. Consider passing data through the template context instead.'
    }
  },

  create(context) {
    return {
      VariableDeclaration(node) {
        // Check if this is a global variable declaration
        // In the context of Eta templates, variables declared with var/let/const
        // at the top level (not inside a function or block that's part of a control structure)
        // are considered global to the template scope
        const scope = context.sourceCode.getScope(node)

        // If the variable is declared in the global scope or module scope
        if (scope.type === 'global' || scope.type === 'module') {
          node.declarations.forEach((declaration) => {
            if (declaration.id && declaration.id.name) {
              context.report({
                node: declaration.id,
                messageId: 'noGlobalVars',
                data: {
                  name: declaration.id.name
                }
              })
            }
          })
        }
      }
    }
  }
}
