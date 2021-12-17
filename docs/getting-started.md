# Getting started

Aggiungi la dipendenza

```sh
npm i --save @manydesigns/portofino
```

Copia le importazioni di connessione nell'entrypoint JS

```ts
import Portofino from '@manydesigns/portofino';
Portofino.connect({
  url: 'http://localhost:8080/api', //Optional, default: '/api'
});
```

Fatto, tutto qui!
