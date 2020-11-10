import Type from "../entity/TypeEnum";

export function getTypeFromJavaType(type: string): Type {
  switch (type) {
    case 'java.lang.String':
      return Type.String;
    case 'java.lang.Long':
    case 'java.math.BigDecimal':
      return Type.Number;
    case 'java.lang.Boolean':
      return Type.Boolean;
    case 'java.sql.Date':
    case 'java.sql.Timestamp':
    case 'java.sql.Time':
    case 'java.util.Date':
      return Type.Date;
    default:
      console.warn("[Portofino] Unknown attribute type", type, 'fallback to string');
      return Type.String;
  }
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

function anyDateToTimestamp(value: any) {
  if (!value && value !== 0)
    return null;

  let date = value;

  if (value._isAMomentObject)
    date = value.toDate();

  if (!isNaN(date))
    date = new Date(date);

  if (typeof value === 'string' || value instanceof String)
    date = new Date(value.toString());

  return date.getTime();
}

export function convertJSTypeToValue(type: Type, value: any): any {
  switch (type) {
    case Type.Date:
      return anyDateToTimestamp(value);

    case Type.String:
      if (typeof value === 'object' && value !== null)
        return JSON.stringify(value);
      return value;

    default:
      return value;
  }
}
