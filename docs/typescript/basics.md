# TypeScript Crash Course - Complete Guide with Code Examples

This comprehensive guide covers TypeScript fundamentals with practical code examples, based on modern TypeScript development practices.

## What is TypeScript?

TypeScript is an open-source programming language developed by Microsoft that is a **superset** of JavaScript. This means:
- Any valid JavaScript code is also valid TypeScript code
- It adds **static type definitions** to JavaScript
- Helps prevent errors during development through compile-time type checking
- Essential skill for modern web developers

```typescript
// JavaScript (valid in TypeScript too)
const message = "Hello World";
console.log(message);

// TypeScript with type annotations
const message: string = "Hello World";
const count: number = 42;
```

## Getting Started

### Installation & Setup

```bash
# Install TypeScript globally
npm install -g typescript

# Check TypeScript version
tsc --version

# Initialize TypeScript configuration
tsc --init

# Compile TypeScript file
tsc filename.ts

# Compile and watch for changes
tsc filename.ts --watch
```

### Project Structure
```
my-project/
├── src/
│   ├── index.ts
│   └── types.ts
├── dist/
├── tsconfig.json
└── package.json
```

## Core Concepts

### 1. Type Annotations

TypeScript provides several built-in types:

```typescript
// Primitive types
let userName: string = "John Doe";
let age: number = 25;
let isActive: boolean = true;
let amount: number = 99.99;

// Type inference (TypeScript automatically detects type)
let city = "New York"; // TypeScript infers this as string
let temperature = 72; // TypeScript infers this as number

// Null and undefined
let data: null = null;
let result: undefined = undefined;

// Multiple types can be assigned
let id: string | number = "user123";
id = 456; // Also valid
```

### 2. Arrays and Objects

```typescript
// Array types
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let mixed: (string | number)[] = ["hello", 42, "world"];

// Alternative array syntax
let scores: Array<number> = [95, 87, 92];

// Object types
let user: {
  name: string;
  age: number;
  isAdmin: boolean;
} = {
  name: "John",
  age: 30,
  isAdmin: false
};

// Nested objects
let product: {
  name: string;
  price: number;
  details: {
    weight: number;
    dimensions: string;
  };
} = {
  name: "Laptop",
  price: 999,
  details: {
    weight: 2.5,
    dimensions: "13x9x1 inches"
  }
};
```

### 3. Functions

```typescript
// Function with typed parameters and return type
function add(x: number, y: number): number {
  return x + y;
}

// Function with no return value (void)
function logMessage(message: string): void {
  console.log(message);
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// Default parameters
function createUser(name: string, role: string = "user"): object {
  return { name, role };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Arrow function types
const multiply = (a: number, b: number): number => a * b;

// Function type aliases
type MathOperation = (x: number, y: number) => number;
const divide: MathOperation = (a, b) => a / b;
```

### 4. Interfaces

Interfaces define the structure of objects and act as contracts:

```typescript
// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Using the interface
const newUser: User = {
  id: 1,
  name: "Jane Smith",
  email: "jane@example.com",
  isActive: true
};

// Optional properties
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional
  tags?: string[];     // Optional
}

// Readonly properties
interface Config {
  readonly apiUrl: string;
  readonly version: string;
  timeout: number;
}

// Method signatures in interfaces
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

// Interface for functions
interface SearchFunction {
  (query: string, limit: number): string[];
}

// Extending interfaces
interface Employee extends User {
  department: string;
  salary: number;
  startDate: Date;
}

const employee: Employee = {
  id: 2,
  name: "Bob Johnson",
  email: "bob@company.com",
  isActive: true,
  department: "Engineering",
  salary: 75000,
  startDate: new Date("2023-01-15")
};
```

### 5. Type Aliases

Type aliases create new names for existing types:

```typescript
// Basic type aliases
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

// Object type alias
type Address = {
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

// Function type alias
type EventHandler = (event: Event) => void;
type APIResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// Using type aliases
let userId: ID = "user_123";
let orderStatus: Status = "pending";

const userAddress: Address = {
  street: "123 Main St",
  city: "Boston",
  country: "USA",
  postalCode: "02101"
};
```

### 6. Union and Intersection Types

```typescript
// Union types (OR)
type StringOrNumber = string | number;
type Theme = "light" | "dark" | "auto";

function formatId(id: StringOrNumber): string {
  return `ID: ${id}`;
}

// Intersection types (AND)
type PersonalInfo = {
  name: string;
  age: number;
};

type ContactInfo = {
  email: string;
  phone: string;
};

type FullProfile = PersonalInfo & ContactInfo;

const profile: FullProfile = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
  phone: "555-0123"
};

// Complex unions
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: any;
};

type ErrorState = {
  status: "error";
  error: string;
};

type AppState = LoadingState | SuccessState | ErrorState;
```

### 7. Enums

Enums define a set of named constants:

```typescript
// Numeric enum (default)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// String enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Mixed enum
enum ResponseCode {
  Success = 200,
  NotFound = 404,
  Error = "ERROR"
}

// Using enums
function move(direction: Direction): void {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    default:
      console.log("Invalid direction");
  }
}

move(Direction.Up);

// Const enums (for performance)
const enum Size {
  Small = "S",
  Medium = "M",
  Large = "L"
}

const shirtSize = Size.Medium; // Inlined at compile time
```

### 8. Generics

Generics allow for flexible, reusable components:

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let stringResult = identity<string>("hello");
let numberResult = identity<number>(42);
let booleanResult = identity(true); // Type inference

// Generic array function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]); // number | undefined
const firstName = getFirstElement(["Alice", "Bob"]); // string | undefined

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class StorageContainer<T> implements Container<T> {
  constructor(private _value: T) {}

  getValue(): T {
    return this._value;
  }

  setValue(value: T): void {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }
}

// Usage
const stringContainer = new StorageContainer<string>("Hello");
const numberContainer = new StorageContainer<number>(42);

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // Works - string has length
logLength([1, 2, 3]); // Works - array has length
// logLength(42); // Error - number doesn't have length

// Multiple generic parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "John" }, { age: 30 });
// merged has type { name: string } & { age: number }
```

### 9. Classes

```typescript
// Basic class
class Person {
  // Properties
  private _name: string;
  public age: number;
  protected id: number;

  // Constructor
  constructor(name: string, age: number) {
    this._name = name;
    this.age = age;
    this.id = Math.random();
  }

  // Methods
  public getName(): string {
    return this._name;
  }

  public setName(name: string): void {
    this._name = name;
  }

  protected getId(): number {
    return this.id;
  }
}

// Inheritance
class Employee extends Person {
  private department: string;

  constructor(name: string, age: number, department: string) {
    super(name, age);
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `${this.getName()} works in ${this.department}`;
  }

  public getEmployeeId(): number {
    return this.getId(); // Can access protected member
  }
}

// Abstract class
abstract class Shape {
  abstract calculateArea(): number;
  
  public describe(): string {
    return `Area: ${this.calculateArea()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

### 10. Advanced Features

#### Readonly Properties
```typescript
interface User {
  readonly id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "John"
};

// user.id = 2; // Error: Cannot assign to 'id' because it is read-only

// Readonly arrays
const numbers: readonly number[] = [1, 2, 3];
// numbers.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'
```

#### Utility Types
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;
const updateUser: PartialUser = { name: "John" };

// Required - makes all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type CreateUser = Omit<User, 'id'>;

// Record - create object type with specific keys and values
type UserRoles = Record<string, string>;
const roles: UserRoles = {
  admin: "Administrator",
  user: "Regular User"
};
```

#### Type Guards
```typescript
// Type predicate function
function isString(value: any): value is string {
  return typeof value === 'string';
}

// Using type guards
function processValue(value: string | number) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}

// instanceof type guard
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's a Dog
  } else {
    animal.meow(); // TypeScript knows it's a Cat
  }
}
```

## Best Practices

### 1. Use Strict Mode
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### 2. Prefer Interfaces for Objects
```typescript
// ✅ Good
interface User {
  name: string;
  email: string;
}

// ✅ Use type for unions and primitives
type Status = "active" | "inactive";
type ID = string | number;
```

### 3. Use Generic Constraints
```typescript
// ✅ Good - constrained generic
interface HasId {
  id: number;
}

function updateEntity<T extends HasId>(entity: T, updates: Partial<T>): T {
  return { ...entity, ...updates };
}
```

### 4. Avoid `any` Type
```typescript
// ❌ Bad
function process(data: any): any {
  return data.someProperty;
}

// ✅ Good
function process<T>(data: T): T {
  return data;
}

// ✅ Or use unknown for truly unknown data
function parseJson(json: string): unknown {
  return JSON.parse(json);
}
```

## Common TypeScript Patterns

### API Response Handling
```typescript
interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<APIResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Usage
fetchUser(1).then(response => {
  console.log(response.data.name); // TypeScript knows this is a string
});
```

### Event Handling
```typescript
interface CustomEvent<T> {
  type: string;
  payload: T;
}

type UserEvents = 
  | CustomEvent<{ type: 'user-login'; payload: { userId: number } }>
  | CustomEvent<{ type: 'user-logout'; payload: {} }>
  | CustomEvent<{ type: 'user-update'; payload: { user: User } }>;

function handleUserEvent(event: UserEvents) {
  switch (event.type) {
    case 'user-login':
      console.log(`User ${event.payload.userId} logged in`);
      break;
    case 'user-logout':
      console.log('User logged out');
      break;
    case 'user-update':
      console.log(`User updated: ${event.payload.user.name}`);
      break;
  }
}
```

This guide covers the essential TypeScript concepts you need to start building type-safe applications. TypeScript's type system helps catch errors early, improves code documentation, and enhances developer experience with better IDE support.