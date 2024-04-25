import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import getTrad from './utils/getTrad';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    app.customFields.register({
      name: "preview",
      pluginId: "sectionpreview",
      type: "string",
      intlLabel: {
        id: getTrad("sectionpreview.preview.label"),
        defaultMessage: "Section Preview",
      },
      intlDescription: {
        id: getTrad("sectionpreview.preview.description"),
        defaultMessage: "Enter Field Name",
      },
      components: {
        Input: async () => import("./components/preview"),
      },
      options: {
        // declare options here
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: 'options.url',//name of an related field
                type: 'text',//input type
                intlLabel: {
                  id: getTrad('url.text'),
                  defaultMessage: 'Enter Image URL',//label for the URL field
                },
                description: {
                  id: getTrad('url.description'),
                  defaultMessage:
                    'Enter the image URL.',//description for field
                },
                placeholder: {
                  id: getTrad('url.placeholder'),
                  defaultMessage: 'Image URL',
                },
              },
              {
                name: 'options.componentname',//name of an related field
                type: 'text',//input type
                intlLabel: {
                  id: getTrad('componentname.text'),
                  defaultMessage: 'Enter Component Name',//label for the URL field
                },
                description: {
                  id: getTrad('componentname.description'),
                  defaultMessage:
                    'Enter Component Name',//description for field
                },
                placeholder: {
                  id: getTrad('componentname.placeholder'),
                  defaultMessage: 'Component Name',
                },
              },
              {
                name: 'options.contenttypegeturl',//name of an related field
                type: 'text',//input type
                intlLabel: {
                  id: getTrad('contenttypegeturl.text'),
                  defaultMessage: 'Enter page get API',//label for the URL field
                },
                description: {
                  id: getTrad('contenttypegeturl.description'),
                  defaultMessage:
                    'Enter page get API',//description for field
                },
                placeholder: {
                  id: getTrad('contenttypegeturl.placeholder'),
                  defaultMessage: 'put everything after api/',
                },
              },
            ],
          },
        ],


      },
    });



  },

  bootstrap(app) {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
