// const isProd = process.env.NODE_ENV === "production";

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Prepends/Appends Sass/SCSS code before the actual entry file.
        additionalData: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `
      }
    }
  }
};
