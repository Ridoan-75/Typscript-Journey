/* 
======================================================================
📘 Topic: Nullable, Unknown এবং Never Type in TypeScript 
======================================================================

🧠 সংক্ষিপ্ত ধারণা:
--------------------------------
TypeScript-এর কিছু special type আছে যেগুলো কোডের **type safety** অনেক বাড়িয়ে দেয়।
তার মধ্যে তিনটি গুরুত্বপূর্ণ হলো:
    1️⃣ Nullable Type → null বা undefined কে handle করার জন্য।
    2️⃣ Unknown Type → যেকোনো type হতে পারে, কিন্তু ব্যবহারের আগে check করতে হয়।
    3️⃣ Never Type → এমন value যেটা কখনোই ঘটে না (যেমন error throw করা বা infinite loop)।

চলো A থেকে Z পর্যন্ত সব বুঝি 👇
*/


// ==================================================
// 🔹 1. Nullable Type
// ==================================================

/*
👉 ব্যাখ্যা:
Nullable type মানে হচ্ছে এমন type যা null বা undefined হতে পারে।
TypeScript-এ null এবং undefined কে explicitly type declaration-এ allow করতে হয়।

Syntax:
    let variableName: type | null | undefined;
*/

let userName: string | null = null;  // userName এখন হয় string হতে পারে নয়তো null
userName = "Ridoan";                 // ✅ valid
userName = null;                     // ✅ valid
// userName = 123;                   // ❌ invalid, কারণ এখানে শুধুমাত্র string বা null allow করা হয়েছে


/*
👉 Function Example with Nullable:
*/

function greetUser(name: string | null): void {
    if (name === null) {
        console.log("👋 Hello, Guest!");
    } else {
        console.log(`👋 Hello, ${name}!`);
    }
}

greetUser("Ridoan");  // Output: 👋 Hello, Ridoan!
greetUser(null);      // Output: 👋 Hello, Guest!


/*
👉 Optional parameter বা return value null হতে পারে:
*/

function findUser(id: number): string | null {
    if (id === 1) {
        return "Ridoan";
    } else {
        return null; // user পাওয়া যায়নি
    }
}

const user = findUser(2);
if (user !== null) {
    console.log(`✅ User Found: ${user}`);
} else {
    console.log("❌ User Not Found");
}


/*
===========================
🔸 কেন Nullable দরকার?
===========================
যখন আমরা জানি কোনো variable কিছু ক্ষেত্রে মান না-ও পেতে পারে,
তখন null type দিয়ে explicitly declare করলে TypeScript warning দেয় না।
এতে করে আমরা runtime error থেকে নিরাপদ থাকি।
*/


// ==================================================
// 🔹 2. Unknown Type
// ==================================================

/*
👉 ব্যাখ্যা:
Unknown টাইপ হলো "safe version" of `any` type।

- `any` ব্যবহার করলে TypeScript কিছুই চেক করে না (unsafe)।
- `unknown` ব্যবহার করলে TypeScript type-check বাধ্য করে, 
   মানে ব্যবহার করার আগে type-check করতে হবে।

Syntax:
    let variableName: unknown;
*/

let inputData: unknown;

inputData = 123;
inputData = "Hello World";
inputData = true;
inputData = { name: "Ridoan" };

/*
👉 Problem Example:
*/

function processData(data: unknown) {
    // data কে সরাসরি ব্যবহার করা যাবে না কারণ TypeScript জানে না data কোন টাইপের
    // console.log(data.toUpperCase()); // ❌ Error: Object is of type 'unknown'

    // ✅ Type-check করার পর ব্যবহার করা যাবে
    if (typeof data === "string") {
        console.log(data.toUpperCase());
    } else if (typeof data === "number") {
        console.log(data.toFixed(2));
    } else {
        console.log("⚠️ Unknown data type:", data);
    }
}

processData("hello");
processData(99.5678);
processData([1, 2, 3]);


/*
👉 তুলনা: any vs unknown

    let a: any = 10;
    let b: unknown = 10;

    let c: string = a; // ✅ any সবকিছু allow করে (unsafe)
    let d: string = b; // ❌ Error: unknown কে সরাসরি assign করা যায় না

👉 তাই unknown safer — ব্যবহার করার আগে type-check বাধ্য করে।
*/


// ==================================================
// 🔹 3. Never Type
// ==================================================

/*
👉 ব্যাখ্যা:
Never টাইপ বোঝায় এমন মান যা কখনো ঘটে না।
এটি ব্যবহার হয় এমন function বা expression এর জন্য যা কখনো return করে না।

উদাহরণ:
    - Function যেটা সবসময় error throw করে
    - Function যেটা infinite loop চালায়
*/

function throwError(message: string): never {
    // এই function কখনো কিছু return করবে না — বরং error দেবে
    throw new Error(message);
}

// throwError("Something went wrong!"); // ❌ Execution থেমে যাবে


/*
👉 Infinite loop Example:
*/

function infiniteLoop(): never {
    while (true) {
        console.log("🔁 Running forever...");
    }
}

// infiniteLoop(); // ❌ এই function কখনো শেষ হবে না (infinite loop)


/*
👉 TypeScript automatically infer করে never type,
যখন কোনো function এ কোনো reachable return নেই।
*/

function checkValue(x: string | number) {
    if (typeof x === "string") {
        console.log("It's a string.");
    } else if (typeof x === "number") {
        console.log("It's a number.");
    } else {
        // এখানে theoretically কোনো মান আসবে না, তাই TypeScript এটিকে never হিসেবে ধরে নেয়
        const neverValue: never = x;
        console.log(neverValue);
    }
}


/*
===========================
🔸 কখন Never Type দরকার?
===========================
✅ Error Handling ফাংশনে
✅ Exhaustive Type Checking-এ
✅ এমন function যা কিছুই return করে না
*/


// ==================================================
// 🔹 4. Real-life Combined Example
// ==================================================

type ResponseData = {
    status: "success" | "error";
    data?: string | null;
};

function handleResponse(response: ResponseData): void {
    // Optional chaining + null check + unknown type safety ব্যবহার
    const message: string | null | undefined = response.data;

    // Nullable handle
    const displayMessage = message ?? "No message available";

    // Ternary + type safety
    response.status === "success"
        ? console.log(`✅ SUCCESS: ${displayMessage}`)
        : console.log(`❌ ERROR: ${displayMessage}`);
}

// Example Call
handleResponse({ status: "success", data: "Operation completed" });
handleResponse({ status: "error", data: null });
handleResponse({ status: "error" });


/*
===========================
🔹 5. Summary (সারাংশ)
===========================

✅ Nullable Type (null, undefined)
   ➤ মানে: কোনো variable বা value null/undefined হতে পারে।
   ➤ Syntax: let name: string | null | undefined;

✅ Unknown Type
   ➤ মানে: type জানা নেই, কিন্তু ব্যবহার করার আগে অবশ্যই type-check করতে হবে।
   ➤ Syntax: let value: unknown;

✅ Never Type
   ➤ মানে: এমন value বা function যেটা কখনো return করে না।
   ➤ উদাহরণ: throw new Error(), infinite loop

===========================
🔹 Bonus Tip:
===========================
👉 real-world এ unknown এবং nullable একসাথে API response, user input,
   form validation ইত্যাদিতে অনেক বেশি ব্যবহৃত হয়।

👉 never সাধারণত internal logic বা exhaustive checking-এর ক্ষেত্রে ব্যবহৃত হয়।
===========================
*/
