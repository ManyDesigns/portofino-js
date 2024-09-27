import {
  convertJSTypeToValue,
  getTypeFromJavaType,
} from './entityPropertyConverters';
import { EntityProperty } from '../types/EntityTypes';

const annotationTypes: { [key: string]: string } = {
  'com.manydesigns.elements.annotations.InSummary': 'inSummary',
  'com.manydesigns.elements.annotations.Searchable': 'searchable',
  'com.manydesigns.elements.annotations.Insertable': 'insertable',
  'com.manydesigns.elements.annotations.Updatable': 'updatable',
  'com.manydesigns.elements.annotations.Enabled': 'enabled',
  'com.manydesigns.elements.annotations.Required': 'required',
};

export function mapClassAccessorToPropertiesDefinition(
  classAccessor: any
): EntityProperty[] {
  return classAccessor.properties.map((prop: any) => {
    const property: any = {
      name: prop.name,
      label: prop.label,
      type: getTypeFromJavaType(prop.type),
    };

    prop.annotations.forEach((annotation: any) => {
      const annType: string = annotationTypes[annotation.type];
      // console.debug(annotation.type, '->', annType, '=', annotation.properties.value)
      if (annType) {
        property[annType] = annotation.properties.value;
      }
    });

    return property;
  });
}

export function makeSortObj(sortProperty: {
  direction: string;
  property: string;
}) {
  if (!sortProperty) return {};
  return {
    sortDirection: sortProperty.direction,
    sortProperty: sortProperty.property,
  };
}

export function makeSearchObj(filters: object, properties: EntityProperty[]) {
  const searchObj: any = {};
  if (!filters) return {};

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (typeof value !== 'object') {
      searchObj[`search_${key}`] = value;
      return;
    }

    if (Array.isArray(value)) {
      searchObj[`search_${key}`] = value;
      return;
    }

    if (value.mode) {
      searchObj[`search_${key}_mode`] = value.mode;
      searchObj[`search_${key}`] = value.value;
      return;
    }
    
    let type = properties.find((p) => p.name === key)?.type || 'date';
    if (value.min)
      searchObj[`search_${key}_min`] = convertJSTypeToValue(type, value.min);

    if (value.max)
      searchObj[`search_${key}_max`] = convertJSTypeToValue(type, value.max);

    if (value.value !== undefined) searchObj[`search_${key}`] = value.value;
  });

  return searchObj;
}
