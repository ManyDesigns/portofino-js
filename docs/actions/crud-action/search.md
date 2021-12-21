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

Al momento i filtri avanzati che possiamo utilizzare sono:

- **su un elenco di valori**: Se passiamo una lista, se il valore della proprietà della nostra entità è inclusa nella lista, allora viene accettata.

- **range di valori**: se passiamo un oggetto con attributi `min` e `max` allora verranno restituite solo le entità il cui attributo rientra in quell’intervallo di valori.

Altre tipologie di filtri più avanzate verranno aggiunte nei prossimi rilasci.

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
