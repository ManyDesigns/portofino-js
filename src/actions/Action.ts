import ActionTypes from "./ActionTypes";
import {CrudAction} from './internal'
import NooNoo from "../NooNoo";

export class Action {
  public _isPortofinoAction = true;
  readonly http: NooNoo;

  constructor(parentNooNoo: NooNoo, action: string) {
    this.http = parentNooNoo.create(action)
  }

  async getAction(name) {
    console.debug(`[Portofino] Getting action '${name}'`);
    try {
      const {data} = await this.http.get(`${name}/:description`);
      switch (data.superclass) {
        //todo TAPULLO Trovare modo generale
        case "com.manydesigns.mdhr.crud.LogCrudAction":
        case ActionTypes.crudActionType:
        case 'com.manydesigns.mdhr.crud.LogCrudAction':
          return CrudAction.getCrudAction(this.http, name);
        case ActionTypes.customActionType:
          return new Action(this.http, name);
      }
    } catch (e) {
      console.error(e.message); //todo PortofinoError
      throw e;
    }

    throw new Error("Portofino returned an unknown action type!");
  }
}
