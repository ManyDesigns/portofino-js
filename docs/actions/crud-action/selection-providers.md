# Selection provider

```TypeScript
interface PortofinoSelectionProvider {
    searchDisplayMode: string;
    fieldNames: string[];
    name: string;
    displayMode: string;
    getOptions: () => Promise<SelectionProviderOption[]>
}
```

```TypeScript
selectionProviders: PortofinoSelectionProvider[]

getSelectionProvider(name: string): PortofinoSelectionProvider

getSelectionProviderByPropertyName(fieldName: string): PortofinoSelectionProvider
```
