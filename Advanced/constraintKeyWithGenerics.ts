/*
===========================================================
📘 Topic: keyof Constraint with Generics in TypeScript
===========================================================

🧠 ভূমিকা:
---------------
TypeScript-এ "keyof constraint" ব্যবহারের মূল উদ্দেশ্য হলো 
Generics এর মাধ্যমে এমনভাবে type-safe access তৈরি করা যাতে আমরা 
object-এর key নাম অনুযায়ী কাজ করতে পারি এবং ভুল property access করলে 
compiler ত্রুটি (error) দেয়।

এটা মূলত “Generics + keyof” একসাথে ব্যবহার করে এমন constraint তৈরি করে 
যাতে Generic parameter শুধুমাত্র কোনো object-এর বিদ্যমান key গুলোকেই গ্রহণ করে।

-----------------------------------------------------------
🔹 Syntax:
-----------------------------------------------------------

function functionName<T, K extends keyof T>(obj: T, key: K): ReturnType {
    // এখানে key সর্বদা obj-এর একটি valid property name হবে
}

এখানে:
➡️ `T` হলো Generic type (object)
➡️ `K` হলো সেই object `T` এর key গুলোর একটি (keyof T)
➡️ `extends keyof T` মানে — `K` শুধুমাত্র `T` এর বৈধ (valid) key গুলোকেই গ্রহণ করবে
*/




// ✅ উদাহরণ ১: সাধারণ keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  // এখানে T[K] মানে হলো object-এর সেই property-এর টাইপ যেটি key দ্বারা নির্দেশিত
  return obj[key];
}

// Example object
const person = {
  name: "John",
  age: 30,
  city: "Dhaka"
};

// এখন key হিসেবে শুধুমাত্র 'name', 'age', 'city' — এই গুলিই দেওয়া যাবে
console.log(getProperty(person, "name")); // ✅ "John"
console.log(getProperty(person, "age"));  // ✅ 30
// console.log(getProperty(person, "country")); ❌ Error: Argument of type '"country"' is not assignable to parameter of type '"name" | "age" | "city"'



/*
-----------------------------------------------------------
🔹 ব্যাখ্যা:
-----------------------------------------------------------
👉 এখানে `keyof T` মানে হলো: T object-এর সব property নামের union তৈরি করা।
   যেমন: keyof typeof person = "name" | "age" | "city"

👉 `K extends keyof T` মানে — এখন K শুধুমাত্র ওই union-এর কোনো একটি হতে পারবে।
👉 ফলে TypeScript নিশ্চিত করছে যে, আমরা শুধুমাত্র বৈধ property access করছি।
*/




// ✅ উদাহরণ ২: keyof constraint ব্যবহার করে dynamic access
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

function printProductProperty<T, K extends keyof T>(product: T, key: K): void {
  console.log(`Property ${String(key)}:`, product[key]);
}

const laptop: Product = {
  id: 101,
  name: "Asus VivoBook",
  price: 80000,
  category: "Electronics"
};

printProductProperty(laptop, "name");      // ✅ Property name: Asus VivoBook
printProductProperty(laptop, "price");     // ✅ Property price: 80000
// printProductProperty(laptop, "brand");  ❌ Error (brand key নেই Product type-এ)




/*
-----------------------------------------------------------
🔹 keyof constraint বাস্তবে কিভাবে সাহায্য করে?
-----------------------------------------------------------

✅ টাইপ সেফটি (Type Safety):
   - আপনি কোনো invalid key ব্যবহার করলে compiler error দেখায়।
✅ কোডের রিডেবিলিটি (Readability):
   - Developer সহজে বুঝতে পারে কোন property গুলো access করা সম্ভব।
✅ রিইউজেবল কোড (Reusable Code):
   - একবার generic function লিখলে তা যেকোনো object type-এর সাথে কাজ করবে।
*/



// ✅ উদাহরণ ৩: keyof constraint এর সাহায্যে Object property copy
function copyProperty<T, K extends keyof T>(source: T, target: T, key: K): void {
  target[key] = source[key];
}

let user1 = { name: "Alice", age: 25 };
let user2 = { name: "Bob", age: 30 };

copyProperty(user1, user2, "name");
console.log(user2.name); // ✅ Alice (user1 থেকে copy হয়েছে)
// copyProperty(user1, user2, "address"); ❌ Error (address key নেই user type-এ)



/*
-----------------------------------------------------------
📦 Summary:
-----------------------------------------------------------

1️⃣ `keyof T` → T object-এর সব property নামের union তৈরি করে।
2️⃣ `K extends keyof T` → K কে constrain করে শুধুমাত্র ঐ property নামগুলোর মধ্যে সীমাবদ্ধ রাখে।
3️⃣ `T[K]` → ঐ নির্দিষ্ট key-এর corresponding value type প্রদান করে।
4️⃣ এটি type-safe property access নিশ্চিত করে।

-----------------------------------------------------------
🔹 মনে রাখার জন্য Shortcut:
-----------------------------------------------------------
T  → Generic object type  
keyof T  → Object এর সব key এর union  
K extends keyof T  → K অবশ্যই ঐ key গুলোর একটিই হতে পারবে  
T[K] → সেই key এর value type

-----------------------------------------------------------
✅ Practical Use Case:
-----------------------------------------------------------
- Object property access (type-safe ভাবে)
- Utility functions তৈরি করা
- Deep copy, merge, বা data mapping এর সময় property validation

===========================================================
🎯 সংক্ষেপে: keyof constraint আমাদের TypeScript generics কে
আরও শক্তিশালী, type-safe এবং error-free করে তোলে।
===========================================================
*/
