# Metodi di utilità

## Attributi

```TypeScript
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

```TypeScript
properties: EntityProperty[]

getProperties(name: string): EntityProperty

getSummaryProperties(): EntityProperty[]

getInsertableProperties(): EntityProperty[]

getUpdatableProperties(): EntityProperty[]
```

## Selection provider

```TypeScript
interface PortofinoSelectionProvider {
    searchDisplayMode: string;
    fieldNames: string[];
    name: string;
    displayMode: string;
}

async getOptions();
```

```TypeScript
selectionProviders: PortofinoSelectionProvider[]

getSelectionProvider(name: string): PortofinoSelectionProvider

getSelectionProviderByPropertyName(fieldName: string): PortofinoSelectionProvider
```
