import {
  convertJSTypeToValue,
  getTypeFromJavaType,
} from './entityPropertyConverters';

describe('Type conversion', () => {
  test('String is a String', () => {
    expect(getTypeFromJavaType('java.lang.String')).toBe('string');
  });
  test('Long is a Number', () => {
    expect(getTypeFromJavaType('java.lang.Long')).toBe('number');
  });
  test('java.lang.Boolean is a Boolean', () => {
    expect(getTypeFromJavaType('java.lang.Boolean')).toBe('boolean');
  });
  test('java.sql.Date is a Date', () => {
    expect(getTypeFromJavaType('java.sql.Date')).toBe('date');
  });
  test('Unknown is a String', () => {
    expect(getTypeFromJavaType('java.not.a.Type')).toBe('string');
  });
});

describe('Value conversion to JS', () => {
  //TODO
});

describe('Value conversion to Java', () => {
  describe('Date types', () => {
    test('null value', () => {
      expect(convertJSTypeToValue('date', null)).toBeNull();
    });
    test('0 is a valid value', () => {
      expect(convertJSTypeToValue('date', 0)).toBe<number>(0);
    });
    test('Date object', () => {
      const date = new Date();
      expect(convertJSTypeToValue('date', date)).toBe(date.getTime());
    });
    test('String date', () => {
      const date = new Date('2020-11-10');
      expect(convertJSTypeToValue('date', '2020-11-10')).toBe(date.getTime());
    });
  });

  test('Object is converted to json', () => {
    const anObject = { fili: 'berto' };
    expect(convertJSTypeToValue('string', anObject)).toBe(
      JSON.stringify(anObject)
    );
  });
  test('Strings are not converted', () => {
    expect(convertJSTypeToValue('string', 'FILIBERTO')).toBe('FILIBERTO');
  });
  test('Default conversion', () => {
    expect(convertJSTypeToValue('number', 7)).toBe(7);
  });
});
