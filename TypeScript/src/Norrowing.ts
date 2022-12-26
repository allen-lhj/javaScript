// Argument of type 'string | number' is not assignable to parameter of type 'number'

function padLeft(padding: string | number, input: string) {
  // return " ".repeat(padding) + input;
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
}

// Object is possibly 'null'

function printAll(strs: string | string[] | null) {
  // in javascript null also actually object
  if (typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
// fix

function printAllFix(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
// when strs is a string type, it will enter the first if statement and do nothing
function printAllBad(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
// Equality narrowing
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // we can now call any 'string' method on 'x' or 'y',
    // When we checked that x and y are both equal in the above example, TypeScript knew their types also had to be equal.
    x.toLocaleLowerCase();

    y.toLocaleLowerCase;
  } else {
    console.log(x);

    console.log(y);
  }
}

// done a specific check to block out nulls, and TypeScript still correctly removes null

function printAllString(strs: string | string[] | null) {
  // !=
  if (strs != null) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
