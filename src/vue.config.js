module.exports = {
  module: {
    rules: [

      // это правило будет применяться к обычным файлам `.scss`
      // А ТАКЖЕ к секциям `<style lang="scss">` в файлах `.vue`
/*      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, */

      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              // sass-loader >= 8
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      }
    ]
  },
  // плагин опущен
}