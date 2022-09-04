let counter = 0;
let correctAnswers = 0;
function selectedAnswer(selector){
    const chosenAnswer = selector.parentNode
    let answers = chosenAnswer.querySelectorAll('.answer')
    counter++
    for (i = 0; i < answers.length; i++) {
        answers[i].children[1].classList.remove('black-text')
        answers[i].classList.add('non-clickable')
        if (answers[i] !== selector) {
            answers[i].classList.add('non-chosen-answers')
        }
    }
    endOfQuizz();
    setTimeout(scrollWithOrder, 2000)

    if (selector.classList.contains('true')){
        correctAnswers++
    }
}

function scrollWithOrder(){
    const question = document.querySelectorAll('.question')
    const overlay = document.querySelector('.overlay')
    if (counter === 0){
        overlay.scrollIntoView();
    } else {
        question[counter].scrollIntoView({ behavior: 'smooth', block: "center"});
    }
    
}

function endOfQuizz(value) {
    const question = document.querySelectorAll('.question');
    const questions = document.querySelector('.questions ul');
    const differentLevels = [];

    if (counter === question.length) {

        for (let i = 0; i < value.levels.length; i++){
            differentLevels.push(value.levels[i].minValue);
        } 
        differentLevels.sort();
    
        const percent = Math.round(correctAnswers/question.length); 

        for (let i = 0; i < differentLevels.length; i++){
            if (percent < differentLevels[i]){
                
            }
        }

        if(value.levels.minValue )
            questions.innerHTML += `
            <li class="question">
                <div class="feedback-content">
                    <div class="feedback-header">
                        <h1>${value.levels[i].title}</h1>
                    </div>
                    <div class="feedback-main"">
                        <img src="${value.levels[i].image}"> </img>
                        <div class="paragraph"> <p> ${value.levels[i].text} </p> </div>
                    </div>
                    <div class="feedback-buttons">
                        <button class="re-start" onclick="searchQuizz(idCurrentQuiz)" > Reiniciar Quizz </button>
                        <button onclick="location.reload()" class="back-home"> Voltar para home </button>
                    </div>
                 </div>
              </li>
            `;
        }
    
        const feedback = document.querySelector('.feedback-content')
        feedback?.scrollIntoView({ behavior: 'smooth'});

        const restartButton = document.querySelector('.re-start')
        restartButton.addEventListener("click", (() => counter = 0));
}

