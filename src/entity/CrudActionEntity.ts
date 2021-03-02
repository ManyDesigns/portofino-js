import {PortofinoEntityProperty} from "../actions/CrudAction";
import {convertJSTypeToValue, convertValueToJSType} from "../utils/EntityUtils";
import NooNoo from "../NooNoo";
import { AxiosRequestConfig } from "axios";

export default class CrudActionEntity {
  public readonly _isPortofinoEntity = true;
  public readonly key: string;
  private readonly _entityData: object;

  constructor(private _nooNoo: NooNoo, entity: any, private _properties: PortofinoEntityProperty[]) {
    this.key = entity.__rowKey || entity.id?.value;
    this._entityData = entity;
    Object.keys(entity)
        .filter(attr => attr !== '__rowKey')
        .forEach(attr => {
          Object.defineProperty(this, attr, {
            get: () => this.getValue(attr),
            set: () => console.warn('[Portofino] Cannot set value of a crud action entity'),
          });
        });
  }

  private getProperty(propName) {
    return this._entityData[propName];
  }

  getValue(propName: string): any {
    const propDef = this._properties.find(p => p.name == propName);
    const prop = this.getProperty(propName);
    if (prop)
      return convertValueToJSType(propDef.type, prop.value);
    return undefined;
  }

  getDisplayValue(propName: string): string {
    const prop = this.getProperty(propName);
    if (prop)
      return prop.displayValue?.toString() || prop.value?.toString();
    return null;
  }

  toObject(): object {
    const obj = {};
    obj['key'] = this.key;
    //todo vedere se deriva da un summary o da get
    this._properties.forEach(p => {
      if (p.enabled)
        obj[p.name] = this.getValue(p.name);
    });
    return obj;
  }

  /** Rest operations **/
  async delete(requestOptions?: AxiosRequestConfig) {
    await this._nooNoo.delete(this.key, requestOptions)
  }

  async update(data: object, requestOptions?: AxiosRequestConfig) {
    const pData = {...data};

    this._properties.forEach(p => {
      if (data[p.name] !== undefined)
        pData[p.name] = convertJSTypeToValue(p.type, data[p.name])
    });


    const {data: entity} = await this._nooNoo.put(this.key.toString(), pData, requestOptions)
    return new CrudActionEntity(this._nooNoo, entity, this._properties);
  }
}
