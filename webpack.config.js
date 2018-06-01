const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    output: {
        library: "StackPie",
        libraryTarget: "umd",
        filename: "stackpie.min.js",
        auxiliaryComment: "Test Comment",
        path: path.resolve(__dirname, 'dist')
    }
};

// const path = require('path');
//
// const serverConfig = {
//     entry: './src/index.js',
//     target: 'node',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'stackpie.node.js'
//     }
//     //…
// };
//
// const clientConfig = {
//     entry: './src/index.js',
//     target: 'web', // <=== can be omitted as default is 'web'
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'lib.js'
//     }
//     //…
// };
//
// module.exports = [ serverConfig, clientConfig ];