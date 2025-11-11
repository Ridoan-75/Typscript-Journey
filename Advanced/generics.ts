/*
=============================================================
📘 Topic: Generics in TypeScript  
=============================================================
🔹 Generics হলো TypeScript-এর এমন একটি powerful feature 
   যা আমাদেরকে reusable এবং type-safe কোড লেখার সুযোগ দেয়।
🔹 Generics ব্যবহার করে আমরা কোনো function, class, বা interface লিখতে পারি 
   যা একাধিক data type handle করতে পারে — কিন্তু type safety বজায় রাখে।

=============================================================
🧩 ১️⃣ Why Generics? (Generics কেন দরকার?)
=============================================================
👉 ধরো তুমি একটা function লিখেছো যেটা একটা value return করবে।
   এখন তুমি চাও এই functionটা string, number, boolean — 
   যেকোনো type-এর data return করতে পারুক, কিন্তু type check ঠিক রাখুক।

📘 Without Generics:
-------------------------------------------------------------
*/

function identity1(value: any): any {
  return value; // ❌ এখানে type safety নেই
}

let a = identity1("Hello"); // string
let b = identity1(123);     // number
// কিন্তু compiler জানে না a বা b আসলে কী type — any type হয়ে যায়

/*
📘 With Generics:
-------------------------------------------------------------
Generics ব্যবহার করলে function call করার সময় type ধরে রাখা যায়।
*/

// <T> হলো একটি Generic Type Parameter
function identity2<T>(value: T): T {
  return value;
}

// এখন compiler বুঝতে পারছে type অনুযায়ী কাজ করতে হবে
let strValue = identity2<string>("Hello Generics"); // T = string
let numValue = identity2<number>(123);              // T = number

/*
=============================================================
🧩 ২️⃣ Generic Function — Default Type Parameter
=============================================================
👉 আমরা চাইলে generic parameter এর জন্য default type দিতে পারি।
*/

function showData<T = string>(data: T): T {
  return data;
}

const d1 = showData("Bangladesh"); // T = string (default)
const d2 = showData<number>(2025); // T = number (override default)

/*
=============================================================
🧩 ৩️⃣ Multiple Type Parameters
=============================================================
👉 Generics একাধিক type parameter নিতে পারে।
*/

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result1 = pair<string, number>("Age", 25); // [string, number]
const result2 = pair<boolean, string>(true, "Active"); // [boolean, string]

/*
=============================================================
🧩 ৪️⃣ Generics with Arrays
=============================================================
👉 Generic type ব্যবহার করে array-এর elements-এর type নির্ধারণ করা যায়।
*/

function getFirstItem<T>(items: T[]): T {
  return items[0];
}

const numArr = [10, 20, 30];
const firstNum = getFirstItem<number>(numArr); // 10

const strArr = ["A", "B", "C"];
const firstStr = getFirstItem(strArr); // TypeScript নিজে T = string ধরে নিচ্ছে

/*
=============================================================
🧩 ৫️⃣ Generics with Interface
=============================================================
👉 Interface-এর ভেতরেও Generics ব্যবহার করা যায় flexible structure তৈরি করতে।
*/

interface Box<T> {
  content: T; // content property টি generic
}

const stringBox: Box<string> = { content: "Hello Box" };
const numberBox: Box<number> = { content: 999 };

/*
=============================================================
🧩 ৬️⃣ Generics with Class
=============================================================
👉 Class-এ Generics ব্যবহার করলে সেটি যে কোনো data type handle করতে পারে।
*/

class DataStore<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  getItems(): T[] {
    return this.data;
  }
}

const numberStore = new DataStore<number>();
numberStore.addItem(10);
numberStore.addItem(20);

const stringStore = new DataStore<string>();
stringStore.addItem("Apple");
stringStore.addItem("Banana");

/*
=============================================================
🧩 ৭️⃣ Generics with Constraints (extends)
=============================================================
👉 কখনো আমরা চাই Generic type নির্দিষ্ট কিছু শর্ত পূরণ করুক।
👉 এজন্য আমরা "extends" ব্যবহার করি type constraint হিসেবে।
*/

interface Person {
  name: string;
  age: number;
}

// T অবশ্যই Person-এর মতো structure follow করতে হবে
function showPersonInfo<T extends Person>(person: T): void {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

const p1 = { name: "Ridoan", age: 22, city: "Dhaka" };
showPersonInfo(p1); // ✅ valid, কারণ name & age আছে

// showPersonInfo({ city: "Dhaka" }); ❌ invalid, কারণ name & age নেই

/*
=============================================================
🧩 ৮️⃣ keyof & Generics একসাথে ব্যবহার
=============================================================
👉 "keyof" দিয়ে object-এর key নামগুলো generic হিসেবে ব্যবহার করা যায়।
*/

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const student = { id: 101, name: "Nayeem", gpa: 3.9 };

const studentName = getProperty(student, "name"); // string
const studentGpa = getProperty(student, "gpa");   // number

/*
=============================================================
🧩 ৯️⃣ Generic Type Alias
=============================================================
👉 Type alias-এও Generics ব্যবহার করা যায়।
*/

type ApiResponse<T> = {
  status: number;
  data: T;
  message: string;
};

const userResponse: ApiResponse<{ name: string; age: number }> = {
  status: 200,
  data: { name: "Hasan", age: 25 },
  message: "Success",
};

/*
=============================================================
🧩 🔟 Summary (সংক্ষিপ্ত পুনরাবৃত্তি)
=============================================================
✅ Generics হলো dynamic type placeholder যা function, class, interface, type-এ ব্যবহার করা হয়।
✅ এটা type safety বজায় রেখে reusable code লিখতে সাহায্য করে।
✅ <T> হলো Generic Type Parameter — যেটা runtime-এ নয়, compile time-এ resolve হয়।
✅ Constraints দিয়ে Generics কে নির্দিষ্ট structure বা property অনুযায়ী সীমাবদ্ধ করা যায়।
✅ Generics + keyof = type-safe dynamic object access।

=============================================================
🎯 এক কথায়:
Generics = Reusable + Type-safe + Flexible কোড লেখার জন্য TypeScript-এর অন্যতম শক্তিশালী feature।
=============================================================
*/
