import { PropertyType } from '../types/EntityTypes';

export function getTypeFromJavaType(type: string): PropertyType {
  switch (type) {
    case 'java.lang.String':
      return 'string';
    case 'java.lang.Long':
    case 'java.math.BigDecimal':
    case 'java.lang.Double':
      return 'number';
    case 'java.lang.Boolean':
      return 'boolean';
    case 'java.sql.Date':
    case 'java.sql.Timestamp':
    case 'java.util.Date':
      return 'date';
    case 'java.sql.Time':
      return 'time';
    default:
      console.warn(
        `[Portofino] Unknown attribute type ${type} fallback to string`
      );
      return 'string';
  }
}

export function convertValueToJSType(type: PropertyType, value: any): any {
  if (value == null || value == undefined)
    return null;

  switch (type) {
    case 'date':
      return value ? new Date(value) : null;

    case 'string':
      try {
        if(hasJsonStructure(value))
          return JSON.parse(value);
        else
          return value;
      } catch (e) {
        return value;
      }

    case 'number':
      const parsedVal = parseFloat(value)
      if (typeof value !== 'number' && parsedVal !== NaN)
        return parsedVal;
      return value;

    default:
      return value;
  }
}

function hasJsonStructure(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]'
            || type === '[object Array]';
    } catch (err) {
        return false;
    }
}

function anyDateToTimestamp(value: any) {
  if (!value && value !== 0) return null;

  let date = value;

  if (value._isAMomentObject) date = value.toDate();

  if (!isNaN(date)) date = new Date(date);

  if (typeof value === 'string' || value instanceof String)
    date = new Date(value.toString());

  return date.getTime();
}

export function convertJSTypeToValue(type: PropertyType, value: any): any {
  switch (type) {
    case 'date':
      return anyDateToTimestamp(value);

    case 'string':
      if (typeof value === 'object' && value !== null)
        return JSON.stringify(value);
      return value;

    case 'number':
      if (typeof value !== 'number')
        return parseFloat(value);
      return value;

    default:
      return value;
  }
}
