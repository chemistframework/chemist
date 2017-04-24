const { call, put, takeEvery } = require('redux-saga/effects')
const parseUri = require('urijs')
const { createLocation } = require('history')
const merge = require('deepmerge')
const { SET_LOCATION, REQUEST_PAGE } = require('./types')
const { setLocation, setLocationError, requestPageError } = require('./actions/routing')

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

function replaceHistory (history, resource, page) {
  const responseLocation = createLocation(resource, { page, skipFetch: true })
  return history.replace(responseLocation)
}

function* setPageChange (history, action) {
  try {
    const page = { page: action.page, props: action.props }
    yield call(replaceHistory, history, action.resource, page)
  } catch (e) {
    yield put(setLocationError(e))
  }
}

function* requestPageFetch (action) {
  try {
    const { json, response } = yield call(request, action.path, action.options)
    const { page, props } = json
    const resource = parseUri(response.url).resource()

    yield put(setLocation({ page, props, resource }))
  } catch (e) {
    yield put(requestPageError(e))
  }
}

function createPageSaga () {
  return function* pageSaga () {
    yield takeEvery(REQUEST_PAGE, requestPageFetch)
  }
}

function createHistorySaga (history) {
  return function* historySaga () {
    yield takeEvery(SET_LOCATION, setPageChange, history)
  }
}

exports.createPageSaga = createPageSaga
exports.createHistorySaga = createHistorySaga
