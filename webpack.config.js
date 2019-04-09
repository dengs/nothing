var path = require('path'); 
module.exports = {
    //指定入口文件
    entry: {
        entry: './src/main.js'
    },
    //指定出口文件.打包生成build.js,如果没有dist文件夹会自动创建.最好写绝对路径
    output: {
        path: path.join(__dirname,'lib'), 
        filename: 'nothing.js'
    },
    //模块,指定加载器,可配置各种加载器
    module: {}
};