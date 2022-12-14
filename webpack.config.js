require("dotenv").config();

const webpackOptions = {
  mode: process.env.MODE,
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

module.exports = { webpackOptions };
