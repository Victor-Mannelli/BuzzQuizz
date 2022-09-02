function selectedAnswer(selector){
    const chosenAnswer = selector.parentNode
    let answers = chosenAnswer.querySelectorAll('.answer')
    for (i = 0; i < answers.length; i++){
        if (answers[i] !== selector){
            answers[i].classList.add('non-chosen-answers')
        }
    }
}
