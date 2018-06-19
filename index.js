let questionNum=0;
let score=0;
/////////////// updateRecord //////////////////////
function updateRecord(){
  $('.current-question').html(questionNum);
  $('.current-score').html(score);
}
/////////////// updateRecord //////////////////////

/////////////// Start Page //////////////////////
function  renderStartPage(){
  $('.quizApp').on('click','.reset',function(event){
    questionNum=0;
    score=0;
    updateRecord();
    $('.question, .feedback, .final').hide();
    $('.intro').show();
  })
  $('.question, .feedback, .final').hide();
  $('.intro').show();
}
/////////////// Start Page //////////////////////

/////////////// Question Page //////////////////////
function generateQuestion(){
  const current = STORE[questionNum-1];
  let choices='';
  for(let i=0;i<4;i++){
    choices+=`<label><input type="radio" name="choice" value="${current.choices[i]}" required><span>${current.choices[i]}</span></label>`
  }
  return `
			<form>
        <legend class="question">${current.question}</legend>
				<fieldset>`+choices+`</fieldset>
        <button class="submit" name="submit">submit</button>
			</form>
  `;
}

function renderTestingPage(){
  $('.quizApp').on('click','.start-button, .next-button',function(event){
    event.preventDefault();
    if(questionNum<10){
      questionNum++;
      updateRecord();
      $('.question').html(generateQuestion());
      $('.intro, .feedback, .final').hide();
      $('.question').show();
    }else{
      renderFinalPage();
    }
  })
}

/////////////// Question Page //////////////////////

/////////////// Feedback Page //////////////////////

function generateCorrectFeedback(){
  return `
    <block>
			<p>You got it correct.</p>
			<button class="next-button" name="next-button">next</button>
    </block>
  `;
}

function generateWrongFeedback(correctAns){
  return `
    <block>
			<p>You got it wrong, the correct answer is: <span>${correctAns}</span>.</p>
			<button class="next-button" name="next-button">next</button>
    </block>
  `;
}

function generateFeedBack(selected){
  const current = STORE[questionNum-1];
  const correctAns = current.answer;
  var check = (selected==correctAns);
  if(check){
    $('.feedback').html(generateCorrectFeedback());
    score++;
  }else{
    $('.feedback').html(generateWrongFeedback(correctAns));
  }
  updateRecord();
  $('.intro, .question, .feedback, .final').hide();
  $('.feedback').show();

}

function renderFeedbackPage(){
  $('.quizApp').on('submit','form',function(event){
    event.preventDefault();
    let selected = $('input:checked').val();
    generateFeedBack(selected);
  })
}

/////////////// Feedback Page //////////////////////

/////////////// Feedback Page //////////////////////
function generateFinal(){
  return `
    <block>
			<p>You got <span>${score}</span>/10.</p>
			<button class="reset" name="reset">restart quiz</button>
		</block>
  `;
}

function renderFinalPage(){
      $('.final').html(generateFinal());
      $('.intro, .question, .feedback').hide();
      $('.final').show();
}

/////////////// Feedback Page //////////////////////

/////////////// main fuctions //////////////////////
function renderQuizApp(){
  renderStartPage();
  renderTestingPage();
  renderFeedbackPage();
}

$(renderQuizApp)
/////////////// main fuctions //////////////////////