```bash
��װȫ������
$ npm install -g  ���� ���� install.bat
new һ������Ŀ������Ϊbenny
$ coder --cli benny
�ڵ�ǰĿ¼����ģ����Ϊname1��name2��ģ��
$ coder name1 name2
��src/routes Ŀ¼���½���Ŀģ���ͼ�ĵ����� project.js
$ coder --file project.js
```


```javascript
//project.js

module.exports = {
    project: 'dcms',//��Ŀ��Ŀ¼��
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