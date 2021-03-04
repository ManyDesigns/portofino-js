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
        link: 'https://github.com/manydesigns/portofino-js/releases'
      }, {
        text: 'GitHub',
        link: 'https://github.com/manydesigns/portofino-js'
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
          ]
        },
        {
          text: 'Actions',
          children: [
            { text: 'Ottenere una action', link: '/actions/' },
            {
              text: 'Crud Actions',
              link: '/actions/crud-action/',
              children: [
                { text: 'Operazioni CRUD', link: '/actions/crud-action/crud' },
                // { text: 'Entità CRUD', link: '/actions/crud-action/entities' },
                // { text: 'Metodi di utilità', link: '/actions/crud-action/crud-utilities' },
              ]
            },
            { text: 'Login Actions', link: '/actions/login-action' },
          ]
        },
      ]
    }
  }
}