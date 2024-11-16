import { IMyNumber, MyFrac, MyComplex } from "./script";

function testAPlusBSquare<T extends IMyNumber<T>>(a: T, b: T): void {
    console.log(`=== Starting testing (a+b)^2=a^2+2ab+b^2 with a = ${a}, b = ${b} ===`);

    const aPlusB = a.add(b);
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`(a + b) = ${aPlusB}`);
    console.log(`(a+b)^2 = ${aPlusB.multiply(aPlusB)}`);
    console.log("= = =");

    let curr = a.multiply(a);
    console.log(`a^2 = ${curr}`);
    let wholeRightPart = curr;

    curr = a.multiply(b);
    curr = curr.add(curr); // ab + ab = 2ab
    console.log(`2*a*b = ${curr}`);

    wholeRightPart = wholeRightPart.add(curr);
    curr = b.multiply(b);
    console.log(`b^2 = ${curr}`);
    wholeRightPart = wholeRightPart.add(curr);
    console.log(`a^2+2ab+b^2 = ${wholeRightPart}`);
    console.log(`=== Finishing testing (a+b)^2=a^2+2ab+b^2 with a = ${a}, b = ${b} ===`);
}

testAPlusBSquare(new MyFrac(1, 3), new MyFrac(1, 6));
testAPlusBSquare(new MyComplex(1, 3), new MyComplex(1, 6));

// Створюємо масив MyFrac для сортування
const fractions = [
    new MyFrac(3, 4),
    new MyFrac(1, 2),
    new MyFrac(5, 6),
    new MyFrac(1, 3),
];

console.log("До сортування:");
fractions.forEach(frac => console.log(frac.toString()));

// Сортуємо масив
fractions.sort((a, b) => a.compareTo(b));

console.log("Після сортування:");
fractions.forEach(frac => console.log(frac.toString()));