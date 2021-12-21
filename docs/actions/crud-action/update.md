# Aggiornamento di una entità

È possbile modificare un'entità tramite la sua action

```ts {5}
const user = {
  username: 'Jonny',
};

const user = await action.update(entityID, user);
```

oppure dall'entità stessa

```ts
entity.update(user);
```

Le due chiamate sono equivalenti, entrambe ritornano l'entità eliminata e accettano come ultimo parametro un oggetto di tipo `AxiosRequestConfig` per poter personalizzare la chiamata a portofino.
