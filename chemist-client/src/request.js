const merge = require('deepmerge')

const DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: { Accept: 'application/json' }
}

async function request (path, options) {
  const url = `${window.location.protocol}//${window.location.host}${path}`
  const fetchOptions = merge(DEFAULT_FETCH_OPTIONS, options)

  const response = await fetch(url, fetchOptions)
  if (!response.ok) throw Error(response.statusText)

  const json = await response.json()
  return { json, response }
}

module.exports = request
