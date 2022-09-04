
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

function savingConstants(value) {
    window.title1 = value[0].title
    window.title2 = value[1].title
    window.imgUrl0 = value[0].image
    window.imgUrl1 = value[1].image
    window.tex1 = value[0].text
    window.tex2 = value[1].text
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

function endOfQuizz() {
    const question = document.querySelectorAll('.question')
    const questions = document.querySelector('.questions ul')

    if (counter === question.length) {
        questions.innerHTML += `
            <li class="question">
                <div class="feedback-content">
                    <div class="feedback-header">
                        <h1>${window.title1}</h1>
                    </div>
                    <div class="feedback-main"">
                        <img src="${window.imgUrl0}"> </img>
                        <div class="paragraph"> <p> ${window.tex1} </p> </div>
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

