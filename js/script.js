"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComplex = exports.MyFrac = exports.DivideByZeroException = void 0;
class DivideByZeroException extends Error {
    constructor(message) {
        super(message);
        this.name = "DivideByZeroException";
        console.error(message);
    }
}
exports.DivideByZeroException = DivideByZeroException;
class MyFrac {
    nom;
    denom;
    constructor(nominator, denominator) {
        if (typeof nominator === "number" && typeof denominator === "number") {
            nominator = BigInt(nominator);
            denominator = BigInt(denominator);
        }
        if (denominator === 0n) {
            throw new Error("Denominator cannot be zero.");
        }
        const gcd = MyFrac.gcd(nominator, denominator);
        this.nom = nominator / gcd;
        this.denom = denominator / gcd;
        if (this.denom < 0n) {
            this.nom = -this.nom;
            this.denom = -this.denom;
        }
    }
    static gcd(a, b) {
        return b === 0n ? a : MyFrac.gcd(b, a % b);
    }
    add(b) {
        const newNom = this.nom * b.denom + this.denom * b.nom;
        const newDenom = this.denom * b.denom;
        return new MyFrac(newNom, newDenom);
    }
    subtract(b) {
        const newNom = this.nom * b.denom - this.denom * b.nom;
        const newDenom = this.denom * b.denom;
        return new MyFrac(newNom, newDenom);
    }
    multiply(b) {
        const newNom = this.nom * b.nom;
        const newDenom = this.denom * b.denom;
        return new MyFrac(newNom, newDenom);
    }
    divide(b) {
        if (b.nom === 0n) {
            throw new DivideByZeroException("Division by zero.");
        }
        const newNom = this.nom * b.denom;
        const newDenom = this.denom * b.nom;
        return new MyFrac(newNom, newDenom);
    }
    toString() {
        return `${this.nom} / ${this.denom}`;
    }
    compareTo(other) {
        const thisValue = this.nom * other.denom;
        const otherValue = other.nom * this.denom;
        if (thisValue < otherValue)
            return -1;
        if (thisValue > otherValue)
            return 1;
        return 0;
    }
}
exports.MyFrac = MyFrac;
class MyComplex {
    re;
    im;
    constructor(arg, imaginary) {
        if (typeof arg === "string") {
            try {
                const regex = /^([-+]?\d+)\s*([-+]\d+)i$/;
                const match = arg.trim().match(regex);
                if (!match) {
                    throw new Error("Invalid format for complex number.");
                }
                this.re = Number(match[1]);
                this.im = Number(match[2]);
            }
            catch (err) {
                throw new Error("Complex number parsing failed: " + err.message);
            }
        }
        else if (typeof arg === "number" && typeof imaginary === "number") {
            this.re = arg;
            this.im = imaginary;
        }
        else {
            throw new Error("Incorrect constructor parameters.");
        }
    }
    add(b) {
        return new MyComplex(this.re + b.re, this.im + b.im);
    }
    subtract(b) {
        return new MyComplex(this.re - b.re, this.im - b.im);
    }
    multiply(b) {
        const re = this.re * b.re - this.im * b.im;
        const im = this.re * b.im + this.im * b.re;
        return new MyComplex(re, im);
    }
    divide(b) {
        const divisor = b.re * b.re + b.im * b.im;
        if (divisor === 0) {
            throw new DivideByZeroException("Division by zero.");
        }
        const re = (this.re * b.re + this.im * b.im) / divisor;
        const im = (this.im * b.re - this.re * b.im) / divisor;
        return new MyComplex(re, im);
    }
    toString() {
        return `${this.re}${this.im >= 0 ? '+' : ''}${this.im}i`;
    }
}
exports.MyComplex = MyComplex;
//# sourceMappingURL=script.js.map