# Portofino JS
Run this
``` bash
npm i --save @manydesigns/portofino
```
Put that in the main js file
``` JavaScript
import Portofino from '@manydesigns/portofino';

Portofino.connect({
    url: 'http://localhost:8080/api', //Optional, default: '/api'
});
```
Done, now it should work 😁

## Get an action
``` JavaScript
Portofino.getAction('action-name').then(action => {
  //
});
```

### Get action entities
Il metodo per ottenere l'elenco delle entità è paginato di default e se non vengono specificate opzioni di default ritorna la prima pagina.
``` JavaScript
async function getKittens() {
  const kittenAction = await Portofino.getAction('kitten');
  return await kittenAction.search();
}
```

È possibile specificare la pagina in questo modo.
``` JavaScript {4-5}
async function getKittens() {
  const kittenAction = await Portofino.getAction('kitten');
  return await kittenAction.search({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
}
```

### Get entity by id
``` JavaScript {3}
async function getDoggo(doggoId) {
  const doggoAction = await Portofino.getAction('doggo');
  return await doggoAction.get(doggoId);
}
```

### Delete an entity
``` JavaScript {3}
async function getDoggo(doggoId) {
  const doggoAction = await Portofino.getAction('doggo');
  await doggoAction.delete(doggoId);
}
```

### Create an entity
``` JavaScript {3}
/** WIP **/
```

### Update an entity
``` JavaScript {3}
/** WIP **/
```
