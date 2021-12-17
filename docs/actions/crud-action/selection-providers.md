# Selection provider

```ts
interface PortofinoSelectionProvider {
  searchDisplayMode: string;
  fieldNames: string[];
  name: string;
  displayMode: string;
  getOptions: () => Promise<SelectionProviderOption[]>;
}
```

```ts
selectionProviders: PortofinoSelectionProvider[]

getSelectionProvider(name: string): PortofinoSelectionProvider

getSelectionProviderByPropertyName(fieldName: string): PortofinoSelectionProvider
```
