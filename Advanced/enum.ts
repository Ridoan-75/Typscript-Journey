/*
======================================================================
📘 Topic: Enum in TypeScript 
======================================================================

🧠 ভূমিকা:
----------------------------------------------------------------------
Enum (Enumeration) হলো TypeScript-এর একটি বিশেষ **non-primitive data type** 
যা আমরা ব্যবহার করি **related constant values** একত্রে সংগঠিত (organize) 
করে রাখার জন্য।

👉 "Enum" আমাদেরকে এমন একটি নাম-ভিত্তিক কনস্ট্যান্ট সেট তৈরি করতে দেয় 
যা code-কে আরও readable, maintainable এবং error-free করে তোলে।

======================================================================
🔹 কেন Enum ব্যবহার করা হয়?
======================================================================

ধরো, আমরা একাধিক related constant value ব্যবহার করছি — যেমন দিনের নাম, 
user role, বা order status।

JavaScript এ সাধারণত আমরা এভাবে লিখতাম:
*/

const ROLE_ADMIN = "ADMIN";
const ROLE_USER = "USER";
const ROLE_GUEST = "GUEST";

/*
➡️ এখানে সমস্যা হলো:
   - বানান ভুল হলে error ধরা যায় না।
   - কোড cluttered হয়।
   - values গুলোর মধ্যে relation maintain করা কঠিন।

TypeScript এ Enum ব্যবহার করে আমরা এই সমস্যাগুলো সমাধান করতে পারি।
*/



/*
======================================================================
🔹 Enum Declaration Syntax:
======================================================================
*/

enum EnumName {
  CONSTANT1,
  CONSTANT2,
  CONSTANT3
}

/*
👉 EnumName হলো enum-এর নাম
👉 CONSTANT গুলো হলো সদস্য (members)
👉 ডিফল্টভাবে Enum সদস্যদের মান 0 থেকে শুরু হয় এবং ১ করে বৃদ্ধি পায়
*/



/*
======================================================================
🔹 Example 1: Numeric Enum
======================================================================
*/

enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

console.log(Direction.Up);    // ✅ 0
console.log(Direction.Right); // ✅ 3

/*
➡️ ডিফল্টভাবে প্রথম মান 0, পরেরগুলো auto increment হয়।
➡️ আমরা চাইলে নিজেও মান দিতে পারি।
*/


/*
======================================================================
🔹 Example 2: Custom Numeric Enum Values
======================================================================
*/

enum Status {
  Pending = 1,
  Approved = 3,
  Rejected = 5
}

console.log(Status.Pending);  // ✅ 1
console.log(Status.Rejected); // ✅ 5

/*
👉 এখন auto increment কাজ করবে না কারণ আমরা ম্যানুয়ালি মান দিয়েছি।
*/



/*
======================================================================
🔹 Example 3: String Enum
======================================================================
*/

enum Roles {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

console.log(Roles.Admin); // ✅ "ADMIN"
console.log(Roles.User);  // ✅ "USER"

/*
👉 String Enum ব্যবহার করলে readability অনেক বেড়ে যায়।
👉 প্রতিটি সদস্যের মান নির্দিষ্টভাবে string হয়।
*/



/*
======================================================================
🔹 Example 4: Heterogeneous Enum (number + string)
======================================================================
*/

enum MixedType {
  No = 0,
  Yes = "YES"
}

console.log(MixedType.No);  // ✅ 0
console.log(MixedType.Yes); // ✅ "YES"

/*
👉 এটা "number" এবং "string" একসাথে মিশিয়ে তৈরি করা যায়, 
কিন্তু সাধারণত এটি avoid করা হয় readability ও consistency এর জন্য।
*/



/*
======================================================================
🔹 Example 5: Reverse Mapping (Numeric Enum)
======================================================================
*/

enum Color {
  Red = 1,
  Green,
  Blue
}

console.log(Color.Red);    // ✅ 1
console.log(Color[1]);     // ✅ "Red"

/*
👉 Numeric Enum এর ক্ষেত্রে TypeScript auto তৈরি করে reverse mapping.
   অর্থাৎ value থেকে key এবং key থেকে value দুই দিকেই access করা যায়।

❌ String Enum এ reverse mapping কাজ করে না।
*/



/*
======================================================================
🔹 Example 6: Enum with Function
======================================================================
*/

enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO"
}

function logMessage(level: LogLevel, message: string): void {
  console.log(`[${level}] - ${message}`);
}

logMessage(LogLevel.ERROR, "Something went wrong!"); // ✅ [ERROR] - Something went wrong!
logMessage(LogLevel.INFO, "Server is running smoothly."); // ✅ [INFO] - Server is running smoothly
// logMessage("CRITICAL", "Invalid Level"); ❌ Error: Argument type '"CRITICAL"' not assignable to parameter of type 'LogLevel'


/*
======================================================================
🔹 Example 7: Enum with Interface
======================================================================
*/

enum Category {
  Electronics = "ELECTRONICS",
  Fashion = "FASHION",
  Grocery = "GROCERY"
}

interface Product {
  id: number;
  name: string;
  category: Category;
}

const item1: Product = {
  id: 1,
  name: "Smartphone",
  category: Category.Electronics
};

console.log(item1);
/*
{
  id: 1,
  name: "Smartphone",
  category: "ELECTRONICS"
}
*/



/*
======================================================================
🔹 Example 8: const enum (Memory Optimization)
======================================================================
*/

const enum DirectionConst {
  Up,
  Down,
  Left,
  Right
}

const move = DirectionConst.Left;
console.log(move); // ✅ 2

/*
👉 const enum Compile সময়েই inline হয়ে যায়।
👉 মানে — compiled JS code-এ enum object তৈরি হয় না।
👉 এটি performance optimization এর জন্য ব্যবহার করা হয়।
*/



/*
======================================================================
🔹 Example 9: Enum iteration (loop)
======================================================================
*/

enum Weekday {
  Sat = "Saturday",
  Sun = "Sunday",
  Mon = "Monday"
}

for (const day in Weekday) {
  console.log(`${day}: ${Weekday[day as keyof typeof Weekday]}`);
}

/*
➡️ Output:
Sat: Saturday
Sun: Sunday
Mon: Monday
*/



/*
======================================================================
🔹 Example 10: keyof typeof Enum
======================================================================
*/

enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

type StatusKeys = keyof typeof HttpStatus;
// ফলাফল: "OK" | "NOT_FOUND" | "INTERNAL_SERVER_ERROR"

function handleStatus(status: StatusKeys) {
  console.log(`Status code for ${status} = ${HttpStatus[status]}`);
}

handleStatus("OK");                  // ✅ Status code for OK = 200
handleStatus("NOT_FOUND");           // ✅ Status code for NOT_FOUND = 404
// handleStatus("FORBIDDEN");        ❌ Error (invalid key)



/*
======================================================================
📦 Summary:
======================================================================

1️⃣ Enum হলো TypeScript-এর একটি বিশেষ data structure যা fixed constant 
    set গুলোকে একটি নামের নিচে সংগঠিত করে।

2️⃣ Enum এর ৪টি ধরণ আছে:
   - Numeric Enum
   - String Enum
   - Heterogeneous Enum
   - const Enum

3️⃣ সুবিধা:
   ✅ টাইপ সেফ (Type-safe)
   ✅ Readable & Maintainable কোড
   ✅ Compiler support (error catching)
   ✅ Reverse mapping (numeric enum এ)

4️⃣ Avoid:
   ❌ Heterogeneous Enum (string + number মিশ্রণ)
   ❌ অতিরিক্ত enum ব্যবহার (object literal ব্যবহার করাই ভালো কিছু ক্ষেত্রে)

======================================================================
🎯 সংক্ষেপে:
Enum আমাদেরকে constant মানগুলোর জন্য একটি "type-safe" এবং 
"organized" structure দেয় যা TypeScript code কে আরও নির্ভরযোগ্য করে তোলে।
======================================================================
*/
