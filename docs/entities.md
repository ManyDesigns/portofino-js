# Entità di una CRUD Action

La CrudAction ritorna le entità wrappate in un oggetto di tipo `CrudActionEntity`. Oltre ai metodi di update e delete che sono stati documentati sotto i metodi della CrudAction la classe espone altri metodi di utilità.

:::tip
Possiamo accedere a tutti gli attributi dell'entità come se fossero attributi, per esempio `kitten.getValue('name')` è equivalente a `kitten.name`
:::

## getValue e getDisplayValue

Il metodo getValue ritorna il valore raw dell'attributo, mentre il metodo getDisplayValue il valore formattato da Portofino.

```ts
user.getValue('created_at');
// => Date Tue Dec 21 2021 11:36:54 GMT+0100 (CET)

user.getDisplayValue('created_at');
// => "2021-12-21 11:36:54"
```

Il metodo getValue ritorna `any`, mentre getDisplayValue ritorna sempre uno `string`

## toObject

Il metodo `toObject: () => Record<string, any>` ritorna un oggetto contenente i valori raw dell'entità.
Se la entity deriva da una search e non da una get i campi non presenti nel summary saranno `null`

## toString

Come il toObject, ma ritorna un oggetto JSON non formattato.
