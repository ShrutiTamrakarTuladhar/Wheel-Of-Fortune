
//  defer the js and get access to the body 
const body = document.querySelector("body"); 

// creating needed elements 
const game = document.createElement("div"); 
const table = document.createElement("table");
const row = document.createElement("tr"); 
const form = document.createElement("form")
const label = document.createElement("label"); 
label.innerText = "Enter your guess: ";
const input = document.createElement("input");
const button = document.createElement("button");
button.innerText = "Start"; 

game.id = "game"; 
table.id = "table";
row.id = "row";
form.id = "form"; 
label.id = "label"; 
input.id = "input"; 
button.id = "button"; 

body.appendChild(game); 
game.appendChild(table); 
game.appendChild(form); 
table.appendChild(row);
form.appendChild(label);
form.appendChild(input);  
game.appendChild(button); 

console.log(body)
// Check if random words can be accessed 
const randomWord = getRandomWord();
const length = randomWord.length; 

// creating columns in the table to represent each letter

for(let i = 0; i < length; i++) {
  const letter = document.createElement("td") 
  letter.id = i;
  letter.innerText = "_";
  letter.style.fontSize = "25px";
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

button.addEventListener("click", (event) => {
  // step 3 
  checkForLetters(startCheckLetters)
});

// function to check answer agians given array and show if same
function checkForLetters(arrayToCheck) {
  wordArr.forEach((letter, i) => {
    let index = arrayToCheck.indexOf(letter); 

    if(index != -1) {
      let holder = document.getElementById(i); 
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
    checkForLetters(value); 
  } 

})

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

//CSS 
game.className = "container";




