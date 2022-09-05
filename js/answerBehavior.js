let counter = 0;
let correctAnswers = 0;
function selectedAnswer(selector) {
    const chosenAnswer = selector.parentNode;
    let answers = chosenAnswer.querySelectorAll('.answer');
    counter++;
    for (i = 0; i < answers.length; i++) {
        answers[i].children[1].classList.remove('black-text');
        answers[i].classList.add('non-clickable');
        if (answers[i] !== selector) {
            answers[i].classList.add('non-chosen-answers');
        }
    }

    if (selector.classList.contains('true')) {
        correctAnswers++;
    }

    endOfQuizz(quizzData);
    setTimeout(scrollWithOrder, 2000);
}

function scrollWithOrder() {
    const question = document.querySelectorAll('.question');
    const overlay = document.querySelector('.overlay');
    if (counter === 0) {
        overlay.scrollIntoView();
    } else {
        question[counter].scrollIntoView({ behavior: 'smooth', block: "center" });
    }
}

let quizzData = [];
function endOfQuizz(value) {
    quizzData = value;
    const question = document.querySelectorAll('.question');
    const questions = document.querySelector('.questions ul');

    const differentLevels = [];

    if (counter === question.length) {

        for (let i = 0; i < value.length; i++) {
            differentLevels.push(value[i].minValue);
        }
        const sortedArray = differentLevels.sort();

        const percent = Math.round((correctAnswers / question.length) * 100);
        console.log(correctAnswers, percent);

        const lowestValues = sortedArray.filter((minvalue) => { return (minvalue <= percent) });
        const highestUnderPercent = lowestValues[(lowestValues.length - 1)];
        let index = 0;
        for (let i = 0; i < value.length; i++) {
            if (highestUnderPercent === value[i].minValue) {
                index = i;
            }
        }
        questions.innerHTML += `
                <li data-identifier="quizz-result" class="question">
                    <div class="feedback-content">
                        <div class="feedback-header">
                            <h1>${percent}% de acerto: ${value[index].title}</h1>
                        </div>
                        <div class="feedback-main"">
                            <img src="${value[index].image}"> </img>
                            <div class="paragraph"> <p> ${value[index].text} </p> </div>
                        </div>
                        <div class="feedback-buttons">
                            <button class="re-start" onclick="searchQuizz(idCurrentQuiz)" > Reiniciar Quizz </button>
                            <button onclick="location.reload()" class="back-home"> Voltar para home </button>
                        </div>
                    </div>
                </li>
            `;

        const feedback = document.querySelector('.feedback-content');
        feedback?.scrollIntoView({ behavior: 'smooth' });

        const restartButton = document.querySelector('.re-start')
        restartButton.addEventListener("click", (() => counter = 0));
        restartButton.addEventListener("click", (() => correctAnswers = 0));
    }
}


