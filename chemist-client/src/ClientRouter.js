const React = require('react')
const { connect } = require('react-redux')
const { createLocation } = require('history')
const { requestPage } = require('./actions/routing')

const HISTORY_NOT_PRESENT_ERROR = '<ClientRouter> will not work without a history prop'

class ClientRouter extends React.Component {
  getChildContext () {
    const request = (path, options = {}) => {
      this.props.dispatch(requestPage({ path, options }))
    }

    const pushLocation = resource => {
      this.props.history.push(createLocation(resource))
    }

    return { router: { request, pushLocation } }
  }

  componentWillMount () {
    if (!this.props.history) {
      throw new Error(HISTORY_NOT_PRESENT_ERROR)
    }
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
