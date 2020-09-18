import Type from "../entity/TypeEnum";

export function convertValueToType(type: Type, value: any): any {
  switch (type) {
    //TODO Retrieve json property from Portofino
    case Type.Date:
    case Type.Timestamp:
      return value ? new Date(value) : null;
    default:
      return value;
  }
}
