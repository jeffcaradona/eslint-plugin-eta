import { Eta } from 'eta'

export default {
  preprocess: (text, _filename) => {
    const eta = new Eta({
      parse: {
        exec: '',
        interpolate: '=',
        raw: '~'
      },
      tags: ['<%', '%>']
    })
    let result = eta.parse(text)

    const text_content = result
      .filter((res) => res.t === 'r' || res.t === 'i' || res.t === 'e')
      .map((res) => String(res.val))
      .join('\n')

    // Return with .js extension so ESLint treats it as JavaScript
    // and doesn't reapply the processor
    return [{ text: text_content, filename: 'eta-template.js' }]
  },

  postprocess: (messages, _filename) => {
    return messages.flat()
  }
}
