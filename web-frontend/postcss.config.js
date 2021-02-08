const autoprefixer = require('autoprefixer')
const cssnext = require('postcss-cssnext')

module.exports = {
  plugins: [
    // autoprefixer({ browsers: ['last 2 versions'] }),
    cssnext({ autoprefixer: { browsers: ['last 2 versions'] } })
  ]
}
