let { DivideByZeroException, MyFrac, MyComplex } = require("../js/script.js");

describe('MyFrac', () => {
    test('constructor should simplify fractions', () => {
        const frac = new MyFrac(4, 8);
        expect(frac.toString()).toBe('1 / 2');
    });

    test('add should correctly add fractions', () => {
        const a = new MyFrac(1, 3);
        const b = new MyFrac(1, 6);
        expect(a.add(b).toString()).toBe('1 / 2');
    });

    test('subtract should correctly subtract fractions', () => {
        const a = new MyFrac(2, 3);
        const b = new MyFrac(1, 3);
        expect(a.subtract(b).toString()).toBe('1 / 3');
    });

    test('multiply should correctly multiply fractions', () => {
        const a = new MyFrac(2, 3);
        const b = new MyFrac(3, 4);
        expect(a.multiply(b).toString()).toBe('1 / 2');
    });

    test('divide should correctly divide fractions', () => {
        const a = new MyFrac(2, 3);
        const b = new MyFrac(3, 4);
        expect(a.divide(b).toString()).toBe('8 / 9');
    });

    test('divide should throw DivideByZeroException when dividing by zero', () => {
        const a = new MyFrac(1, 2);
        const b = new MyFrac(0, 1);
        expect(() => a.divide(b)).toThrow(DivideByZeroException);
    });

    test('compareTo should compare fractions correctly', () => {
        const a = new MyFrac(1, 2);
        const b = new MyFrac(2, 4);
        const c = new MyFrac(3, 4);

        expect(a.compareTo(b)).toBe(0); // a == b
        expect(a.compareTo(c)).toBe(-1); // a < c
        expect(c.compareTo(a)).toBe(1); // c > a
    });
});

describe('MyComplex', () => {
    test('constructor should parse complex numbers from strings', () => {
        const complex = new MyComplex('3+4i');
        expect(complex.toString()).toBe('3+4i');
    });

    test('constructor should throw an error for invalid strings', () => {
        expect(() => new MyComplex('invalid')).toThrow('Invalid format for complex number.');
    });

    test('add should correctly add complex numbers', () => {
        const a = new MyComplex(1, 2);
        const b = new MyComplex(3, 4);
        expect(a.add(b).toString()).toBe('4+6i');
    });

    test('subtract should correctly subtract complex numbers', () => {
        const a = new MyComplex(5, 6);
        const b = new MyComplex(3, 4);
        expect(a.subtract(b).toString()).toBe('2+2i');
    });

    test('multiply should correctly multiply complex numbers', () => {
        const a = new MyComplex(1, 2);
        const b = new MyComplex(3, 4);
        expect(a.multiply(b).toString()).toBe('-5+10i');
    });

    test('divide should correctly divide complex numbers', () => {
        const a = new MyComplex(1, 2);
        const b = new MyComplex(3, 4);
        expect(a.divide(b).toString()).toBe('0.44+0.08i');
    });

    test('divide should throw DivideByZeroException when dividing by zero', () => {
        const a = new MyComplex(1, 2);
        const b = new MyComplex(0, 0);
        expect(() => a.divide(b)).toThrow(DivideByZeroException);
    });
});