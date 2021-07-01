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

```JavaScript
getAttributes(): EntityProperty[] {
  return this._properties;
}

getAttribute(name: string): EntityProperty {
  return this._properties.find(p => p.name === name);
}

getSummaryAttributes(): EntityProperty[] {
  return this.getAttributes().filter(a => a.inSummary);
}

getInsertableAttributes(): EntityProperty[] {
  return this.getAttributes().filter(a => a.insertable);
}

getUpdatableAttributes(): EntityProperty[] {
  return this.getAttributes().filter(a => a.updatable);
}
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

```Javascript
getSelectionProviders(): PortofinoSelectionProvider[] {
  return this._selectionProviders;
}

getSelectionProvider(name: string): PortofinoSelectionProvider {
  return this.getSelectionProviders().find(sp => sp.name === name);
}

getSelectionProviderDefinitionByFieldName(fieldName: string) {
  return this.getSelectionProviders()
    .find(sp => sp.fieldNames.includes(fieldName));
}
```
