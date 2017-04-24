const merge = require('deepmerge')

class JsonResponseError extends Error {
  constructor (message, response, json) {
    super(message)
    this.name = 'JsonResponseError'
    this.message = message
    this.response = response
    this.json = json
  }
}

const DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: { Accept: 'application/json' }
}

async function request (path, options) {
  const url = `${window.location.protocol}//${window.location.host}${path}`
  const fetchOptions = merge(DEFAULT_FETCH_OPTIONS, options)

  const response = await fetch(url, fetchOptions)
  const json = await response.json()

  if (!response.ok) throw new JsonResponseError(`The server responded with ${response.status}`, response, json)

  return { json, response }
}

module.exports = request
