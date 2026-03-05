
console.log("Hello world!");


const myPara = document.getElementById('my-paragraph');
const myBtn = document.getElementById('action-button');


function showAlertName(studentName) {
    alert("Студент: " + studentName);
}


myBtn.onmouseover = function() {
    showAlertName("Олександр"); 

};
