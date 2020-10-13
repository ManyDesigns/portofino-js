# Crud actions
## Get action entities
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
## Get entity by id
``` JavaScript {3}
async function getDoggo(doggoId) {
  const doggoAction = await Portofino.getAction('doggo');
  return await doggoAction.get(doggoId);
}
```
## Delete an entity
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