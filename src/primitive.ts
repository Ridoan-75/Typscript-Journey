// ==========================================
// 🔹 Primitive Data Types in TypeScript
// ==========================================
// Primitive মানে হলো যেগুলো "একক" বা "non-object" data type
// এগুলো immutable (মানে একবার তৈরি হলে পরিবর্তন করা যায় না)

// মোটামুটি primitive data types গুলো হলো:
// string, number, boolean, null, undefined, symbol, bigint
// TypeScript এ আরও কয়েকটি special type আছে: any, unknown, void, never
// ==========================================


// 🔸 string → টেক্সট বা অক্ষর রাখেs
let userName: string = "Ridoan"
let country: string = 'Bangladesh'
let sentence: string = `Hello, my name is ${userName}`
console.log(sentence) // Hello, my name is Ridoan


// 🔸 number → সংখ্যা রাখে (integer বা float উভয়ই)
let age: number = 25
let price: number = 99.99
console.log(age + price)


// 🔸 boolean → true / false মান রাখে
let isOnline: boolean = true
let hasPermission: boolean = false


// 🔸 undefined → যেকোনো variable যার মান এখনো set করা হয়নি
let notAssigned: undefined = undefined


// 🔸 null → ইচ্ছাকৃতভাবে কোনো মান নাই বোঝাতে ব্যবহার করা হয়
let emptyValue: null = null


// 🔸 symbol → unique identifier তৈরি করতে ব্যবহৃত হয়
let uniqueKey1: symbol = Symbol("id")
let uniqueKey2: symbol = Symbol("id")
console.log(uniqueKey1 === uniqueKey2) // false (প্রতিটি symbol আলাদা)


// 🔸 bigint → অনেক বড় integer রাখার জন্য (ES2020 থেকে এসেছে)
let bigNumber: bigint = 1234567890123456789012345678901234567890n


// ==========================================
// 🔹 TypeScript Specific Special Types
// ==========================================

// 🔸 any → যেকোনো টাইপ রাখা যায় (টাইপ চেক করে না)
let randomValue: any = "Hello"
randomValue = 42
randomValue = true


// 🔸 unknown → any এর মতো কিন্তু নিরাপদ, ব্যবহার করার আগে টাইপ চেক করতে হয়
let inputValue: unknown = "Ridoan"
if (typeof inputValue === "string") {
  console.log(inputValue.toUpperCase())
}


// 🔸 void → এমন ফাংশনের জন্য যা কিছু return করে না
function logMessage(): void {
  console.log("This function returns nothing!")
}


// 🔸 never → এমন ফাংশনের জন্য যা কখনো শেষ হয় না বা সবসময় error দেয়
function throwError(message: string): never {
  throw new Error(message)
}
