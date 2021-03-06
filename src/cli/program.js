const program = require('commander')
const pkg = require('../../package.json')
const create = require('./commands/create')
const compile = require('./commands/compile')
const start = require('./commands/start')
const watch = require('./commands/watch')
const withErrors = require('./helpers/withErrors')

program.version(pkg.version)

program
  .command('new <name> [dir]')
  .action(withErrors(create))

program
  .command('start')
  .action(start)

program
  .command('compile')
  .action(withErrors(compile))

program
  .command('watch')
  .action(withErrors(watch))

module.exports = program
