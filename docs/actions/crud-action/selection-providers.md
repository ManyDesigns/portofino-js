# Selection provider

Una funzionalità molto potente di Portofino sono i selection provider, con il passaggio alla versione 5 è diventato più complicato interagirci.
La CrudAction consente di ottenerli con semplicità tramite questi metodi:

```ts
selectionProviders: PortofinoSelectionProvider[]

// Ottiene il selection provider tramite il nome della fk
getSelectionProvider(name: string): PortofinoSelectionProvider

// Ottiene il selection provider tramite il nome dell'attributo su cui è la ralazione
getSelectionProviderByPropertyName(fieldName: string): PortofinoSelectionProvider
```

Una volta ottenuto il selection provider abbiamo a disposizione la sua configurazione e con il metodo `getOptions` possiamo ottenere le opzioni del nostro selection provider.

```ts {6}
interface PortofinoSelectionProvider {
  searchDisplayMode: string;
  fieldNames: string[];
  name: string;
  displayMode: string;
  getOptions: () => Promise<SelectionProviderOption[]>;
}
```

Il metodo `getOptions` è un metodo asincrono che ritorna un array di oggetti `{ v, l }`, per esempio in react si può useare come in questo esempio.

```tsx
function CostTypeSelect({ action }) {
  const [costTypes, setCostTypes] = useState<SelectionProviderOption[]>([]);
  useEffect(() => {
    const selectionProvider =
      action.getSelectionProviderByPropertyName('cost-type_id');
    selectionProvider.getOptions().then((options) => {
      setCostTypes(options);
    });
  }, []);

  return (
    <select>
      {costTypes.map((ct) => (
        <option value={ct.v}>{ct.l}</option>
      ))}
    </select>
  );
}
```
