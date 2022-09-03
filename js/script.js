let quizzesUser = [];
let quizzesOtherUsers = [];

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
  let userQuizzesIds = localStorage.getItem("quizzes");
  if (userQuizzesIds !== null) {
    userQuizzesIds = JSON.parse(userQuizzesIds);
    quizzes = quizzes.filter((quizze) => userQuizzesIds.includes(quizze.id));
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

function insertQuizzes(quizzes) {
  let quizzesLI = "";
  quizzes.forEach((quizz) => {
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
                <img src="${answer.image}" alt="${answer.text}"></img>
                <h1 class="black-text">${answer.text}</h1>
            </li>
        `;
  });
  return answersLI;
}

function insertQuestions(questions) {
  let questionsLI = "";
  questions.forEach((question) => {
    questionsLI += `
            <li class="question">
                <div class="content">
                    <div class="question-title">
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
let idCurrentQuiz = 0;
let counter2 = 0;
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
  counter = 0
  scrollWithOrder();
}

function selectedAnswer(selector){
    const chosenAnswer = selector.parentNode
    let answers = chosenAnswer.querySelectorAll('.answer')
    counter++
    for (i = 0; i < answers.length; i++){
        answers[i].children[1].classList.remove('black-text')
        answers[i].classList.add('non-clickable')
        if (answers[i] !== selector){
            answers[i].classList.add('non-chosen-answers')
        }
    }
    endOfQuizz();
    setTimeout(scrollWithOrder,2000)
}

function savingConstants(value){
    window.title1 = value[0].title
    window.title2 = value[1].title
    window.imgUrl0 = value[0].image
    window.imgUrl1 = value[1].image
    window.tex1 = value[0].text
    window.tex2 = value[1].text
}
function scrollWithOrder(){
    const questionTitle = document.querySelectorAll('.question-title')
    const overlay = document.querySelector('.overlay')
    if (counter === 0){
        overlay.scrollIntoView();
    }
    questionTitle[counter].scrollIntoView(({ behavior: 'smooth', block: "center"}));
}

function endOfQuizz(){
  const question = document.querySelectorAll('.question')
  const questions = document.querySelector('.questions ul')
  
  if (counter === question.length){
       questions.innerHTML += `
          <li class="question">
              <div class="feedback-content">
                  <div class="feedback-header">
                      <h1>${window.title1}</h1>
                  </div>
                  <div class="feedback-main"">
                      <img src="${window.imgUrl0}"> </img>
                      <div class="paragraph"> <p> ${window.tex1} </p> </div>
                  </div>
                  <div class="feedback-buttons">
                      <button onclick="searchQuizz(idCurrentQuiz)" class="re-start"> Reiniciar Quizz </button>
                      <button onclick="location.reload()" class="back-home"> Voltar para home </button>
                  </div>
              </div>
          </li>
      `;
  }
}