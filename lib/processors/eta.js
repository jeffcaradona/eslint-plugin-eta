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

    return [{ text: text_content, filename: _filename }]
  },

  postprocess: (messages, _filename) => {
    return messages.flat()
  }
}
