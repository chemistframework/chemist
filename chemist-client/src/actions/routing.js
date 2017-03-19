const { createLocation } = require('history')
const parseUri = require('urijs')
const { SET_LOCATION } = require('../types')

function setLocation ({ location, page, props }) {
  return { type: SET_LOCATION, location, page, props }
}

function fetchAndReplaceLocation ({ host, location, history }) {
  return async function () {
    try {
      const path = host + location.pathname + location.search
      const response = await fetch(path, { headers: { Accept: 'application/json' } })
      const page = await response.json()
      const responseResource = parseUri(response.url).resource()
      const responseLocation = createLocation(responseResource, { page })

      history.replace(responseLocation)
    } catch (e) {
      // TODO: handle this error properly
      console.error(e)
    }
  }
}

exports.setLocation = setLocation
exports.fetchAndReplaceLocation = fetchAndReplaceLocation
