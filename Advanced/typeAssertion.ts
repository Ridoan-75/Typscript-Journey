/*  
===============================================
📘 Topic: Type Assertion in TypeScript  
===============================================

🔹 Type Assertion হলো TypeScript-এর একটি **feature**,  
যার মাধ্যমে আমরা কোনো value-এর type কে **manually** বলে দিতে পারি —  
মানে TypeScript compiler কে “বলানো হয়” যে,  
"এই value আসলে এই type-এর", এমনকি compiler যদি initially অন্য কিছু ধরে নেয় তবুও।

এটা JavaScript-এর runtime behavior change করে না,  
শুধুমাত্র compile-time এ TypeScript কে type-checking বুঝতে সাহায্য করে।

-----------------------------------------------
🧠 সহজ ভাষায়:
-----------------------------------------------
Type Assertion = আমরা compiler কে বুঝাই,  
"আমিই জানি value টা কী type-এর, তুমি চিন্তা কোরো না।"

-----------------------------------------------
📌 Syntax (দুটি উপায়ে লেখা যায়):
-----------------------------------------------

///  🟩 1️⃣ Angle-bracket syntax
let variableName = <Type>value;

///  🟩 2️⃣ as-syntax (recommended in React/JSX projects)
let variableName = value as Type;

-----------------------------------------------
📘 Example 1: Basic Type Assertion
-----------------------------------------------
*/

let someValue: unknown = "Hello TypeScript!";

// 🔸 TypeScript জানে না someValue string নাকি number,
// তাই আমরা assertion করে দিচ্ছি যে এটা আসলে string type
let stringLength: number = (someValue as string).length;

console.log(stringLength); // Output: 17

/*
🔍 ব্যাখ্যা:
- এখানে `someValue` এর type ছিল `unknown`, তাই TypeScript জানে না এর length property আছে কিনা।
- আমরা `(someValue as string)` লিখে compiler কে বলেছি, “এটা string, তাই .length ব্যবহার করা যাবে।”
*/


/*  
-----------------------------------------------
📘 Example 2: Angle Bracket Syntax
-----------------------------------------------
*/

let anotherValue: unknown = "Bangladesh";
let valueLength = (<string>anotherValue).length;

console.log(valueLength); // Output: 10

/*
🧾 Note:
Angle bracket syntax একই কাজ করে।
তবে যদি React/JSX ব্যবহার করো, সেখানে এই syntax কাজ করে না,
কারণ `<Type>` কে JSX tag ধরে নেয়।  
তাই React project এ `as` syntax always use করতে হয়।
*/


/*
-----------------------------------------------
📘 Example 3: Type Assertion in DOM Manipulation
-----------------------------------------------
*/

let inputElement = document.getElementById("username");

// 🔸 TypeScript ভাবে getElementById হয়তো null return করতে পারে,
// তাই আমরা assert করে দিচ্ছি যে এটা HTMLInputElement
let input = inputElement as HTMLInputElement;

input.value = "Ridoan"; // এখন error দেবে না

/*
🔍 ব্যাখ্যা:
- TypeScript ভাবে getElementById → HTMLElement | null return করে।
- কিন্তু আমরা জানি এই id আসলেই আছে, তাই আমরা বললাম এটা HTMLInputElement।
- assertion compiler কে আশ্বস্ত করে, runtime এ কোনো change করে না।
*/


/*
-----------------------------------------------
📘 Example 4: Type Assertion with Interface
-----------------------------------------------
*/

interface Person {
  name: string;
  age: number;
}

let person = {} as Person;
person.name = "Ridoan";
person.age = 22;

console.log(person);

/*
🔍 ব্যাখ্যা:
- এখানে আমরা একটা empty object `{}` তৈরি করেছি।
- তারপর বলেছি এই object টি `Person` interface এর মতো আচরণ করবে।
- compiler এখন বুঝবে যে person এর মধ্যে name ও age থাকা লাগবে।
*/


/*
-----------------------------------------------
📘 Example 5: Double Assertion (⚠️ Dangerous)
-----------------------------------------------
*/

let value: string = "TypeScript";

// 🔴 এখানে আমরা value কে first `unknown`, তারপর `number` এ cast করছি
let wrongAssertion = (value as unknown) as number;

console.log(wrongAssertion); // Runtime এ সমস্যা হতে পারে!

/*
⚠️ Explanation:
- Double assertion compiler কে বোকা বানায়।
- TypeScript ভাবে এটা ঠিক আছে, কিন্তু runtime এ error হতে পারে।
- তাই double assertion খুব সাবধানে use করতে হয় (usually avoid করাই ভালো)।
*/


/*
-----------------------------------------------
📘 When to Use Type Assertion:
-----------------------------------------------

✅ যখন TypeScript কোনো value এর type বুঝতে পারছে না, কিন্তু তুমি জানো সেটার exact type।
✅ যখন DOM থেকে element access করছো।
✅ যখন external data (যেমন API response) নিয়ে কাজ করছো, যেটার structure তুমি জানো।

-----------------------------------------------
🚫 When NOT to Use Type Assertion:
-----------------------------------------------

❌ যখন তুমি sure না value এর type কী।
❌ যখন শুধু error এড়ানোর জন্য assertion use করছো।
❌ যখন runtime এ সমস্যা হতে পারে (যেমন double assertion)।

-----------------------------------------------
📘 Summary:
-----------------------------------------------

🟩 Type Assertion শুধু compile-time helper, runtime behavior change করে না।  
🟩 React/JSX প্রজেক্টে সবসময় `as` syntax ব্যবহার করো।  
🟩 Use it responsibly — ভুলভাবে ব্যবহার করলে runtime error হতে পারে।

-----------------------------------------------
✅ Final Example Recap
-----------------------------------------------
*/

let message: unknown = "TypeScript is awesome!";

// 🟩 Safe and clear type assertion
let lengthOfMessage = (message as string).length;

console.log(`Message length is: ${lengthOfMessage}`); // Output: Message length is: 23
