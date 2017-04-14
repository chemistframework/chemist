const chemist = require('./dist/lib/chemist')

chemist.config = require('./dist/lib/config')
chemist.rendering = require('./dist/lib/middleware').rendering

module.exports = chemist
