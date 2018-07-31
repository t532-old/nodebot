// I didn't use ES6/7 Syntax here because babel seems wouldn't support importing after some other statements.
console.log(
`-------------------------------
Running runtime tests...`
)
console.log('- 1/2: Load config:')
require('fs').copyFileSync('config.template.yml', 'config.yml')
console.log('  - config.yml')
require('fs').copyFileSync('aliases.template.yml', 'aliases.yml')
console.log('  - aliases.yml')
console.log('- 2/2: Load Core:')
console.log('  - 1/3: Load Command Parser:')
console.log(require('../dist/core/command'))
console.log('  - 2/3: Load Logger:')
console.log(require('../dist/core/log'))
console.log('  - 3/3: Load Message Processer:')
console.log('    - 1/3: Load Message Sender:')
console.log(require('../dist/core/message/sender'))
console.log('    - 2/3: Load Core Middleware Chain:')
console.log(require('../dist/core/message/middlewares'))
console.log('    - 3/3: Load Message Handler:')
console.log(require('../dist/core/message'))
console.log(`- ✔ Success`)
