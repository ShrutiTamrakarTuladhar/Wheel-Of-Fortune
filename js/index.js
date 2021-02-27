
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
const starbtn = document.createElement("button");
starbtn.innerText = "Start Game"; 
const submitDiv = document.createElement("div"); 
const submitbtn = document.createElement("button"); 
submitbtn.innerText = "Check"; 


game.id = "game"; 
table.id = "table";
row.id = "row";
form.id = "form"; 
label.id = "label"; 
input.id = "input"; 
starbtn.id = "startButton"; 
submitbtn.id = "submitButton"; 

body.appendChild(game); 
game.appendChild(table); 
game.appendChild(formDiv); 
formDiv.appendChild(form); 
table.appendChild(row);
form.appendChild(label);
form.appendChild(input);  
form.appendChild(submitDiv); 
submitDiv.appendChild(submitbtn); 
game.appendChild(starbtn); 

// Check if random words can be accessed 
const randomWord = getRandomWord();
const wordLength = randomWord.length; 

// creating columns in the table to represent each letter

for(let i = 0; i < wordLength; i++) {
  const letter = document.createElement("td") 
  letter.id = i;
  letter.className = "table-secondary";
  letter.innerText = "_";
  letter.style.fontSize = "25px";
  letter.style.textAlign = "center"
  letter.className = "border border-success";
  letter.style.backgroundColor = "lightgreen"; 
  row.appendChild(letter);
}

/*
// when start is clicked check if word has 
// R,S,T,L,N, or E
  
not case senstive
if yes - change the display
*/
console.log(randomWord);
const startCheckLetters = ["r","s","t","l","n","e"]; 
const wordArr = [...randomWord]; 
// console.log(wordArr);

starbtn.addEventListener("click", (event) => {
  // step 3 
  checkForLetters(startCheckLetters)
  starbtn.className = "btn btn-success disabled"; 
});

// function to check answer agians given array and show if same
function checkForLetters(arrayToCheck) {
  wordArr.forEach((letter, i) => {
    let index = arrayToCheck.indexOf(letter); 

    if(index != -1) {
      let holder = document.getElementById(i); 
      holder.style.backgroundColor = "white";
      holder.innerText = letter;
    }
  }); 
}

// check if the input are the missing letters
input.setAttribute("maxLength", "4"); 
input.setAttribute ("value", ""); 
input.setAttribute("type", "text");
 
// console.log(input); 

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
      console.log("solved")
      setTimeout(location.reload.bind(location), 2000)
    }
  } 
  input.value = ""; 
}); 

function checkIfValid(inputValue){
  if (inputValue == "") {
    alert("Please enter your guess ");
    return false;
}
  if (!/^[a-zA-Z]*$/g.test(inputValue)) {
    alert("Invalid characters");
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
    // conNum = 0
    // vowel = 0; 
    return true 
  } else {
    alert("Invalid Input, please "); 
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
  return true; 
}

//CSS 
game.className = "container position-relative";
table.className = "table table-bordered"; 
formDiv.className = "form-group"; 
form.className = "mb-3";
label.className = "form-label";
input.className = "form-control"; 
starbtn.className = "btn btn-success"; 
submitDiv.className = "d-grid gap-2 d-md-flex justify-content-md-end";
submitbtn.className = "btn btn-outline-success"; 
submitbtn.style.marginTop = "10px"
game.style.marginTop = "5%"





