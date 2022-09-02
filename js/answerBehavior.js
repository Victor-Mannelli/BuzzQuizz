let counter = 0;
function selectedAnswer(selector){
    const chosenAnswer = selector.parentNode
    let answers = chosenAnswer.querySelectorAll('.answer')
    console.log(answers)
    for (i = 0; i < answers.length; i++){
        if (answers[i] !== selector && counter < answers.length - 1){
            answers[i].classList.add('non-chosen-answers')
        }
    }
}
