# Operazioni CRUD

::: tip
In tutti i metodi CRUD consentono di passare, come ultimo parametro, un oggetto `AxiosConfig` per modificare il comportamento della chiamata.
:::

## Lista delle entità
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

## Ottenere una entità dal suo id
Questa chiamata ritorna una [CrudActionEntity](./entities) che rappresenta i dati della action e alcune operazioni su 
``` JavaScript
const entity = await action.get(entityID);
```

## Eliminazione di una entità
``` JavaScript 
doggoAction.delete(entityID);
```

## Creazione di una entità
``` JavaScript {6}
const user = {
  email: 'user@manydesigns.com',
  username: 'John'
};

const user = await userAction(user);
```