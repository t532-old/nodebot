// I didn't use ES6/7 Syntax here because babel seems wouldn't support importing after some other statements.
console.log(
`-------------------------------
Running runtime tests...`
)
console.log('- 1/3: Load config:')
require('fs').copyFileSync('config.template.yml', 'config.yml')
console.log('  - config.yml')
require('fs').copyFileSync('aliases.template.yml', 'aliases.yml')
console.log('  - aliases.yml')
console.log('- 2/3: Load Modules:')
console.log(require('../dist/modules'))
console.log('- 3/3: Load Core:')
console.log(require('../dist/core/message'))
console.log(`- ✔ Success`)
