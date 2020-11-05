import {Action} from "./internal";
import NooNoo from "../NooNoo";

export class RootAction extends Action {
  constructor(nooNoo: NooNoo, crudActionClasses: string[]) {
    super(nooNoo, '', crudActionClasses);
  }
}
