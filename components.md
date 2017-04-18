# chemist-config

- [ ] read from chemist directory
- [ ] read from node directory
- [ ] pass config into all packages through the API, not file system
- [ ] make server path configurable
- [ ] make client path configurable
- [ ] make pages path configurable
- [ ] make layout and document path configurable
- [ ] only read in chemist-cli??? could pass it through to everything from there I think?

# chemist-cli (???)

- [ ] cli for node-chemist and chemist-client

# chemist-render

- [x] all node react rendering logic
- [x] remove layout? could put it inside components instead

```js
class UserProfile extends React.Component {
  render () {
    return (
      <Layout>
        <article>
          ...
        </article>
      </Layout>
    )
  }
}
```

# chemist-assets

- [ ] wrap up webpack-isomorphic-tools
- [ ] include webpack configuration and allow it to be passed in

# chemist-client

- [x] chemist state
- [x] all client app modules
- [ ] helper for client quickstart (atm generates a lot of code)

# node-chemist

- [ ] express middleware
- [ ] express 'chemist' function wrapper for quickstart

# chemist.ex

- [ ] small chemist server with a render POST method
- [ ] genserver which makes requests to node server
- [x] high level api for SSR `Chemist.render(conn, page: "Home", props: %{username: "zuren"})`

# mktemplate

- [x] library for creating files based on a template config
- [x] split out
- [ ] clean up and publish

# serializable-form

- [x] form definition and validation

# serializable-form-react

- [x] react form helpers

# evermore

- [x] fix icon fonts
- [x] dockerise
- [ ] fix piping
- [x] sagas example
- [ ] remove unnecessary webpack output
- [ ] more practical form helpers
- [ ] single config files rather than this inheritance merge mess.
- [ ] put webpack config directly in app?
- [ ] flash?
- [x] don't use Error component when it fails, raise actual error and let phoenix handle it. better errors in dev.
- [x] fix `__chemistState` and `babel-polyfill` console errors
- [x] sick hot reloads
- [x] fix redirects
- [x] copy over all templates
- [ ] catch rendering errors properly
- [ ] change page with redux actions pls
- [ ] when making a PUT request and receiving a 302, should use the correct method when following (ie GET)
- [ ] 1. Feature Test of Happy Path through Quiz
- [ ] 2. Feature Test of Happy Path through Checkout
- [ ] 3. Feature Test of end to end user flow??
