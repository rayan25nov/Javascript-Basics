`interface` and `type` can often be used for similar purposes, but they have important differences that affect when you should use each one:

## Key Differences

### 1. **Declaration Merging**
**Interfaces** can be merged if declared multiple times:
```typescript
interface User {
  name: string;
}

interface User {
  age: number;
}

// Automatically merged into:
// interface User { name: string; age: number; }
```

**Types** cannot be merged - this will error:
```typescript
type User = {
  name: string;
}

type User = {  // ❌ Error: Duplicate identifier
  age: number;
}
```

### 2. **Primitive Types & Unions**
**Only `type` can alias primitives and create unions:**
```typescript
// ✅ Only possible with type
type Status = "loading" | "success" | "error";
type ID = string | number;
type Username = string;

// ❌ Not possible with interface
interface Status = "loading" | "success" | "error"; // Error
```

### 3. **Extending vs Intersection**
**Interfaces** use `extends`:
```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

**Types** use intersection (`&`):
```typescript
type Animal = {
  name: string;
}

type Dog = Animal & {
  breed: string;
}
```

### 4. **Complex Types**
**Types** are more powerful for complex scenarios:
```typescript
// ✅ Only possible with type
type EventHandler<T> = (event: T) => void;
type ApiResponse<T> = {
  data: T;
  status: number;
}
type ConditionalType<T> = T extends string ? string[] : T[];

// Tuples
type Coordinates = [number, number];

// Mapped types
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
}
```

## When to Use Each

### Use `interface` for:
- **Object shapes** (most common case)
- **Class contracts**
- **Public APIs** (can be extended by users)
- **When you want declaration merging**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserService {
  getUser(id: number): Promise<User>;
  createUser(data: Omit<User, 'id'>): Promise<User>;
}
```

### Use `type` for:
- **Primitive aliases**
- **Union types**
- **Function signatures**
- **Tuples**
- **Complex type computations**

```typescript
// Primitive & union types
type Theme = "light" | "dark";
type ID = string | number;

// Function types
type EventHandler = (event: Event) => void;

// Tuples
type RGB = [number, number, number];

// Complex computed types
type NonNullable<T> = T extends null | undefined ? never : T;
```

## Performance & Error Messages

**Interfaces** generally provide:
- Better error messages
- Slightly better performance for type checking
- Cleaner intellisense

**Types** can be:
- Slower for complex computations
- More verbose in error messages

## Best Practice Recommendation

**Modern TypeScript convention:**
```typescript
// ✅ Use interface for object shapes
interface User {
  name: string;
  age: number;
}

// ✅ Use type for everything else
type Status = "active" | "inactive";
type UserWithStatus = User & { status: Status };
type CreateUser = (user: Omit<User, 'id'>) => Promise<User>;
```

## Summary

| Feature | `interface` | `type` |
|---------|-------------|---------|
| Object shapes | ✅ Preferred | ✅ Works |
| Declaration merging | ✅ Yes | ❌ No |
| Primitive aliases | ❌ No | ✅ Yes |
| Union types | ❌ No | ✅ Yes |
| Function types | ✅ Works | ✅ Preferred |
| Tuples | ❌ No | ✅ Yes |
| Extending | ✅ `extends` | ✅ `&` |
| Complex types | ❌ Limited | ✅ Full power |
| Performance | ✅ Better | ⚠️ Can be slower |
| Error messages | ✅ Cleaner | ⚠️ More verbose |

**Simple rule:** Use `interface` for object contracts, use `type` for everything else!

## References
```
[1](https://www.geeksforgeeks.org/typescript/what-is-the-difference-between-interface-and-type-in-typescript/)
[2](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)
[3](https://www.typescriptlang.org/play/typescript/language-extensions/types-vs-interfaces.ts.html)
[4](https://www.reddit.com/r/webdev/comments/1e8ps37/type_vs_interface_typescript/)
[5](https://www.sitepoint.com/typescript-type-vs-interface/)
[6](https://blog.bitsrc.io/type-vs-interface-in-typescript-cf3c00bc04ae)
[7](https://blog.logrocket.com/types-vs-interfaces-typescript/)
[8](https://www.youtube.com/watch?v=e0AIkYrXAYE)
[9](https://www.totaltypescript.com/type-vs-interface-which-should-you-use)
```