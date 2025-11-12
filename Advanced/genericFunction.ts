/* 
====================================================
🎯 Generics with Functions in TypeScript
====================================================

📘 ভূমিকা:
----------------
➡ Generics হলো TypeScript-এর একটি শক্তিশালী ফিচার যা আমাদের কোডকে **reusable (পুনরায় ব্যবহারযোগ্য)** এবং **type-safe (টাইপ নিরাপদ)** করে তোলে।
➡ Function-এ Generics ব্যবহার করলে আমরা এমন function বানাতে পারি যা একাধিক data type (string, number, object ইত্যাদি)-এর জন্য কাজ করতে পারে, 
   তবুও type-checking বজায় রাখে।

===============================
🔹 Basic Concept:
===============================
যখন আমরা একটি function লিখি, তখন আমরা চাই না এটি শুধু এক ধরনের data (যেমন string বা number) হ্যান্ডেল করুক।
Generics ব্যবহার করলে আমরা সেই function কে flexible করতে পারি যাতে এটি যেকোনো data type-এর সাথে কাজ করে।
*/

function identity<T>(value: T): T {
  // এখানে <T> হলো Generic Type Parameter
  // function parameter "value" এর টাইপ T
  // এবং return টাইপও T
  return value;
}

/* 
➡ এখন এই function যেকোনো টাইপের data নিতে পারবে, 
   কিন্তু type-safety হারাবে না।
*/

let result1 = identity<string>("Hello TypeScript"); // ✅ string টাইপ
let result2 = identity<number>(100); // ✅ number টাইপ
let result3 = identity<boolean>(true); // ✅ boolean টাইপ

/*
===============================
🔹 Generic Type Inference:
===============================
➡ TypeScript সাধারণত নিজেই argument থেকে টাইপটি বুঝে নেয়।
*/

let result4 = identity("Generic Auto Type Inference"); // এখানে <string> লেখা লাগছে না, TS নিজেই বুঝে নিচ্ছে এটা string।

/*
===============================
🔹 Multiple Type Parameters:
===============================
➡ কখনো কখনো function এ একাধিক টাইপ প্যারামিটার লাগতে পারে।
*/

function merge<T, U>(a: T, b: U): [T, U] {
  // দুটি ভিন্ন টাইপের ভ্যালুকে একত্রে tuple আকারে return করবে
  return [a, b];
}

let merged = merge<string, number>("Age", 25); // ✅ ['Age', 25]
let mergedAuto = merge("Name", true); // ✅ TS নিজেই বুঝে নেয় টাইপ [string, boolean]

/*
===============================
🔹 Generics with Constraints (extends keyword)
===============================
➡ অনেক সময় আমরা চাই যে Generic টাইপটি নির্দিষ্ট কিছু property বা structure follow করুক।
➡ এজন্য আমরা "extends" keyword ব্যবহার করি।
*/

interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  // এখানে T এমন কিছু হবে যার length প্রপার্টি আছে (যেমন string, array ইত্যাদি)
  console.log("Length is:", item.length);
}

logLength("Hello"); // ✅ string এর length আছে
logLength([1, 2, 3]); // ✅ array এর length আছে
// logLength(123); ❌ Error: number-এর কোনো length property নেই

/*
===============================
🔹 Generic Function with Default Type:
===============================
➡ আমরা চাইলে কোনো generic parameter-এর জন্য default টাইপ দিতে পারি।
*/

function printValue<T = string>(value: T): void {
  console.log("Value:", value);
}

printValue("Ridoan"); // ✅ এখানে T হলো string (default)
printValue<number>(500); // ✅ number ও দেওয়া যায়

/*
===============================
🔹 Generic Function with Arrow Function Syntax:
===============================
➡ Function Expression বা Arrow Function-এও generics ব্যবহার করা যায়।
*/

const getFirstElement = <T>(arr: T[]): T => {
  // যেকোনো টাইপের array নিয়ে তার প্রথম element return করবে
  return arr[0];
};

let firstString = getFirstElement<string>(["A", "B", "C"]); // ✅ 'A'
let firstNumber = getFirstElement<number>([10, 20, 30]); // ✅ 10

/*
===============================
🔹 Generic Function with Keyof Operator:
===============================
➡ keyof ব্যবহার করে আমরা object-এর key গুলির উপর type constraint দিতে পারি।
*/

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  // এখানে key এমন কিছু হতে হবে যা obj-এর key হিসেবে বিদ্যমান
  return obj[key];
}

const person = { name: "Ridoan", age: 23 };
let personName = getProperty(person, "name"); // ✅ ঠিক আছে
// let wrongKey = getProperty(person, "address"); ❌ Error: 'address' object এ নেই

/*
===============================
📌 Summary (সারাংশ):
----------------
✅ Generics function কে reusable এবং type-safe করে তোলে।
✅ <T> হলো generic type parameter।
✅ আমরা multiple generic parameter ব্যবহার করতে পারি যেমন <T, U>।
✅ extends দিয়ে constraint দেওয়া যায়।
✅ default type ও সেট করা যায়।
✅ Arrow function এও generics ব্যবহার করা সম্ভব।
✅ keyof এর মাধ্যমে object key কে type-safe করা যায়।
*/

