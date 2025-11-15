/* 
====================================================================================
🔰 Encapsulation — The 1st Pillar of OOP
====================================================================================

📌 Encapsulation মানে হলো:
    → data এবং related method—একটি class এর মধ্যে “capsule” করে রাখা  
    → data কে private রেখে বাইরে থেকে uncontrolled access ব্লক করা  
    → controlled access দেওয়ার জন্য getter/setter বা public method ব্যবহার করা  

✔ এটি security, maintainability, এবং data protection নিশ্চিত করে।  
✔ Large application এ Encapsulation সবচেয়ে বেশি প্রয়োজন হয়।

====================================================================================
🔰 কেন Encapsulation দরকার?
====================================================================================

✔ Sensitive data কে protect করতে  
✔ Outside থেকে আমাকে কি access করতে দিবো—তা control করতে  
✔ অপ্রয়োজনীয় জিনিস লুকাতে (data hiding)  
✔ Future changes সহজ করা (implementation change করলেও outside কোড নষ্ট হবে না)

====================================================================================
🔰 Example 1: Basic Encapsulation with private properties
====================================================================================
*/

class BankAccount {
  // 👇 Private data → বাইরে থেকে একদমই access করা যাবে না
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  // 👇 Public method → controlled access
  deposit(amount: number) {
    if (amount <= 0) throw new Error("Invalid deposit amount!");
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount > this.balance) throw new Error("Insufficient funds!");
    this.balance -= amount;
  }

  getBalance() {
    return this.balance; // private হলেও class এর ভেতরে access allowed ✔
  }
}

const acc = new BankAccount(500);
acc.deposit(200);
console.log(acc.getBalance()); // 700
// acc.balance = 0; // ❌ ERROR: private হওয়ায় বাইরে থেকে access করা allowed না



/*
====================================================================================
🔰 Example 2: Encapsulation using Getter and Setter
====================================================================================
*/

class Student {
  private _age: number = 0;

  // Getter → read access
  get age() {
    return this._age;
  }

  // Setter → write access (with validation)
  set age(value: number) {
    if (value < 0) throw new Error("Age cannot be negative!");
    this._age = value;
  }
}

const st = new Student();
st.age = 20; // setter call
console.log(st.age); // getter call → 20
// st._age; // ❌ direct access নয়



/*
====================================================================================
🔰 Example 3: Encapsulation + Constructor Short Syntax
====================================================================================

📌 constructor parameter এ access modifier দিলে property auto তৈরি হয়  
📌 এটি encapsulation সহজ করে
*/

class User {
  constructor(
    private username: string,
    private password: string
  ) {}

  public getUserInfo() {
    return `Username: ${this.username}`;
  }
}

const u = new User("ridoan", "12345");
// console.log(u.password); // ❌ private → তাই access allowed না
console.log(u.getUserInfo());



/*
====================================================================================
🔰 Example 4: Real-Life Use Case — E-Commerce Cart
====================================================================================
*/

class Cart {
  private items: string[] = [];

  addItem(product: string) {
    this.items.push(product);
  }

  getItems() {
    // সবকিছু expose না করে শুধু প্রয়োজনীয় জিনিস দিচ্ছে → abstraction + encapsulation
    return [...this.items]; // copy return করে data protect করা হচ্ছে ✔
  }
}

const cart = new Cart();
cart.addItem("Laptop");
cart.addItem("Mouse");
console.log(cart.getItems());
// cart.items.push("Hacked"); // ❌ Encapsulation says NO!



/*
====================================================================================
🔰 Summary (Revision Notes for GitHub)
====================================================================================

✔ Encapsulation = data + methods inside a single unit (class)  
✔ private দিয়ে data hide করা যায়  
✔ public method/getter/setter দিয়ে controlled access দেওয়া হয়  
✔ security + maintainability + clean structure নিশ্চিত হয়  
✔ real-life উদাহরণ: bank account, cart, profile, API, payment systems  

====================================================================================
*/
