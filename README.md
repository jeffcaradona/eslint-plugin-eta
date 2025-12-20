# eslint-plugin-eta
An ESLint plugin so you can lint Eta template files (forked from <https://github.com/bgub/eslint-plugin-eta>)

<span align="center">



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