#!/usr/bin/env node
/**
 * Created by lilei on 2017/2/23.
 */
var createModule = require('./lib/createModule')
var createProject = require('./lib/createProject')
var argv = require('yargs').argv;
var modules = argv._;
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
