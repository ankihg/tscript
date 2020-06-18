// STATIC TYPING OF VARIABLES
let a: string = 'happy';
a = 'please';
// a = 5;


// STATIC TYPING FUNCTIONS
function subtract(a: number, b: number): number {
    // return 'help'
    return a - b;
}

subtract(5, 3)
// subtract('abc', 3)

// DISCUSS TYPE ASSUMPTIONS

// ANY
let x: any = true;
x = 'please';
x = 5;

console.log(subtract(x, 3));
x = 'help'
console.log(subtract(x, 3));

// GENERICS TYPES
function preferFirst<T>(a: T, b: T) : T {
    return a || b;
}

console.log(preferFirst(5, 3));
console.log(preferFirst('gold', 'finch'));
// console.log(preferFirst('gold', 5));


// ARRAY
// let nums: number[];
// let nums: Array<number> = [];
let nums: Array<number> = new Array<number>(1,2,3);
nums.push(7);
nums.push(8);
console.log(nums);





// let words: string[] = ['a', 'b']
