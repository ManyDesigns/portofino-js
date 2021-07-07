import {
  convertJSTypeToValue,
  convertValueToJSType,
} from "../utils/EntityUtils";
import { AxiosRequestConfig } from "axios";
import { CrudAction } from "../actions/internal";

export default class CrudActionEntity {
  public readonly _isPortofinoEntity = true;
  public readonly key: string;
  readonly #action: CrudAction
  readonly #entityData: object;

  constructor(
    action: CrudAction,
    entity: any,
  ) {
    this.key = entity.__rowKey || entity.id?.value;
    this.#action = action;
    this.#entityData = entity;
    Object.keys(entity)
      .filter((attr) => attr !== "__rowKey")
      .forEach((attr) => {
        Object.defineProperty(this, attr, {
          get: () => this.getValue(attr),
          set: () =>
            console.warn(
              "[Portofino] Cannot set value of a crud action entity"
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
    obj["key"] = this.key;
    //todo vedere se deriva da un summary o da get
    this.#action.properties.forEach((p) => {
      if (p.enabled) obj[p.name] = this.getValue(p.name);
    });
    return obj;
  }

  /** Rest operations **/
  async delete(requestOptions?: AxiosRequestConfig) {
    await this.#action.delete(this.key, requestOptions);
  }

  async update(data: object, requestOptions?: AxiosRequestConfig) {
    //TODO
    // return this.#action.update(this.key, data, requestOptions)
    const pData = { ...data };

    this.#action.properties.forEach((p) => {
      if (data[p.name] !== undefined)
        pData[p.name] = convertJSTypeToValue(p.type, data[p.name]);
    });

    const { data: entity } = await this.#action.http.put(
      this.key.toString(),
      pData,
      requestOptions
    );
    return new CrudActionEntity(this.#action, entity);
  }
}
