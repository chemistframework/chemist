const React = require('react')
const { connect } = require('react-redux')
const { requestPage, pushHistory } = require('./actions/routing')

class ClientRouter extends React.Component {
  getChildContext () {
    const request = (path, options = {}) => {
      this.props.dispatch(requestPage({ path, options }))
    }

    const pushLocation = resource => {
      this.props.dispatch(pushHistory(resource))
    }

    return { router: { request, pushLocation } }
  }

  render () {
    const { Page, props } = this.props.routing
    return <Page {...props} />
  }
}

ClientRouter.childContextTypes = {
  router: React.PropTypes.object
}

const connector = connect(state => ({ routing: state.routing }))
module.exports = connector(ClientRouter)
