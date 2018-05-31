const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'chainz.js',
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'chainz'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
};