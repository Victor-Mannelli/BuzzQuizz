const quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
quizzes.then(addTodosOsQuizzes);
quizzes.catch((erro => console.log(`erro: ${erro.response.data}`)));

function addTodosOsQuizzes(quizzesResposta){
    console.log(quizzesResposta.data.image)
    const todosOsQuizzes = document.querySelector('.todos-os-quizzes ul');
    quizzesResposta.data.forEach(element => { 
        todosOsQuizzes.innerHTML += `
        <li>
            <img src="${element.image}" alt=""></img>
        </li>
    `
    });
}