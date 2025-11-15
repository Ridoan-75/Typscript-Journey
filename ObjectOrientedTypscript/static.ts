/* 
====================================================================================
🔰 Static in TypeScript 
====================================================================================

⚡ Static keyword ব্যবহার করা হয় Class এর property এবং method কে 
   *object ছাড়াই* access করার জন্য।

📌 সাধারণ property/method → object তৈরি করে access করতে হয়  
📌 static property/method → class নাম দিয়ে সরাসরি access করা যায় (object লাগবে না)

====================================================================================
🔰 Static Property & Method — Basic Example
====================================================================================
*/

class Counter {
  // 🔵 static property → object ছাড়া access করা যাবে
  static count: number = 0;

  // 🔵 static method → class থেকে direct call করা যাবে
  static increment() {
    Counter.count++; // class name দিয়ে access করতে হবে
  }

  static showCount() {
    console.log(`Current Count: ${Counter.count}`);
  }
}

// 👇 object বানানোর দরকার নেই
Counter.increment();
Counter.increment();
Counter.showCount(); // Current Count: 2



/*
====================================================================================
🔰 Instance Property vs Static Property
====================================================================================

📌 Instance Property: প্রতিটি object এর জন্য আলাদা data থাকে  
📌 Static Property: পুরো class এর জন্য *একটাই shared data* থাকে  

====================================================================================
🔰 Example: Static is Shared Across All Objects
====================================================================================
*/

class Student {
  static totalStudents: number = 0; // সবার জন্য shared

  constructor(public name: string) {
    Student.totalStudents++; // student তৈরি হলেই কাউন্ট বাড়বে
  }
}

const s1 = new Student("Ridoan");
const s2 = new Student("Akash");
const s3 = new Student("Hasan");

console.log(Student.totalStudents); // 3 (সব object এর জন্য shared)



/*
====================================================================================
🔰 Static Method ব্যবহার করে Utility Function তৈরি
====================================================================================

📌 Math.random(), Math.floor() এর মতো utility কাজগুলো static হয়  
📌 কারণ এগুলো ব্যবহার করতে object লাগে না  
====================================================================================
*/

class MathUtil {
  static double(num: number) {
    return num * 2;
  }

  static square(num: number) {
    return num * num;
  }
}

console.log(MathUtil.double(5));  // 10
console.log(MathUtil.square(4));  // 16



/*
====================================================================================
🔰 Static Blocks (ES2022 Feature)
====================================================================================

📌 Static block → class load হওয়ার সাথে সাথে একবারই execute হয়  
📌 initialization logic এর জন্য দারুণ useful

====================================================================================
*/

class Config {
  static settings: string;

  // Static block → class load হওয়ার সময় চলবে
  static {
    Config.settings = "Default Configuration Loaded!";
    console.log("Static block executed!");
  }
}

console.log(Config.settings);



/*
====================================================================================
🔰 Static + Private = Encapsulated Class-Level Data
====================================================================================
*/

class Bank {
  private static totalBalance: number = 0;

  static deposit(amount: number) {
    Bank.totalBalance += amount;
  }

  static getBalance() {
    return Bank.totalBalance;
  }
}

Bank.deposit(500);
Bank.deposit(700);
console.log(Bank.getBalance()); // 1200



/*
====================================================================================
🔰 Summary (Revision Notes)
====================================================================================

★ static property → class-level shared data  
★ static method → class নাম দিয়ে সরাসরি access  
★ object তৈরি না করেই ব্যবহার করা যায়  
★ utility functions/ counters/ global class data → static এর জন্য perfect  
★ static block → class load হলে একবার চলে  

====================================================================================
*/
