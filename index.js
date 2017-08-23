#!/usr/bin/env node
/**
 * Created by lilei on 2017/2/23.
 */
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const pkage = require('./package.json')
var inquirer = require('inquirer');
var runCmd = require('./unit/runCmd');
var createModule = require('./lib/createModule')
var createProject = require('./lib/createProject')
var createAction = require('./lib/createAction')
var argv = require('yargs').argv;
var modules = argv._;
//生成一个项目构建
if (argv.cli) {
    var dest = path.resolve(process.cwd(), argv.cli)

    function init() {
        fse.copy(path.resolve(__dirname, 'cli'), dest)
            .then(() => {
                process.chdir(dest)
                runCmd(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'])
            })
            .catch(err => console.error(err))
    }

    if (fs.existsSync(dest)) {
        console.warn("当前目录已经存在！")
        inquirer.prompt([{
            type: "input",
            name: "result",
            message: "是否确定要覆盖当前目录？[yes or no]"
        }]).then(function (answers) {
            if (answers.result != "yes") {
                return;
            }
            init();
        });
    } else {
        init()
    }
    return;
}

//根据项目文件生成所有模块目录
if (argv.file) {
    createProject(argv.file)
    return;
}
//添加action方法
if (argv.action) {
    createAction(argv.action)
    return;
}

//根据模块名字生成模块
for (var i = 0; i < modules.length; i++) {
    createModule(process.cwd(), modules[i])
}
console.log(argv)

//版本号
if (argv.v) {
    console.log(pkage.version)
}
//帮助
if (argv.h || argv.help || modules.length == 0) {
    console.log("$ coder --cli projectName          ：在当前目录创建一个项目名为 projectName")
    console.log("$ coder module1 module2      ：在当前目录创建一个目录模块")
    console.log("$ coder --file project.js    ：在src/routes目录下执行project.js目录地图 ")
    console.log("$ coder --action HOME_LIST_GET ：在当前模块目录下添加action方法和reducers方法（请填写驼峰语义化方法名）")
    console.log("\nDocumentation can be found  https://github.com/lileilei/easy-react-antd")
    return;
}
