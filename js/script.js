let quizzesUser = [];
let quizzesOtherUsers = [];
let idCurrentQuiz = 0;

function HomeButton() {
  location.reload();
}

// SCREEN 1

function searchQuizzes() {
  const response = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  response.then(responseQuizzes);
  response.catch((error) => console.log(`erro: ${error.response.data}`));
}

function separateQuizzes(quizzes) {
  let userQuizzesStorage = localStorage.getItem("quizzes");
  if (userQuizzesStorage !== null) {
    userQuizzesStorage = JSON.parse(userQuizzesStorage);
    quizzes = quizzes.filter(quizze => Object.keys(userQuizzesStorage).includes(quizze.id+''));
    return quizzes;
  } else {
    return [];
  }
}

function responseQuizzes(response) {
  quizzesUser = separateQuizzes(response.data);
  quizzesOtherUsers = response.data.filter(
    (quizz) => !quizzesUser.includes(quizz.id)
  );
  renderQuizzes();
}

function insertQuizzes(quizzes, type) {
  let quizzesLI = "";
  quizzes.forEach((quizz) => {
    if (type === "user") {
      quizzesLI += `
            <li class="quizz" onclick="searchQuizz(${quizz.id})">
                <div class="edit-delet">
                  <div onclick="editQuizz(${quizz.id})">
                    <img src="./img/edit.svg" />
                  </div>    
                  <div onclick="deleteQuizz(${quizz.id})">
                    <img src="./img/trash.svg" />
                  </div>
                </div>
      `;
    } else {
      quizzesLI += `
            <li class="quizz" onclick="searchQuizz(${quizz.id})">
      `;
    }
    quizzesLI += `
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
  const main = document.querySelector("main");
  if (quizzesUser.length === 0) {
    main.innerHTML = `
            <section class="creating-quizz">
                <p>Você não criou nenhum <br> quizz ainda :(</p>
                <button onclick="addQuizzInfo()">Criar Quizz</button>
            </section>
        `;
  } else {
    main.innerHTML = `
            <section class="user-quizzes">
                <div>
                    <h1>Seus Quizzes</h1>
                    <span onclick="addQuizzInfo()"><ion-icon name="add-circle-sharp"></ion-icon><span>
                </div>
                <ul>${insertQuizzes(quizzesUser, "user")}</ul>
            </section>
        `;
  }

  main.innerHTML += `
        <section class="other-user-quizzes">
            <div>
                <h1>Todos os Quizzes</h1>
            </div>
            <ul>${insertQuizzes(quizzesOtherUsers, "otherUsers")}</ul>
        </section>
        `;
}

searchQuizzes();

// SCREEN 2

function searchQuizz(id) {
  const response = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
  );
  response.then(responseQuizz);
  response.catch((error) => console.log(`erro: ${error.response.data}`));
}

function responseQuizz(response) {
  renderQuizz(response.data);
  savingConstants(response.data.levels);
}

function insertAnswers(answers) {
  let answersLI = "";
  answers.sort(() => Math.random() - 0.5).forEach((answer) => {
    answersLI += `
            <li class="answer ${answer.isCorrectAnswer}" onclick="selectedAnswer(this)">
                <img class="black-text" src="${answer.image}" alt="${answer.text}"></img>
                <h1 class="black-text">${answer.text}</h1>
            </li>
        `;
  });
  return answersLI;
}

function insertQuestions(questions) {
  console.log(questions);
  let questionsLI = "";
  questions.forEach((question) => {
    questionsLI += `
            <li class="question">
                <div class="content">
                    <div class="question-title" style="background-color: ${question.color};">
                        <h1>${question.title}</h1>
                    </div>
                    <div class="answers">
                        <ul>${insertAnswers(question.answers)}</ul>
                    </div>
                </div>
            </li>
        `;
  });
  return questionsLI;
}

function renderQuizz(quizz) {
  idCurrentQuiz = quizz.id;
  const container = document.querySelector("container");
  container.innerHTML = `
        <header onclick="HomeButton()">BuzzQuizz</header>
            <section class="header-quizz">
                <div class="overlay">
                    <h1>${quizz.title}</h1>
                </div>
                <img src="${quizz.image}" alt="${quizz.title}"></img>
            </section>
        <main class="main-screen2">
            <section class="questions">
                <ul>${insertQuestions(quizz.questions)}</ul>
            </section>
        </main>
    `;
  scrollWithOrder();
}

// BONUS - DELETE QUIZZ

function getSecretKey(id) {
  return JSON.parse(localStorage.getItem("quizzes"))[id];
}

function getUserQuizz(id) {
  return quizzesUser.filter(quizz => (quizz.id === id))[0];
}

function deleteQuizz(id) {
  if (window.confirm("Você realmente deseja apagar este quiz?")) {
    axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, 
                  {headers: {"Secret-Key": getSecretKey(id)}})
                  .then(alert("Quizz Excluído"))
                  .catch(error => {
                    console.log('Um erro ocorreu!', error);});
  }
  location.reload();
}

// BONUS - EDIT QUIZZ

function editQuizz(id) {
  const editedQuizz = {};
  axios.put(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, editedQuizz);
}
