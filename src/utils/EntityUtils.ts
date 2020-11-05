import Type from "../entity/TypeEnum";
import {getTime} from "date-fns";

const typeBindings = {
  'java.lang.String': Type.String,
  'java.lang.Long': Type.Number,
  'java.math.BigDecimal': Type.Number,
  'java.lang.Boolean': Type.Boolean,
  'java.sql.Date': Type.Date,
  'java.sql.Timestamp': Type.Date,
  'java.sql.Time': Type.Date,
  'java.util.Date': Type.Date,
}

export function getTypeFromJavaType(type) {
  if (!typeBindings[type])
    console.warn("[Portofino] Unknown attribute type", type, 'fallback to string');
  return typeBindings[type] || Type.String;
}

export function convertValueToJSType(type: Type, value: any): any {
  switch (type) {
    case Type.Date:
      return value ? new Date(value) : null;
    case Type.String:
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    default:
      return value;
  }
}

export function convertJSTypeToValue(type: Type, value: any): any {
  switch (type) {
    case Type.Date:
      if (!value) return null;
      let date = value;
      if (value._isAMomentObject)
        date = value.toDate();
      if (typeof value === 'string' || value instanceof String)
        date = new Date(value.toString());
      return getTime(date);

    case Type.String:
      if (typeof value === 'object' && value !== null)
        return JSON.stringify(value);
      return value;

    default:
      return value;
  }
}
