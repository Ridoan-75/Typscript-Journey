/*
=====================================================================
📘 Topic: Conditional Types in TypeScript  
=====================================================================

🧠 ভূমিকা:
---------------------------------------------------------------------
TypeScript-এর একটি সবচেয়ে শক্তিশালী advanced feature হলো **Conditional Type**।

এটি মূলত TypeScript-এর মধ্যে "if-else logic" এর মতো কাজ করে, 
কিন্তু runtime নয় — বরং **type-level** এ।

👉 Conditional Type আমাদেরকে type গুলোর মধ্যে শর্ত (condition) বসিয়ে 
dynamically নতুন টাইপ নির্ধারণ করতে দেয়।

=====================================================================
🔹 Basic Syntax:
=====================================================================

T extends U ? X : Y

এর মানে হলো:
---------------------------------
- যদি T (Generic type) U-কে extend করে (মানে compatible হয়),
  তাহলে টাইপ হবে X ✅
- নাহলে টাইপ হবে Y ❌

একদম সাধারণভাবে বলা যায়:  
👉 **"If T is assignable to U, then use X, else use Y"**

=====================================================================
🔹 Example 1: Basic Conditional Type
=====================================================================
*/

type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>;  // ✅ "Yes"
type B = IsString<number>;  // ❌ "No"
type C = IsString<boolean>; // ❌ "No"

/*
🧩 ব্যাখ্যা:
------------
👉 যদি T string হয় → তাহলে type হবে "Yes"
👉 অন্যথায় → "No"
*/



/*
=====================================================================
🔹 Example 2: Conditional Type with Union
=====================================================================
*/

type CheckUnion<T> = T extends string ? "String Type" : "Other Type";

type X = CheckUnion<string | number>;

/*
⚠️ Output: "String Type" | "Other Type"

🧠 কারণ: যখন conditional type union এর ওপর কাজ করে,
TypeScript distributive ভাবে প্রতিটি member এর ওপর condition apply করে।
অর্থাৎ:
   - string → "String Type"
   - number → "Other Type"
ফলে final টাইপ হয়: "String Type" | "Other Type"
*/



/*
=====================================================================
🔹 Example 3: Nested Conditional Type
=====================================================================
*/

type TypeClassifier<T> =
  T extends string ? "String"
  : T extends number ? "Number"
  : T extends boolean ? "Boolean"
  : T extends undefined ? "Undefined"
  : "Other";

type Test1 = TypeClassifier<string>;     // ✅ "String"
type Test2 = TypeClassifier<number>;     // ✅ "Number"
type Test3 = TypeClassifier<boolean>;    // ✅ "Boolean"
type Test4 = TypeClassifier<undefined>;  // ✅ "Undefined"
type Test5 = TypeClassifier<object>;     // ✅ "Other"



/*
=====================================================================
🔹 Example 4: Conditional Type with Generic Function
=====================================================================
*/

function getValue<T>(value: T): T extends number ? number : string {
  if (typeof value === "number") {
    // @ts-expect-error
    return value * 2; // ✅ number case
  } else {
    // @ts-expect-error
    return `Value is: ${value}`; // ✅ string case
  }
}

const result1 = getValue(10);       // ✅ number
const result2 = getValue("Hello");  // ✅ string



/*
=====================================================================
🔹 Example 5: Conditional Type with Type Inference (infer keyword)
=====================================================================

`infer` keyword ব্যবহারের মাধ্যমে conditional type এর ভিতরে নতুন type variable 
ঘোষণা করা যায় এবং সেটা extract বা infer করা যায়।
*/

type ReturnTypeInfer<T> = T extends (...args: any[]) => infer R ? R : never;

type Func1 = () => number;
type Func2 = () => string;

type R1 = ReturnTypeInfer<Func1>; // ✅ number
type R2 = ReturnTypeInfer<Func2>; // ✅ string
type R3 = ReturnTypeInfer<string>; // ❌ never

/*
🧠 ব্যাখ্যা:
------------
👉 এখানে infer R মানে হলো — function-এর return টাইপ R হিসেবে extract করা।
👉 যদি T কোনো function না হয়, তাহলে type হবে never।
*/



/*
=====================================================================
🔹 Example 6: Conditional Type দিয়ে Promise এর ভিতরের টাইপ বের করা
=====================================================================
*/

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type P1 = UnwrapPromise<Promise<string>>; // ✅ string
type P2 = UnwrapPromise<Promise<number>>; // ✅ number
type P3 = UnwrapPromise<number>;          // ✅ number (কারণ এটা promise নয়)



/*
=====================================================================
🔹 Example 7: Real-world Example — API Response Type Check
=====================================================================
*/

type ApiResponse<T> = T extends { success: true; data: infer D } ? D : never;

type SuccessResponse = { success: true; data: { name: string; age: number } };
type ErrorResponse = { success: false; message: string };

type ExtractedData = ApiResponse<SuccessResponse>; // ✅ { name: string; age: number }
type ExtractedError = ApiResponse<ErrorResponse>; // ❌ never



/*
=====================================================================
🔹 Example 8: Conditional Type with keyof এবং extends constraint
=====================================================================
*/

type PropertyType<T, K extends keyof T> = T[K] extends number ? "Numeric" : "Non-numeric";

type Person = {
  name: string;
  age: number;
  city: string;
};

type AgeType = PropertyType<Person, "age">;  // ✅ "Numeric"
type NameType = PropertyType<Person, "name">; // ✅ "Non-numeric"



/*
=====================================================================
🔹 Example 9: Remove 'null' এবং 'undefined' টাইপ থেকে
=====================================================================
*/

type NonNullableType<T> = T extends null | undefined ? never : T;

type Cleaned = NonNullableType<string | null | undefined>; 
// ✅ string



/*
=====================================================================
🔹 Example 10: Conditional Type in Utility Types (Built-in)
=====================================================================

TypeScript এর অনেক built-in utility type conditional type দিয়েই তৈরি।
উদাহরণস্বরূপ:
-------------------------------------------------
- Exclude<T, U> → T থেকে U টাইপ বাদ দেয়
- Extract<T, U> → T থেকে শুধুমাত্র U টাইপ নেয়
- NonNullable<T> → null এবং undefined বাদ দেয়
-------------------------------------------------
*/

type ExampleExclude = Exclude<string | number | boolean, number>;
// ✅ "string" | "boolean"

type ExampleExtract = Extract<string | number | boolean, number | string>;
// ✅ "string" | "number"

type ExampleNonNullable = NonNullable<string | undefined | null>;
// ✅ "string"



/*
=====================================================================
📦 Summary:
=====================================================================

✅ Conditional Type এর কাজ:  
👉 টাইপের মধ্যে "if-else" logic প্রয়োগ করা।

✅ Syntax:
   T extends U ? X : Y

✅ Key Concepts:
   1️⃣ extends → শর্ত নির্ধারণ করে
   2️⃣ infer → নতুন টাইপ extract করার জন্য ব্যবহৃত হয়
   3️⃣ Distributive behavior → union টাইপের ওপর আলাদাভাবে কাজ করে
   4️⃣ Type-level decision making → runtime নয়, compile time এ টাইপ নির্ধারণ হয়

✅ Practical Uses:
   - Return টাইপ বের করা (ReturnType)
   - Promise টাইপ unwrap করা
   - Null/Undefined বাদ দেওয়া
   - Union থেকে টাইপ বাদ বা নির্বাচন করা
   - Dynamic type mapping

=====================================================================
🎯 সংক্ষেপে:
---------------------------------------------------------------------
Conditional Type হলো TypeScript-এর "brain" —  
যা compile time এ type logic প্রয়োগ করে type-safe, 
smart এবং dynamic code তৈরি করতে সাহায্য করে।
=====================================================================
*/
