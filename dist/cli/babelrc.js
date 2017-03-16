'use strict';

var path = require('path');
var fs = require('fs');

var babelrc = path.join(process.cwd(), '.babelrc');
module.exports = JSON.parse(fs.readFileSync(babelrc));