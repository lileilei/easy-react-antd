/**
 * Created by lilei on 2017/3/1.
 */
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var clc = require('cli-color');

var createModule = require('./createModule')

var projectName = ""
module.exports = function (fileName) {
    var fileTree = require(process.cwd() + '/' + fileName)
    projectName = fileTree.project
    delete fileTree.project
    //替换根路由和主页路由的 项目名称
    var tmpls = path.resolve(__dirname, 'tmpls')
    var projectTmpl = path.resolve(tmpls, 'project.ejs')
    var proStr = fs.readFileSync(projectTmpl, 'utf8');
    fs.writeFileSync(path.resolve(process.cwd(), 'index.js'), ejs.render(proStr, {
        project: projectName
    }))

    var homeTmpl = path.resolve(tmpls, 'home.ejs')
    var homeStr = fs.readFileSync(homeTmpl, 'utf8');
    fs.writeFileSync(path.resolve('Home', 'index.js'), ejs.render(homeStr, {
        project: projectName
    }))
    console.log(clc.cyan("根路由/主路由:") + clc.greenBright('   successfully!'))
    createModules(process.cwd(), fileTree, '/' + projectName + '/home')
}

function createModules(paths, mods, ToUrl) {
    for (var mod in mods) {
        var childArr = Object.keys(mods[mod].children || {})
        if (childArr.length > 0) {
            ToUrl += '/' + mod + '/' + childArr[0]
            var opts = {
                children: childArr,
                onEnter: ToUrl
            }
        }
        createModule(paths, mod, opts)
        if (mods[mod].children) {
            createModules(path.resolve(paths, mod, 'routes'), mods[mod].children, ToUrl)
        }
    }
}