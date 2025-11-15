/* 
====================================================================================
🔰 Polymorphism — The 2nd Pillar of OOP 
====================================================================================

📌 OOP এর ৪টি মূল স্তম্ভ:  
1) Encapsulation  
2) **Polymorphism** ← (আজ এটা শিখবো)  
3) Inheritance  
4) Abstraction  

এইগুলোর মধ্যে Polymorphism হলো সবচেয়ে powerful ধারণা।

====================================================================================
🔰 Polymorphism কী?
====================================================================================

"Poly" = many  
"Morph" = form/shape  

➡️ অর্থাৎ *এক জিনিসের বহু রকম রূপ নেওয়ার ক্ষমতা*  
➡️ একই function/method বিভিন্ন ধরনের behavior দেখাতে পারে  
➡️ override + same interface/different behavior  

📌 Polymorphism সাধারণত দুইভাবে দেখা যায়:

1️⃣ **Method Overriding** → Inheritance এ parent method কে override করা  
2️⃣ **Method Overloading (TS supports via declaration)**  

TypeScript এ Polymorphism প্রধানত **method overriding** দিয়ে implement করা হয়।

====================================================================================
🔰 Basic Example of Polymorphism Using Method Overriding
====================================================================================
*/

class Animal {
  // parent class এর method
  makeSound() {
    console.log("Animal is making a sound...");
  }
}

class Dog extends Animal {
  // overriding → একই method → but আলাদা behaviour
  makeSound() {
    console.log("Dog is barking 🐶");
  }
}

class Cat extends Animal {
  // overriding → একই method → but আলাদা behaviour
  makeSound() {
    console.log("Cat is meowing 🐱");
  }
}

// Polymorphism in action
function playSound(animal: Animal) {
  animal.makeSound(); // object অনুযায়ী behavior দেখাবে
}

playSound(new Dog()); // Dog is barking
playSound(new Cat()); // Cat is meowing
playSound(new Animal()); // Animal is making a sound...



/*
====================================================================================
🔰 কীভাবে এটি Polymorphism?
====================================================================================

📌 আমরা একই function (playSound) ব্যবহার করছি  
📌 একই method নাম (makeSound)  
📌 কিন্তু object অনুযায়ী আলাদা output পাচ্ছি  
➡️ এই "একই interface → different behavior" এইটাই Polymorphism  

====================================================================================
🔰 Another Example: Shapes (Common Polymorphism Pattern)
====================================================================================
*/

class Shape {
  area(): number {
    return 0; // default
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area() {
    return 3.1416 * this.radius * this.radius;
  }
}

function printArea(shape: Shape) {
  console.log("Area:", shape.area());
}

printArea(new Rectangle(10, 20)); // 200
printArea(new Circle(5));         // 78.54
printArea(new Shape());           // 0



/*
====================================================================================
🔰 Real-Life Example of Polymorphism
====================================================================================

ধরো একটা payment system আছে:

➡️ PaymentProcessor (parent)  
➡️ Bkash, Nagad, CardPayment (child classes)  

সব ক্লাস এর method "pay()" → কিন্তু কারো কাজ আলাদা আলাদা।

====================================================================================
*/

class PaymentProcessor {
  pay(amount: number) {
    console.log(`Paying ${amount} using default payment method`);
  }
}

class Bkash extends PaymentProcessor {
  pay(amount: number) {
    console.log(`Paying ${amount} using Bkash 📱`);
  }
}

class CardPayment extends PaymentProcessor {
  pay(amount: number) {
    console.log(`Paying ${amount} using Debit/Credit Card 💳`);
  }
}

function processPayment(p: PaymentProcessor, amount: number) {
  p.pay(amount);
}

processPayment(new Bkash(), 500);
processPayment(new CardPayment(), 1200);
processPayment(new PaymentProcessor(), 300);



/*
====================================================================================
🔰 Method Overloading (TS Special Case)
====================================================================================

TypeScript এ overloading signature allow করে, কিন্তু বাস্তবে runtime-এ 
একটাই implementation থাকে।

====================================================================================
*/

class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    return a + b; // implementation is one
  }
}

const calc = new Calculator();
console.log(calc.add(5, 10));     // 15
console.log(calc.add("Hi, ", "Bro")); // Hi, Bro



/*
====================================================================================
🔰 Summary (Revision Notes)
====================================================================================

★ Polymorphism → "এক জিনিসের বিভিন্ন রূপ"  
★ মূলত method overriding এর মাধ্যমে বাস্তবে কাজ করে  
★ একই method → আলাদা আলাদা behavior  
★ Parent type এর reference দিয়ে child type এর object control করা যায়  
★ Polymorphism হলো OOP এর second pillar  

✔ Method Overriding = Polymorphism  
✔ Method Overloading (TypeScript supports via signature)  

====================================================================================
*/
