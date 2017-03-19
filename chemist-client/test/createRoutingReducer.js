const test = require('ava')
const { applyMiddleware, createStore, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const createRoutingReducer = require('../src/createRoutingReducer')
const { setLocation } = require('../src/actions/routing')

test('createRoutingReducer should create a new Routing Reducer', t => {
  const TestComponent = () => null
  const reducer = createRoutingReducer({
    pages: { TestComponent },
    initialPage: 'TestComponent',
    initialProps: {}
  })

  t.is('function', typeof reducer)
})

test.cb('Routing Reducer should set the current location when fetchAndReplaceLocation is called', t => {
  t.plan(1)

  const TestComponent = () => null
  const NextComponent = () => null

  const reducer = combineReducers({
    routing: createRoutingReducer({
      pages: { TestComponent, NextComponent },
      initialPage: 'TestComponent',
      initialProps: {}
    })
  })

  const middlewares = applyMiddleware(thunk)
  const store = createStore(reducer, middlewares)

  const location = {
    pathname: '/test',
    search: '?query=true',
    state: { page: { page: 'NextComponent', props: { next: true } } },
    hash: '',
    key: 'ignwkm'
  }

  store.subscribe(function () {
    t.deepEqual(store.getState(), {
      routing: {
        Page: NextComponent,
        props: { next: true }
      }
    })

    t.end()
  })

  store.dispatch(setLocation({ location, page: 'NextComponent', props: { next: true } }))
})
