## veto

多页面vue模板, 支持自定义html模板、热加载、less编译、数据mock

#### 快速开始

```Bash
git clone https://github.com/hunnble/veto.git
cd ./veto
npm install
npm run dev
```
打开`http://localhost:8080/index`

#### 打包

```Bash
npm run build
```
会将/src/pages下各文件夹单独打包出`html` + `css` + `js`，图片会单独打包

#### 目录结构约定

* 入口js文件: `/src/pages/**/index.js`
* 配置项: `/src/pages/**/config.js 可定义template(html模板)及title(html标题)`
* 组件: `/src/pages/**/*.vue`
* 公用组件: `/src/components/*.vue`
* 样式及图片: `/src/assets/styles /src/assets/imgs`

#### 数据mock

```Bash
npm run mock
```
打开mock服务器，默认端口为3000，可在/mock/config.js中修改
在开发时对dev server下/api/*路由进行请求会成功获取mock数据，具体子路由及数据需要修改mock/db.json
mock服务器依赖于[json-server](https://github.com/typicode/json-server)
