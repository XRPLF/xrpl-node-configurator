const path = require('path')

module.exports = {
  publicPath: '',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_fonts.scss";
          @import "@/scss/_medias.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  },

  devServer: {
    disableHostCheck: true,
    watchOptions: {
      clientLogLevel: 'warning'
    }
  },

  chainWebpack: config => {
    // Add "node_modules" alias
    config.resolve.alias
      .set('node_modules', path.join(__dirname, './node_modules'))

    // Disable "prefetch" plugin since it's not properly working in some browsers
    config.plugins
      .delete('prefetch')

    config.module
      .rule('raw')
      .test(/\.txt$/i)
      .use('raw-loader')
      .loader('raw-loader')
      .end()

    config.plugin('copy')
      .tap(args => {
        args[0].push({
          from: path.resolve(__dirname, 'cfg/schema.json'),
          to: path.resolve(__dirname, 'dist/schema'),
          toType: 'dir'
        })
        return args
      })
    // Do not remove whitespaces
    config.module.rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.whitespace = 'preserve'
        return options
      })
  }
}
