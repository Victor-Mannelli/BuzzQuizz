let counter = 0;
function selectedAnswer(selector){
    const chosenAnswer = selector.parentNode
    let answers = chosenAnswer.querySelectorAll('.answer')

    for (i = 0; i < answers.length; i++){
        answers[i].children[1].classList.remove('black-text')
        answers[i].classList.add('non-clickable')
        if (answers[i] !== selector){
            answers[i].classList.add('non-chosen-answers')
        }
    }
    counter++
    console.log(counter)
    setTimeout(scrollWithOrder,2000)
}
function scrollWithOrder(){
    const question = document.querySelectorAll('.question')
    switch (counter) {
        case 1:
            question[1].scrollIntoView({behavior: 'smooth'});
            break;
        
        case 2:
            question[2].scrollIntoView({behavior: 'smooth'});
            break;
        // case 3:
        //     endOfQuizz();
        //     break;
        default:
            question[0].scrollIntoView({behavior: 'smooth'});
            break;
    }
}
// function endOfQuizz(){
//     const main = document.querySelector('main')
//     main.innerHTML += `
//     <div class="end-of-quizz"> 
//         <div class=""> acertos </div>

//     </div>
//     `
// }