# Attributi

Un'altra funzionalità distintiva di portofino è la gestione quasi automatica degli attributi delle entità.
Per poter sfruttare questa caratteristica la CrudAction espone alcuni metodi per poter ottenere i dati che Portofino ci espone, i nomi sono autoesplicativi.

```ts
properties: EntityProperty[]

getProperties(name: string): EntityProperty

getSummaryProperties(): EntityProperty[]

getInsertableProperties(): EntityProperty[]

getUpdatableProperties(): EntityProperty[]
```

```ts
interface EntityProperty {
  name: string;
  label: string;
  type: Type;
  enabled: boolean;
  insertable: boolean;
  updatable: boolean;
  inSummary: boolean;
  searchable: boolean;
  annotations: string[];
}
```
