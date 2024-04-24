'use strict';

module.exports = ({ strapi }) => ({

  index(ctx) {
    ctx.body = strapi
      .plugin('sectionpreview')
      .service('myService')
      .getWelcomeMessage();
  },
});
