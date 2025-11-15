/* 
====================================================================================
🔰 Abstraction — The 3rd Pillar of OOP 
====================================================================================

📌 Abstraction মানে হলো — জটিল জিনিসকে সহজভাবে উপস্থাপন করা।  
অর্থাৎ unnecessary detail লুকিয়ে শুধুমাত্র গুরুত্বপূর্ণ জিনিস দেখানো।

➡️ তুমি গাড়ি চালাতে জানো কিন্তু ইঞ্জিন ভিতরে কিভাবে কাজ করে সেটা জানো না –  
   এটাই abstraction.

TypeScript এ abstraction দুইভাবে করা যায়:

1️⃣ abstract class  
2️⃣ interface  

এগুলো দিয়ে আমরা এমন একটি কাঠামো (structure) বানাই, যেটা child class follow করতে বাধ্য।

====================================================================================
🔰 কেন Abstraction ব্যবহার করবো?
====================================================================================

✔ Complex implementation hide করা যায়  
✔ শুধুমাত্র প্রয়োজনীয় জিনিস exposed করা হয়  
✔ Code কে clean, secure এবং maintainable করে  
✔ Large software design এ perfect  

====================================================================================
🔰 Abstract Class 
====================================================================================

📌 abstract class কখনো object বানানো যায় না  
📌 এটি শুধু blueprint হিসেবে কাজ করে  
📌 abstract method থাকতেই পারে  
📌 child class গুলোকে অবশ্যই abstract method override করতে হয়  
====================================================================================
*/

abstract class Animal {
  abstract makeSound(): void;   // কোন implementation নাই → child কে অবশ্যই override করতে হবে

  move() {
    console.log("Animal is moving...");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Dog is barking 🐶");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("Cat is meowing 🐱");
  }
}

// const a = new Animal(); // ❌ ERROR: abstract class এর object তৈরি যায় না

const dog = new Dog();
dog.makeSound(); // Dog is barking
dog.move();      // Animal is moving...



/*
====================================================================================
🔰 Real-Life Example of Abstraction: Payment System
====================================================================================
*/

abstract class PaymentProcessor {
  abstract pay(amount: number): void;  // implementation নাই → force override

  validate(amount: number) {
    if (amount <= 0) throw new Error("Amount must be positive!");
  }
}

class BkashPayment extends PaymentProcessor {
  pay(amount: number) {
    this.validate(amount);
    console.log(`Paying ${amount} using Bkash 📱`);
  }
}

class CardPayment extends PaymentProcessor {
  pay(amount: number) {
    this.validate(amount);
    console.log(`Paying ${amount} using Card 💳`);
  }
}

const bk = new BkashPayment();
bk.pay(500);



/*
====================================================================================
🔰 Abstraction using Interface
====================================================================================

📌 Interface হলো pure abstraction (100%)  
📌 শুধুমাত্র structure define করে → কোন implementation রাখে না  
📌 class interface implement করলে সব method implement করতে হবে  

====================================================================================
*/

interface Vehicle {
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  start() {
    console.log("Car Started 🚗");
  }
  stop() {
    console.log("Car Stopped 🛑");
  }
}

const c = new Car();
c.start();
c.stop();



/*
====================================================================================
🔰 Abstract Class vs Interface (Important Revision Notes)
====================================================================================

★ Abstract Class  
    ✔ abstract + normal method থাকতে পারে  
    ✔ properties & constructor থাকতে পারে  
    ✔ partial abstraction possible  
    ✔ object তৈরি করা যায় না  
    ✔ single inheritance (একটা class শুধু একটাই extend করতে পারে)

★ Interface  
    ✔ pure abstraction  
    ✔ শুধু structure — implementation নাই  
    ✔ class multiple interface implement করতে পারে (multiple inheritance-like)

====================================================================================
🔰 Summary (Revision Notes for GitHub)
====================================================================================

✔ Abstraction → complexity hide করে শুধুমাত্র প্রয়োজনীয় জিনিস দেখায়  
✔ abstract class → cannot instantiate, must override abstract methods  
✔ interface → pure abstraction  
✔ abstraction improves: readability, maintainability, security  
✔ real-life: payment system, devices, shapes, API design everywhere  

====================================================================================
*/
