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
    setTimeout(scrollWithOrder,2000)
}
function scrollWithOrder(){
    const question = document.querySelectorAll('.question')
    console.log(counter)
    switch (counter) {
        case 1:
            question[1].scrollIntoView({behavior: 'smooth'});
            break;
        
        case 2:
            question[2].scrollIntoView({behavior: 'smooth'});
            break;
        case 3:
            endOfQuizz();
            break;
        default:
            question[0].scrollIntoView({behavior: 'smooth'});
            break;
    }
}
function savingConstants(value){
    window.title1 = value[0].title
    window.title2 = value[1].title
    window.imgUrl0 = value[0].image
    window.imgUrl1 = value[1].image
    window.tex1 = value[0].text
    window.tex2 = value[1].text
}
function endOfQuizz(){
    const main = document.querySelector('main')
    // // if (){
        main.innerHTML += `
            <div class="question">
                <div class="content">
                    <div class="feedback-header">
                        <h1>${window.title1}</h1>
                    </div>
                    <div class="feedback-main"">
                        <img src="${window.imgUrl0}"> </img>
                        <div class="paragraph"> <p> ${window.tex1} </p> </div>
                    </div>
                    <div class="feedback-buttons">
                        <button class="re-start"> Reiniciar Quizz </button>
                        <button class="back-home"> Voltar para home </button>
                    </div>
                </div>
            </div>
        `  
//     }
//     main.innerHTML += `
//     <div class="end-of-quizz"> 
//         <div> <h1> ${quizz[1].title} </h1> </div>
//         <img src="${quizz[1].image}"></img>
//         <p>${quizz[1].text}</p>
//         <button class=""> Reiniciar Quizz </button>
//         <button class=""> Voltar para home </button>
//     </div>
// `   
}