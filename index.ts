// STATIC TYPING OF VARIABLES
// Define variable a as type string
let a: string = 'happy';
// Can reassign to another string value
a = 'cat';
// Cannot reassign to non-string value
// Errors on compile: Type '5' is not assignable to type 'string'
// a = 5;


// STATIC TYPING OF FUNCTIONS
function subtract(a: number, b: number): number {
    // Cannot return a type other than number
    // Errors on compile: Type '"i love butterflies"' is not assignable to type 'number'
    // return 'i love butterflies';

    // Must return a number
    return a - b;
}

console.log(subtract(4, 1));

// Cannot be called with arguments of a type other than number
// Errors on compile: Argument of type '"happy"' is not assignable to parameter of type 'number'
// console.log(subtract('happy', 'cat'));


// ANY TYPE
// If you set the type of a variable to type `any` it can be assigned a value of any type
let x: any = true;
x = 'please';
x = 5;

// It can be passed to any function no matter its defined argument types
console.log(subtract(x, 3)); // Returns 2
x = 'happy';
// Compiler will not error even though we are passing it a string but subtract is expecting a number
console.log(subtract(x, 3)); // Returns NaN


// GENERIC TYPES
function preferFirst<T>(a: T, b: T): T {
    // Cannot explicitely return string because that may not be the type of T
    // Error on compile: Type '"please"' is not assignable to type 'T'
    // return 'please';

    return a || b;
}

// Can call with two numbers, returning a numbers
console.log(preferFirst(1, 3)); // Returns 1
console.log(preferFirst(0, 3)); // Returns 3

// Can call with two strings, returning a string
console.log(preferFirst('happy', 'cat')); // Returns 'happy'
console.log(preferFirst('', 'cat')); // Returns 'cat'
// Cannot call with one argument a string and the other a number
// Error on compile: Argument of type '5' is not assignable to parameter of type '"happy"'
// console.log(preferFirst('happy', 5));

// Cannot perform operations that assume a certain type
// You must treat these variables defined as type T generically
// For example, you cannot add the two variables together because that's assuming that they are a type that supports the + operator
// Error on compile: Operator '+' cannot be applied to types 'T' and 'T'
// function add<T>(a: T, b: T): T {
//     return a + b;
// }

// Example with an array
function getFirst<T>(arr: T[]): T {
    return arr[0];
}
console.log(getFirst(['a', 'b', 'c'])); // Returns 'a'

// Example with multipe generic types
function matchConditions<T, K>(val1: T, val2: T, goodThings: K, badThings: K): K {
    if (val1 == val2) return goodThings;
    return badThings;
}
console.log(matchConditions(5, 5, 'yay', 'nay'));
console.log(matchConditions('yay', 'nay', true, false));
// Cannot call with val1 not matching type of val2 or goodThings not matching type of badThings
// Error on compile: Argument of type 'true' is not assignable to parameter of type 'string'
// console.log(matchConditions('yay', true, 'nay', false));

// TYPE ASSERTIONS
// let x: any = 5;
// // Currently the compiler understands that x is any kind of variable
// // And if we try to call our subtract fn with x the compiler will error since the subtract fn is expecting a number
// console.log(subtract(x, x));
// // Will error on compile
// // So we will need the compiler to understand that this is a number
// // Since we the developer know that it is, we can assert the type like this `<number> x`
// subtract(<number> x, <number> x);
