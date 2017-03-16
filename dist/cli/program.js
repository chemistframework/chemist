'use strict';

var program = require('commander');
var pkg = require('../../package.json');
var create = require('./commands/create');
var compile = require('./commands/compile');
var start = require('./commands/start');
var watch = require('./commands/watch');
var withErrors = require('./helpers/withErrors');

program.version(pkg.version);

program.command('new <name> [dir]').action(withErrors(create));

program.command('start').action(start);

program.command('compile').action(withErrors(compile));

program.command('watch').action(withErrors(watch));

module.exports = program;