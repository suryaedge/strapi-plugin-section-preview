'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: 'preview',
    plugin: 'sectionpreview',
    type: 'string',
  });
};
