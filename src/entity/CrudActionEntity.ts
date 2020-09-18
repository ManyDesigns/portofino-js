import {PortofinoEntityProperty} from "../actions/CrudAction";
import {convertValueToType} from "../utils/EntityUtils";
import NooNoo from "../NooNoo";
import Type from "./TypeEnum";
import {isDate} from 'date-fns';

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
      return convertValueToType(propDef.type, prop.value);
    return null;
  }

  getDisplayValue(propName: string): string {
    const prop = this.getProperty(propName);
    if (prop)
      return prop.displayValue?.toString() || prop.value?.toString();
    return null;
  }

  toObject(): object {
    const obj = {};
    this._properties.forEach(p => {
      if (p.enabled)
        obj[p.name] = this.getValue(p.name);
    });
    return obj;
  }

  /** Rest operations **/
  async delete() {
    await this._nooNoo.delete(this.key)
  }

  async update(data: object) {
    const pData = {};

    //TODO Put into a util file
    function jsToPortofino(type, val) {
      switch (type) {
        case Type.Timestamp:
          if (!val) return null;
          const date = isDate(val) ? val : new Date(val);
          return date.getTime();
        case Type.String:
          if (val === Object)
            return JSON.stringify(val);
          return val;
        default:
          return val;
      }
    }

    this._properties.forEach(p => {
      if (data[p.name])
        pData[p.name] = {
          value: jsToPortofino(p.type, data[p.name])
        };
    });


    const {data: entity} = await this._nooNoo.put(this.key.toString(), pData)
    return new CrudActionEntity(this._nooNoo, entity, this._properties);
  }
}
