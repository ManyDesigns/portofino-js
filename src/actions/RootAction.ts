import { Action } from '.';
import NooNoo from '../NooNoo';

export class RootAction extends Action {
  constructor(nooNoo: NooNoo, crudActionClasses: string[] | undefined) {
    super(nooNoo, '', crudActionClasses);
  }
}
