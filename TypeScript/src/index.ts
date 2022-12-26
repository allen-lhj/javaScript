let myName: string = "Alice";

// parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

function getFavoriteNumber(): number {
  return 2;
}

// Anonymous Funciton
const names = ["Alice", "Bob", "Eve"];

names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Object anotation

function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 4 });

// Optional Properties

function printName(obj: { first: string; last?: string }) {}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// type aliases and union types

type Point = {
  x: number;
  y: number | string;
};

function printSomeThing(pt: Point) {}

// Interfaces
// An interface declaration is another way to name an object type:

interface Points {
  x: number;
  y: number;
}

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// Type Assertions

// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
// neither type sufficiently overlaps with the other. so we need to convert the expression to 'unknown' first.
const x = "hello" as unknown as number;

// Literal Types
let y: "hello" = "hello";

// y = "world"; error "world" is not assignalbe to type "hello"

// It's no much use to have a variable that can obly have one value!
// But by combining literals into unions, we can exporess a much more useful concept.
function printText(s: string, aligment: "left" | "right" | "center") {}
// Numeric literal types work the same way:
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
// and combine these with non-literal types:

interface Options {
  width: number;
}
function configure(x: Options | "atuo") {
  //...
}
configure({ width: 20 });
configure("atuo");

// Literal Interface
const req = { url: "https://example.com", method: "GET" };
function handleRequest(url: string, method: "GET" | "POST") {}

// handleRequest(req.url, req.method); Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'

// Change1
handleRequest(req.url, req.method as "GET");
// Change2
// const req = { url: "https://example.com", method: "GET" as "GET"};

// as const
// The as const suffix acts like const but for the type system,
// ensuring that all properties are assigned the literal type instead of a more general version like string or number.
// const req = { url: "https://example.com", method: "GET" } as const;
