const render = require('../../chemist-render')

const requestMode = req => {
  const accepts = req.headers.accept
  return accepts && accepts.includes('application/json') ? 'JSON' : 'HTML'
}

const respond = (res, mode, body) => {
  if (mode === 'HTML') return res.send(body)
  if (mode === 'JSON') return res.json(body)
  return null
}

module.exports = function middleware ({ components, Document, createStore } = {}) {
  return function renderingMiddleware (req, res, next) {
    res.chemist = {}

    res.chemist.render = function (page, props = {}) {
      const mode = requestMode(req)
      const options = {
        mode,
        page,
        Document,
        createStore,
        props: Object.assign({ params: req.params }, props),
        pages: components
      }

      render(options)
        .then(body => respond(res, mode, body))
        .catch(err => { throw err })
    }

    res.chemist.redirect = function (path, { status = 302 } = {}) {
      res.redirect(status, path)
    }

    next()
  }
}
