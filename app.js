//questions

let score = 0;
let currentQuestion =0;
const STORE = [
  {
    title: 'What is the Chosen Ones name?',
    image: '<img class="questionImage" src="images/Zelda_(character).png" alt="Zelda 1">',
    answers: [
      'Link',
      'Zelda',
      'Linkus',
      'Sheik'
    ],
    correct:
      'Link'
  },
  {
    title:
      'Where can you find the Master Sword?',
      image: '<img class="questionImage" src="images/OoT_Goron_Artwork.png" alt="Goron">',
    answers: [
      'Eldin',
      'Faron',
      'Lost Woods',
      'Ridgeland'
    ],
    correct:
      'Lost Forest'
  },
  {
    title:
      'Not including re-releases or remakes, how many mainline Nintendo Legend of Zelda games feature Link in the title?',
    image: '<img class="questionImage" src="images/Cartoon Link.png" alt="Link">',
    answers: [
      '3',
      '4',
      '5',
      '6'
    ],
    correct: '4'
  },
  {
    title: 'Which Zelda game celebrated its 20th anniversary at the end of April 2020?',
    image: '<img class="questionImage" src="images/Zelda Breath of the Wild.jpg" alt="Zelda">',
    answers: [
      'The Legend of Zelda: Links Awakening',
      'The Legend of Zelda: Ocarina of Time',
      'The Legend of Zelda: The Wind Waker',
      'The Legend of Zelda: Majoras Mask'
    ],
    correct: 'The Legend of Zelda: Majoras Mask'
  },
  {
    title:
      'Chronologically (according to the in-game universe), which game is the first in the series?',
    image: '<img class="questionImage" src="images/Hyrulian shield.png" alt="Hyrule">',
    answers: [
      'The Legend of Zelda',
      'The Legend of Zelda: Skyward Sword',
      'The Legend of Zelda: Ocarina of Time',
      'Zelda II: The Adventure of Link'
    ],
    correct:
      'The Legend of Zelda: Skyward Sword'
  },
  {
    title:
      'What is antagonist Ganondorfs last name?',
    image: '<img class="questionImage" src="images/Ganon.png" alt="Zelda 3">',
    answers: [
      'Dragmire',
      'Agahnim',
      'Mandrag',
      'Grimoire'
    ],
    correct:
      'Dragmire'
  }
];


// event listeners


  
//clicks start quiz
function startQuiz(){
  $('.startBox a').click(function(e){
    e.preventDefault();
    $('.hideStart').hide();
    $('.quiz').show();
    showQuestion();
  });
}





//toggles class for "selected" answer
function toggleSelected(){
  $('label').on('click', 'span', function(){
    $('.selected').removeClass('selected')
    $(this).toggleClass('selected');
  })
}






  //summary click
function clickSummary(){
  $('.summary a').click(function(e){
    e.preventDefault();
    restartQuiz()
  });
}

//next question
function nextQuestion(){
  $('.response').on('click', '.nextButton', function(event){
    updateCurrentQuestion();
    if (currentQuestion >= STORE.length) {
      showSummary();
    }
    else {
    $('.response').hide();
    $('.quiz').show();
    showQuestion(); }
  })
}






// other functions

//generates question
function showQuestion(){
 let question = STORE[currentQuestion];
 if (currentQuestion < STORE.length){
  $('.quiz').append(`<h2>${question.title}</h2>`);
  $('.quiz').append(question.image);
  let form = $(`<form><fieldset></fieldset></form>`)
  let fieldSelector = $(form).find('fieldset');
  for (let i=0; i<question.answers.length; i++){
    $(fieldSelector).append(`<label><input class="radio" type="radio" name="answer" value="${question.answers[i]}" required><span class="answers">${question.answers[i]}</span></input></label>`)
 }
 $(fieldSelector).append(`<button type="submit" class="submitButton button"> Submit</button > `);
 $('.quiz').append(form);
}
}

// make variable that is form object
// append objects + submit button into form jquery object 
// append form to quiz


  //click submit answer
function submitAnswer(){
  $('.quiz').on('submit', function (event) {
   event.preventDefault();
   $('.hideMe').hide();
   $('.response').show();
   let selected = $('input:checked');
   let answer = selected.val();
   let correct = STORE[currentQuestion].correct;
   if (answer === correct) {
     correctAnswer();
   } else {
     wrongAnswer();
   }
  });
}




//updates score by 1
function updateScore() {
  score++;
  $('.score').text(score);
}

//checks if answer is correct

function correctAnswer(){
  $('.response').html(
    `<h2>Your answer is correct!</h2><img src="images/Yesss 2.png" alt="correct answer" class="images" width="200px"><p>Keep going Chosen One!</p><button type="button" class="nextButton button">Next</button>`);
    $('.response').show();
    updateScore();
}

function wrongAnswer(){
  $('.response').html(
    `<h2>Wrong answer! The correct answer was <br> ${question.correct}</h2><img src="images/FML.png" alt="correct answer" class="images" width="200px"><p>You missed! Try again!</p><button type="button" class="nextButton button">Next</button>`);
    $('.response').show();
}



function checkAnswer(guess){
let question = STORE[currentQuestion];
  if(currentQuestion == STORE.length){
    if(question.correct == guess){
      updateScore();
      showSummary();
    }
    else{
    showSummary();
    }
  }else {
  if(question.correct == guess){
    $('.response').html(
      `<h2>Your answer is correct!</h2><img src="images/correct-answer.jpg" alt="correct answer" class="images" width="200px"><p>You're the King of the World!</p><button type="button" class="nextButton button">Next</button>`);
      $('.response').show();
      updateScore();
  }
  if(question.correct !== guess) {
    $('.response').html(
      `<h2>Wrong answer! The correct answer was <br> ${question.correct}</h2><img src="images/wrong-answer.jpg" alt="correct answer" class="images" width="200px"><p>Only a fool would say that!</p><button type="button" class="nextButton button">Next</button>`);
      $('.response').show();
  }
  }
 }




//updates the current question number
function updateCurrentQuestion() {
  currentQuestion++;
  $('.currentQuestion').text(currentQuestion);
}

//shows summary
function showSummary(){
  $('.response').hide();
  $('.summary').show();
  $('.summary p').text("Congrats! You scored "+score+" out of "+STORE.length+" correct! Now take your big black cow and get out of here!");
}

//restarts the quiz
function restartQuiz(){
   $('.summary').hide();
    $('.hideStart').show();
    score = 0;
    currentQuestion =0;
    $('.score').text(0);
    $('.currentQuestion').text(0);
  showQuestion();
}
 







function makeQuiz(){
  startQuiz();
  submitAnswer();
  clickSummary();
  nextQuestion();
}


$(makeQuiz)





  
  
  
  
  