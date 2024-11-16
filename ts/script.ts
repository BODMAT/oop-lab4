//Використання T extends IMyNumber<T> гарантує, що всі методи будуть повертати той самий тип, що реалізує інтерфейс.
export interface IMyNumber<T extends IMyNumber<T>> {
    add(b: T): T;
    subtract(b: T): T;
    multiply(b: T): T;
    divide(b: T): T;
}

export interface IComparable<T> {
    compareTo(other: T): number;
}

export class DivideByZeroException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DivideByZeroException"
        console.error(message);
    }
}

export class MyFrac implements IMyNumber<MyFrac>, IComparable<MyFrac> {
    private nom: bigint;
    private denom: bigint;

    constructor(nominator: number | bigint, denominator: number | bigint) {
        if (typeof nominator === "number" && typeof denominator === "number") {
            nominator = BigInt(nominator);
            denominator = BigInt(denominator);
        }

        if (denominator === 0n) {
            throw new Error("Denominator cannot be zero.");
        }

        const gcd = MyFrac.gcd(nominator as bigint, denominator as bigint); //найбільший спільний дільник (НСД, або GCD)
        this.nom = nominator as bigint / gcd;
        this.denom = denominator as bigint / gcd;

        if (this.denom < 0n) {
            this.nom = -this.nom;
            this.denom = -this.denom;
        }
    }

    private static gcd(a: bigint, b: bigint): bigint {
        return b === 0n ? a : MyFrac.gcd(b, a % b); // Алгоритм Евкліда
    }

    public add(b: MyFrac): MyFrac {
        const newNom = this.nom * b.denom + this.denom * b.nom;
        const newDenom = this.denom * b.denom;
        return new MyFrac(newNom, newDenom);
    }

    public subtract(b: MyFrac): MyFrac {
        const newNom = this.nom * b.denom - this.denom * b.nom;
        const newDenom = this.denom * b.denom;
        return new MyFrac(newNom, newDenom);
    }

    public multiply(b: MyFrac): MyFrac {
        const newNom = this.nom * b.nom;
        const newDenom = this.denom * b.denom;
        return new MyFrac(newNom, newDenom);
    }

    public divide(b: MyFrac): MyFrac {
        if (b.nom === 0n) {
            throw new DivideByZeroException("Division by zero.");
        }
        const newNom = this.nom * b.denom;
        const newDenom = this.denom * b.nom;
        return new MyFrac(newNom, newDenom);
    }

    public toString(): string {
        return `${this.nom} / ${this.denom}`;
    }

    compareTo(other: MyFrac): number {
        const thisValue = this.nom * other.denom;
        const otherValue = other.nom * this.denom;

        if (thisValue < otherValue) return -1;
        if (thisValue > otherValue) return 1;
        return 0;
    }
}


export class MyComplex implements IMyNumber<MyComplex> {
    private re: number;
    private im: number;

    constructor(arg: string | number, imaginary?: number) {
        if (typeof arg === "string") {
            //13+8i
            try {
                const regex = /^([-+]?\d+)\s*([-+]\d+)i$/; // Регулярний вираз для комплексного числа
                const match = arg.trim().match(regex);

                if (!match) {
                    throw new Error("Invalid format for complex number.");
                }

                this.re = Number(match[1]);
                this.im = Number(match[2]);
            } catch (err) {
                throw new Error("Complex number parsing failed: " + err.message);
            }
        } else if (typeof arg === "number" && typeof imaginary === "number") {
            this.re = arg;
            this.im = imaginary;
        } else {
            throw new Error("Incorrect constructor parameters.");
        }
    }

    public add(b: MyComplex): MyComplex {
        return new MyComplex(this.re + b.re, this.im + b.im);
    }

    public subtract(b: MyComplex): MyComplex {
        return new MyComplex(this.re - b.re, this.im - b.im);
    }

    public multiply(b: MyComplex): MyComplex {
        const re = this.re * b.re - this.im * b.im;
        const im = this.re * b.im + this.im * b.re;
        return new MyComplex(re, im);
    }

    public divide(b: MyComplex): MyComplex {
        const divisor = b.re * b.re + b.im * b.im;
        if (divisor === 0) {
            throw new DivideByZeroException("Division by zero.");
        }
        const re = (this.re * b.re + this.im * b.im) / divisor;
        const im = (this.im * b.re - this.re * b.im) / divisor;
        return new MyComplex(re, im);
    }

    public toString(): string {
        return `${this.re}${this.im >= 0 ? '+' : ''}${this.im}i`;
    }
}
