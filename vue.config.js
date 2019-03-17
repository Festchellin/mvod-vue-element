module.exports = {
    devServer: {
        open: process.platform === 'win32',
        port: 8899,
        proxy: {
            "/": {
                target: 'http://localhost:8888',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    }
}
