import { Action } from '.';
import NooNoo from '../NooNoo';

export class RootAction extends Action {
  constructor(nooNoo: NooNoo, crudActionClasses: string[] | undefined) {
    super(nooNoo, '', crudActionClasses);
  }

  changeBaseUrl(url: string) {
    this.http = this.http.reset(url);
  }
}
