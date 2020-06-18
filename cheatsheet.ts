// STATIC TYPING OF VARIABLES
// Define variable a as type string
let a: string = 'happy';
// Can reassign to another string value
a = 'cat';
// Cannot reassign to non-string value
// Error: Type '5' is not assignable to type 'string'
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
// Error: Argument of type '"happy"' is not assignable to parameter of type 'number'
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

// Can call with two numbers, returning a number
console.log(preferFirst(1, 3)); // Returns 1
console.log(preferFirst(0, 3)); // Returns 3

// Can call with two strings, returning a string
console.log(preferFirst('happy', 'cat')); // Returns 'happy'
console.log(preferFirst('', 'cat')); // Returns 'cat'
// Cannot call with one argument a string and the other a number
// Error: Argument of type '5' is not assignable to parameter of type '"happy"'
// console.log(preferFirst('happy', 5));

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
// Error: Argument of type 'true' is not assignable to parameter of type 'string'
// console.log(matchConditions('yay', true, 'nay', false));

// Cannot perform operations that assume a certain type
// You must treat these variables defined as type T generically
// For example, you cannot call .length on the parameter because you are assuming the type it will be called with supports that
// Error: Property 'length' does not exist on type 'T'
// function logLength<T>(a: T): T {
//     let length = a.length;
//     console.log(length);
//     return a;
// }

// TYPE ASSERTIONS
// Currently the compiliers understanding of the parameter `a` is that it could be any type of variable
// So we cannot take advantage of type-specific features like `+` or `.length`
// But if we know that the variable will actually be a more specific type (such as a string)
// We can assert that the varable is this specific type to gain type-specific behavior
function logLength<T>(a: T): T {
    // Make a new variable called `aStr` that has the value of `a` but is recognized by the compiler as a string
    let aStr: string = a as unknown as string;
    // Below is an alternate notation but is discourage because it can be ambiguous with React's JSX notation
    // let aStr: string = <string><unknown> a;
    console.log(aStr.length);
    return a;
}

// INTERFACES
// In Javascript, would could define an object and add or change whatever properties you want at anytime
// But in typescript, the compiler needs to be told what properties to expect on the object
// Error: Property 'sound' does not exist on type 'object'
// let hilda: object = { sound: 'woof' };
// hilda.sound = 'booff';

// We need to define an Interface that will say what properties the object will have
interface Doggo {
    sound: string,
    age: number,
}
let hilda: Doggo = { sound: 'woof', age: 6 };
hilda.sound = 'booff';

// We can use these interfaces like we use any other type (ex boolean, number)
// They can be used in function definitions
function bark(dog: Doggo): void {
    console.log(dog.sound);
}
bark(hilda);

// Even if an object has all the properties of Doggo, the function won't accept it
// Error: Type '{}' is missing the following properties from type 'Doggo': sound, age
// let fido: object = {sound: 'woodle', age: 9};
// bark(fido);

// Since Doggo is defined to have both properties `sound` and `age` you cannot define a Doggo without them
// Error: Property 'age' is missing in type '{ sound: string; }' but required in type 'Doggo'
// let peppa: Doggo = { sound: 'yap' };
// peppa.age = 7;

// You may want to be able to define an object but add values later
// To do this you need to define the properties as optional
interface ChillDoggo {
    sound?: string,
    age?: number,
};
let peppa: ChillDoggo = {};
peppa.sound = 'yap';
peppa.age = 7;
