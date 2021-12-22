# Lista delle entità

Il metodo per ottenere l'elenco delle entità è paginato di default e se non vengono specificate opzioni di default ritorna la prima pagina.

```ts
async function getKittens() {
  const kittenAction = await Portofino.getAction('kitten');
  return await kittenAction.search();
}
```

## Paginazione

È possibile sfruttare la paginazione di Portofino grazie a tre parametri che possiamo passare nell’oggetto di configurazione della chiamata search.

- `pagination` (boolean) il valore di default è true, se impostato a false non passa il parametro maxResult a Portofino, di conseguenza disabilita la paginazione
- `page` (number) il valore di default è 0, serve per indicare la pagina che vogliamo ottenere
- `pageSize` (number) il valore di default è 10, indica il numero di elementi ritornati per ogni pagina

```ts {4-5}
async function getKittens() {
  const kittenAction = await Portofino.getAction('kitten');
  return await kittenAction.search({
    page: pagination.current,
    pageSize: pagination.pageSize,
  });
}
```

::: warning
Per disattivare la paginazione assicurati che nel `configuration.xml` non sia presente l'opzione `rowsPerPage`
:::

## Ordinamento

Il parametro `sort` ci consente di impostare il parametro e la direzione di ordinamento delle entità ritornate dalla search, il parametro deve contenere un oggetto con due attributi:

- **property**: Una stringa rappresentante il nome della proprietà che vogliamo ordinare.
- **direction**: Una stringa che può assumere i valori `asc` per ordinare in maniera ascendente e `desc` per ordinare in maniera discendente.

```ts
async function getKittens() {
  const kittenAction = await Portofino.getAction(‘kitten’);
  return await kittenAction.search({
      sort: {
        property: 'name',
        direction: 'asc',
      },
    });
}
```

## Filtro

Infine possiamo filtrare il nostro elenco di entità grazie al parametro `filters`. Questo parametro si aspetta una mappa dove la chiave è il nome del parametro che vogliamo filtrare e il valore può essere una stringa, se vogliamo trovare i valori uguali a quello inserito oppure un oggetto se vogliamo dei filtri più avanzati.

### Stringhe

È possibile filtrare le stringhe anche per occorrenza passando un oggetto che indica la modalità di ricerca e il valore da ricercare.
Le opzioni disponibili per la modalità di ricerca sono: `equals`, `starts` e `ends`. Se il campo non viene indicato o è nullo allora sarà applicato un filtro di tipo `contains`

```ts
const filters = {
  name: {
    mode: 'starts',
    value: 'Mario',
  },
};
```

### Lista di valori

Se passiamo una lista, Portofino ritornerà il valore della proprietà della nostra entità è inclusa nella lista, allora viene accettata.

```ts
const filters = {
  roles: ['admin', 'administrator'],
};
```

### min & max

Se passiamo un oggetto con attributi `min` e `max` allora verranno restituite solo le entità il cui attributo rientra in quell’intervallo di valori.
È possibile utilizzare anche solo uno dei due parametri.

```ts
const filters = {
  created_at: {
    min: '2021-12-20',
    max: '2021-12-22
  },
};
```

### Esempio

```ts
import { endOfMonth, startOfMonth} from 'date-fns';

async function getOfficeAccesses() {
  const action = await Portofino.getAction('accesses');
  action.search({
    pagination: false,
    filters: {
      user_id: this.$auth.user.id,
      access_date: {
        min: startOfMonth(this.date),
        max: endOfMonth(this.date),
      },
    },
  }),
}
```
