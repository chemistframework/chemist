const React = require('react')
const { createStore, combineReducers } = require('redux')
const { Provider } = require('react-redux')
const { render } = require('enzyme')
const createMemoryHistory = require('history/createMemoryHistory').default
const createRoutingReducer = require('../../app/lib/createRoutingReducer')
const syncHistoryToStore = require('../../app/lib/syncHistoryToStore')
const ClientRouter = require('../../app/lib/ClientRouter')

describe('Client Router', function () {
  describe('when rendering in the app', function () {
    const HomePage = () => <div className="homepage" />
    const AboutPage = () => <div className="aboutpage" />
    const routes = {
      '/': HomePage,
      '/about': AboutPage
    }

    const history = createMemoryHistory()
    const reducer = combineReducers({ routing: createRoutingReducer(routes) })
    const store = createStore(reducer)
    syncHistoryToStore(history, store)

    const app = (
      <Provider store={store}>
        <ClientRouter />
      </Provider>
    )

    it('should only default to the homepage', function () {
      const wrapper = render(app)
      expect(wrapper.find('.homepage')).to.have.length(1)
      expect(wrapper.find('.aboutpage')).to.have.length(0)
    })

    it('should only render the component for the current URL', function () {
      history.push({ pathname: '/about' })

      const wrapper = render(app)
      expect(wrapper.find('.homepage')).to.have.length(0)
      expect(wrapper.find('.aboutpage')).to.have.length(1)
    })
  })
})
