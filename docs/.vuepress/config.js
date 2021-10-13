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
                { title: 'Operazioni CRUD', path: '/actions/crud-action/crud' },
                // { title: 'Entità CRUD', path: '/actions/crud-action/entities' },
                // { title: 'Metodi di utilità', path: '/actions/crud-action/crud-utilities' },
              ],
            },
            { title: 'Login Actions', path: '/actions/login-action' },
          ],
        },
      ],
    },
  },
};
