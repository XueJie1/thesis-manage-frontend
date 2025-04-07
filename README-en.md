# University Thesis Management System (Frontend)

![Static Badge](https://img.shields.io/badge/Vue2-4FC08D?logo=vuedotjs)

![Nodejs](https://img.shields.io/badge/Nodejs-12.22.12-5FA04E?logo=nodedotjs&link=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv12.22.12)

## Deployment
### Dependencies
Nodejs: Around [12.22.12](https://nodejs.org/en/blog/release/v12.22.12)
[Vue.js](https://vuejs.org/guide/introduction) (Vue2)

### Modifications
Change backend URL: Modify the value of `axios.defaults.baseURL` in [main.js](./src/main.js).
Change request timeout: Modify the value of `axios.defaults.timeout` in [main.js](./src/main.js), the unit is milliseconds.

## Project Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
