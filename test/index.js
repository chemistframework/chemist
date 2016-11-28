const index = require('../app')

describe('index', function () {
  it('exports all public modules', function () {
    expect(Object.keys(index)).to.deep.equal([
      'ClientRouter',
      'config',
      'createRoutingReducer',
      'Form',
      'Link',
      'middleware',
      'syncHistoryToStore'
    ])
  })
})
