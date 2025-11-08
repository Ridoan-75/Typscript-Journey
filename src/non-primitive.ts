// ===========================================================
// 🔹 Non-Primitive (Reference) Data Types in TypeScript
// ===========================================================
// Primitive data types ছিল:
// string, number, boolean, null, undefined, symbol, bigint
//
// Non-Primitive data types মানে এমন ডেটা টাইপ যেগুলো “reference” আকারে
// মেমোরিতে সংরক্ষিত হয়। অর্থাৎ variable নিজে value ধরে না, বরং value-এর
// মেমোরি লোকেশনের একটি reference ধরে রাখে।
//
// ✅ Primitive data → immutable (অপরিবর্তনযোগ্য)
// ✅ Non-Primitive data → mutable (পরিবর্তনযোগ্য)
// ===========================================================


// ===========================================================
// 🔸 1. OBJECT
// ===========================================================
// Object হলো key-value pair আকারে ডেটা রাখার container।
// প্রতিটি key-এর সাথে একটি value যুক্ত থাকে, এবং key সবসময় string (বা symbol) হয়।

let person: { name: string; age: number; isStudent: boolean } = {
  name: "Ridoan",
  age: 23,
  isStudent: true
}

// Object থেকে ডেটা বের করা
console.log(person.name) // Output: Ridoan
console.log(person["age"]) // Output: 23

// Object পরিবর্তন করা যায় (mutable)
person.age = 24
console.log(person.age) // Output: 24


// ===========================================================
// 🔸 2. ARRAY
// ===========================================================
// Array হলো ordered collection of values।
// একই টাইপের মান রাখতেও পারো, আবার mixed টাইপও রাখতে পারো (union ব্যবহার করে)।

let numbers: number[] = [10, 20, 30, 40]
let names: string[] = ["Ridoan", "Hasan", "Naim"]
let mixed: (string | number)[] = ["Ridoan", 23, "Student", 99]

// Array element অ্যাক্সেস করা
console.log(numbers[2]) // Output: 30

// নতুন মান যোগ করা যায়
numbers.push(50)
console.log(numbers) // Output: [10, 20, 30, 40, 50]


// ===========================================================
// 🔸 3. FUNCTION
// ===========================================================
// Function হলো reusable code block। TypeScript-এ আমরা
// parameter এবং return type দুটোই define করতে পারি।

function add(a: number, b: number): number {
  return a + b
}

const greet = (name: string): string => {
  return `Hello, ${name}!`
}

console.log(add(5, 7)) // Output: 12
console.log(greet("Ridoan")) // Output: Hello, Ridoan!


// ===========================================================
// 🔸 4. TUPLE
// ===========================================================
// Tuple হলো fixed size এবং fixed order array।
// প্রতিটি index-এর টাইপ আগেই নির্ধারিত থাকে।

let user: [number, string, boolean]
user = [1, "Ridoan", true]

console.log(user[1]) // Output: Ridoan

// ❌ ভুল উদাহরণ: নিচের কোডে order ভুল হওয়ায় error দেবে
// user = ["Ridoan", 1, true]


// ===========================================================
// 🔸 5. ENUM
// ===========================================================
// Enum ব্যবহার করা হয় constant values এর group তৈরি করতে।
// এগুলো কোডকে পড়তে সহজ করে এবং typo কমায়।

enum Role {
  Admin,
  User,
  Guest
}

let myRole: Role = Role.Admin
console.log(myRole) // Output: 0 (default index number)

// Custom string values সহ Enum
enum Status {
  Success = "SUCCESS",
  Error = "ERROR",
  Pending = "PENDING"
}

let currentStatus: Status = Status.Success
console.log(currentStatus) // Output: SUCCESS


// ===========================================================
// 🔸 6. OBJECT ARRAY (Complex Type Example)
// ===========================================================
// Object এর array তৈরি করতে পারি নিচের মতো।

let users: { id: number; name: string }[] = [
  { id: 1, name: "Ridoan" },
  { id: 2, name: "Hasan" },
  { id: 3, name: "Naim" }
]

console.log(users[1].name) // Output: Hasan


// ===========================================================
// 🔸 7. FUNCTION INSIDE OBJECT (Method)
// ===========================================================
// Object এর ভিতরে function রাখলে তাকে method বলা হয়।

let student = {
  name: "Ridoan",
  age: 23,
  greet(): void {
    console.log(`Hello, I am ${this.name}`)
  }
}

student.greet() // Output: Hello, I am Ridoan


// ===========================================================
// 🔸 8. COMPARISON BETWEEN PRIMITIVE & NON-PRIMITIVE
// ===========================================================
// Primitive data value দ্বারা তুলনা হয়,
// কিন্তু Non-Primitive data reference দ্বারা তুলনা হয়।

let a = [1, 2]
let b = [1, 2]

console.log(a === b) // Output: false (কারণ reference আলাদা)

// কিন্তু নিচের ক্ষেত্রে reference একই, তাই true হবে
let c = a
console.log(a === c) // Output: true.


// ===========================================================
// 🧠 Summary: Non-Primitive Data Types
// ===========================================================
//
// 1️⃣ Object → Key-Value data structure
// 2️⃣ Array → Ordered list of values
// 3️⃣ Function → Reusable code block
// 4️⃣ Tuple → Fixed type & order array
// 5️⃣ Enum → Named constant group
// 6️⃣ Object Array → Object-এর collection
// 7️⃣ Method → Object-এর ভিতরে function
//
// ✅ Non-Primitive data গুলো mutable
// ✅ Heap memory তে store হয়
// ✅ Reference দ্বারা compare হয়
//
// ===========================================================