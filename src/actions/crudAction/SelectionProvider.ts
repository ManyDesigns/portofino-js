import NooNoo from "../../NooNoo";

export default class SelectionProvider {
  constructor(
    private http: NooNoo,
    public searchDisplayMode: string,
    public fieldNames: string[],
    public name: string,
    public displayMode: string
  ) {}

  async getOptions() {
    const { data } = await this.http.get(`:selectionProvider/${this.name}`);
    return data;
  }
}
