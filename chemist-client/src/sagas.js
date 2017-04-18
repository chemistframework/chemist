// const { call, put, takeEvery } = require('redux-saga/effects')
//
// const CHANGE_PAGE = '@@CHEMIST/CHANGE_PAGE'
// const PUSH_HISTORY = '@@CHEMIST/PUSH_HISTORY'
// const CLIENT_HOST = `${window.location.protocol}//${window.location.host}`
// const DEFAULT_REQUEST_OPTIONS = {
//   credentials: 'same-origin',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// }
//
// async function makePageRequest (url, fetchOptions = {}) {
//   const mergedFetchOptions = extend(true, {}, DEFAULT_REQUEST_OPTIONS, fetchOptions)
//   const response = await fetch(url, mergedFetchOptions)
//   const { page, props } = await response.json()
//   const path = parseUri(response.url).resource()
//
//   return { page, props, path }
// }
//
// // { type: '@@CHEMIST/HISTORY_CHANGED', location: { ... } }
// // -> { type: '@@CHEMIST/SET_PAGE_COMPONENT', page: 'Test', props: {} } }
//
// // { type: '@@CHEMIST/CHANGE_PAGE', path: '/checkout/address', options: { method: 'POST', body: JSON.stringify({ ok: true }) } }
// // -> { type: '@@CHEMIST/HISTORY_CHANGED', location: { ... } }
// // -> { type: '@@CHEMIST/ROUTING_ERROR', error: new Error(...) }
//
// const sym = name => Symbol(`@@CHEMIST/${name}`)
//
// const historyChanged = location =>
//   ({ type: sym('HISTORY_CHANGED'), location })
//
// const setPageComponent = ({ page, props }) =>
//   ({ type: sym('SET_PAGE_COMPONENT'), page, props })
//
// const setHistoryLocation = ({ page, props, path }) =>
//   ({ type: sym('SET_HISTORY_LOCATION'), location: createLocation(path, { page, props }) })
//
// const routingError = error =>
//   ({ type: sym('ROUTING_ERROR'), error })
//
// function* changePage (action, history) {
//   try {
//     const { page, props, path } = yield call(makePageRequest, action.path, action.options)
//     // yield put(setPageComponent({ page, props }))
//     yield put(setHistoryLocation({ page, props, path }))
//   } catch (e) {
//     yield put(routingError(e))
//   }
// }
//
// function* pushHistory (action, history) {
//   // yield put(setPageComponent({ page, props }))
//   const { page }
//   yield put(setHistoryLocation({ page, props, path }))
// }
//
// export function sagas ({ history }) {
//   history.listen(location => {
//     store.dispatch(historyChanged(location))
//   })
//
//   return function* () {
//     yield [
//       takeEvery(CHANGE_PAGE, changePage, history),
//       takeEvery(PUSH_HISTORY, pushHistory, history),
//       takeEvery(SET_HISTORY_LOCATION, setHistory, history)
//     ]
//   }
// }
