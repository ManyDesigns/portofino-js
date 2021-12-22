import { joinPath } from './utils';

describe('Type conversion', () => {
  test('Join no triling slash', () => {
    expect(joinPath('ciao', 1)).toBe('ciao/1');
  });
  test('Join too many triling slash', () => {
    expect(joinPath('ciao/', '/1')).toBe('ciao/1');
  });
});
