const questions = [

{
type:"single",
question:"Which SQL command retrieves data?",
options:["INSERT","UPDATE","SELECT","DELETE"],
answer:"SELECT"
},

{
type:"single",
question:"Which layer of OSI handles routing?",
options:["Transport","Network","Session","Physical"],
answer:"Network"
},

{
type:"single",
question:"Which key uniquely identifies a record?",
options:["Foreign Key","Primary Key","Candidate Key","Alternate Key"],
answer:"Primary Key"
},

{
type:"multi",
question:"Which of the following are OOP pillars?",
options:[
"Inheritance",
"Encapsulation",
"Polymorphism",
"Router"
],
answer:[
"Inheritance",
"Encapsulation",
"Polymorphism"
]
},

{
type:"multi",
question:"Select valid database operations.",
options:[
"INSERT",
"DELETE",
"SELECT",
"COMPILE"
],
answer:[
"INSERT",
"DELETE",
"SELECT"
]
},

{
type:"multi",
question:"Select network protocols.",
options:[
"HTTP",
"FTP",
"SMTP",
"Compiler"
],
answer:[
"HTTP",
"FTP",
"SMTP"
]
},

{
type:"fill",
question:"JVM stands for ________.",
answer:"Java Virtual Machine"
},

{
type:"fill",
question:"A process is a program in ________.",
answer:"execution"
},

{
type:"fill",
question:"DBMS stands for ________.",
answer:"Database Management System"
},

{
type:"single",
question:"Which OOP concept hides implementation details?",
options:[
"Inheritance",
"Polymorphism",
"Abstraction",
"Association"
],
answer:"Abstraction"
}

];

const startScreen =
document.getElementById("start-screen");

const quizScreen =
document.getElementById("quiz-screen");

const resultScreen =
document.getElementById("result-screen");

const startBtn =
document.getElementById("start-btn");

const nextBtn =
document.getElementById("next-btn");

const restartBtn =
document.getElementById("restart-btn");

const questionElement =
document.getElementById("question");

const answersElement =
document.getElementById("answers");

const questionNumber =
document.getElementById("question-number");

const finalScore =
document.getElementById("final-score");

const percentage =
document.getElementById("percentage");

const message =
document.getElementById("message");

const stats =
document.getElementById("stats");

let currentQuestion = 0;
let score = 0;

startBtn.addEventListener(
"click",
startQuiz
);

function startQuiz(){

startScreen.classList.add("hide");

quizScreen.classList.remove("hide");

loadQuestion();
}

function loadQuestion(){

answersElement.innerHTML="";

const q =
questions[currentQuestion];

questionNumber.textContent =
`Question ${currentQuestion+1} of ${questions.length}`;

questionElement.textContent =
q.question;

if(q.type==="single"){

q.options.forEach(option=>{

answersElement.innerHTML +=
`
<label class="option">
<input type="radio"
name="answer"
value="${option}">
${option}
</label>
`;
});

}

else if(q.type==="multi"){

q.options.forEach(option=>{

answersElement.innerHTML +=
`
<label class="option">
<input type="checkbox"
value="${option}">
${option}
</label>
`;
});

}

else{

answersElement.innerHTML=
`
<input
type="text"
class="fill-input"
placeholder="Type your answer here">
`;
}

}

nextBtn.addEventListener(
"click",
()=>{

checkAnswer();

currentQuestion++;

if(currentQuestion < questions.length){

loadQuestion();
}
else{

showResult();
}

});

function checkAnswer(){

const q =
questions[currentQuestion];

if(q.type==="single"){

const selected =
document.querySelector(
'input[name="answer"]:checked'
);

if(
selected &&
selected.value===q.answer
){
score++;
}
}

else if(q.type==="multi"){

const selected =
Array.from(
document.querySelectorAll(
'input[type="checkbox"]:checked'
)
).map(cb=>cb.value);

const correct =
q.answer;

if(
selected.length===correct.length &&
selected.every(
val=>correct.includes(val)
)
){
score++;
}
}

else{

const input =
document.querySelector(
".fill-input"
);

if(
input.value
.trim()
.toLowerCase()
===
q.answer
.toLowerCase()
){
score++;
}
}

}

function showResult(){

quizScreen.classList.add("hide");

resultScreen.classList.remove("hide");

finalScore.textContent =
`Score: ${score}/${questions.length}`;

const percent =
Math.round(
(score/questions.length)*100
);

percentage.textContent =
`Percentage: ${percent}%`;

stats.textContent =
`Correct: ${score} | Wrong: ${questions.length-score}`;

if(percent>=80){

message.textContent =
"Excellent Performance!";
}
else if(percent>=50){

message.textContent =
"Good Job!";
}
else{

message.textContent =
"Keep Practicing!";
}

}

restartBtn.addEventListener(
"click",
()=>{

currentQuestion=0;
score=0;

resultScreen.classList.add("hide");

startScreen.classList.remove("hide");

});