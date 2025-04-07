# 高校论文管理系统（前端）

![Static Badge](https://img.shields.io/badge/Vue2-4FC08D?logo=vuedotjs)

![Nodejs](https://img.shields.io/badge/Nodejs-12.22.12-5FA04E?logo=nodedotjs&link=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv12.22.12)

## 部署
### 依赖
Nodejs: [12.22.12](https://nodejs.org/en/blog/release/v12.22.12) 左右
[Vue.js](https://cn.vuejs.org/guide/introduction) (Vue2)

### 更改
更改后端URL：更改[main.js](./src/main.js)中的`axios.defaults.baseURL`的值。
更改请求超时时间：更改[main.js](./src/main.js)中的`axios.defaults.timeout`的值，单位是毫秒。

## 项目设置
```
npm install
```

### 编译并热重载以进行开发
```
npm run serve
```

### 编译并压缩以用于生产环境
```
npm run build
```
