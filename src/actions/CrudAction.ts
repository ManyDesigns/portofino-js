import { Action } from '.';
import { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { EntityProperty } from '../types/EntityTypes';
import { SearchOptions } from '../types/CrudActionTypes';
import CrudActionEntity from './crudAction/CrudActionEntity';
import {
  makeSearchObj,
  makeSortObj,
  mapClassAccessorToPropertiesDefinition,
} from '../lib/crudActionDataMapper';
import NooNoo from '../NooNoo';
import PortofinoSelectionProvider from './crudAction/SelectionProvider';
import SelectionProvider from './crudAction/SelectionProvider';
import { convertJSTypeToValue } from '../lib/entityPropertyConverters';

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

export class CrudAction extends Action {
  totalRecords: number;
  readonly config: PortofinoCrudConfig;
  readonly #properties: EntityProperty[];
  readonly #selectionProviders: SelectionProvider[];

  constructor(
    _nooNoo: NooNoo,
    public action: string,
    configuration: any,
    classAccessor: any,
    selProviders: any,
    crudActionClasses: string[]
  ) {
    super(_nooNoo, action, crudActionClasses);
    this.#properties = mapClassAccessorToPropertiesDefinition(classAccessor);
    this.#selectionProviders = selProviders.map(
      (sp: any) =>
        new SelectionProvider(
          this.http,
          sp.name,
          sp.fieldNames,
          sp.displayMode,
          sp.searchDisplayMode
        )
    );
    this.config = {
      name: configuration.name,
      searchTitle: configuration.searchTitle,
      createTitle: configuration.createTitle,
      readTitle: configuration.readTitle,
      editTitle: configuration.editTitle,
      largeResultSet: configuration.largeResultSet,
      useLocalOrder: configuration.useLocalOrder,
      rowsPerPage: configuration.rowsPerPage,
    };
  }

  public static async getCrudAction(
    _nooNoo: NooNoo,
    action: string,
    crudActionClasses: string[]
  ) {
    const [
      { data: configuration },
      { data: classAccessor },
      { data: selProviders },
    ] = await Promise.all([
      _nooNoo.get(`${action}/:configuration`),
      _nooNoo.get(`${action}/:classAccessor`),
      _nooNoo.get(`${action}/:selectionProvider`),
    ]);
    return new CrudAction(
      _nooNoo,
      action,
      configuration,
      classAccessor,
      selProviders,
      crudActionClasses
    );
  }

  /** Properties **/
  get properties(): EntityProperty[] {
    return this.#properties;
  }

  getProperty(name: string): EntityProperty {
    return this.properties.find((p) => p.name === name);
  }

  getSummaryProperties(): EntityProperty[] {
    return this.properties.filter((a) => a.inSummary);
  }

  getInsertableProperties(): EntityProperty[] {
    return this.properties.filter((a) => a.insertable);
  }

  getUpdatableProperties(): EntityProperty[] {
    return this.properties.filter((a) => a.updatable);
  }

  getSearchableProperties(): EntityProperty[] {
    return this.properties.filter((a) => a.searchable);
  }

  /**
   * @deprecated Use property getter
   */
  getAttributes(): EntityProperty[] {
    return this.properties;
  }

  /**
   * @deprecated use getProperty(name)
   */
  getAttribute(name: string): EntityProperty {
    return this.properties.find((p) => p.name === name);
  }

  /**
   * @deprecated use getSummaryProperties()
   */
  getSummaryAttributes(): EntityProperty[] {
    return this.properties.filter((a) => a.inSummary);
  }

  /**
   * @deprecated use getInsertableProperties()
   */
  getInsertableAttributes(): EntityProperty[] {
    return this.properties.filter((a) => a.insertable);
  }

  /**
   * @deprecated use getUpdatableProperties()
   */
  getUpdatableAttributes(): EntityProperty[] {
    return this.properties.filter((a) => a.updatable);
  }

  /** Selection providers **/
  get selectionProviders(): PortofinoSelectionProvider[] {
    return this.#selectionProviders;
  }

  /**
   * @deprecated Use selectionProviders getter
   */
  getSelectionProviders(): PortofinoSelectionProvider[] {
    return this.selectionProviders;
  }

  getSelectionProvider(name: string): PortofinoSelectionProvider {
    return this.selectionProviders.find((sp) => sp.name === name);
  }

  getSelectionProviderByPropertyName(
    fieldName: string
  ): PortofinoSelectionProvider {
    return this.selectionProviders.find((sp) =>
      sp.fieldNames.includes(fieldName)
    );
  }

  /** Entity methods **/
  async search(
    options?: Partial<SearchOptions>,
    requestOptions?: AxiosRequestConfig
  ) {
    const {
      pagination = true,
      page = 0,
      pageSize = 10,
      filters = null,
      sort = null,
    } = options || {};

    try {
      // https://portofino.manydesigns.com/en/docs/reference/page-types/crud/rest
      //   ?sortDirection=&searchString=&sortProperty=&maxResults=10&firstResult=10
      const { data } = await this.http.get('', {
        paramsSerializer: (params) => qs.stringify(params, { indices: false }),
        ...requestOptions,
        params: {
          maxResults: pagination ? pageSize : undefined,
          firstResult: page && pagination ? (page - 1) * pageSize : undefined,
          ...makeSortObj(sort),
          ...makeSearchObj(filters, this.properties),
          ...(requestOptions ? requestOptions.params : {}),
        },
      });

      this.totalRecords = data.totalRecords;
      const records = (data.records || data.Result);
      return records.map((record) => new CrudActionEntity(this, record));
    } catch (e) {
      console.error('[Portofino] Unable to fetch data', e);
      throw e;
    }
  }

  async get(id: string, requestOptions?: AxiosRequestConfig) {
    return await this.http
      .get(`${id}`, requestOptions)
      .then(({ data }) => new CrudActionEntity(this, data));
  }

  async create(data: any, requestOptions?: AxiosRequestConfig) {
    const payload = { ...data };

    this.properties.forEach((p) => {
      if (data[p.name] !== undefined)
        payload[p.name] = convertJSTypeToValue(p.type, data[p.name]);
    });

    return await this.http
      .post('', payload, requestOptions)
      .then(({ data }) => new CrudActionEntity(this, data));
  }

  async update(id: string, data: any, requestOptions?: AxiosRequestConfig) {
    const pData = { ...data };

    this.properties.forEach((p) => {
      if (data[p.name] !== undefined)
        pData[p.name] = convertJSTypeToValue(p.type, data[p.name]);
    });

    const { data: entity } = await this.http.put(
      id.toString(),
      pData,
      requestOptions
    );
    return new CrudActionEntity(this, entity);
  }

  async delete(id: string, requestOptions?: AxiosRequestConfig) {
    await this.http.delete(id.toString(), requestOptions);
  }


  createCrudEntity(object:any){
    return new CrudActionEntity(this,object);
  }
}
