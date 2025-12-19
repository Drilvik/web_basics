
let myArray = [1, 2, 3];

/*1. Демонстрація стандартної поведінки*/
/*Масив має свій власний метод toString, який працює як join(',')*/
console.log("Звичайний вивід масиву:", myArray.toString()); 

/*2. "Позичання" методу у Object (Рішення)
 Ми беремо метод toString прямо з прототипу Object 
 і застосовуємо його до myArray*
let result = Object.prototype.toString.call(myArray);

console.log("Вивід через Object.prototype:", result);