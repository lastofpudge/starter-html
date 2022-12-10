const browserSync = require("browser-sync");

const browsersyncfn = () => {
  browserSync.init({
    server: {
      baseDir: "dist/",
    },
    ghostMode: { clicks: false },
    notify: false,
    online: true,
    // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
  });
};

module.exports = { browsersyncfn };
