const React = require('react')
const { warn } = require('./helpers')

const MISSING_CONTEXT_WARNING =
  '`Link` is being used outside of the `router` context. ' +
  'You must nest `Link` within `ClientRouter`.'

function Link (props, context) {
  if (typeof window !== 'undefined' && !context.router) {
    warn(MISSING_CONTEXT_WARNING)
  }

  const handleClick = e => {
    e.preventDefault()

    if (context.router) {
      context.router.pushLocation(props.href)
    }

    props.onClick(e)
  }

  return (
    <a {...props} onClick={handleClick}>
      {props.children}
    </a>
  )
}

Link.propTypes = {
  onClick: React.PropTypes.func
}

Link.defaultProps = {
  onClick: () => {}
}

Link.contextTypes = {
  router: React.PropTypes.object
}

module.exports = Link
