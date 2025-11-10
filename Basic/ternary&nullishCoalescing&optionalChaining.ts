/* 
===========================================================================================================================
📘 Topic: Ternary Operator, Nullish Coalescing Operator (??), এবং Optional Chaining (?.) in TypeScript 
===========================================================================================================================

🧠 সংক্ষিপ্ত ধারণা:
--------------------------------
এগুলো তিনটি TypeScript/JavaScript-এর অত্যন্ত গুরুত্বপূর্ণ এবং
দৈনন্দিন কাজে ব্যবহৃত conditional operators।

👉 তিনটি operator-এর মূল কাজ সংক্ষেপে:
    1️⃣ Ternary Operator (?:) → শর্ত অনুযায়ী দুটি মানের মধ্যে একটি বেছে নেয়।
    2️⃣ Nullish Coalescing Operator (??) → কোনো মান null বা undefined হলে বিকল্প মান দেয়।
    3️⃣ Optional Chaining Operator (?.) → nested object/property নিরাপদভাবে access করতে সাহায্য করে।

চলো ধাপে ধাপে সবগুলো operator ব্যাখ্যা সহ কোডে দেখি 👇
*/


// ==================================================
// 🔹 1. Ternary Operator (Conditional Operator)
// ==================================================

/*
👉 ব্যাখ্যা:
Ternary Operator হলো if-else এর শর্ট ভার্সন।
এটা condition অনুযায়ী দুটি value-এর মধ্যে একটি রিটার্ন করে।

Syntax:
    condition ? value_if_true : value_if_false;
*/

let age: number = 20;

// সাধারণ if-else ব্যবহার করলে:
if (age >= 18) {
    console.log("✅ You are an adult.");
} else {
    console.log("❌ You are not an adult.");
}

// একই কাজ Ternary Operator দিয়ে:
age >= 18 
    ? console.log("✅ You are an adult (ternary).") 
    : console.log("❌ You are not an adult (ternary).");


/*
👉 Ternary Operator Function Example:
*/

function getStatus(score: number): string {
    return score >= 60 ? "Pass" : "Fail"; // যদি 60 বা তার বেশি হয়, তাহলে Pass, নয়তো Fail
}

console.log(getStatus(75)); // ✅ Pass
console.log(getStatus(40)); // ❌ Fail


/*
👉 Nested Ternary Example:
*/

let mark = 85;
let grade = mark >= 80 ? "A+" : mark >= 70 ? "A" : mark >= 60 ? "B" : "F";
console.log(`🎓 Grade: ${grade}`); // 🎓 Grade: A+


// ==================================================
// 🔹 2. Nullish Coalescing Operator (??)
// ==================================================

/*
👉 ব্যাখ্যা:
Nullish Coalescing Operator (??) এমন মান প্রদান করে,
যদি variable টি null অথবা undefined হয়।

Syntax:
    value1 ?? value2

👉 যদি value1 null বা undefined হয়, তবে value2 রিটার্ন হবে।
👉 কিন্তু যদি value1 কোনো valid মান হয় (যেমন 0, "", false), তাহলে value1 রিটার্ন হবে।
*/

let username: string | null = null;
let defaultName = "Guest";

let displayName = username ?? defaultName; // username null, তাই defaultName ব্যবহার হবে
console.log(displayName); // Output: Guest


/*
👉 nullish coalescing vs OR (||) difference:

  || অপারেটর falsy value (যেমন 0, "", false) কেই null ধরে নেয়,
  কিন্তু ?? শুধুমাত্র null বা undefined কেই null বলে ধরে নেয়।
*/

let num1 = 0;
let result1 = num1 || 10;  // || falsy value check করে, তাই result হবে 10
let result2 = num1 ?? 10;  // ?? শুধুমাত্র null/undefined check করে, তাই result হবে 0

console.log("Using ||:", result1); // 10
console.log("Using ??:", result2); // 0


/*
👉 Function Example:
*/

function getUserAge(age: number | null | undefined): number {
    return age ?? 18; // age যদি null/undefined হয় তাহলে 18 return করবে
}

console.log(getUserAge(undefined)); // 18
console.log(getUserAge(25));        // 25


// ==================================================
// 🔹 3. Optional Chaining Operator (?.)
// ==================================================

/*
👉 ব্যাখ্যা:
Optional Chaining Operator (?.) ব্যবহার করে কোনো object-এর nested property
access করতে পারি নিরাপদভাবে, runtime error ছাড়া।

যদি কোনো মধ্যবর্তী property null বা undefined হয়, তাহলে এটি error না দিয়ে undefined রিটার্ন করে।

Syntax:
    object?.property
    object?.method()
    object?.property?.subProperty
*/

type User = {
    name: string;
    address?: {
        city?: string;
        country?: string;
    };
};

const user1: User = {
    name: "Ridoan",
    address: {
        city: "Dhaka",
        country: "Bangladesh"
    }
};

const user2: User = {
    name: "Rahim"
    // address নেই এখানে
};

// ❌ Traditional way (error হতে পারে)
// console.log(user2.address.city); // Error: Cannot read property 'city' of undefined

// ✅ Optional Chaining দিয়ে নিরাপদ access:
console.log(user1.address?.city); // Output: Dhaka
console.log(user2.address?.city); // Output: undefined (error নয়)


/*
👉 Optional Chaining with Function Call:
*/

const user3 = {
    name: "Karim",
    greet() {
        console.log("👋 Hello Karim!");
    }
};

const user4 = {
    name: "Unknown"
};

// সাধারণভাবে কল করলে:
user3.greet?.(); // ✅ greet আছে, তাই function call হবে
user4.greet?.(); // ❌ greet নেই, কিন্তু error দিবে না


/*
👉 Optional Chaining Nested Example:
*/

const company = {
    name: "TechSoft",
    employees: {
        ceo: {
            name: "Alice",
            age: 40
        }
    }
};

console.log(company.employees?.ceo?.name); // Output: Alice
console.log(company.employees?.manager?.name); // Output: undefined


// ==================================================
// 🔹 4. All Combined Example
// ==================================================

/*
👉 নিচে একটি example দেওয়া হলো যেখানে তিনটি operator একসাথে ব্যবহার হয়েছে।
*/

type Profile = {
    name?: string;
    email?: string | null;
    age?: number | null;
};

function getProfileInfo(profile: Profile) {
    // Optional Chaining দিয়ে নিরাপদে access করা হচ্ছে
    const name = profile?.name ?? "Anonymous";  // যদি null/undefined হয়, তাহলে default "Anonymous"
    const email = profile?.email ?? "No Email Provided";
    const ageStatus = profile?.age
        ? profile.age >= 18
            ? "Adult"
            : "Minor"
        : "Age not available";

    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🎂 Status: ${ageStatus}`);
}

const profile1: Profile = { name: "Ridoan", email: null, age: 25 };
const profile2: Profile = { name: undefined, age: 15 };
const profile3: Profile = {};

getProfileInfo(profile1);
/*
👤 Name: Ridoan
📧 Email: No Email Provided
🎂 Status: Adult
*/

getProfileInfo(profile2);
/*
👤 Name: Anonymous
📧 Email: No Email Provided
🎂 Status: Minor
*/

getProfileInfo(profile3);
/*
👤 Name: Anonymous
📧 Email: No Email Provided
🎂 Status: Age not available
*/


// ==================================================
// 🔹 5. সারাংশ (Summary)
// ==================================================

/*
✅ Ternary Operator (?:)
   ➤ শর্ত অনুযায়ী দুটি মানের মধ্যে একটি বেছে নেয়।
   ➤ Syntax: condition ? value_if_true : value_if_false;

✅ Nullish Coalescing Operator (??)
   ➤ null বা undefined হলে fallback মান দেয়।
   ➤ Syntax: value1 ?? value2;

✅ Optional Chaining Operator (?.)
   ➤ nested property বা method নিরাপদভাবে access করে।
   ➤ Syntax: object?.property?.subProperty;

======================
🎯 Real Use Case:
----------------------
User profile, API response, database query, বা এমন data structure যেখানে
property null বা undefined হতে পারে, সেগুলোর সাথে কাজ করার সময়
এই তিনটি operator অত্যন্ত গুরুত্বপূর্ণ।
======================
*/
