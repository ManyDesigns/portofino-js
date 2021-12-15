module.exports = {
  title: 'Portofino JS',
  description: 'Portofino javascript API',
  lang: 'it-IT',
  base: '/portofino-js/',

  themeConfig: {
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
          title: 'Introduzione',
          children: [
            { title: 'Perchè usare PortofinoJS?', path: '/' },
            { title: 'Getting Started', path: '/getting-started' },
            { title: 'Configurazione', path: '/config' },
          ],
        },
        {
          title: 'Actions',
          children: [
            { title: 'Ottenere una action', path: '/actions/' },
            {
              title: 'Crud Actions',
              path: '/actions/crud-action/',
              children: [
                { title: 'Search', path: '/actions/crud-action/search' },
                { title: 'Create', path: '/actions/crud-action/create' },
                { title: 'Read', path: '/actions/crud-action/read' },
                { title: 'Update', path: '/actions/crud-action/update' },
                { title: 'Delete', path: '/actions/crud-action/delete' },
                {
                  title: 'Proprietà del modello',
                  path: '/actions/crud-action/properties',
                },
                {
                  title: 'Selection providers',
                  path: '/actions/crud-action/selection-providers',
                },
              ],
            },
            { title: 'Login Actions', path: '/actions/login-action' },
          ],
        },
        {
          title: 'Entities',
          path: '/entities',
        },
      ],
    },
  },
};
