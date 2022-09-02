let counter = 0;
function selectedAnswer(selector){
    const chosenAnswer = selector.parentNode
    let answers = chosenAnswer.querySelectorAll('.answer')

    for (i = 0; i < answers.length; i++){
        answers[i].children[1].classList.remove('black-text')
        if (answers[i] !== selector){
            answers[i].classList.add('non-chosen-answers')
        }
    }

}
