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
    endOfQuizz(quizzData);
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

let quizzData = [];
function endOfQuizz(levels) {
    quizzData = levels;
    const question = document.querySelectorAll('.question');
    const questions = document.querySelector('.questions ul');
    const differentValues = [];

    if (counter === question.length) {
        
        for (let i = 0; i < levels.length; i++){
            differentValues.push(levels[i].minValue);
        } 
        
        const percentOfCorrectAnswers = Math.round((correctAnswers/question.length * 100)); 
        let valuesUnderPercent = differentValues.filter((level) => percentOfCorrectAnswers > level);
        let highestValueUnderPercent = valuesUnderPercent[valuesUnderPercent.length]

        for (let i = 0; i < levels.length; i++){
            if (highestValueUnderPercent === levels[i].minValue){
                highestValuePosition = i
            }
        }

        
        questions.innerHTML += `
            <li class="question">
                <div class="feedback-content">
                    <div class="feedback-header">
                        <h1>${levels[highestValuePosition].title}</h1>
                    </div>
                    <div class="feedback-main"">
                        <img src="${levels[highestValuePosition].image}"> </img>
                        <div class="paragraph"> <p> ${levels[highestValuePosition].text} </p> </div>
                    </div>
                    <div class="feedback-buttons">
                        <button class="re-start" onclick="searchQuizz(idCurrentQuiz)" > Reiniciar Quizz </button>
                        <button onclick="location.reload()" class="back-home"> Voltar para home </button>
                    </div>
                </div>
            </li>
        `;
     
        const feedback = document.querySelector('.feedback-content')
        feedback?.scrollIntoView({ behavior: 'smooth'});

        const restartButton = document.querySelector('.re-start')
        restartButton.addEventListener("click", (() => counter = 0));

    }
}


