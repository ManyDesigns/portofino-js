# Ottenere una entità dal suo id

È possbile eliminare un'entità tramite la sua action

```ts
const entity = await action.delete(entityID);
```

oppure dall'entità stessa

```ts
entity.delete();
```

Le due chiamate sono equivalenti, entrambe ritornano l'entità eliminata e accettano come ultimo parametro un oggetto di tipo `AxiosRequestConfig` per poter personalizzare la chiamata a portofino.
