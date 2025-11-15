/* 
====================================================================================
🔰 Access Modifiers in TypeScript 
====================================================================================

TypeScript এ Access Modifier ব্যবহার করা হয় Class এর ভিতরের property এবং method 
কিভাবে access করা যাবে সেটা নিয়ন্ত্রণ করার জন্য।

মোট ৩ ধরনের Access Modifier আছে:

1️⃣ public  
2️⃣ private  
3️⃣ protected  

এগুলো OOP (Object-Oriented Programming) এ খুবই গুরুত্বপূর্ণ — কারণ এগুলো দিয়ে 
Encapsulation নিশ্চিত করা হয়।

====================================================================================
🔰 1) public  (default)
====================================================================================

📌 public মানে: class এর বাইরে থেকেও access করা যাবে  
📌 property/method যেকোনো জায়গা থেকে visible থাকবে  
📌 default modifier, না লিখলেও public হিসেবেই কাজ করে  

*/

class Person {
  public name: string; // বাইরে থেকেও access করা যাবে

  constructor(name: string) {
    this.name = name; // public হওয়ায় সমস্যা নাই
  }

  public greet() {
    console.log(`Hello, ${this.name}`);
  }
}

const p = new Person("Ridoan");
console.log(p.name); // public হওয়ায় কাজ করবে
p.greet(); // public হওয়ায় কাজ করবে



/* 
====================================================================================
🔰 2) private 
====================================================================================

📌 private মানে: class এর বাইরে থেকে access করা যাবে না  
📌 শুধুমাত্র class এর ভিতরে access করা যাবে  
📌 subclass (child class) থেকেও access করা যাবে না  

*/

class BankAccount {
  private balance: number; // বাইরে থেকে direct access ❌

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  // balance পড়ার একটি অনুমোদিত উপায়
  public getBalance() {
    return this.balance; // class এর ভিতরে হওয়ায় ✔
  }
}

const acc = new BankAccount(500);
// console.log(acc.balance); // ❌ ERROR: private, বাইরে থেকে access করা যাবে না
console.log(acc.getBalance()); // ✔ 500



/* 
====================================================================================
🔰 3) protected
====================================================================================

📌 protected মানে: class এর বাইরে থেকে access ❌  
📌 কিন্তু subclass (child class) থেকে access ✔

*/

class Animal {
  protected category: string = "Animal"; // বাইরে থেকে নেই, child class থেকে আছে
}

class Dog extends Animal {
  public showCategory() {
    console.log(this.category); // protected → child class থেকে access করা যাবে ✔
  }
}

const d = new Dog();
d.showCategory(); // Animal
// console.log(d.category); // ❌ বাইরে থেকে access করা যাবে না



/* 
====================================================================================
🔰 Constructor with Access Modifiers (Shortcut)
====================================================================================

📌 constructor parameter এ সরাসরি public/private/protected লিখলে:
    → property automatically create হয়ে যায়  
    → এবং value bind হয়ে যায়  

*/

class Student {
  constructor(
    public name: string,     // property auto create ✔
    private id: number,      // private property auto create ✔
    protected section: string // protected property auto create ✔
  ) {}

  public showInfo() {
    console.log(this.name, this.section);
  }
}

const s = new Student("Akash", 123, "A");
console.log(s.name); // ✔ public
// console.log(s.id); // ❌ private
// console.log(s.section); // ❌ protected



/* 
====================================================================================
🔰 Summary (Revision Notes)
====================================================================================

★ public  
    → everywhere access করা যায় (default)

★ private  
    → শুধুমাত্র class এর ভিতরে access  
    → outside বা subclass থেকে নয়  

★ protected  
    → class এবং subclass এর ভিতর access  
    → outside থেকে নয়  

★ Access Modifier দিয়ে encapsulation নিশ্চিত করা হয়  

====================================================================================
*/
