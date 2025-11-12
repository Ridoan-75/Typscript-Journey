/*
=====================================================================
📘 Topic: Utility Types in TypeScript 
=====================================================================

🧠 ভূমিকা:
---------------------------------------------------------------------
TypeScript আমাদের জন্য কিছু **Built-in Utility Types** প্রদান করে, 
যা সাধারণত **Mapped Type**, **Conditional Type**, এবং **Generic Type**
এর ওপর ভিত্তি করে তৈরি।

👉 এই Utility Type গুলো TypeScript-এ কোড পুনঃব্যবহার (reusability)
এবং type transformation সহজ করে দেয়।

=====================================================================
🔹 Utility Types Overview:
=====================================================================

নিচে TypeScript-এর সবচেয়ে গুরুত্বপূর্ণ Utility Types গুলো 
একটি এক করে ব্যাখ্যা করা হলো — উদাহরণসহ।

---------------------------------------------------------------------
1️⃣ Partial<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: একটি object type-এর সব property optional করে দেয়

type Person = {
  name: string;
  age: number;
  email: string;
};

type PartialPerson = Partial<Person>;
/*
👉 Equivalent to:
{
  name?: string;
  age?: number;
  email?: string;
}
*/

const user1: PartialPerson = {
  name: "Rafi"
};



/*
---------------------------------------------------------------------
2️⃣ Required<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: একটি object type-এর সব property required করে দেয়

type OptionalPerson = {
  name?: string;
  age?: number;
  email?: string;
};

type RequiredPerson = Required<OptionalPerson>;
/*
👉 Equivalent to:
{
  name: string;
  age: number;
  email: string;
}
*/



/*
---------------------------------------------------------------------
3️⃣ Readonly<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: সব property readonly করে দেয়

type ReadonlyPerson = Readonly<Person>;

const personInfo: ReadonlyPerson = {
  name: "Ridoan",
  age: 23,
  email: "ridoan@example.com",
};

// personInfo.age = 25 ❌ Error — readonly property change করা যায় না



/*
---------------------------------------------------------------------
4️⃣ Record<K, T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: একটি নির্দিষ্ট key set (K) এবং value type (T) দিয়ে নতুন object type তৈরি করে

type Role = "admin" | "user" | "guest";

type RoleAccess = Record<Role, boolean>;

/*
Equivalent to:
{
  admin: boolean;
  user: boolean;
  guest: boolean;
}
*/

const access: RoleAccess = {
  admin: true,
  user: true,
  guest: false
};



/*
---------------------------------------------------------------------
5️⃣ Pick<T, K>
---------------------------------------------------------------------
*/

// 🔸 কাজ: কোনো type থেকে নির্দিষ্ট কিছু property "pick" করে নেয়

type PersonBasicInfo = Pick<Person, "name" | "email">;
/*
👉 Equivalent to:
{
  name: string;
  email: string;
}
*/



/*
---------------------------------------------------------------------
6️⃣ Omit<T, K>
---------------------------------------------------------------------
*/

// 🔸 কাজ: কোনো type থেকে নির্দিষ্ট property বাদ দেয়

type PersonWithoutEmail = Omit<Person, "email">;
/*
👉 Equivalent to:
{
  name: string;
  age: number;
}
*/



/*
---------------------------------------------------------------------
7️⃣ Exclude<T, U>
---------------------------------------------------------------------
*/

// 🔸 কাজ: একটি union type থেকে কিছু type বাদ দেয়

type Status = "active" | "inactive" | "pending";

type ActiveOnly = Exclude<Status, "inactive" | "pending">;
// ✅ Result: "active"



/*
---------------------------------------------------------------------
8️⃣ Extract<T, U>
---------------------------------------------------------------------
*/

// 🔸 কাজ: দুটি union type থেকে common অংশটি বের করে

type Combined = Extract<Status, "pending" | "active" | "done">;
// ✅ Result: "active" | "pending"



/*
---------------------------------------------------------------------
9️⃣ NonNullable<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: কোনো type থেকে null এবং undefined বাদ দেয়

type MaybeString = string | null | undefined;
type OnlyString = NonNullable<MaybeString>;
// ✅ Result: string



/*
---------------------------------------------------------------------
🔟 ReturnType<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: একটি function-এর return type বের করে আনে

function getUser() {
  return { name: "Rafi", age: 22 };
}

type UserReturnType = ReturnType<typeof getUser>;
/*
👉 Equivalent to:
{
  name: string;
  age: number;
}
*/



/*
---------------------------------------------------------------------
11️⃣ Parameters<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: কোনো function-এর parameter গুলোর type বের করে tuple আকারে আনে

function add(a: number, b: number) {
  return a + b;
}

type AddParams = Parameters<typeof add>;
// ✅ Result: [number, number]



/*
---------------------------------------------------------------------
12️⃣ ConstructorParameters<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: কোনো class constructor-এর parameter গুলোর type tuple আকারে আনে

class Car {
  constructor(public brand: string, public model: string, public year: number) {}
}

type CarParams = ConstructorParameters<typeof Car>;
// ✅ Result: [string, string, number]



/*
---------------------------------------------------------------------
13️⃣ InstanceType<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: কোনো class বা constructor function এর instance type বের করে

type CarInstance = InstanceType<typeof Car>;
/*
👉 Equivalent to:
Car
*/



/*
---------------------------------------------------------------------
14️⃣ Awaited<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: Promise এর ভিতরের type বের করে আনে (async result unwrap করে)

type AsyncData = Promise<string>;
type Data = Awaited<AsyncData>; // ✅ string

async function fetchData(): Promise<number> {
  return 123;
}

type ResultType = Awaited<ReturnType<typeof fetchData>>; // ✅ number



/*
---------------------------------------------------------------------
15️⃣ Record Utility + keyof typeof ব্যবহার উদাহরণ
---------------------------------------------------------------------
*/

const COLORS = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
} as const;

type ColorName = keyof typeof COLORS; // "red" | "green" | "blue"

type ColorHex = Record<ColorName, string>;

const colorPalette: ColorHex = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
};



/*
---------------------------------------------------------------------
16️⃣ ThisParameterType<T> & OmitThisParameter<T>
---------------------------------------------------------------------
*/

// 🔸 কাজ: কোনো function-এর "this" parameter টাইপ বের করা বা বাদ দেওয়া

function greet(this: { name: string }, greeting: string) {
  return `${greeting}, ${this.name}!`;
}

type ThisTypeOfGreet = ThisParameterType<typeof greet>; // ✅ { name: string }

type GreetWithoutThis = OmitThisParameter<typeof greet>;
/*
👉 function(greeting: string): string
*/



/*
---------------------------------------------------------------------
17️⃣ Uppercase, Lowercase, Capitalize, Uncapitalize
---------------------------------------------------------------------
*/

type Upper = Uppercase<"hello">; // "HELLO"
type Lower = Lowercase<"HELLO">; // "hello"
type Cap = Capitalize<"hello">;  // "Hello"
type Uncap = Uncapitalize<"Hello">; // "hello"



/*
=====================================================================
📦 Summary Table:
=====================================================================

| Utility Type          | কাজের বিবরণ |
|------------------------|--------------|
| Partial<T>             | সব property optional করে |
| Required<T>            | সব property required করে |
| Readonly<T>            | সব property readonly করে |
| Record<K, T>           | নির্দিষ্ট key-value type তৈরি করে |
| Pick<T, K>             | কিছু property নির্বাচন করে |
| Omit<T, K>             | কিছু property বাদ দেয় |
| Exclude<T, U>          | union থেকে কিছু বাদ দেয় |
| Extract<T, U>          | union থেকে common অংশ নেয় |
| NonNullable<T>         | null ও undefined বাদ দেয় |
| ReturnType<T>          | function এর return type নেয় |
| Parameters<T>          | function এর parameter গুলো নেয় |
| ConstructorParameters<T>| constructor parameter গুলো নেয় |
| InstanceType<T>        | class instance type নেয় |
| Awaited<T>             | Promise এর inner type নেয় |
| ThisParameterType<T>   | this parameter টাইপ নেয় |
| OmitThisParameter<T>   | this parameter বাদ দেয় |
| Uppercase<T>           | string কে uppercase করে |
| Lowercase<T>           | string কে lowercase করে |
| Capitalize<T>          | string এর প্রথম letter uppercase করে |
| Uncapitalize<T>        | প্রথম letter lowercase করে |

=====================================================================
🎯 সংক্ষেপে:
---------------------------------------------------------------------
Utility Types হলো TypeScript-এর ready-made toolkit,
যা আমাদেরকে existing type গুলো থেকে নতুন type তৈরি করতে,
তাদের পরিবর্তন করতে, এবং dynamically shape control করতে সাহায্য করে।

এগুলো মূলত **Mapped Type** এবং **Conditional Type** এর উপর ভিত্তি করে তৈরি।
=====================================================================
*/
