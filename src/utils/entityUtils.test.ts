import {convertJSTypeToValue, getTypeFromJavaType} from './EntityUtils'
import Type from "../entity/TypeEnum";

describe('Type conversion', () => {
  test('String is a String', () => {
    expect(getTypeFromJavaType('java.lang.String')).toBe(Type.String)
  });
  test('Long is a Number', () => {
    expect(getTypeFromJavaType('java.lang.Long')).toBe(Type.Number)
  });
  test('java.lang.Boolean is a Boolean', () => {
    expect(getTypeFromJavaType('java.lang.Boolean')).toBe(Type.Boolean)
  });
  test('java.sql.Date is a Date', () => {
    expect(getTypeFromJavaType('java.sql.Date')).toBe(Type.Date)
  });
  test('Unknown is a String', () => {
    expect(getTypeFromJavaType('java.not.a.Type')).toBe(Type.String)
  });
});

describe('Value conversion to JS', () => {
  //TODO
});

describe('Value conversion to Java', () => {
  describe('Date types', () => {
    test('null value', () => {
      expect(null).toBe(null);
    });
    test('Date object', () => {
      const date = new Date();
      expect(convertJSTypeToValue(Type.Date, date)).toBe(date.getTime());
    });
    test('String date', () => {
      const date = new Date('2020-11-10');
      expect(convertJSTypeToValue(Type.Date, '2020-11-10')).toBe(date.getTime());
    });
    test('Object is converted to json', () => {
      const anObject = {fili: "berto"};
      expect(convertJSTypeToValue(Type.String, anObject)).toBe(JSON.stringify(anObject));
    });
    test('Strings are not converted', () => {
      expect(convertJSTypeToValue(Type.String, "FILIBERTO")).toBe("FILIBERTO");
    });
    test('Default conversion', () => {
      expect(convertJSTypeToValue(Type.Number, 7)).toBe(7);
    });
  });
});