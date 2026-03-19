// 1. Оператори порівняння 
function findMinMax(arr) {
    if (arr.length === 0) return "Масив порожній";
    let min = arr[0], max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    return { min, max };
}

function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
}

// 2. Логічні оператори 
function isNumberInRange(num, start, end) {
    return num >= start && num <= end; // Оператор && 
}

let state = true;
state = !state; // Оператор NOT (!) 

// 3. Умовні розгалуження 
function getGrade(score) {
    if (score >= 90) return "відмінно";
    else if (score >= 75) return "добре";
    else if (score >= 60) return "задовільно";
    else return "незадовільно"; 
}

function getSeasonIf(month) {
    if (month === 12 || month <= 2) return "Зима";
    if (month <= 5) return "Весна";
    if (month <= 8) return "Літо";
    if (month <= 11) return "Осінь";
    return "Помилка";
}

function getSeasonTernary(month) {
    return (month === 12 || month <= 2) ? "Зима" :
           (month <= 5) ? "Весна" :
           (month <= 8) ? "Літо" :
           (month <= 11) ? "Осінь" : "Помилка"; // Оператор ? 
}

// Вивід у консоль для перевірки 
console.log("Результати Лабораторної №2:");
console.log("Мін/Макс [1, 5, 3]:", findMinMax([1, 5, 3]));
console.log("Діапазон (15 в 10-20):", isNumberInRange(15, 10, 20));
console.log("Оцінка 85:", getGrade(85));
console.log("Сезон (квітень):", getSeasonTernary(4));