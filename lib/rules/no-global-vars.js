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
    /**
     * Reports all identifiers in a pattern (handles destructuring)
     * @param {ASTNode} pattern - The pattern node (Identifier, ObjectPattern, ArrayPattern)
     * @returns {void}
     */
    function reportPattern(pattern) {
      if (pattern.type === 'Identifier') {
        context.report({
          node: pattern,
          messageId: 'noGlobalVars',
          data: {
            name: pattern.name
          }
        })
      } else if (pattern.type === 'ObjectPattern') {
        pattern.properties.forEach((prop) => {
          if (prop.type === 'Property') {
            reportPattern(prop.value)
          } else if (prop.type === 'RestElement') {
            reportPattern(prop.argument)
          }
        })
      } else if (pattern.type === 'ArrayPattern') {
        pattern.elements.forEach((element) => {
          if (element) {
            reportPattern(element)
          }
        })
      } else if (pattern.type === 'RestElement') {
        reportPattern(pattern.argument)
      } else if (pattern.type === 'AssignmentPattern') {
        reportPattern(pattern.left)
      }
    }

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
            if (declaration.id) {
              reportPattern(declaration.id)
            }
          })
        }
      }
    }
  }
}
