const { setPage, requestPage } = require('./actions/routing')

module.exports = function syncHistoryToStore ({ history, store }) {
  history.listen(location => {
    const page = location.state && location.state.page
    const path = location.pathname + location.search

    if (page) {
      store.dispatch(setPage(page))
    } else {
      store.dispatch(requestPage({ path }))
    }
  })
}
