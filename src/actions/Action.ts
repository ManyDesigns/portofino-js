import ActionTypes from '../ActionTypes';
import { CrudAction } from '.';
import NooNoo from '../NooNoo';

export class Action {
  public _isPortofinoAction = true;
  http: NooNoo;

  constructor(
    parentNooNoo: NooNoo,
    action: string,
    private crudActionClasses: string[] = []
  ) {
    this.http = parentNooNoo.create(action);
  }

  async getAction(name: string): Promise<Action> {
    console.debug(`[Portofino] Getting action '${name}'`);
    try {
      const { data } = await this.http.get(`${name}/:description`);

      if (
        ActionTypes.crudActionType === data.superclass ||
        this.crudActionClasses.includes(data.superclass)
      ) {
        return await CrudAction.getCrudAction(
          this.http,
          name,
          this.crudActionClasses
        );
      } else if (ActionTypes.customActionType === data.superclass) {
        return new Action(this.http, name, this.crudActionClasses);
      }
    } catch (e) {
      console.error('[Portofino]', e.message); //todo PortofinoError
      throw e;
    }

    throw new Error('Portofino returned an unknown action type!');
  }

  async getCrudAction(name: string): Promise<CrudAction> {
    return (await this.getAction(name)) as CrudAction;
  }
  changeBaseUrl(url: string) {
    this.http = this.http.reset(url);
  }

}
