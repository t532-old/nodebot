// I didn't use ES6/7 Syntax here because babel seems wouldn't support importing after some other statements.
console.log(
`-------------------------------
Running runtime tests...`
)
console.log('- 1/2: Load config:')
require('fs').copyFileSync('config/config.template.yml', 'config/config.yml')
console.log('  - config.yml')
require('fs').copyFileSync('config/aliases.template.yml', 'config/aliases.yml')
console.log('  - aliases.yml')
console.log('- 2/2: Load Core:')
console.log('  - 1/3: Load Command Parser:')
console.log(require('../dist/command'))
console.log('  - 2/3: Load Logger:')
console.log(require('../dist/util/log'))
console.log('  - 3/3: Load Message Processer:')
console.log('    - 1/3: Load Message Sender:')
console.log(require('../dist/sender'))
console.log('    - 2/3: Load Core Middleware Chain:')
console.log(require('../dist/middlewares'))
console.log('    - 3/3: Load Message Handler:')
console.log(require('../dist/handler'))
console.log(`- ✔ Success`)
