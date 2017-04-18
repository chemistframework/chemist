const React = require('react')
const ReactDOM = require('react-dom/server')
const { Provider } = require('react-redux')

const MISSING_CREATE_STORE_ERROR = 'You must pass a `createStore` function into render'
const MISSING_COMPONENT_ERROR = 'You must pass a `page` option into render'
const missingPageError = name => `The page "${name}" is not registered`
const invalidModeError = mode => `The mode "${mode}" is invalid. Use "HTML" or "JSON"`

function renderJson ({ page, props }) {
  return Promise.resolve({ page, props })
}

function renderHtml ({ Document, loadPageComponent, page, props, createStore }) {
  return loadPageComponent().then(PageComponent => {
    try {
      const layoutProps = { assets: global.webpackIsomorphic.assets() }
      const store = createStore({ initialPage: page, initialProps: props })

      let content = ReactDOM.renderToString(
        <Provider store={store}>
          <PageComponent {...props} />
        </Provider>
      )

      content = ReactDOM.renderToStaticMarkup(
        <Document
          content={content}
          page={page}
          pageProps={props}
          {...layoutProps}
        />
      )

      return Promise.resolve(content)
    } catch (e) {
      return Promise.reject(e)
    }
  })
}

function render ({ mode, pages, page, props, Document, createStore }) {
  if (!createStore) return Promise.reject(new Error(MISSING_CREATE_STORE_ERROR))

  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphic.refresh()
  }

  if (!page) return Promise.reject(new Error(MISSING_COMPONENT_ERROR))

  const loadPageComponent = pages[page]
  if (!loadPageComponent) return Promise.reject(new Error(missingPageError(page)))

  switch (mode) {
    case 'JSON': return renderJson({ page, props })
    case 'HTML': return renderHtml({ Document, loadPageComponent, page, props, createStore })
    default: return Promise.reject(new Error(invalidModeError(mode)))
  }
}

module.exports = render
