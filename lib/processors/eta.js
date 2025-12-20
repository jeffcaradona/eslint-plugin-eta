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

    result = result.filter(
      (res) => res.t === 'r' || res.t === 'i' || res.t === 'e'
    )

    result = result.map((res) => res.val)

    result = result.join('\n')

    return [{ text: result, filename: _filename }]
  },

  postprocess: (messages, _filename) => {
    return [].concat(...messages)
  }
}
