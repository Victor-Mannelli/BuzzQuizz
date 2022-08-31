const quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
quizzes.then(addAllQuizzes);
quizzes.catch((error => console.log(`erro: ${error.response.data}`)));

function addAllQuizzes(quizzesResposta){
    console.log(quizzesResposta.data.image)
    const todosOsQuizzes = document.querySelector('.all-quizzes ul');
    quizzesResposta.data.forEach(element => { 
        todosOsQuizzes.innerHTML += `
        <li>
            <img src="${element.image}" alt=""></img>
        </li>
    `
    });
}