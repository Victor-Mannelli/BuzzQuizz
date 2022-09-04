
let counter = 0;
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
    const question = document.querySelectorAll('.question')
    const questions = document.querySelector('.questions ul')

    if (counter === question.length) {
        for (let i = 0; i < value.length; i++){
            questions.innerHTML += `
            <li class="question">
                <div class="feedback-content">
                    <div class="feedback-header">
                        <h1>${value[i].title}</h1>
                    </div>
                    <div class="feedback-main"">
                        <img src="${value[i].imgUrl0}"> </img>
                        <div class="paragraph"> <p> ${value[i].tex1} </p> </div>
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
}

