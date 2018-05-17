// I didn't use ES6/7 Syntax here because babel seems wouldn't support importing after some other statements.
console.log(
`-------------------------------
Running runtime tests...`
)
require('fs').copyFileSync('config.template.yml', 'config.yml')
console.log('- 1/3: Load config')
require('../dist/modules/init')
console.log('- 2/3: Load Initialization script')
require('../dist/message')
console.log('- 3/3: Load main bot')
console.log(`- ✔ Success`)
