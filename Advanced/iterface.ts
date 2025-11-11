/*
===============================================
📘 Topic: Type vs Interface in TypeScript
===============================================
🔹 TypeScript-এ আমরা "type alias" এবং "interface" — দুটোই ব্যবহার করতে পারি 
   object-এর structure (shape) define করার জন্য। 
   এগুলো দেখতে অনেকটা একইরকম লাগে, কিন্তু কাজের মধ্যে কিছু গুরুত্বপূর্ণ পার্থক্য আছে।

================================================
🧩 ১️⃣ Type Alias কী?
================================================
👉 "type" keyword ব্যবহার করে আমরা যেকোনো data type-কে একটা নাম (alias) দিতে পারি।
👉 Primitive, Union, Intersection, Object ইত্যাদি সবকিছুর জন্য type alias ব্যবহার করা যায়।

📌 Syntax:
------------------------------------------------
type TypeName = typeDefinition;

📘 Example:
------------------------------------------------
*/

// Object structure define করা হচ্ছে type alias দিয়ে
type UserType = {
  name: string;       // ব্যবহারকারীর নাম
  age: number;        // বয়স
  isAdmin?: boolean;  // optional property (থাকতেও পারে, নাও থাকতে পারে)
};

// এই object টা অবশ্যই UserType structure অনুসরণ করবে
const user1: UserType = {
  name: "Ridoan",
  age: 22,
  isAdmin: true,
};

/*
================================================
🧩 ২️⃣ Interface কী?
================================================
👉 Interface সাধারণত object-এর shape নির্ধারণ করতে ব্যবহৃত হয়।
👉 class, object structure, এবং OOP concept (inheritance) support করে।

📌 Syntax:
------------------------------------------------
interface InterfaceName {
  propertyName: type;
  ...
}

📘 Example:
------------------------------------------------
*/

interface UserInterface {
  name: string;      // নাম
  age: number;       // বয়স
  isAdmin?: boolean; // optional property
}

// Interface ব্যবহার করে object define করা হচ্ছে
const user2: UserInterface = {
  name: "Hasan",
  age: 25,
};

/*
================================================
🧩 ৩️⃣ Type vs Interface – পার্থক্য
================================================

| বৈশিষ্ট্য                        | Type Alias                                     | Interface                              |
|------------------------------|------------------------------------------------|---------------------------------------- |
| ✅ Structure define করা যায় | হ্যাঁ (Object, Union, Tuple, Primitive)           | হ্যাঁ (শুধু Object shape এর জন্য)           |
| 🧩 Extend করা যায়           | Intersection (&) দিয়ে extend করা যায়            | "extends" keyword দিয়ে extend হয়        | 
| 🏗️ Merge করা যায়            | না, একই নামের type একাধিক declare করা যায় না   | হ্যাঁ, একই নামের interface merge হয়      |
| 🚀 Use cases                | Complex type, union, primitive alias            | Object shape, class contract            |

📘 Example: Type & Interface Extend
------------------------------------------------
*/

// 👉 Interface extend করা (Inheritance)
interface AdminUser extends UserInterface {
  role: string; // নতুন property যোগ করা হচ্ছে
}

const admin: AdminUser = {
  name: "Sakib",
  age: 30,
  isAdmin: true,
  role: "SuperAdmin",
};

// 👉 Type extend করা (Intersection)
type AdminType = UserType & {
  role: string;
};

const admin2: AdminType = {
  name: "Nayeem",
  age: 24,
  isAdmin: false,
  role: "Moderator",
};

/*
================================================
🧩 ৪️⃣ Interface Merging vs Type Limitation
================================================
*/

// একই নামের একাধিক Interface merge হয়ে যায় 👇
interface Car {
  brand: string;
}
interface Car {
  model: string;
}

const myCar: Car = {
  brand: "Toyota",
  model: "Corolla",
};

// কিন্তু একই নামের একাধিক Type declare করা যাবে না ❌
// type Car = { brand: string };
// type Car = { model: string }; // ❌ Error: Duplicate identifier 'Car'

/*
================================================
🧩 ৫️⃣ কখন কোনটা ব্যবহার করবেন?
================================================
🔹 যদি object structure define করতে হয়, এবং future-এ extend করার দরকার হতে পারে → interface ব্যবহার করুন।
🔹 যদি union, intersection, primitive alias, বা complex type define করতে হয় → type alias ব্যবহার করুন।

================================================
✅ Summary
================================================
1. Type alias বেশি flexible, primitive বা union support করে।
2. Interface মূলত object shape-এর জন্য ideal এবং OOP-friendly।
3. Interface merge হতে পারে, type alias merge হতে পারে না।
4. দুটোই প্রায় একইভাবে ব্যবহার করা যায়, পার্থক্য mainly structural এবং functional।
================================================
*/
