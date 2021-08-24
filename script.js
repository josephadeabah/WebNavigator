const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'Start Page';
// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log('Previous page: ', backPages.peek());
  console.log('Next page: ', nextPages.peek());
};

const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;

  while(!nextPages.isEmpty()) {
    nextPages.pop();
  };
  showCurrentPage('New: ');
};

const backPage = () => {
  nextPages.push(currentPage);
  currentPages = backPages.pop();
  showCurrentPage('Returning previous page: ');
};

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage('Moving to next page: ');
};

//The following strings are used to prompt the user
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// User Interface Part 1
let finish = false;
let showBack = false;
let showNext = false;
showCurrentPage('Default page: ');

while(finish === false) {
  let instructions = baseInfo;

  // Moving back
  if (backPages.peek() != null) {
    instructions = instructions + ',' + backInfo;
    showBack = true;
  } else {
    showBack = false;
  }

  // Moving forward
  if (backPages.peek() != null) {
    instructions = instructions + ',' + nextInfo;
    showNext = true;
  } else {
    showNext = false;
  }

  // Exiting the program
  console.log(instructions);

  // Converting user answer to lowercase
  const answer = prompt(question);
  let lowerCaseAnswer = answer.toLowerCase();

  // Handling user input
  if((lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'q')) {
    newPage(lowerCaseAnswer);
  } else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
    nextPage();
  } else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
    backPage();
  } else if (lowerCaseAnswer === 'b') {
    console.log('There\'s no previous page to return.');
  } else if (lowerCaseAnswer === 'n') {
    console.log('You cannot move forward, there are no pages there :s')
  } else if (lowerCaseAnswer === 'q') {
    console.log('Closing the program...');
    finish === true;
  } else if (lowerCaseAnswer === null) {
    console.log('Totally not a valid word :(');
  }
};