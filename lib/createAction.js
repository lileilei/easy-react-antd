/**
 * Created by lilei on 2017/7/28.
 */
var fs = require("fs");
var path = require('path')
var ejs = require('ejs');
module.exports = function (actionName) {
    var actionFile = path.resolve(process.cwd(), 'action.js')
    var reducersFile = path.resolve(process.cwd(), 'reducers.js')
    if (!fs.existsSync(actionFile) || !fs.existsSync(reducersFile)) {
        console.log("当前目录没找到action.js文件或reducers.js！")
        return;
    }
    var names = actionName.toLowerCase().split("_")
    var funcName = names[names.length - 1]
    for (let i = 0; i < names.length - 1; i++) {
        funcName += names[i].charAt().toUpperCase() + names[i].slice(1)
    }
    //action
    var str = fs.readFileSync(path.resolve(__dirname, 'tmpls/action.ejs'), 'utf8');
    fs.readFile(actionFile, 'utf8', function (err, data) {
        if (err) throw err;
        var strs = data.replace('/*@action*/', ejs.render(str, {name: actionName, funcName: funcName}));
        fs.writeFile(actionFile, strs, 'utf8', (err) => {
            if (err) throw err;
            console.log('success!');
        });
    });
    //reducers
    fs.readFile(reducersFile, 'utf8', function (err, data) {
        if (err) throw err;
        var strs = data.replace('/*@NAME*/', actionName + ',/*@NAME*/');
        strs = strs.replace('/*@action*/', '/*@action*/ \n  [' + actionName + ']: (state, action) => (\n    state.merge({...state})\n  ),');
        fs.writeFile(reducersFile, strs, 'utf8', (err) => {
            if (err) throw err;
            console.log('success!');
        });
    });
}
