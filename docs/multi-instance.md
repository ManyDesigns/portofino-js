# Gestione di più istanze di Portofino
A partire dalla versione 1.14.0, Portofino JS consente di connettersi a più istanze di Portofino contemporaneamente.

## Connessione a una istanza

Per avere più istanze di Portofino JS bisogna valorizzare il campo `name` all'interno della connect;
se non valorizzato verrà creata un istanza chiamata `default`
```ts
var instance1 = await Portofino.connect({
    name: 'instance1',
    url: 'http://localhost:8080/api',
});
```

Il metodo `connect` fornirà la nuova istanza pronta per essere usata come sempre!
```ts
var action = await instance1.getCrudAction('tickets')
```

## Recupero di una istanza

Nel caso è possibile recuperare l'istanza
```ts
var instance1 = Portofino.getInstance('instance1');
```
