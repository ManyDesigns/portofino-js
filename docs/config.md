# Portofino connect

TL;DR: Ecco la definizione dell'intefaccia typescript.
``` ts
interface PortofinoConfig {
  url?: string;
  axiosInstance?: AxiosInstance;

  enableAuth?: boolean,
  authAction?: string;

  crudActionClasses?: string[];
}
```

## url

- Type: `string`
- Default: `/api`

L'url su cui il frontend proverà a contattare il backend. Se il frontend non gira sull'istanza di portofino allora dovrai specificare l'indirizzo su sui sono esposte le API.

```js
Portofino.connect({
    url: 'http://awesome.manydesigns.com/api',
});
```

## axiosInstance

- Type: `AxiosInstance`
- Default: `undefined`

L'attributo `axiosInstance` sostituisce l'istanza di axios usata da Portofino JS. 
Di base ne viene creata una nuova, ma se non si utilizza un sistema di autenticazione esterno, come con nuxt, è possibile utilizzare un'istanza custom.

```js
// ES: Plugin per nuxt js
import Portofino from "@manydesigns/portofino";
export default function (context) {
  Portofino.connect({
    axiosInstance: context.$axios
  });
}
```

## enableAuth

- Type: `boolean`
- Default: `true`

Qualora si utilizzasse un servizio di autenticazione diverso da quello offerto di default da Portofino è possibile disabilitare il servizio di autenticazione impostando `enableAuth` a `false`.

```js
Portofino.connect({
  ...
  enableAuth: false,
});
```

## authAction

- Type: `string`
- Default: `login`

Di default la `LoginAction` si trova sotto la action `login`, se non fosse così con questo parametro si puo specificare un'altra action.

```js
Portofino.connect({
  ...
  authAction: 'auth',
});
```

## crudActionClasses

- Type: `string[]`
- Default: `[]`

Portofino non consente di riconoscere una CrudAction se questa è stata estesa da una classe di utilità.
Per ovviare a questo problema, è possibile passare la lista delle nostre classi di utils che estendono la CrudAction di Portofino.

```js
Portofino.connect({
  ...
  crudActionClasses: [
    "com.manydesigns.crud.LogCrudAction"
  ],
});
```