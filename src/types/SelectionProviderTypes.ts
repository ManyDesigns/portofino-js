export enum SelectMode {
  Dropdown = 'DROPDOWN',
  Radio = 'RADIO',
  Autocomplete = 'AUTOCOMPLETE',
}

export enum SearchSelectMode {
  Dropdown = 'DROPDOWN',
  Radio = 'RADIO',
  Autocomplete = 'AUTOCOMPLETE',
  MultipleSelect = 'MULTIPLESELECT',
  Checkbox = 'CHECKBOX',
}

export interface SelectionProviderOption {
  v: string;
  l: string;
  s: boolean;
}
