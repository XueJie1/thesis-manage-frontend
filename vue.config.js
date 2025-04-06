const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/thesis': {  // 匹配所有以/thesis开头的请求
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
        pathRewrite: {
          '^/thesis': '/thesis'  // 保留原路径前缀
        }
      }
    }
  }
})
