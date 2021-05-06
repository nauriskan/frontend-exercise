import Convert from './convert'

describe('Convert text to numbers', () => {
  it('should convert valid general input', () => {
      expect(Convert.textToNum('one hundred eighty nine million four hundred twenty one thousand three hundred fifteen'))
      .toBe('189421315');
  });

  it('should handle invalid text input', () => {
    expect(Convert.textToNum('eleven one two'))
    .toBe('-');
  });

  it('should convert single text value', () => {
    expect(Convert.textToNum('zero'))
    .toBe('0');
  });

  it('should convert walue with empty thousands and hundreds', () => {
    expect(Convert.textToNum('one hundred million'))
    .toBe('100000000');
  });
});

describe('Convert numbers to text', () => {
  it('should convert valid general input', () => {
    expect(Convert.numToText('189421315'))
    .toBe('one hundred eighty nine million four hundred twenty one thousand three hundred fifteen');
  })

  it('should convert walue with empty thousands and hundreds', () => {
    expect(Convert.numToText('100000000'))
    .toBe('one hundred million');
  });

  it('should convert single number to text', () => {
    expect(Convert.numToText('5'))
    .toBe('five');
  });
});
