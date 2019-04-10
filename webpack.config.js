const path = require('path');
module.exports = {
    entry:path.resolve(__dirname,'src/main.js'),
    output: {
        libraryTarget: 'umd',
        filename: 'nothing.js',
        path:path.resolve(__dirname,'lib'),
    },
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            "env"
                        ]
                    }
                },
                exclude:path.resolve(__dirname,"node_modules"),
                include:path.resolve(__dirname,"src")
            }
        ]
    }
}