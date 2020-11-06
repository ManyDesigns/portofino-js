import {PortofinoEntityProperty} from "../actions/CrudAction";
import {isDate} from 'date-fns';
import {getTypeFromJavaType} from "./EntityUtils";

const annotationTypes = {
  'com.manydesigns.elements.annotations.InSummary': 'inSummary',
  'com.manydesigns.elements.annotations.Searchable': 'searchable',
  'com.manydesigns.elements.annotations.Insertable': 'insertable',
  'com.manydesigns.elements.annotations.Updatable': 'updatable',
  'com.manydesigns.elements.annotations.Enabled': 'enabled',
  'com.manydesigns.elements.annotations.Required': 'required',
}

export function mapClassAccessorToPropertiesDefinition(classAccessor): PortofinoEntityProperty[] {
  return classAccessor.properties.map(prop => {
    const property = {
      name: prop.name,
      label: prop.label,
      type: getTypeFromJavaType(prop.type)
    };

    prop.annotations.forEach(annotation => {
      const annType = annotationTypes[annotation.type];
      // console.debug(annotation.type, '->', annType, '=', annotation.properties.value)
      if (annType) {
        property[annType] = annotation.properties.value;
      }
    });

    return property;
  })
}

function dateToPortofinoDateString(date) {
  return isDate(date) ? date.getTime() : date;
}

export function makeSortObj(sortProperty: {direction, property}) {
  if (!sortProperty) return {};
  return {
      sortDirection: sortProperty.direction,
      sortProperty: sortProperty.property,
  }
}

export function makeSearchObj(filters: object, properties: PortofinoEntityProperty[]) {
  const searchObj = {};

  if (!filters) return {}

  //TODO basare la generazione dell props su tipo attr
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (typeof value === 'object') {

        if (Array.isArray(value)) {
          searchObj[`search_${key}`] = value;
        } else {

          //Stringa
          /*
          &search_luogo_mode=
          &search_luogo=
          */

          //Numero, data
          if (value.min)
            searchObj[`search_${key}_min`] = dateToPortofinoDateString(value.min);
          if (value.max)
            searchObj[`search_${key}_max`] = dateToPortofinoDateString(value.max);
        }

      } else {
        searchObj[`search_${key}`] = value;
      }
    }
  });
  return searchObj;
}
