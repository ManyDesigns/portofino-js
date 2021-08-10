import NooNoo from '../../NooNoo';
import {
  SelectMode,
  SearchSelectMode,
  SelectionProviderOption,
} from '../../types/SelectionProviderTypes';

export default class SelectionProvider {
  readonly #http: NooNoo;

  public name: string;
  public fieldNames: string[];
  public selectMode: SelectMode;
  public searchSelectMode: SearchSelectMode;

  constructor(
    http: NooNoo,
    name: string,
    fieldNames: string[],
    selectMode: SelectMode,
    searchSelectMode: SearchSelectMode
  ) {
    this.#http = http;
    this.name = name;
    this.fieldNames = fieldNames;
    this.selectMode = selectMode;
    this.searchSelectMode = searchSelectMode;
  }

  /**
   * @deprecated use selectMode
   */
  get displayMode() {
    return this.selectMode;
  }

  /**
   * @deprecated use searchSelectMode
   */
  get searchDisplayMode() {
    return this.searchSelectMode;
  }

  async getOptions(): Promise<SelectionProviderOption[]> {
    const { data } = await this.#http.get(`:selectionProvider/${this.name}`);
    return data;
  }
}
