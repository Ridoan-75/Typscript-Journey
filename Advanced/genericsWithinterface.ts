/*
=============================================================
📘 Topic: Generics with Interface in TypeScript 
=============================================================
🔹 TypeScript-এ "Generics with Interface" মানে হচ্ছে এমন একটি interface তৈরি করা 
   যেটি একাধিক data type handle করতে পারে কিন্তু type safety বজায় রাখে।
🔹 অর্থাৎ, interface-এর ভেতরের property বা method-এর type dynamic (generic) হতে পারে।

=============================================================
🧩 ১️⃣ Basic Generic Interface
=============================================================
👉 শুরুতে একটা simple example দেখা যাক।
-------------------------------------------------------------
*/

interface Box<T> {
  // এখানে T হলো Generic Type Parameter
  content: T; // content property-এর type হলো T (যে কোনো type হতে পারে)
}

// এখন আমরা Box কে বিভিন্ন type-এর জন্য ব্যবহার করতে পারব 👇
const stringBox: Box<string> = { content: "Hello TypeScript" };
const numberBox: Box<number> = { content: 2025 };
const booleanBox: Box<boolean> = { content: true };

/*
🔍 এখানে:
- stringBox → T = string
- numberBox → T = number
- booleanBox → T = boolean
=> একটাই interface বিভিন্ন type-এর সাথে কাজ করছে।
*/

/*
=============================================================
🧩 ২️⃣ Generic Interface with Multiple Type Parameters
=============================================================
👉 Interface একাধিক generic parameter নিতে পারে, যেমন <T, U>।
-------------------------------------------------------------
*/

interface Pair<T, U> {
  first: T;
  second: U;
}

const pair1: Pair<string, number> = {
  first: "Age",
  second: 25,
};

const pair2: Pair<boolean, string> = {
  first: true,
  second: "Active",
};

/*
🔍 এখানে:
- pair1 → T = string, U = number
- pair2 → T = boolean, U = string
*/

/*
=============================================================
🧩 ৩️⃣ Generic Interface with Function Property
=============================================================
👉 Interface-এর ভেতরে যদি function থাকে, সেটিও generic parameter ব্যবহার করতে পারে।
-------------------------------------------------------------
*/

interface DataProcessor<T> {
  data: T[];
  process(item: T): void; // process method শুধুমাত্র T type-এর data handle করবে
}

const numberProcessor: DataProcessor<number> = {
  data: [10, 20, 30],
  process(item: number) {
    console.log("Processing number:", item);
  },
};

const stringProcessor: DataProcessor<string> = {
  data: ["A", "B", "C"],
  process(item: string) {
    console.log("Processing string:", item);
  },
};

/*
🔍 এইভাবে আমরা একই interface দিয়ে বিভিন্ন data type-এর জন্য আলাদা implementation লিখতে পারি।
*/

/*
=============================================================
🧩 ৪️⃣ Generic Interface with Constraints (extends)
=============================================================
👉 কখনো আমরা চাই Generic type অবশ্যই নির্দিষ্ট structure অনুসরণ করুক।
👉 তখন আমরা "extends" keyword ব্যবহার করে constraint দিতে পারি।
-------------------------------------------------------------
*/

interface Person {
  name: string;
  age: number;
}

// T অবশ্যই Person-এর মতো structure follow করবে
interface Manager<T extends Person> {
  id: number;
  info: T;
}

const manager1: Manager<Person> = {
  id: 1,
  info: { name: "Hasan", age: 25 },
};

const manager2: Manager<{ name: string; age: number; department: string }> = {
  id: 2,
  info: { name: "Ridoan", age: 22, department: "IT" },
};

/*
🔍 এখানে manager2-তেও constraint মানা হয়েছে কারণ এতে name ও age property আছে।
*/

/*
=============================================================
🧩 ৫️⃣ Generic Interface in Real-life Example
=============================================================
👉 ধরো তুমি একটা API call করছো, যেখানে response বিভিন্ন type-এর data দিতে পারে।
👉 এজন্য আমরা একটা Generic Interface তৈরি করতে পারি যা সব response-এর জন্য ব্যবহার হবে।
-------------------------------------------------------------
*/

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T; // data-এর type generic রাখা হয়েছে
}

// ✅ যখন user data আসবে:
const userResponse: ApiResponse<{ id: number; name: string }> = {
  status: 200,
  message: "User fetched successfully",
  data: { id: 101, name: "Ridoan" },
};

// ✅ যখন product data আসবে:
const productResponse: ApiResponse<{ id: number; price: number }> = {
  status: 200,
  message: "Product fetched successfully",
  data: { id: 10, price: 999 },
};

/*
🔍 এখানে একই ApiResponse interface ব্যবহার করে 
   user ও product — দুই রকম data structure handle করা হয়েছে।
*/

/*
=============================================================
🧩 ৬️⃣ Generic Interface with Default Type
=============================================================
👉 আমরা চাইলে generic parameter-এর জন্য default type দিতে পারি।
-------------------------------------------------------------
*/

interface Container<T = string> {
  value: T;
}

const c1: Container = { value: "Default is string" }; // T = string (default)
const c2: Container<number> = { value: 123 }; // T = number (override default)

/*
=============================================================
🧩 ৭️⃣ Generics + Interface + Function (Advanced Example)
=============================================================
👉 এখানে interface দিয়ে generic function define করা হচ্ছে।
-------------------------------------------------------------
*/

interface Repository<T> {
  items: T[];
  add(item: T): void;
  getAll(): T[];
}

// এখন এই interface ব্যবহার করে number এবং string repository তৈরি করা যাক

const numberRepo: Repository<number> = {
  items: [],
  add(item) {
    this.items.push(item);
  },
  getAll() {
    return this.items;
  },
};

numberRepo.add(10);
numberRepo.add(20);

const stringRepo: Repository<string> = {
  items: [],
  add(item) {
    this.items.push(item);
  },
  getAll() {
    return this.items;
  },
};

stringRepo.add("Apple");
stringRepo.add("Banana");

/*
=============================================================
🧩 🔟 Summary (সংক্ষিপ্ত সারসংক্ষেপ)
=============================================================
✅ Interface-এর মধ্যে Generics ব্যবহার করলে আমরা reusable এবং type-safe structure পাই।
✅ <T> হলো generic placeholder — যেটা compile-time এ নির্দিষ্ট type নেয়।
✅ একাধিক generic parameter ব্যবহার করা যায় (যেমন <T, U>)।
✅ Constraints (extends) ব্যবহার করে generic type কে নির্দিষ্ট structure-এ সীমাবদ্ধ করা যায়।
✅ Default generic type দিয়ে fallback type নির্ধারণ করা যায়।
✅ Generics দিয়ে interface function, class, বা API response গুলোকে flexible করা যায়।

=============================================================
🎯 এক কথায়:
"Generics with Interface" মানে — এমন interface যেটা dynamic ভাবে বিভিন্ন type-এর সাথে 
type safety বজায় রেখে কাজ করতে পারে।
=============================================================
*/
