
//  defer the js and get access to the body 
const body = document.querySelector("body"); 

// creating needed elements 
const game = document.createElement("div"); 
const table = document.createElement("table");
const row = document.createElement("tr"); 
const formDiv = document.createElement("div");
const form = document.createElement("form");
const label = document.createElement("label"); 
label.innerText = "Enter your guess: ";
const input = document.createElement("input");
const startbtn = document.createElement("button");
startbtn.innerText = "Start Game"; 
const submitDiv = document.createElement("div"); 
const submitbtn = document.createElement("button"); 
submitbtn.innerText = "Check"; 
const message = document.createElement("p"); 
const timerDiv = document.createElement("div"); 
let timeLeft = 15; 
let timerId


game.id = "game"; 
table.id = "table";
row.id = "row";
form.id = "form"; 
label.id = "label"; 
input.id = "input"; 
startbtn.id = "startButton"; 
submitbtn.id = "submitButton"; 
message.id = "message"; 
timerDiv.id = "timer"; 

body.appendChild(game); 
game.appendChild(table); 
game.appendChild(formDiv); 
formDiv.appendChild(form); 
table.appendChild(row);
form.appendChild(label);
form.appendChild(input);  
form.appendChild(submitDiv); 
submitDiv.appendChild(submitbtn); 
game.appendChild(startbtn); 
game.appendChild(message); 
game.appendChild(timerDiv); 

// Check if random words can be accessed 
const randomWord = getRandomWord();
const wordLength = randomWord.length; 
const startCheckLetters = ["r","s","t","l","n","e"]; 
const wordArr = [...randomWord]; 

// check if the input are the missing letters
input.setAttribute("maxLength", "4"); 
input.setAttribute ("value", ""); 
input.setAttribute("type", "text");
input.setAttribute("readonly", "readonly"); 


// creating columns in the table to represent each letter
for(let i = 0; i < wordLength; i++) {
  const letter = document.createElement("td") 
  letter.id = i;
  letter.className = "table-secondary";
  letter.innerText = "_";
  letter.style.fontSize = "25px";
  letter.style.textAlign = "center"
  letter.className = "border border-success";
  letter.style.backgroundColor = "#FFFBE3"; 
  row.appendChild(letter);
}

// step 3 - start button is clicked and one defult letters are checked 
startbtn.addEventListener("click", (event) => {
  message.innerText = "Game Started"
  timerId = setInterval(countdown, 1000); 
  checkForLetters(startCheckLetters)
  startbtn.className = "btn btn-success disabled";
  input.removeAttribute("readonly"); 

}); 

// when form is submitted - check for matching letters & check if won
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  // helper function to check userInput
  let checkPassed = checkIfValid(input.value);

  if(checkPassed) {
    // store the input value 
    let value = [...input.value];
    
    // check if letters match
    checkForLetters(value); 

    // check if all letters have been changed
    if(isSolved()) {
      input.setAttribute("readonly", "readonly"); 
      input.value = ""; 
      message.innerText = "YOU GOT IT! Play again"
      body.style.backgroundColor = "#CAEEC2"
      setTimeout(location.reload.bind(location), 2000)
    }
  } 
  input.value = ""; 
}); 

console.log(randomWord); 
// function to check answer agians given array and show if same
function checkForLetters(arrayToCheck) {
  wordArr.forEach((letter, i) => {
    let index = arrayToCheck.indexOf(letter); 

    if(index != -1) {
      let holder = document.getElementById(i); 
      holder.style.backgroundColor = "#FFE5AB";
      holder.innerText = letter;
    }
  }); 
}

// helper function to check if value is valid 
function checkIfValid(inputValue){
  if (inputValue == "") {
    message.innerText = "Please enter your guess";
    return false;
}
  if (!/^[a-zA-Z]*$/g.test(inputValue)) {
    message.innerText = "Invalid characters";
    return false;
}
  let inputArr = [...inputValue]; 
  let conNum = 0; 
  let vowel = 0; 

  inputArr.forEach(letter => {
    if(/[aeiou]/.test(letter)) {
      vowel += 1; 
    } else {
      conNum ++; 
    }
  }); 

  if(conNum === 3 && vowel === 1) {
    message.innerText = "Checked, keep going"; 
    return true 
  } else {
    message.innerText = "Invalid Input, please try again"; 
  }
}

// check if all letters have been found 
function isSolved() {
  for(let i = 0; i < wordLength; i++) {
    let letter = document.querySelectorAll("td")[i].innerText;
    if(letter === "_") {
      return false; 
    }
  }
  clearTimeout(timerId);
  timerDiv.innerText = ""; 
  return true; 
}


// countDown function 
function countdown() {
  if(timeLeft === -1) {
    clearTimeout(timerId); 
    message.innerText = "TIME OUT! Correct Answer: " + `${randomWord.toUpperCase()}`;
    input.setAttribute("readonly", "readonly"); 
    input.value = ""; 
    setTimeout(location.reload.bind(location), 3000)
  } else {
    timerDiv.innerText = timeLeft + ' seconds';  
    timeLeft--; 
  }
}


//CSS 
game.className = "container position-relative";
table.className = "table table-bordered"; 
formDiv.className = "form-group"; 
form.className = "mb-3";
label.className = "form-label";
input.className = "form-control"; 
startbtn.className = "btn btn-success"; 
submitDiv.className = "d-grid gap-2 d-md-flex justify-content-md-end";
submitbtn.className = "btn btn-outline-success"; 
submitbtn.style.marginTop = "10px"; 
game.style.marginTop = "5%"
game.style.color = "#198754"; 
message.className ="container"
message.style.fontSize = "20px"
message.style.textAlign = "center"
message.style.marginTop = "10px";
timerDiv.className = "container"; 
timerDiv.style.fontSize = "22px";
timerDiv.style.textAlign = "center"
timerDiv.style.marginTop = "10px";



