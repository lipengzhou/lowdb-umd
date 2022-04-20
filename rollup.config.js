const { terser } = require('rollup-plugin-terser')

module.exports = {
  input: './lib/index.js',
  output: [
    {
      file: './dist/lowdb.js',
      format: 'umd',
      name: 'lowdb'
    },
    {
      file: './dist/lowdb.min.js',
      format: 'umd',
      name: 'lowdb',
      plugins: [terser()]
    }
  ]
}
