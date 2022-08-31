let quizzesUser = [];
let quizzesOtherUsers = [];

function searchQuizzes() {
    const response = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    response.then(processResponse);
    response.catch((error => console.log(`erro: ${error.response.data}`)));
}

function processResponse(response) {
    quizzesOtherUsers = response.data;
    renderQuizzes();
}

function quizzesTagLi(quizzes) {
    let quizzesLI = '';
    quizzes.forEach(quizz => { 
        quizzesLI += `
            <li>
                <img src="${quizz.image}" alt=""></img>
            </li>
        `;
    });
    return quizzesLI;
}

function renderQuizzes() {
    const main = document.querySelector('main');
    //quizzesUser = [quizzesOtherUsers[30]];
    if (quizzesUser.length === 0) {
        main.innerHTML = `
            <section class="creating-quizz">
                <p>Você não criou nenhum <br> quizz ainda :(</p>
                <button>Criar Quizz</button>
            </section>
        `;
    } else {
        main.innerHTML = `
            <section class="user-quizzes">
                <div>
                    <h1>Seus Quizzes</h1>
                    <ion-icon name="add-circle-sharp"></ion-icon>
                </div>
                <ul>${quizzesTagLi(quizzesUser)}</ul>
            </section>
        `;
    }

    main.innerHTML += `
        <section class="other-user-quizzes">
            <div>
                <h1>Todos os Quizzes</h1>
            </div>
            <ul>${quizzesTagLi(quizzesOtherUsers)}</ul>
        </section>
        `;
}

searchQuizzes();