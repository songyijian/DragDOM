# DragDOM
兼容手机触控屏的DOM元素拖拽


目录结构简介
```
data-struct-js：本项目根目录
examples：存放本项目的示例用文件
lib：存放编译结果（鉴于浏览器兼容性，ES6标准的JavaScript编译为ES5）
src：开发目录
.babelrc：babel的配置文件（使用webpack的话也可以写在 webpack.config 中）
.gitignore：git 配置文件，配置忽略版本管理的对象
.npmignore：npm配置文件，配置发布到 npm 时的忽略对象
index.js：统一导出的出口文件
LICENSE：版权信息文件，在新建仓库时根据选择自动生成
package.json：项目管理文件，项目初始化时自动生成
README.md：项目说明文件，可在新建仓库时生成该文件，根据项目内容自行编辑
另外，如果使用 webpack 的话，还要有一个 webpack.config 的配置文件
```