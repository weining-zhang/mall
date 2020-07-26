module.exports = {
  configureWebpack: {
    resolve: {
      alias: { //CLI3中，@默认代表src文件夹
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}