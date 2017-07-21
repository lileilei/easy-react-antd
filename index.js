#!/usr/bin/env node
/**
 * Created by lilei on 2017/2/23.
 */
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
var inquirer = require('inquirer');
var createModule = require('./lib/createModule')
var createProject = require('./lib/createProject')
var argv = require('yargs').argv;
var modules = argv._;

function runCmd(cmd, args, fn) {
    args = args || [];
    var runner = require('child_process').spawn(cmd, args, {
        // keep color
        stdio: "inherit"
    });
    runner.on('close', function (code) {
        if (fn) {
            fn(code);
        }
    });
}
//生成一个项目构建
if (argv.cli) {
    var dest = path.resolve(process.cwd(), argv.cli)

    function init() {
        fse.copy('./cli', dest)
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

if (modules.length == 0 && !argv.file) {
    console.log("please write module name or file name")
    return;
}
//根据模块名字生成模块
for (var i = 0; i < modules.length; i++) {
    createModule(process.cwd(), modules[i])
}
//根据项目文件生成所有模块目录
if (argv.file) {
    createProject(argv.file)
}
