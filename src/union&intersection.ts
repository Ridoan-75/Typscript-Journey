/* 
===========================================================
📘 Topic: Union এবং Intersection Types in TypeScript
===========================================================

🧠 সংক্ষিপ্ত ধারণা:
--------------------------------
TypeScript-এ `Union` এবং `Intersection` টাইপ ব্যবহার করা হয় একাধিক টাইপ একসাথে
manage করার জন্য। কিন্তু দুটির কাজ আলাদা।

1️⃣ **Union Type (|)** → একাধিক টাইপের মধ্যে **যেকোনো একটিকে** ব্যবহার করা যায়।
2️⃣ **Intersection Type (&)** → একাধিক টাইপের **সবগুলোর বৈশিষ্ট্য একসাথে** থাকতে হবে।

চলো ধাপে ধাপে শিখি 👇
*/


// ========================================
// 🔹 1. Union Type (|)
// ========================================

/*
👉 ব্যাখ্যা:
Union Type তখন ব্যবহার করা হয়, যখন আমরা চাই একটি variable একাধিক টাইপ ধারণ করতে পারে।
মানে: variable টি একবার string হতে পারে, আবার number ও হতে পারে।

Syntax:
    let variableName: type1 | type2 | type3 = value;
*/

let id: string | number; // id হয় string হবে, নয়তো number হবে

id = 101;           // ✅ number allowed
id = "RID-2025";    // ✅ string allowed
// id = true;       // ❌ boolean allowed না কারণ union-এ শুধু string | number আছে


/*
👉 উদাহরণ (Function সহ):
একটি ফাংশন যেটি number অথবা string ইনপুট নেয় এবং string হিসেবে return করে।
*/

function printId(id: string | number): string {
    // typeof দিয়ে চেক করা হচ্ছে কোন টাইপের ভ্যালু এসেছে
    if (typeof id === "string") {
        return `Your ID (string): ${id.toUpperCase()}`;
    } else {
        return `Your ID (number): ${id.toFixed(0)}`;
    }
}

console.log(printId(12345));      // 👉 Output: Your ID (number): 12345
console.log(printId("abc123"));   // 👉 Output: Your ID (string): ABC123


/*
👉 Array তে Union Type:
Array তেও Union Type ব্যবহার করা যায়।
*/

let data: (string | number)[] = ["Dhaka", 2025, "Bangladesh", 100];
console.log(data); // ["Dhaka", 2025, "Bangladesh", 100]


// ========================================
// 🔹 2. Intersection Type (&)
// ========================================

/*
👉 ব্যাখ্যা:
Intersection Type তখন ব্যবহার করা হয়, যখন আমরা চাই দুটি বা একাধিক টাইপের
সব property/feature একত্রিত হয়ে একটি নতুন টাইপ তৈরি হোক।

Syntax:
    type Combined = TypeA & TypeB;
*/

type Person = {
    name: string;
    age: number;
};

type Contact = {
    email: string;
    phone: string;
};

// Intersection এর মাধ্যমে Person + Contact মিলে এক নতুন টাইপ তৈরি হলো
type Employee = Person & Contact;

// এখন Employee টাইপের object এ অবশ্যই Person এবং Contact দুইটার property থাকতে হবে
const employee1: Employee = {
    name: "Ridoan",
    age: 25,
    email: "ridoan@example.com",
    phone: "017XXXXXXXX"
};

console.log(employee1);


/*
👉 ব্যাখ্যা:
Intersection type মূলত ‘merge’ বা ‘combine’ করে একাধিক টাইপের
সকল property-কে একটি টাইপে নিয়ে আসে।
*/


// ========================================
// 🔹 3. Union vs Intersection Difference
// ========================================

/*
|--------------------------|------------------------------|
|       Union ( | )        |      Intersection ( & )      |
|--------------------------|------------------------------|
| Either one type allowed  | Must satisfy all types       |
| উদাহরণ: string | number  | উদাহরণ: Person & Contact    |
|--------------------------|------------------------------|
*/

type A = { x: number };
type B = { y: number };

let unionExample: A | B;
let intersectionExample: A & B;

// Union: x বা y যেকোনো একটি থাকতে পারে
unionExample = { x: 10 };
unionExample = { y: 20 };
// unionExample = { x: 10, y: 20 }; // ✅ এটাও technically allowed কারণ A | B তে দুটি property থাকলে সমস্যা নেই

// Intersection: x এবং y দুটোই থাকতে হবে
intersectionExample = { x: 10, y: 20 }; // ✅ সব property থাকতে হবে


// ========================================
// 🔹 4. Complex Example with Function
// ========================================

/*
👉 নিচে একটি উদাহরণ দেওয়া হলো যেখানে Union এবং Intersection একসাথে ব্যবহার করা হয়েছে।
*/

type Admin = {
    role: "admin";
    permissions: string[];
};

type User = {
    username: string;
    email: string;
};

type AdminUser = Admin & User; // Intersection Type

function getUserInfo(user: Admin | User): void {
    // Union: Admin বা User যেকোনো একটা হতে পারে
    console.log("Username:", (user as User).username || "N/A");
    
    // Intersection নয় তাই permission থাকতে পারে না সবসময়
    if ("permissions" in user) {
        console.log("Permissions:", user.permissions);
    }
}

const adminUser: AdminUser = {
    role: "admin",
    permissions: ["create", "delete"],
    username: "ridoan_admin",
    email: "admin@example.com"
};

getUserInfo(adminUser); // Output: Username: ridoan_admin, Permissions: [ 'create', 'delete' ]


// ========================================
// 🔹 5. Real Life Use Case Example
// ========================================

/*
👉 ধরো, আমরা এমন একটা system বানাচ্ছি যেখানে user একাধিক role রাখতে পারে।
যেমন:
    - একটি সাধারণ User হতে পারে
    - আবার Manager হিসেবেও কাজ করতে পারে
*/

type BasicUser = {
    username: string;
    isActive: boolean;
};

type Manager = {
    department: string;
    teamSize: number;
};

type ManagerUser = BasicUser & Manager; // Intersection ব্যবহার করে একত্র করা হলো

const manager1: ManagerUser = {
    username: "john_doe",
    isActive: true,
    department: "IT",
    teamSize: 12
};

console.log(manager1);


/*
===========================
✅ সারাংশ (Summary)
===========================

🔸 Union Type (|):
   ➤ যখন একটি ভ্যালু একাধিক টাইপের মধ্যে যেকোনো একটি হতে পারে।
   ➤ উদাহরণ: string | number

🔸 Intersection Type (&):
   ➤ যখন একটি ভ্যালু একাধিক টাইপের সবগুলো বৈশিষ্ট্য একসাথে ধারণ করে।
   ➤ উদাহরণ: Person & Contact

🔸 ব্যবহারের জায়গা:
   ➤ Union: Flexible type condition তৈরি করতে।
   ➤ Intersection: Composite object বা multiple interface combine করতে।

===========================
*/
