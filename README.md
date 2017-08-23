```bash
安装全局命令
$ npm install -g  或者 运行 install.bat
new 一个新项目，名称为benny
$ coder --cli benny
在src/routes 目录下新建项目模块地图文档例如 project.js
$ coder --file project.js
在当前目录生成模块名为name1和name2的模块
$ coder name1 name2
为当前目录下的action和reducers添加 HOME_LIST_GET 方法
$ coder --action HOME_LIST_GET 
```


```javascript
//project.js

module.exports = {
    project: 'dcms',//项目根目录名
    server: {
        children: {
            module1: {},
            module2: {}
        }
    },
    server2: {
        children: {
            module1: {},
            module2: {},
        }
    }
}
```