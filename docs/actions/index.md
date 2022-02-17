# Actions

Esistono 3 tipi di action:

- **Action**: rappresenta una action generica, rappresenta una `CustomAction`
- **CrudAction**: estende Action
- **LoginAction**: questa action viene istanziata esclusivamente in `Portofino.auth`

## Ottenere una action

```ts
Portofino.getAction('my-action').then((action) => {});
```

Il payload della promise ritornata da getAction potrebbe essere di tipo `Action` o `CrudAction` in base al tipo della action sul backend.

## Operazioni su una Action

Data una action è possibile richiamare il metodo `getAction` sulla action stessa per ottenere una action annidata.

Possiamo anche accedere all'istanza di axios di quella action tramite l'attributo `http`. Questo attributo è di tipo `NooNoo`, un wrapper di axios che espone i metodi `get`, `post`, `put` e `delete` con gli stessi parametri del nostro amato client HTTP.

```ts
async function callCustomMethod() {
  const action = await Portofino.getAction('my-action');
  /* GET /api/my-action/thats-a-custom-method */
  return action.http.get('thats-a-custom-method');
}
```
::: warning 
I metodi con http sono equivalenti alla chiamata di axios, se vuoi ottenere un'entità devi usare il metodo get della action documentato sotto `Crud Actions > Read`.
Tieni presente che se devi ottenere dei dati dagli endpoint di portofino quasi sicuramente questa libreria ha un metodo che li mappa, la maggior parte sono documentati sotto crud-actions 
:::
