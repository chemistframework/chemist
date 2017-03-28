const URL = require('url-parse')
const merge = require('deepmerge')

function createServerHttp (pushLocationWithPage) {
  return function server (url, options = {}) {
    const defaults = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const mergedOptions = merge(defaults, options)

    return fetch(url, mergedOptions).then(async response => {
      const page = await response.json()
      const pageUrl = new URL(response.url)
      const pagePath = pageUrl.pathname + pageUrl.query

      pushLocationWithPage(pagePath, page)
    })
  }
}

module.exports = createServerHttp
