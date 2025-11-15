/* 
====================================================================================
🔰 Getter এবং Setter in TypeScript
====================================================================================

📌 Getter এবং Setter হল Class এর ভিতরে property control করার smart technique.  
📌 এগুলোকে Accessor বলা হয়।

Getter → property "read" করার rules control করে  
Setter → property "modify / write" করার rules control করে  

এর ফলে:
✔ encapsulation বজায় থাকে  
✔ validation করা যায়  
✔ private property কে controlled way তে access করানো যায়  

====================================================================================
🔰 Basic Example — Getter & Setter
====================================================================================
*/

class Person {
  private _age: number; // private variable (direct access করা যাবে না)

  constructor(age: number) {
    this._age = age;
  }

  // 🔍 Getter → property read করার সময় call হবে
  public get age() {
    return this._age;
  }

  // 🔍 Setter → property set করার সময় call হবে
  public set age(value: number) {
    if (value < 0) {
      throw new Error("Age cannot be negative!");
    }
    this._age = value;
  }
}

const p = new Person(20);

console.log(p.age); // Getter call → 20

p.age = 25; // Setter call  
console.log(p.age); // 25

// p.age = -5; // ❌ Setter validation → Error: Age cannot be negative!



/*
====================================================================================
🔰 কেন Getter & Setter ব্যবহার করা হয়? (Real Benefits)
====================================================================================

✔ Private data কে control করে access দিতে  
✔ Set করার আগে validation/check করতে  
✔ Read করার সময় extra formatting করতে  
✔ Data encapsulation বজায় রাখতে  

====================================================================================
🔰 Example: Validation + Formatted Output সহ
====================================================================================
*/

class Product {
  private _price: number;

  constructor(price: number) {
    this._price = price;
  }

  // Getter → formatted output example
  get price() {
    return `${this._price}`;
  }

  // Setter → validation example
  set price(value: number) {
    if (value <= 0) {
      throw new Error("Price must be greater than 0!");
    }
    this._price = value;
  }
}

const pro = new Product(50);

console.log(pro.price); // $50
pro.price = 100;
console.log(pro.price); // $100
// pro.price = 0; // ❌ Error



/*
====================================================================================
🔰 Getter & Setter with readonly-like behaviour
====================================================================================
*/

class Employee {
  private _salary: number = 30000;

  // শুধুমাত্র getter → outside থেকে read করা যাবে
  get salary() {
    return this._salary;
  }

  // setter নেই → তাই modify করা যাবে না
}

const emp = new Employee();
console.log(emp.salary); // 30000
// emp.salary = 40000; // ❌ Error → setter নাই, তাই assign করা যাবে না



/*
====================================================================================
🔰 Getter/Setter with Constructor Short Syntax
====================================================================================

TypeScript এ property short-hand এর সাথে getter/setter একসাথে কাজ করতে পারে।
*/

class Student {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name() {
    return this._name.toUpperCase(); // getter → formatted output
  }

  set name(value: string) {
    if (!value) {
      throw new Error("Name cannot be empty!");
    }
    this._name = value;
  }
}

const st = new Student("Ridoan");
console.log(st.name); // RIDOAN (uppercase getter)
st.name = "Hasan";
console.log(st.name); // HASAN



/*
====================================================================================
🔰 Summary (Revision Notes)
====================================================================================

★ Getter → property পড়তে (read) ব্যবহার হয়  
★ Setter → property পরিবর্তন (write) করতে ব্যবহার হয়  
★ private property control করতে দারুণ কার্যকর  
★ validation/formatting সহজ হয়  
★ Encapsulation আরও শক্তিশালী হয়  

====================================================================================
*/
