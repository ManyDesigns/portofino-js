import { Action } from './internal';
import Type from "../entity/TypeEnum";
import CrudActionEntity from "../entity/CrudActionEntity";
import { makeSearchObj, makeSortObj, mapClassAccessorToPropertiesDefinition } from "../utils/crudActionDataMapper";
import NooNoo from "../NooNoo";
import PortofinoSelectionProvider from "./crudAction/SelectionProvider";
import SelectionProvider from "./crudAction/SelectionProvider";
import { convertJSTypeToValue } from "../utils/EntityUtils";
import { AxiosRequestConfig } from 'axios';

const qs = require('qs');

export interface SearchOptions {
  pagination: boolean;
  page: number;
  pageSize?: number;
  filters?: object;
  sort?: { direction, property };
  requestOptions?: AxiosRequestConfig;
}

interface PortofinoCrudConfig {
  name: string;
  searchTitle?: string;
  createTitle?: string;
  readTitle?: string;
  editTitle?: string;
  largeResultSet: boolean;
  useLocalOrder: boolean;
  rowsPerPage: number;
}

export interface PortofinoEntityProperty {
  name: string;
  label: string;
  type: Type;
  enabled: boolean;
  insertable: boolean;
  updatable: boolean;
  inSummary: boolean;
  searchable: boolean;
  annotations: string[];
}


export class CrudAction extends Action {
  totalRecords: number;
  readonly config: PortofinoCrudConfig;
  private readonly _properties: PortofinoEntityProperty[];
  private readonly _selectionProviders: SelectionProvider[];

  constructor(
    _nooNoo: NooNoo,
    public action: string,
    configuration: any,
    classAccessor: any,
    selProviders: any,
    crudActionClasses: string[],
  ) {
    super(_nooNoo, action, crudActionClasses);
    this._properties = mapClassAccessorToPropertiesDefinition(classAccessor);
    this._selectionProviders = selProviders
      .map(sp => new SelectionProvider(this.http, sp.searchDisplayMode, sp.fieldNames, sp.name, sp.displayMode));
    this.config = {
      name: configuration.name,
      searchTitle: configuration.searchTitle,
      createTitle: configuration.createTitle,
      readTitle: configuration.readTitle,
      editTitle: configuration.editTitle,
      largeResultSet: configuration.largeResultSet,
      useLocalOrder: configuration.useLocalOrder,
      rowsPerPage: configuration.rowsPerPage,
    }
  }

  public static async getCrudAction(_nooNoo: NooNoo, action: string, crudActionClasses: string[]) {
    const [
      { data: configuration },
      { data: classAccessor },
      { data: selProviders },
    ] = await Promise.all([
      _nooNoo.get(`${action}/:configuration`),
      _nooNoo.get(`${action}/:classAccessor`),
      _nooNoo.get(`${action}/:selectionProvider`),
    ]);
    return new CrudAction(_nooNoo, action, configuration, classAccessor, selProviders, crudActionClasses);
  }


  /** Attributes **/

  getAttributes(): PortofinoEntityProperty[] {
    return this._properties;
  }

  getAttribute(name: string): PortofinoEntityProperty {
    return this._properties.find(p => p.name === name);
  }

  getSummaryAttributes(): PortofinoEntityProperty[] {
    return this.getAttributes().filter(a => a.inSummary);
  }

  getInsertableAttributes(): PortofinoEntityProperty[] {
    return this.getAttributes().filter(a => a.insertable);
  }

  getUpdatableAttributes(): PortofinoEntityProperty[] {
    return this.getAttributes().filter(a => a.updatable);
  }


  /** Selection providers **/

  getSelectionProviders(): PortofinoSelectionProvider[] {
    return this._selectionProviders;
  }

  getSelectionProvider(name: string): PortofinoSelectionProvider {
    return this.getSelectionProviders().find(sp => sp.name === name);
  }

  getSelectionProviderDefinitionByFieldName(fieldName: string) {
    return this.getSelectionProviders()
      .find(sp => sp.fieldNames.includes(fieldName));
  }

  /** Entity methods **/

  async search(options?: SearchOptions) {
    const {
      pagination = true,
      page = 0,
      pageSize = 10,
      filters = null,
      sort = null,
      requestOptions = null
    } = options || {};

    try {
      // https://portofino.manydesigns.com/en/docs/reference/page-types/crud/rest
      //   ?sortDirection=&searchString=&sortProperty=&maxResults=10&firstResult=10
      const { data } = await this.http.get('', {
        paramsSerializer: params => qs.stringify(params, { indices: false }),
        ...requestOptions,
        params: {
          maxResults: pagination ? pageSize : undefined,
          firstResult: (page && pagination) ? ((page - 1) * pageSize) : undefined,
          ...makeSortObj(sort),
          ...makeSearchObj(filters, this._properties),
        },
      });

      this.totalRecords = data.totalRecords;
      return data.records
        .map(record => new CrudActionEntity(this.http, record, this._properties));
    } catch (e) {
      console.error('[Portofino] Unable to fetch data');
      throw e;
    }
  }

  async get(id: string, requestOptions?: AxiosRequestConfig) {
    return await this.http.get(`${id}`, requestOptions)
      .then(({ data }) => new CrudActionEntity(this.http, data, this._properties));
  }

  async create(data: any, requestOptions?: AxiosRequestConfig) {
    const payload = { ...data };

    this._properties.forEach(p => {
      if (data[p.name] !== undefined)
        payload[p.name] = convertJSTypeToValue(p.type, data[p.name])
    });

    return await this.http.post('', payload, requestOptions)
      .then(({ data }) => new CrudActionEntity(this.http, data, this._properties));
  }

  // async update(id: string, data: any) {
  //   return await this.axiosInstance.put(id, data);
  // }

  async delete(id: string,  requestOptions?: AxiosRequestConfig) {
    await this.http.delete(`${id}`, requestOptions);
  }
}
