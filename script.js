let quizzesUser = [];
let quizzesOtherUsers = [];

// SCREEN 1

function searchQuizzes() {
    const response = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    response.then(responseQuizzes);
    response.catch((error => console.log(`erro: ${error.response.data}`)));
}

function responseQuizzes(response) {
    //modificar -> criar função para separar os quizzes
    //console.log(quizzesOtherUsers[10]);
    quizzesOtherUsers = response.data;
    renderQuizzes();
}

function insertQuizzes(quizzes) {
    let quizzesLI = '';
    quizzes.forEach(quizz => { 
        quizzesLI += `
            <li class="quizz" onclick="searchQuizz(${quizz.id})">
                <div class="overlay">
                    <h1>${quizz.title}</h1>
                </div>
                <img src="${quizz.image}" alt="${quizz.title}"></img>
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
                <button onclick="addQuizz()">Criar Quizz</button>
            </section>
        `;
    } else {
        main.innerHTML = `
            <section class="user-quizzes">
                <div>
                    <h1>Seus Quizzes</h1>
                    <ion-icon name="add-circle-sharp"></ion-icon>
                </div>
                <ul>${insertQuizzes(quizzesUser)}</ul>
            </section>
        `;
    }

    main.innerHTML += `
        <section class="other-user-quizzes">
            <div>
                <h1>Todos os Quizzes</h1>
            </div>
            <ul>${insertQuizzes(quizzesOtherUsers)}</ul>
        </section>
        `;
}

searchQuizzes();

// SCREEN 2

function searchQuizz(id) {
    const response = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    response.then(responseQuizz);
    response.catch((error => console.log(`erro: ${error.response.data}`)));
}

function responseQuizz(response) {
    renderQuizz(response.data);
}

function insertAnswers(answers) {
    let answersLI = '';
    answers.forEach(answer => { 
        answersLI += `
            <li class="answer">
                <img src="${answer.image}" alt="${answer.text}"></img>
                <h1>${answer.text}</h1>
            </li>
        `;
    });
    return answersLI;
}

function insertQuestions(questions) {
    let questionsLI = '';
    questions.forEach(question => { 
        questionsLI += `
            <li class="question">
                <div class="content">
                    <div class="question-title">
                        <h1>${question.title}</h1>
                    </div>
                    <div class="answers">
                        <ul>${(insertAnswers(question.answers))}</ul>
                    </div>
                </div>
            </li>
        `;
    });
    return questionsLI;
}

function renderQuizz(quizz) {
    const container = document.querySelector('container');
    console.log(quizz);
    container.innerHTML = `
        <header>BuzzQuizz</header>
            <section class="header-quizz">
                <div class="overlay">
                    <h1>${quizz.title}</h1>
                </div>
                <img src="${quizz.image}" alt="${quizz.title}"></img>
            </section>
        <main>
            <section>
                <ul>${insertQuestions(quizz.questions)}</ul>
            </section>
        </main>
    `;
}

// SCREEN 3

function addQuizz() {
    console.log("Relaxa, vai sair");
}