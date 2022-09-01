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
                <button onclick="addQuizz()">Criar Quizz</button>
            </section>
        `;
  } else {
    main.innerHTML = `
            <section class="user-quizzes">
                <div>
                    <h1>Seus Quizzes</h1>
                    <span onclick="addQuizz()"><ion-icon name="add-circle-sharp"></ion-icon><span>
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
}

function insertAnswers(answers) {
  let answersLI = "";
  answers.forEach((answer) => {
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

function renderQuizz(quizz) {
  const container = document.querySelector("container");
  container.innerHTML = `
        <header onclick="HomeButton()">BuzzQuizz</header>
            <section class="header-quizz">
                <div class="overlay">
                    <h1>${quizz.title}</h1>
                </div>
                <img src="${quizz.image}" alt="${quizz.title}"></img>
            </section>
        <main>
            <section class="questions">
                <ul>${insertQuestions(quizz.questions)}</ul>
            </section>
        </main>
    `;
}

// SCREEN 3
const elementoMain = document.querySelector("main");
let elementoScreen = "";
function addQuizz() {
  console.log("Relaxa, vai sair");
  //localStorage.setItem('quizzes', `[${quizz.id}, ${quizz.id}, ...]`);

  elementoMain.innerHTML = `<div class="creation-screen">
  <h1>Comece pelo começo</h1>
    <div class="box">
    <ul>
        <li><input class="input-title" placeholder="Título do seu quizz" type="text"></li>
        <li><input class="input-url" placeholder="URL da imagem do seu quizz" type="text"></li>
        <li><input class="input-question-qtty" placeholder="Quantidade de perguntas do quizz" type="text"></li>
        <li><input class="input-lvl-qtty" placeholder="Quantidade de níveis do quizz" type="text"></li>
        </ul>
    </div>
    <button onclick="proceedToQuestions()">Prosseguir para criar perguntas</button>
    </div>
    `;
}

let newQuizzObject = {};
let newQuizzTitle = "";
let newQuizzUrl = "";
let newQuestions = [];

function proceedToQuestions() {
  newQuizzTitle = document.querySelector(".input-title").value;
  newQuizzUrl = document.querySelector(".input-url").value;
  const newQuizzQtty = document.querySelector(".input-question-qtty").value;
  const newQuizzLvl = document.querySelector(".input-lvl-qtty").value;

  elementoScreen = document.querySelector(".creation-screen");

  if (
    newQuizzTitle.length >= 20 &&
    newQuizzTitle.length <= 65 &&
    newQuizzQtty >= 3 &&
    newQuizzLvl >= 2
  ) {
    elementoScreen.innerHTML = `<h1>Crie suas perguntas</h1>`;
    for (let i = 0; i < newQuizzQtty; i++) {
      elementoScreen.innerHTML += ` <div class="box pergunta${i + 1}">
        <ul>
            <h2>Pergunta ${i + 1}</h2>
            <li><input class="input-q-text" placeholder="Texto da pergunta" type="text"></li>
            <li><input class="input-q-bgcolor" placeholder="Cor de fundo da pergunta" type="text"></li>
            <h2>Resposta correta</h2>
            <li><input class="input-correct-text" placeholder="Resposta correta" type="text"></li>
            <li><input class="input-correct-url" placeholder="URL da imagem" type="text"></li>
            <h2>Respostas incorretas</h2>
            <li><input class="input-wrong-text1" placeholder="Resposta incorreta 1" type="text"></li>
            <li><input class="input-wrong-url1" placeholder="URL da imagem 1" type="text"></li>
            <br>
            <li><input class="input-wrong-text2" placeholder="Resposta incorreta 2" type="text"></li>
            <li><input class="input-wrong-url2" placeholder="URL da imagem 2" type="text"></li>
            <br>
            <li><input class="input-wrong-text3" placeholder="Resposta incorreta 3" type="text"></li>
            <li><input class="input-wrong-url3" placeholder="URL da imagem 3" type="text"></li>
            
          </ul>
      </div>
    `;
    }

    elementoScreen.innerHTML += `<button onclick="proceedToLevels()">Prosseguir para criar níveis</button>
      `;
  } else {
    alert("Favor preencher os dados corretamente!");
  }
}

function proceedToLevels() {
  elementoScreen.innerHTML = `<h1>Agora, decida os níveis</h1>`;

  for (let i = 0; i < newQuizzQtty; i++) {
    elementoBox = document.querySelector(`.pergunta${i + 1}`);

    const qText = elementoBox.querySelector(".input-q-text").value;
    const qBgColor = elementoBox.querySelector(".input-q-bgcolor").value;

    const aCorrect = elementoBox.querySelector(".input-correct-text").value;
    const aCorrectUrl = elementoBox.querySelector(".input-correct-url").value;
  }
}

// Apenas para saber o modelo do post do quizz:

function createObject() {
  let objCreation = {
    title: newQuizzTitle,
    image: newQuizzUrl,
    questions: [
      {
        title: pergunta1.titulo,
        color: pergunta1.bgcolor,
        answers: [
          {
            //pergunta 1
            text: correct.text,
            image: correct.url,
            isCorrectAnswer: true,
          },
          {
            text: incorrect.text,
            image: incorrect.url,
            isCorrectAnswer: false,
          },
          {
            text: incorrect.text,
            image: incorrect.url,
            isCorrectAnswer: false,
          },
        ],
      },
    ],
  };
}

// template do objeto
let objDeTeste = {
  title: "Título do quizz",
  image: "https://http.cat/411.jpg",
  questions: [
    {
      title: "Título da pergunta 1",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 2",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 3",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
  ],
  levels: [
    {
      title: "Título do nível 1",
      image: "https://http.cat/411.jpg",
      text: "Descrição do nível 1",
      minValue: 0,
    },
    {
      title: "Título do nível 2",
      image: "https://http.cat/412.jpg",
      text: "Descrição do nível 2",
      minValue: 50,
    },
  ],
};
