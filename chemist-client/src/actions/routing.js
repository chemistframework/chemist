const {
  SET_LOCATION,
  SET_LOCATION_ERROR,
  SET_PAGE,
  REQUEST_PAGE,
  REQUEST_PAGE_ERROR,
  PUSH_HISTORY,
  PUSH_HISTORY_ERROR
} = require('../types')

const setLocation = ({ resource, page, props }) =>
  ({ type: SET_LOCATION, resource, page, props })

const setLocationError = error =>
  ({ type: SET_LOCATION_ERROR, error })

const setPage = ({ page, props }) =>
  ({ type: SET_PAGE, page, props })

const requestPage = ({ path, options = {} }) =>
  ({ type: REQUEST_PAGE, path, options })

const requestPageError = e =>
  ({ type: REQUEST_PAGE_ERROR, error: e })

const pushHistory = resource =>
  ({ type: PUSH_HISTORY, resource })

const pushHistoryError = e =>
  ({ type: PUSH_HISTORY_ERROR, error: e })

exports.setLocation = setLocation
exports.setLocationError = setLocationError
exports.setPage = setPage
exports.requestPage = requestPage
exports.requestPageError = requestPageError
exports.pushHistory = pushHistory
exports.pushHistoryError = pushHistoryError
