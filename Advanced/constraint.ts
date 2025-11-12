/* 
======================================
🎯 Constraint in TypeScript  
======================================

📘 ভূমিকা:
----------------
➡ TypeScript-এ **Generics** ব্যবহার করলে আমরা চাইলে সেটিকে এমনভাবে সীমাবদ্ধ করতে পারি 
   যাতে সেটি শুধু নির্দিষ্ট ধরণের টাইপ গ্রহণ করে।
➡ এই সীমাবদ্ধতা বা শর্তকেই বলা হয় **Constraint**।
➡ Constraint মূলত **extends** keyword ব্যবহার করে নির্ধারণ করা হয়।

======================================
🔹 কেন Constraint দরকার?
======================================
➡ ধরো আমরা এমন একটি generic function বানাতে চাই, যা শুধুমাত্র এমন object নেবে 
   যার মধ্যে `length` property আছে (যেমন: string, array, object ইত্যাদি)।
➡ যদি আমরা constraint না দিই, তাহলে TypeScript জানবে না যে `length` property আদৌ আছে কিনা, 
   আর তখন error দিবে।
*/

function logLength<T>(item: T): void {
  // ❌ Error: Property 'length' does not exist on type 'T'
  // console.log(item.length);
}

/*
🔸 এই সমস্যা ঠিক করতে আমরা বলব — “T অবশ্যই এমন কিছু হতে হবে যার length আছে”।
   অর্থাৎ, constraint হিসেবে Lengthwise interface দিই।
*/

interface Lengthwise {
  length: number;
}

function logLengthConstrained<T extends Lengthwise>(item: T): void {
  // ✅ এখন TypeScript জানে যে item এর মধ্যে অবশ্যই length আছে।
  console.log("Length is:", item.length);
}

logLengthConstrained("Hello TypeScript"); // ✅ string এর length আছে
logLengthConstrained([1, 2, 3]); // ✅ array এর length আছে
// logLengthConstrained(123); ❌ Error: number-এর length নেই

/*
======================================
🔹 Object Constraint Example
======================================
➡ এখন আমরা এমন constraint ব্যবহার করব যা object structure অনুযায়ী সীমাবদ্ধ করে।
*/

interface Person {
  name: string;
  age: number;
}

function showPerson<T extends Person>(person: T): void {
  // ✅ এখন T অবশ্যই Person-এর structure follow করবে
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

showPerson({ name: "Ridoan", age: 23 }); // ✅ ঠিক আছে
// showPerson({ name: "Ridoan" }); ❌ Error: age missing

/*
======================================
🔹 Multiple Constraints (দুই বা ততোধিক শর্ত)
======================================
➡ আমরা চাইলে একাধিক constraint একসাথে দিতে পারি intersection (&) দিয়ে।
*/

interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

function showDetails<T extends HasId & HasName>(obj: T): void {
  console.log(`ID: ${obj.id}, Name: ${obj.name}`);
}

showDetails({ id: 1, name: "TypeScript" }); // ✅ ঠিক আছে
// showDetails({ id: 1 }); ❌ Error: name missing

/*
======================================
🔹 keyof Constraint (Object Key Constraint)
======================================
➡ keyof ব্যবহার করে আমরা object-এর নির্দিষ্ট key গুলোতে constraint দিতে পারি।
*/

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  // ✅ key শুধুমাত্র obj-এর মধ্যে বিদ্যমান key হতে পারবে
  return obj[key];
}

const user = { name: "Ridoan", age: 23, country: "Bangladesh" };

const userName = getProperty(user, "name"); // ✅ ঠিক আছে
// const wrongKey = getProperty(user, "salary"); ❌ Error: 'salary' key নেই

/*
======================================
🔹 Generic Class Constraint
======================================
➡ Class-এর মধ্যেও generics এর constraint ব্যবহার করা যায়।
*/

class DataStorage<T extends string | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data = this.data.filter((i) => i !== item);
  }

  getItems(): T[] {
    return this.data;
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");
console.log(textStorage.getItems()); // ✅ ["Hello", "World"]

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
console.log(numberStorage.getItems()); // ✅ [10, 20]

// const objectStorage = new DataStorage<object>(); ❌ Error: object allowed নয় কারণ constraint দেওয়া হয়েছে string | number এ

/*
======================================
🔹 Default Type সহ Constraint
======================================
➡ আমরা চাইলে Constraint-এর সাথে Default Type ও দিতে পারি।
*/

function printValue<T extends string | number = string>(value: T) {
  console.log("Value:", value);
}

printValue("Default Type String"); // ✅ Default string type
printValue<number>(100); // ✅ Explicitly number type

/*
======================================
📌 Summary (সারাংশ):
----------------------------------------------------------
✅ Constraint মানে হলো — “Generic টাইপকে সীমাবদ্ধ করা”।
✅ এটি আমরা **extends** keyword দিয়ে দিই।
✅ এতে TypeScript জানে কোন property বা structure থাকবে।
✅ Constraint object, interface, primitive, বা union type হতে পারে।
✅ keyof ব্যবহার করে object key-ভিত্তিক constraint দেওয়া যায়।
✅ Class এবং Function উভয় জায়গায় constraint ব্যবহার করা যায়।
✅ Default টাইপ এবং constraint একসাথে ব্যবহার করা সম্ভব।
*/

