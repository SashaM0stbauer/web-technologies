// 1. Виводимо "Hello world!" у консоль або в елемент при завантаженні
console.log("Hello world!");

// 2. Отримуємо доступ до елементів за допомогою getElementById
const myPara = document.getElementById('my-paragraph');
const myBtn = document.getElementById('action-button');

// 3. Створюємо функцію для виводу імені
function showAlertName(studentName) {
    alert("Студент: " + studentName);
}

// 4. Налаштовуємо подію onmouseover (наведення миші) на кнопку
// Коли ти наведеш курсор на кнопку, спрацює alert
myBtn.onmouseover = function() {
    showAlertName("Олександр"); // Впиши тут своє ім'я
};