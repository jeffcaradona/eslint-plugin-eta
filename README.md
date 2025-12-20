# eslint-plugin-eta
An ESLint plugin so you can lint Eta template files (forked from bengubler/eslint-plugin-eta)

<span align="center">

[![Travis](https://img.shields.io/travis/com/eta-dev/eslint-plugin-eta/master.svg)](https://travis-ci.com/eta-dev/eslint-plugin-eta)
[![Coveralls](https://img.shields.io/coveralls/eta-dev/eslint-plugin-eta.svg)](https://coveralls.io/github/eta-dev/eslint-plugin-eta)

</span>

> Lint your embeddable Eta templates with ease



### Installation
Run `npm install --save-dev @jeffcaradona/eslint-plugin-eta` to install this ESLint plugin.

### Usage
Add this to your `eslint.config.js`:
```javascript
import eta from '@jeffcaradona/eslint-plugin-eta'

export default [
    {
        files: ['**/*.eta'],
        plugins: {
            eta
        },
        processor: 'eta/eta'
    }
]
```