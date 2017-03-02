/**
 * Created by lilei on 2017/3/1.
 */
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var clc = require('cli-color');
var tmpls = path.resolve(__dirname, '../templete')

module.exports = function (createPath, moduleName, opts) {
    //创建模块目录 | 组件目录
    var module = path.resolve(createPath, moduleName)
//reducers 注册模块的相对路径
    var srcIndex = createPath.indexOf('src') + 3
    var injectReducer = path.resolve(createPath.substring(0, srcIndex), 'store/reducers')
    var injectPath = path.relative(module, injectReducer).replace(/\\/g, "/")
    createFolder(path.resolve(module, 'components'))
    createFolder(path.resolve(module, 'routes'))

    var params = Object.assign({
        onEnter: '',
        children: [],
        name: moduleName,
        injectPath: injectPath,
        time: getTime()
    }, opts || {})
//生成基础代码
    fs.readdir(tmpls, function (err, files) {
        if (err) {
            console.log(err)
            return;
        }
        files.forEach(function (filename) {
            var dir = path.resolve(tmpls, filename)
            var str = fs.readFileSync(dir, 'utf8');
            var writeName = transform(path.basename(filename, '.ejs'));
            fs.writeFileSync(path.resolve(module, writeName), ejs.render(str, params))
            console.log(clc.cyan(writeName + ":") + clc.greenBright('   successfully!'))
        })
    })
    //文件类型转换
    function transform(writeName) {
        if (writeName == 'style') {
            writeName += '.scss'
        } else {
            writeName += '.js'
            if (writeName == 'Container.js') {
                writeName = moduleName + writeName
            }
        }
        return writeName
    }
}
function getTime() {
    var date = new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return year + '/' + month + '/' + day
}


function createFolder(to) {
    var sep = path.sep
    var folders = to.split(sep);
    var p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
            console.log(clc.cyan(p + ":") + clc.greenBright('创建成功!'))
        }
    }
}