/*
=====================================================================
📘 Topic: Mapped Types in TypeScript 
=====================================================================

🧠 ভূমিকা:
---------------------------------------------------------------------
TypeScript-এর **Mapped Type** হলো এমন একটি advanced feature 
যা আমাদেরকে **existing type বা interface থেকে নতুন type তৈরি করতে** সাহায্য করে।

👉 এটি মূলত “type transformation” এর জন্য ব্যবহৃত হয়।  
অর্থাৎ, আমরা একটি object type এর key গুলো loop করে তাদের 
value টাইপ পরিবর্তন, যোগ বা পরিবর্তিত করতে পারি।

=====================================================================
🔹 Basic Concept:
=====================================================================

Mapped Type-এর মূল ধারণা হলো — 
একটি type এর প্রতিটি property এর ওপর map করা যায়।

📌 Syntax:
-------------------------------------------------------------
type NewType<T> = {
   [P in keyof T]: Type;
}
-------------------------------------------------------------

👉 এখানে:
- `T` = Base Type
- `keyof T` = T এর সব property নামের union
- `P` = প্রতিটি property (iteration variable)
- `T[P]` = ঐ property এর value type

=====================================================================
🔹 Example 1: Basic Mapped Type
=====================================================================
*/

type Person = {
  name: string;
  age: number;
  city: string;
};

// Mapped Type: Readonly version
type ReadonlyPerson = {
  [P in keyof Person]: Person[P];
};

// ✅ এখন ReadonlyPerson-এর structure Person-এর মতোই
const p1: ReadonlyPerson = {
  name: "Rafi",
  age: 22,
  city: "Dhaka"
};

console.log(p1.name); // ✅ "Rafi"



/*
=====================================================================
🔹 Example 2: Transforming Properties (Value Type পরিবর্তন)
=====================================================================
*/

type Booleanify<T> = {
  [P in keyof T]: boolean;
};

type BooleanPerson = Booleanify<Person>;

/*
👉 এখন Person এর প্রতিটি property এর টাইপ boolean হয়ে যাবে।
*/

const personStatus: BooleanPerson = {
  name: true,
  age: false,
  city: true
};



/*
=====================================================================
🔹 Example 3: Mapped Type with readonly এবং optional modifiers
=====================================================================
*/

// ✅ ১. সব property readonly করা
type MakeReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// ✅ ২. সব property optional করা
type MakeOptional<T> = {
  [P in keyof T]?: T[P];
};

// ✅ ৩. সব property required করা
type MakeRequired<T> = {
  [P in keyof T]-?: T[P]; // -? optional সরিয়ে দেয়
};

type ReadonlyPerson2 = MakeReadonly<Person>;
type OptionalPerson = MakeOptional<Person>;
type RequiredPerson = MakeRequired<OptionalPerson>;



/*
=====================================================================
🔹 Example 4: Mapped Type + keyof + Conditional Type
=====================================================================
*/

type StringProperties<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
};

type OnlyStringPerson = StringProperties<Person>;
/*
👉 age property বাদ যাবে, কারণ age এর টাইপ number
👉 ফলে শুধুমাত্র string টাইপ property গুলো থাকবে:
{
  name: string;
  city: string;
}
*/



/*
=====================================================================
🔹 Example 5: Mapped Type থেকে readonly, optional সরানো বা যোগ করা
=====================================================================

Modifiers:
-------------------------------------------------------------
+readonly   → readonly যোগ করে
-readonly   → readonly সরিয়ে দেয়
+?          → optional যোগ করে
-?          → optional সরিয়ে দেয়
-------------------------------------------------------------
*/

type Mutable<T> = {
  -readonly [P in keyof T]-?: T[P];
};

/*
👉 এখানে আমরা সব readonly এবং optional modifier সরিয়ে ফেলেছি।
*/



/*
=====================================================================
🔹 Example 6: Mapped Type for API Response Transformation
=====================================================================
*/

type ApiResponse<T> = {
  [P in keyof T]: {
    value: T[P];
    status: "success" | "error";
  };
};

type User = {
  id: number;
  name: string;
  email: string;
};

type UserApiResponse = ApiResponse<User>;
/*
{
  id: { value: number; status: "success" | "error" }
  name: { value: string; status: "success" | "error" }
  email: { value: string; status: "success" | "error" }
}
*/



/*
=====================================================================
🔹 Example 7: keyof typeof এবং Mapped Type একত্রে ব্যবহার
=====================================================================
*/

const Colors = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
} as const;

type ColorNames = keyof typeof Colors; // "red" | "green" | "blue"

type ColorConfig = {
  [C in ColorNames]: { hex: string; isPrimary: boolean };
};

const colorDetails: ColorConfig = {
  red: { hex: "#FF0000", isPrimary: true },
  green: { hex: "#00FF00", isPrimary: true },
  blue: { hex: "#0000FF", isPrimary: true }
};



/*
=====================================================================
🔹 Example 8: Partial, Required, Readonly, Record — built-in mapped types
=====================================================================

TypeScript-এর কিছু built-in utility type আসলে mapped type দিয়েই তৈরি।

✅ Partial<T> → সব property optional করে
✅ Required<T> → সব property required করে
✅ Readonly<T> → সব property readonly করে
✅ Record<K, T> → নির্দিষ্ট key-value structure তৈরি করে
*/

type ExamplePartial = Partial<Person>;
type ExampleRequired = Required<Person>;
type ExampleReadonly = Readonly<Person>;
type ExampleRecord = Record<"a" | "b" | "c", number>;

/*
ExampleRecord = {
  a: number;
  b: number;
  c: number;
}
*/



/*
=====================================================================
🔹 Example 9: Mapped Type with Template Literal Type
=====================================================================
*/

type EventName<T extends string> = `${T}Event`;

type AppEvents = EventName<"click" | "hover" | "scroll">;
// ✅ "clickEvent" | "hoverEvent" | "scrollEvent"



/*
=====================================================================
🔹 Example 10: Deep Mapped Type (Nested Object Transformation)
=====================================================================
*/

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ComplexUser = {
  name: string;
  address: {
    city: string;
    country: string;
  };
};

type DeepReadonlyUser = DeepReadonly<ComplexUser>;

/*
👉 এখন ComplexUser এর nested object গুলোও readonly হয়ে যাবে।
*/



/*
=====================================================================
📦 Summary:
=====================================================================

✅ Mapped Type এর কাজ:
   → একটি type এর property গুলো loop করে তাদের ওপর পরিবর্তন আনা।

✅ Syntax:
   [P in keyof T]: T[P]

✅ ব্যবহার ক্ষেত্র:
   - Optional / Readonly properties তৈরি
   - Dynamic type transformation
   - Conditional property mapping
   - API response shape পরিবর্তন

✅ Important Modifiers:
   +readonly / -readonly
   +? / -?

✅ Built-in Mapped Types:
   - Partial<T>
   - Required<T>
   - Readonly<T>
   - Record<K, T>
   - Pick<T, K>
   - Omit<T, K>

=====================================================================
🎯 সংক্ষেপে:
---------------------------------------------------------------------
Mapped Type হলো TypeScript-এর "type transformation tool" —
যা existing type গুলোকে dynamically modify করে 
আরও flexible, reusable এবং type-safe structure তৈরি করতে সাহায্য করে।
=====================================================================
*/
