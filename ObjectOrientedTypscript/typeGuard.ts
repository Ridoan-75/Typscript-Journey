// ===============================================================
// 📌 Type Guard in TypeScript (using `typeof` and `in`)
// ===============================================================

// ===================================================================
// 🔥 1. TYPE GUARD কী? 
// ===================================================================
/*
Type Guard হলো এমন একটি বিশেষ টেকনিক যা TypeScript কে runtime এ 
বুঝতে সাহায্য করে কোন ভেরিয়েবলের actual type কি।

👉 সহজ ভাষায় — Type Guard = Type Checking Logic

এটা ব্যবহার করা হয় যখন union types থাকে এবং নির্দিষ্ট টাইপ অনুযায়ী
নিরাপদ ভাবে property বা method access করতে হয়।
*/



// ===================================================================
// 🔥 2. TYPE GUARD USING `typeof`
// ===================================================================
/*
`typeof` অপারেটর primitive types handle করার জন্য ব্যবহার হয়।

👉 primitive types:
- string
- number
- boolean
- bigint
- symbol
- undefined
- function (special case)

⚠️ OBJECT টাইপ চেক করতে typeof ভালো কাজ করে না।
*/

function printValue(value: string | number | boolean) {
  // typeof দিয়ে Type Guard করা হচ্ছে
  if (typeof value === "string") {
    // এখানে TS বুঝে গেছে "value" এখন string
    console.log(value.toUpperCase());  // string method use safe
  } 
  else if (typeof value === "number") {
    // এখানে TS বুঝেছে "value" এখন number
    console.log(value.toFixed(2));     // number method safe
  } 
  else {
    // বাকি possibility: boolean
    console.log(value ? "TRUE" : "FALSE");
  }
}



// ===================================================================
// 🔥 3. TYPE GUARD USING `in`
// ===================================================================
/*
`in` operator ব্যবহার হয় যখন object এর মধ্যে নির্দিষ্ট property আছে কিনা 
তা চেক করতে হয়।

👉 Object based union type handle করার জন্য সবচেয়ে ভালো উপায়।

syntax:
  "propertyName" in object

⚠️ শুধুমাত্র object type এ কাজ করবে
*/



// Example: দুই ধরনের user object
type Admin = {
  role: "admin";
  manageUsers: () => void;
};

type NormalUser = {
  role: "user";
  purchaseHistory: string[];
};

function handleUser(user: Admin | NormalUser) {
  // `in` operator দিয়ে Type Guard
  if ("manageUsers" in user) {
    // এখানে TS বুঝেছে এটি Admin type
    user.manageUsers();  
  } else {
    // এখানে বুঝেছে NormalUser
    console.log(user.purchaseHistory);
  }
}



// ===================================================================
// 🔥 4. আরেকটি Example: using `in` with class instances
// ===================================================================
/*
`in` operator class instance এর ক্ষেত্রেও দারুণ কাজ করে।

Class এ যদি আলাদা property থাকে তাহলে `in` দিয়ে type check করা যায়।
*/

class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

type Pet = Dog | Cat;

function playWithPet(pet: Pet) {
  if ("bark" in pet) {
    // Dog টাইপ
    pet.bark();
  } else {
    // Cat টাইপ
    pet.meow();
  }
}



// ===================================================================
// 🔥 5. কোন পরিস্থিতিতে কোন Type Guard ব্যবহার করবো?
// ===================================================================
/*
✔ typeof → primitive value check করার জন্য সবচেয়ে perfect  
✔ in → object বা class এর মধ্যে property আছে কিনা চেক করার জন্য নিখুঁত  
✔ instance of → class instance চেক করার জন্য উপযোগী
*/



// ===================================================================
// 🔥 6. Mini Practical Example 
// ===================================================================
/*
এখানে typeof এবং in দুটোই use করা হয়েছে।
*/

type Result = { value: number } | "error";

function process(result: Result) {
  if (typeof result === "string") {
    // এখানে result = "error"
    console.log("Something went wrong!");
  } else if ("value" in result) {
    // result এখন object type
    console.log("Value is:", result.value);
  }
}
