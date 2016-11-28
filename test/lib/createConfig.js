const path = require('path')
const createConfig = require('../../app/lib/createConfig')
const xxx = require('../../app/lib/config')

console.log(xxx)

describe('Create Config', function () {
  const config = createConfig([
    path.join(__dirname, '..', 'fixtures', 'libConfig'),
    path.join(__dirname, '..', 'fixtures', 'libConfig', 'environments', 'test.js'),
    path.join(__dirname, '..', 'fixtures', 'appConfig'),
    path.join(__dirname, '..', 'fixtures', 'appConfig', 'environments', 'test.js')
  ])

  it('should merge config files together in order', function () {
    expect(config).to.deep.equal({
      env: 'test',
      environmentOverride: true,
      isTestEnvironment: true,
      myCustomConfig: true,
      overridden: true,
      something: 123
    })
  })

  it('should raise an error at runtime if a file is not defined', function () {
    const create = () => createConfig([
      path.join(__dirname, '..', 'fixtures', 'libConfig', 'fakeConfig.js')
    ])

    expect(create).to.throw('The config file test/fixtures/libConfig/fakeConfig.js does not exist')
  })
})
