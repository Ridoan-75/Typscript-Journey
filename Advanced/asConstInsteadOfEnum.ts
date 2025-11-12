/*
======================================================================
📘 Topic: Using `as const` Instead of `enum` in TypeScript
======================================================================

🧠 ভূমিকা:
----------------------------------------------------------------------
TypeScript-এ আগে অনেক সময় constant মানের সেট (যেমন — Roles, Status, Direction ইত্যাদি)
সংগঠিত করার জন্য **Enum** ব্যবহার করা হতো।  
কিন্তু এখন আধুনিক TypeScript এ **“as const” assertion** ব্যবহার করা অনেক সময়
আরও বেশি flexible, lightweight এবং safer বিকল্প হিসেবে ব্যবহৃত হয়।

`as const` মূলত JavaScript-এর object literal বা array literal কে 
**immutable (read-only)** করে দেয় এবং একইসাথে value গুলোর **literal type**
preserve করে রাখে।

======================================================================
🔹 কেন "as const" Enum-এর বিকল্প হিসেবে ব্যবহার করা হয়?
======================================================================

👉 Enum compile হওয়ার সময় JavaScript কোডে পরিণত হয় (runtime presence থাকে)।  
👉 কিন্তু "as const" হলো pure TypeScript feature — compile time এ type-check করে, 
   runtime-এ কোনো অতিরিক্ত কোড তৈরি করে না।

✅ ফলে কোড হয়:
   - ছোট (no extra JS)
   - দ্রুত (no runtime enum)
   - type-safe
   - modern best practice

======================================================================
🔹 Example 1: Traditional Enum vs as const
======================================================================
*/

// 🧾 Enum version
enum RolesEnum {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

function assignRoleEnum(role: RolesEnum) {
  console.log(`Assigned role: ${role}`);
}

assignRoleEnum(RolesEnum.Admin); // ✅ OK
// assignRoleEnum("ADMIN"); ❌ Error — সরাসরি string দেওয়া যাবে না



// 🧾 as const version
const Roles = {
  Admin: "ADMIN",
  User: "USER",
  Guest: "GUEST",
} as const;

// Type তৈরি করা হয়েছে object এর key থেকে
type RoleType = (typeof Roles)[keyof typeof Roles];

function assignRoleConst(role: RoleType) {
  console.log(`Assigned role: ${role}`);
}

assignRoleConst(Roles.Admin); // ✅ OK
assignRoleConst("ADMIN");     // ✅ OK — এখন সরাসরি string literal ব্যবহার করা যায়



/*
======================================================================
🔹 ব্যাখ্যা:
======================================================================

👉 `as const` object-কে immutable করে তোলে।
   অর্থাৎ, object এর ভিতরের মান (value) এবং key দুটোই read-only হয়ে যায়।

👉 `(typeof Roles)[keyof typeof Roles]` ব্যবহার করে 
   আমরা সেই object-এর value গুলোর literal union type বের করি।

   - typeof Roles → পুরো object টাইপ
   - keyof typeof Roles → key নামের union ("Admin" | "User" | "Guest")
   - (typeof Roles)[keyof typeof Roles] → value টাইপের union ("ADMIN" | "USER" | "GUEST")
*/



/*
======================================================================
🔹 Example 2: Direction Example (Enum vs as const)
======================================================================
*/

// Enum Version
enum DirectionEnum {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

function moveEnum(dir: DirectionEnum) {
  console.log("Moving:", dir);
}

moveEnum(DirectionEnum.Left); // ✅

// as const Version
const Direction = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT"
} as const;

type DirectionType = (typeof Direction)[keyof typeof Direction];

function moveConst(dir: DirectionType) {
  console.log("Moving:", dir);
}

moveConst(Direction.Right); // ✅
moveConst("UP");            // ✅
moveConst("LEFT");          // ✅



/*
======================================================================
🔹 Example 3: Using keyof typeof with "as const"
======================================================================
*/

const Status = {
  Pending: "PENDING",
  Approved: "APPROVED",
  Rejected: "REJECTED"
} as const;

// শুধু key গুলো টাইপ হিসেবে নিতে চাইলে:
type StatusKeys = keyof typeof Status; // "Pending" | "Approved" | "Rejected"

// শুধু value গুলো টাইপ হিসেবে নিতে চাইলে:
type StatusValues = (typeof Status)[keyof typeof Status]; // "PENDING" | "APPROVED" | "REJECTED"

function updateStatus(status: StatusValues) {
  console.log(`Status updated: ${status}`);
}

updateStatus("APPROVED"); // ✅
updateStatus(Status.Rejected); // ✅
/* updateStatus("CANCELLED"); ❌ Error — invalid value */



/*
======================================================================
🔹 Example 4: Object as const + Interface
======================================================================
*/

const Category = {
  Electronics: "ELECTRONICS",
  Fashion: "FASHION",
  Grocery: "GROCERY"
} as const;

type CategoryType = (typeof Category)[keyof typeof Category];

interface Product {
  id: number;
  name: string;
  category: CategoryType;
}

const item: Product = {
  id: 1,
  name: "Laptop",
  category: Category.Electronics
};

console.log(item);
/*
{
  id: 1,
  name: "Laptop",
  category: "ELECTRONICS"
}
*/



/*
======================================================================
🔹 Example 5: as const দিয়ে Nested Object
======================================================================
*/

const AppConfig = {
  THEME: {
    LIGHT: "light",
    DARK: "dark"
  },
  LANG: {
    EN: "English",
    BN: "Bangla"
  }
} as const;

// Nested object থেকে literal টাইপ তৈরি করা
type ThemeType = (typeof AppConfig.THEME)[keyof typeof AppConfig.THEME]; // "light" | "dark"
type LangType = (typeof AppConfig.LANG)[keyof typeof AppConfig.LANG];     // "English" | "Bangla"

function setTheme(theme: ThemeType) {
  console.log(`Theme changed to: ${theme}`);
}

setTheme("light"); // ✅
setTheme(AppConfig.THEME.DARK); // ✅



/*
======================================================================
📦 Comparison: Enum vs as const
======================================================================

| Feature                 | Enum                           | as const Object                      |
|--------------------------|--------------------------------|--------------------------------------|
| 🔸 Compile Output        | Runtime object generated        | No runtime code (pure TS feature)   |
| 🔸 Performance           | Slightly slower (extra JS)     | Faster (no runtime overhead)        |
| 🔸 Type Safety           | Very Safe                      | Equally Safe                        |
| 🔸 Reverse Mapping       | Supported (only numeric enum)  | Not supported                       |
| 🔸 Flexibility           | Fixed structure                | More flexible                       |
| 🔸 Use Case              | Legacy / Runtime needed enums  | Modern, lightweight alternatives    |

======================================================================
🎯 সংক্ষেপে:
======================================================================

✅ যদি তোমার enum শুধু compile-time type checking এর জন্য লাগে → 
   **`as const` object literal** ব্যবহার করো।

✅ যদি তোমার enum এর মান runtime এও দরকার হয় (যেমন: database mapping, reflection) → 
   **enum** ব্যবহার করা যুক্তিসঙ্গত।

💡 আধুনিক TypeScript কোডে “as const” object literal 
**Enum-এর lightweight এবং preferred বিকল্প** হিসেবে বিবেচিত হয়।
======================================================================
*/
