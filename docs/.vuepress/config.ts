import { defineUserConfig } from '@vuepress/cli';
import type { DefaultThemeOptions } from '@vuepress/theme-default';

export default defineUserConfig<DefaultThemeOptions>({
  title: 'Portofino JS',
  description: 'Portofino javascript API',
  lang: 'it-IT',
  base: '/portofino-js/',

  themeConfig: {
    repo: 'ManyDesigns/portofino-js',
    docsDir: 'docs',
    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Changelogs',
        link: 'https://github.com/manydesigns/portofino-js/releases',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/manydesigns/portofino-js',
      },
      {
        text: 'NPM',
        link: 'https://www.npmjs.com/package/@manydesigns/portofino',
      },
    ],

    sidebar: {
      '/': [
        {
          text: 'Introduzione',
          children: [
            { text: 'Perchè usare PortofinoJS?', link: '/' },
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'Configurazione', link: '/config' },
          ],
        },
        {
          text: 'Actions',
          children: [
            { text: 'Ottenere una action', link: '/actions/' },
            {
              text: 'Crud Actions',
              link: '/actions/crud-action/',
              children: [
                { text: 'Search', link: '/actions/crud-action/search' },
                { text: 'Create', link: '/actions/crud-action/create' },
                { text: 'Read', link: '/actions/crud-action/read' },
                { text: 'Update', link: '/actions/crud-action/update' },
                { text: 'Delete', link: '/actions/crud-action/delete' },
                {
                  text: 'Proprietà del modello',
                  link: '/actions/crud-action/properties',
                },
                {
                  text: 'Selection providers',
                  link: '/actions/crud-action/selection-providers',
                },
              ],
            },
            { text: 'Login Actions', link: '/actions/login-action' },
          ],
        },
        {
          text: 'Entities',
          link: '/entities',
        },
      ],
    },
  },
});
