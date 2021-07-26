import { convertJSTypeToValue, getTypeFromJavaType } from "./EntityUtils";
import { EntityProperty } from "../types/EntityTypes";

const annotationTypes: { [key: string]: string } = {
  "com.manydesigns.elements.annotations.InSummary": "inSummary",
  "com.manydesigns.elements.annotations.Searchable": "searchable",
  "com.manydesigns.elements.annotations.Insertable": "insertable",
  "com.manydesigns.elements.annotations.Updatable": "updatable",
  "com.manydesigns.elements.annotations.Enabled": "enabled",
  "com.manydesigns.elements.annotations.Required": "required",
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

  //TODO basare la generazione dell props su tipo attr
  Object.entries(filters).forEach(([key, value]) => {
    //TODO User property to determinate the Type
    if (value) {
      if (typeof value === "object") {
        if (Array.isArray(value)) {
          searchObj[`search_${key}`] = value;
        } else {
          //Stringa
          /*
          &search_luogo_mode=
          &search_luogo=
          */
         if (value.mode) {
          searchObj[`search_${key}_mode`] = value.mode;
          searchObj[`search_${key}`] = value.value;
         }

          //Numero, data
          if (value.min)
            searchObj[`search_${key}_min`] = convertJSTypeToValue(
              "date",
              value.min
            );
          if (value.max)
            searchObj[`search_${key}_max`] = convertJSTypeToValue(
              "date",
              value.max
            );
        }
      } else {
        searchObj[`search_${key}`] = value;
      }
    }
  });
  return searchObj;
}
