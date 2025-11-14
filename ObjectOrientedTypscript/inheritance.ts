/* 
===========================================================
📘 Inheritance in TypeScript (The first pilar of OOP)
===========================================================

Inheritance holo Object-Oriented Programming er ekta most important concept.
Eta use kore ekta class onno ekta class er properties & methods ke inherit
(copy kore nite) pare.

➡ Parent/Base Class → জেটা থেকে inherit করা হয়
➡ Child/Derived/Subclass → জেটা inherit করে

Inheritance ব্যবহার করার উপকারিতা:
-------------------------------------
✔ code reuse হয়  
✔ duplicate code কমে  
✔ বড় project maintain করা easy  
✔ structure clean থাকে  
✔ hierarchy maintain করা যায়

===========================================
📌 Basic Inheritance Example
===========================================
*/

class Animal {
  name: string;

  constructor(name: string) {
    this.name = name; // Bangla: Animal এর নাম set করা হচ্ছে
  }

  makeSound(): void {
    console.log("Animal is making a sound...");
  }
}

// Dog inherits from Animal
class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} is barking!`);
  }
}

const dog1 = new Dog("Rex");
dog1.makeSound(); // parent class method ✔
dog1.bark();      // child class method ✔



/*
===========================================
📘 super() ব্যবহার (Parent Constructor কল করা)
===========================================
*/

class Person {
  constructor(public name: string, public age: number) {}
}

class Student extends Person {
  roll: number;

  constructor(name: string, age: number, roll: number) {
    super(name, age); // Bangla: Parent constructor call (must be first line)
    this.roll = roll;
  }
}

const st1 = new Student("Ridoan", 22, 101);



/*
===========================================
📘 Method Overriding (Parent method কে replace করা)
===========================================

Child class চাইলে parent এর method কে overwrite করতে পারে.
*/

class Vehicle {
  start(): void {
    console.log("Vehicle is starting...");
  }
}

class Bike extends Vehicle {
  // overriding
  start(): void {
    console.log("Bike is starting with kick-start!");
  }
}

const b1 = new Bike();
b1.start(); // overridden method will run



/*
===========================================
📘 super.method() → Parent method access করা
===========================================
*/

class Bird {
  fly(): void {
    console.log("Bird is flying...");
  }
}

class Eagle extends Bird {
  fly(): void {
    super.fly(); // parent method call
    console.log("Eagle is flying high!");
  }
}

const e1 = new Eagle();
e1.fly();



/*
===========================================
📘 Protected Modifier (Child class access করতে পারে)
===========================================

protected → class + child class এ access করা যায়
*/

class BankAccount {
  protected balance: number = 1000;

  getBalance() {
    return this.balance;
  }
}

class SavingsAccount extends BankAccount {
  deposit(amount: number) {
    this.balance += amount; // protected property use করা যাবে
  }
}

const sAcc = new SavingsAccount();
sAcc.deposit(500);
console.log(sAcc.getBalance()); // 1500



/*
===========================================
📘 Multilevel Inheritance (একটার উপর আরেকটা)
===========================================
*/

class A {
  greet() {
    console.log("Hello from A");
  }
}

class B extends A {
  greetB() {
    console.log("Hello from B");
  }
}

class C extends B {
  greetC() {
    console.log("Hello from C");
  }
}

const cObj = new C();
cObj.greet();  // From A
cObj.greetB(); // From B
cObj.greetC(); // From C



/*
===========================================
📘 Hierarchical Inheritance
(one parent → multiple child)
===========================================
*/

class Shape {
  draw(): void {
    console.log("Drawing a shape...");
  }
}

class Circle extends Shape {
  draw(): void {
    console.log("Drawing a circle...");
  }
}

class Rectangle extends Shape {
  draw(): void {
    console.log("Drawing a rectangle...");
  }
}

const cir = new Circle();
cir.draw();

const rec = new Rectangle();
rec.draw();



/*
===========================================
📘 Abstract Class + Inheritance (Advanced)
===========================================

abstract class → directly object বানানো যায় না
but child class must implement specific methods
*/

abstract class Worker {
  abstract work(): void; // must be implemented in child

  log(): void {
    console.log("Worker is active...");
  }
}

class Developer extends Worker {
  work(): void {
    console.log("Developer is coding...");
  }
}

const dev = new Developer();
dev.work();
dev.log();



/*
===========================================================
📘 Final Summary 
===========================================================
✔ Inheritance = একটি class আরেকটি class থেকে properties & methods পায়  
✔ extends → inheritance বোঝায়  
✔ super() → parent constructor কল করা  
✔ overriding → parent method replace করা  
✔ protected → class + child এ access করা যায়  
✔ abstract class → incomplete design (child complete করে)  
✔ multiple inheritance support করে না (JS/TS এ নেই)  
✔ multilevel + hierarchical inheritance possible  

এগুলো শিখলে তুমি বড় বড় OOP structured project সহজে করতে পারবে।
*/
