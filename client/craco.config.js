const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1e212d",
              "@info-color": "#67D192",
              "@success-color": "#2D9D6A",
              "@processing-color": "#9ED5E0",
              //'@error-color': '@red-5',
              //'@highlight-color': '@red-5',
              //'@warning-color': '@gold-6',
              "@normal-color": "#d9d9d9",
              "@white": "#fff",
              "@black": "#000",
              "@body-background": "#EEEFE4",
              "@font-family": `'Montserrat', 'Merriweather', BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
