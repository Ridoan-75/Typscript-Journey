/* 
=========================================================
📘 Class & Object in TypeScript 
=========================================================

🔵 ক্লাস (Class) কী?
-------------------------------------------
TypeScript এ "class" হলো একটি blueprint বা design — যেখান থেকে আমরা
object তৈরি করি। ক্লাসের মধ্যে থাকে:
  - properties (variable)
  - methods (function)
  - constructor (special function)
  - access modifiers (public, private, protected)
  - readonly properties
  - optional properties
  - static properties & methods
  - inheritance (extends)

🔵 অবজেক্ট (Object) কী?
-------------------------------------------
ক্লাসের instance-ই হলো object। মানে ক্লাস থেকে বানানো আসল usable জিনিস।

===========================================
📌 Basic Class Example
===========================================
*/

class Person {
  // property → object er data store korar jonno
  name: string;      // Bangla comment: নাম রাখবে
  age: number;       // Bangla comment: বয়স রাখবে

  // constructor → object create howar সময় automatically call হয়
  constructor(name: string, age: number) {
    this.name = name;   // this → current object ke refer kore
    this.age = age;
  }

  // method → object er behaviour
  greet(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// object create
const user1 = new Person("Ridoan", 22);  // Bangla: এখানে Person ক্লাস থেকে নতুন object তৈরি হল
user1.greet(); // Output: Hello, my name is Ridoan and I am 22 years old.



/*
===========================================
📘 Access Modifiers (public, private, protected)
===========================================
*/

class Bank {
  public name: string;     // überall accessible → ক্লাসের ভিতরে, বাইরে, inheritance সব জায়গায়
  private balance: number; // শুধু class এর ভিতরে access করা যাবে
  protected branch: string;// class + child class এ access করা যাবে

  constructor(name: string, balance: number, branch: string) {
    this.name = name;
    this.balance = balance;
    this.branch = branch;
  }

  public getBalance(): number {
    return this.balance; // private property access only allowed inside class
  }
}

const acc1 = new Bank("Siam", 5000, "Dhaka");
// acc1.balance ❌ Error: private
// acc1.branch ❌ Error: protected
acc1.getBalance(); // works ✔



/*
===========================================
📘 Readonly property
===========================================
*/

class Car {
  readonly brand: string; // একবার set করলে আর change করা যাবে না
  model: string;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
  }
}

const c1 = new Car("Toyota", "Corolla");
// c1.brand = "BMW"; ❌ Error: readonly property cannot be changed



/*
===========================================
📘 Optional Properties (?)
===========================================
*/

class Student {
  name: string;
  age?: number; // optional property → থাকতেও পারে, নাও থাকতে পারে

  constructor(name: string, age?: number) {
    this.name = name;
    this.age = age;
  }
}

const s1 = new Student("Arif");
const s2 = new Student("Hasan", 23);



/*
===========================================
📘 Methods with Return Types
===========================================
*/

class MathOps {
  add(a: number, b: number): number {
    return a + b;
  }

  print(msg: string): void {
    console.log(msg);
  }
}

const m = new MathOps();
m.add(10, 20); // 30



/*
===========================================
📘 Static Properties & Methods
===========================================

Static means:
- class এর সাথেই থাকে
- object বানানো লাগে না
*/

class Counter {
  static count: number = 0; // static property

  static increment(): void {  // static method
    Counter.count++;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.count); // 2



/*
===========================================
📘 Inheritance (extends)
===========================================
*/

class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("Some generic sound...");
  }
}

class Dog extends Animal {
  // Dog automatically inherits properties & methods of Animal
  bark(): void {
    console.log(`${this.name} is barking!`);
  }
}

const d1 = new Dog("Tommy");
d1.makeSound(); // inherited method
d1.bark();      // Dog method



/*
===========================================
📘 Super Keyword (parent constructor call)
===========================================
*/

class Human {
  constructor(public name: string) {}
}

class Student2 extends Human {
  constructor(name: string, public roll: number) {
    super(name); // parent class constructor call must be first
  }
}

const st = new Student2("Mizan", 101);



/*
===========================================
📘 Getters & Setters
===========================================
*/

class User {
  private _password: string = "";

  // setter → value set করার rules define করা যায়
  set password(pass: string) {
    if (pass.length < 5) {
      throw new Error("Password must be at least 5 characters");
    }
    this._password = pass;
  }

  // getter → value পাঠায় (read-only)
  get password(): string {
    return this._password;
  }
}

const u = new User();
u.password = "12345"; // setter call
console.log(u.password); // getter call



/*
===========================================
📘 Conclusion Summary 
===========================================
✔ Class = blueprint  
✔ Object = instance of class  
✔ Constructor = automatic method for initialization  
✔ this = current object  
✔ Access modifiers → public, private, protected  
✔ Readonly properties → change করা যায় না  
✔ Optional properties (?)  
✔ Static properties/methods → class-level  
✔ Inheritance → extends  
✔ super() → parent constructor call  
✔ Getter/Setter → controlled access  

এগুলো ভালোভাবে শিখলে তুমি easily বড় project handle করতে পারবে।
*/
