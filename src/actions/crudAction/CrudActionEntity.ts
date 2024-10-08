import { convertValueToJSType } from '../../lib/entityPropertyConverters';
import { AxiosRequestConfig } from 'axios';
import { CrudAction } from '..';

export default class CrudActionEntity {
  public readonly _isPortofinoEntity = true;
  public readonly key: string;
  readonly #action: CrudAction;
  readonly #entityData: object;

  readonly #prettyName : string|undefined;


  constructor(action: CrudAction, entity: any, prettyName:string|undefined = undefined) {
    this.key = entity.__rowKey || entity.id?.value;
    this.#action = action;
    this.#entityData = entity;
    this.#prettyName = prettyName;
    Object.keys(entity)
      .filter((attr) => attr !== '__rowKey')
      .forEach((attr) => {
        Object.defineProperty(this, attr, {
          get: () => this.getValue(attr),
          set: () =>
            console.warn(
              '[Portofino] Cannot set value of a crud action entity'
            ),
        });
      });
  }

  private getProperty(propName: string) {
    return this.#entityData[propName];
  }

  getValue(propName: string): any {
    const propDef = this.#action.properties.find((p) => p.name == propName);
    const prop = this.getProperty(propName);
    if (!propDef) return prop;
    if (prop) return convertValueToJSType(propDef.type, prop.value);
    return undefined;
  }

  getDisplayValue(propName: string): string {
    const prop = this.getProperty(propName);
    if (prop) return prop.displayValue?.toString() || prop.value?.toString();
    return null;
  }

  toObject(): object {
    const obj = {};
    obj['key'] = this.key;
    obj['portofinoPrettyName'] = this.getPrettyName();
    //todo vedere se deriva da un summary o da get
    this.#action.properties.forEach((p) => {
      if (p.enabled) obj[p.name] = this.getValue(p.name);
    });
    return obj;
  }

  toString(): string {
    return JSON.stringify(this.toObject());
  }

  /** Rest operations **/
  async delete(requestOptions?: AxiosRequestConfig) {
    await this.#action.delete(this.key, requestOptions);
  }

  async update(data: object, requestOptions?: AxiosRequestConfig) {
    return await this.#action.update(this.key, data, requestOptions);
  }

  getPrettyName() :string{
    return this.#prettyName;
  }
}
