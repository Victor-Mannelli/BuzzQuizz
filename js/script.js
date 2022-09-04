let quizzesUser = [];
let quizzesOtherUsers = [];
let idCurrentQuiz = 0;

function HomeButton() {
  location.reload();
}

// SCREEN 1

function searchQuizzes() {
  const response = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
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
                  <div onclick="editQuizz(this, ${quizz.id})">
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
                <button onclick="addQuizzInfo(null)">Criar Quizz</button>
            </section>
        `;
  } else {
    main.innerHTML = `
            <section class="user-quizzes">
                <div>
                    <h1>Seus Quizzes</h1>
                    <span onclick="addQuizzInfo(null)"><ion-icon name="add-circle-sharp"></ion-icon><span>
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
  const response = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
  response.then(responseQuizz);
  response.catch((error) => console.log(`erro: ${error.response.data}`));
}

function responseQuizz(response) {
  renderQuizz(response.data);
  endOfQuizz(response.data.levels);
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

// SCREEN 3 --> (1) QUIZZ INFO

let quizzTitle = "";
let quizzUrlImage = "";
let quizzQtty = 0;
let nQuizzLvls = 0;
let quizzQuestions = [];
let quizzLVLs = []
let currentQuizzEditing;
const testHex = /^#[0-9A-Fa-f]{6}/g; // Regular Expression para verificar se é Hexadecimal

function addQuizzInfo() {
  scroll(0, 0);
  const main = document.querySelector("main");
  main.innerHTML = `<div class="creation-screen">
                      <h1>Comece pelo começo</h1>
                      <div class="box">
                        <ul>
                            <li><input class="input-title" placeholder="Título do seu quizz" type="text"></li>
                            <li><input class="input-url" placeholder="URL da imagem do seu quizz" type="text"></li>
                            <li><input class="input-question-qtty" placeholder="Quantidade de perguntas do quizz" type="text"></li>
                            <li><input class="input-lvl-qtty" placeholder="Quantidade de níveis do quizz" type="text"></li>
                        </ul>
                      </div>
                      <button onclick="addQuizzQuestions()">Prosseguir para criar perguntas</button>
                    </div>
                    `;
  if (currentQuizzEditing !== undefined) {
    main.querySelector("button").innerHTML = "Prosseguir para editar perguntas";
    putQuizzInfo(main.querySelector("ul"));
  }
}

function getQuizzInfo() {
  quizzTitle = document.querySelector(".input-title").value;
  quizzUrlImage = document.querySelector(".input-url").value;
  quizzQtty = document.querySelector(".input-question-qtty").value;
  nQuizzLvls = document.querySelector(".input-lvl-qtty").value;
}

function putQuizzInfo(element) {
  element.querySelector(".input-title").value = currentQuizzEditing.title;
  element.querySelector(".input-url").value = currentQuizzEditing.image;
  element.querySelector(".input-question-qtty").value = currentQuizzEditing.questions.length;
  element.querySelector(".input-lvl-qtty").value = currentQuizzEditing.levels.length;
}

// SCREEN 3 --> (2) QUIZZ QUESTIONS

function addQuizzQuestions() {
  getQuizzInfo();
  if (validateQuizzInfo(quizzTitle, quizzUrlImage, quizzQtty, nQuizzLvls) === 0) {
    creationScreen = document.querySelector(".creation-screen");
    creationScreen.innerHTML = `<h1>Crie suas perguntas</h1>`;
    for (let i = 0; i < quizzQtty; i++) {
      creationScreen.innerHTML += ` 
        <div class="box pergunta${i}">
            <h2>Pergunta ${i+1} <span onclick="collapse(this)"> <ion-icon name="create-outline"></ion-icon> </span> </h2>
            <ul class="the-one-who-colapses">
                <li><input class="input-q-text" placeholder="Texto da pergunta" type="text"></li>
                <li>
                    <input class="color-picker" type="color" value="#000001" onchange="changeColor(this)" />
                    <input class="input-q-bgcolor" placeholder="Cor de fundo da pergunta" type="text" onchange="changeColor(this)" />
                </li>
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
    creationScreen.innerHTML += `<button onclick="addQuizzLevels()">Prosseguir para criar níveis</button>`;
    if (currentQuizzEditing !== undefined) {
      putQuizzQuestions(creationScreen, currentQuizzEditing.questions);
      creationScreen.querySelector("button").innerHTML = "Prosseguir para editar níveis";
    }
  }
}

function changeColor(input) {
  const value = input.value;
  const parent = input.parentNode;
  parent.querySelectorAll("input").forEach(element => element.value = value.toUpperCase());
}

function validateQuizzInfo(quizzTitle, quizzUrlImage, quizzQtty, nQuizzLvls) {
  let errors = 0;
  if (quizzTitle.length < 20 || quizzTitle.length > 65) {
    alert(`O título ddo Quizz deve ter entre 20 e 65 caracteres`);
    errors++;
  }
  if (!validURL(quizzUrlImage)) {
    alert(`A imagem do Quizz deve ser uma url`);
    errors++;
  }
  if (quizzQtty < 3) {
    alert(`O Quizz deve ter pelo menos 3 perguntas`);
    errors++;
  }
  if (nQuizzLvls < 2) {
    alert(`O Quizz deve ter pelo menos 2 níveis`);
    errors++;
  }
  return errors;
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}

function getQuizzQuestion(creationScreen, nthQuestion) {
  question = {"text": creationScreen.querySelector(`.pergunta${nthQuestion} .input-q-text`).value,
              "bgColor":creationScreen.querySelector(`.pergunta${nthQuestion} .input-q-bgcolor`).value,
              "answerCorrectText":creationScreen.querySelector(`.pergunta${nthQuestion} .input-correct-text`).value,
              "answerCorrectUrl":creationScreen.querySelector(`.pergunta${nthQuestion} .input-correct-url`).value,
              "incorretAnswers":[{
                "answerIncorrectText":creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-text1`).value,
                "answerIncorrectUrl":creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-url1`).value}]}
  if (creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-text2`).value !== "") {
    question.incorretAnswers.push({"answerIncorrectText":creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-text2`).value,
                                    "answerIncorrectUrl":creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-url2`).value});
  }
  if (creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-text3`).value !== "") {
    question.incorretAnswers.push({"answerIncorrectText":creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-text3`).value,
                                    "answerIncorrectUrl":creationScreen.querySelector(`.pergunta${nthQuestion} .input-wrong-url3`).value});
  }
  return question;
}

function putQuizzQuestions(creationScreen, questions) {
  let correctAswer = [];
  let incorretAnswers = [];
  for (let i = 0; (i < quizzQtty || i < questions.length); i++) {
    correctAswer = questions[i].answers.filter(answer => answer.isCorrectAnswer)[0];
    incorretAnswers = questions[i].answers.filter(answer => !answer.isCorrectAnswer);
    creationScreen.querySelector(`.pergunta${i} .input-q-text`).value = questions[i].title;
    creationScreen.querySelector(`.pergunta${i} .input-q-bgcolor`).value = questions[i].color;
    creationScreen.querySelector(`.pergunta${i} .color-picker`).value = questions[i].color;
    creationScreen.querySelector(`.pergunta${i} .input-correct-text`).value = correctAswer.text;
    creationScreen.querySelector(`.pergunta${i} .input-correct-url`).value = correctAswer.image;
    for (let j = 0; j < incorretAnswers.length; j++) {
      creationScreen.querySelector(`.pergunta${i} .input-wrong-text${j+1}`).value = incorretAnswers[j].text;
      creationScreen.querySelector(`.pergunta${i} .input-wrong-url${j+1}`).value = incorretAnswers[j].image;
    }
  }
}

function validateQuestions(creationScreen) {
  let errors = 0;
  let question = {}; 
  for (let i = 0; i < quizzQtty; i++) {
    question = getQuizzQuestion(creationScreen, i);
    if (question.text.length < 20) {
      alert(`O título da pergunta ${i+1} deve ter pelo menos 20 caracteres`);
      errors++;
    }
    if (!testHex.test(question.bgColor)) {
      alert(`A cor da pergunta ${i+1} deve ser hexadecimal com #`);
      errors++;
    } 
    if (question.answerCorrectText === '') {
      alert(`o texto da pergunta ${i+1} não pode ser vazio`);
      errors++;
    }
    if (!validURL(question.answerCorrectUrl)) {
      alert(`A url da pergunta ${i+1} deve ser uma url`);
      errors++;
    } 
    for (let j = 0; j < question.incorretAnswers.length; j++) {
      if (question.incorretAnswers[j].answerIncorrectText == '') {
        alert(`o texto da resposta incorreta ${j+1} não pode ser vazio`);
        errors++;
      } 
      if (!validURL(question.incorretAnswers[j].answerIncorrectUrl)) {
        alert(`A url da resposta incorreta ${j+1} deve ser uma url`);
        errors++;
      }
    }
    testHex.lastIndex = 0;
  }
  return errors;
}

// SCREEN 3 --> (3) QUIZZ LEVELS

function addQuizzLevels() {
  creationScreen = document.querySelector(".creation-screen");
  scroll(0, 0);
  let question = {};
  if (validateQuestions(creationScreen) === 0) { 
    for (let i = 0; i < quizzQtty; i++) {
      let answers = [];
      question = getQuizzQuestion(creationScreen, i);
      answers.push({
        text: question.answerCorrectText,
        image: question.answerCorrectUrl,
        isCorrectAnswer: true,
      });
      for (let j = 0; j < question.incorretAnswers.length; j++) {
        answers.push({
          text: question.incorretAnswers[j].answerIncorrectText,
          image: question.incorretAnswers[j].answerIncorrectUrl,
          isCorrectAnswer: false,
        });
      }
      quizzQuestions.push({
          title: question.text,
          color: question.bgColor,
          answers: answers,
      });
    }
    creationScreen.innerHTML = `<h1>Agora, decida os níveis</h1>`;
    for (let i = 0; i < nQuizzLvls; i++) {
      creationScreen.innerHTML += ` 
          <div class="box level${i}">
              <h2>Nível ${i+1} <span onclick="collapse(this)"> <ion-icon name="create-outline"></ion-icon> </span> </h2>
              <ul class="the-one-who-colapses">
                  <li><input class="input-lvl-title" placeholder="Título do nível" type="text"></li>
                  <li><input class="input-lvl-percent" placeholder="% de acerto mínima" type="text"></li>
                  <li><input class="input-lvl-url" placeholder="URL da imagem do nível" type="text"></li>
                  <li><input class="input-lvl-text" placeholder="Descrição do nível" type="text"></li>
              </ul>
          </div>
          `;
    }
    creationScreen.innerHTML += `<button onclick="addQuizzFinal()">Finalizar Quizz</button>`;
    if (currentQuizzEditing !== undefined) {
      putQuizzLevels(creationScreen, currentQuizzEditing.levels);
      creationScreen.querySelector("button").innerHTML = "Salvar alterações";
    }
  }
}

function collapse(selector) {
  const h2 = selector.parentNode;
  const questionBlock = h2.parentNode;
  const ul = questionBlock.children[1];

  if (ul.style.maxHeight) {
      ul.style.maxHeight = null;
  } else {
      ul.style.maxHeight = ul.scrollHeight + "px";
  }
}

function putQuizzLevels(creationScreen, levels) {
  for (let i = 0; (i < nQuizzLvls || i < levels.length); i++) {
    creationScreen.querySelector(`.level${i} .input-lvl-title`).value = levels[i].title;
    creationScreen.querySelector(`.level${i} .input-lvl-percent`).value = levels[i].minValue;
    creationScreen.querySelector(`.level${i} .input-lvl-url`).value = levels[i].image;
    creationScreen.querySelector(`.level${i} .input-lvl-text`).value = levels[i].text;
  }
}

function validateLevels() {
  const levelPercents = [];
  let errors = 0;
  for (let i = 0; i < nQuizzLvls; i++) {
      const lvlTitle = document.querySelector(`.level${i} .input-lvl-title`).value;
      const lvlPercent = Number(document.querySelector(`.level${i} .input-lvl-percent`).value);
      const lvlImgUrl = document.querySelector(`.level${i} .input-lvl-url`).value;
      const lvlText = document.querySelector(`.level${i} .input-lvl-text`).value;

      if (lvlTitle.length < 10) {
        alert(`O título do nível ${i + 1} deve ter pelo menos 10 caracteres`);
        errors++;
      } 
      if (lvlPercent < 0 || lvlPercent > 100) {
        alert(`O percentual do nível ${i + 1} deve ser um número entre 0 e 100`);
        errors++;
      } 
      if (!validURL(lvlImgUrl)) {
        alert(`A url do nível ${i + 1} deve ser uma url`);
        errors++;
      } 
      if (lvlText < 30) {
        alert(`A descrição do nível ${i + 1} deve ter pelo menos 30 caracteres`);
        errors++;
      } 
      levelPercents.push(lvlPercent);
  }
  if (!levelPercents.includes(0)) {
    alert('É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%');
    errors++;
  }
  return errors;
}

// SCREEN 3 --> FINAL

function addQuizzFinal() {
  if (validateLevels() === 0) {
    scroll(0, 0);
    for (let i = 0; i < nQuizzLvls; i++) {
        const lvlTitle = document.querySelector(`.level${i} .input-lvl-title`).value;
        const lvlPercent = Number(document.querySelector(`.level${i} .input-lvl-percent`).value);
        const lvlImgUrl = document.querySelector(`.level${i} .input-lvl-url`).value;
        const lvlText = document.querySelector(`.level${i} .input-lvl-text`).value;

        quizzLVLs.push({
            title: lvlTitle,
            image: lvlImgUrl,
            text: lvlText,
            minValue: lvlPercent
        });
    }
    if (currentQuizzEditing !== undefined) {
      editQuizzSend(createObject(), currentQuizzEditing.id);
    } else {
      addQuizSend(createObject());
    }
  }
}

function createObject() {
  return {
    title: quizzTitle,
    image: quizzUrlImage,
    questions: quizzQuestions,
    levels: quizzLVLs
  };
}

function addQuizSend(quizzObject) {
  creationScreen = document.querySelector(".creation-screen");
  creationScreen.innerHTML = '<img src="./img/cupertino_activity_indicator.gif" alt="loading screen" class="loading">';
  const response = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizzObject);
  response.catch((error) => console.log(`erro: ${error.response.data}`));
  response.then(addQuizzSuccess);
}

function addQuizzSuccess(quizz) {
  storeUserQuizz(quizz.data.id, quizz.data.key);
  creationScreen = document.querySelector(".creation-screen");
  creationScreen.innerHTML = `
    <h1>Seu quizz está pronto!</h1>
    <ul>
      <li class="quizz" onclick="searchQuizz(${quizz.data.id})">
          <div class="overlay">
              <h1>${quizz.data.title}</h1>
          </div>
          <img src="${quizz.data.image}" alt="${quizz.data.title}"></img>
      </li>
    </ul>
    <button onclick="searchQuizz(${quizz.data.id})">Acessar Quizz</button>
    <button class="back-home" onclick="location.reload()">Voltar para home</button>
    `;
}

function storeUserQuizz(id, key) {
  let userQuizzesStorage = localStorage.getItem("quizzes");
  if (userQuizzesStorage !== null) {
      userQuizzesStorage = JSON.parse(userQuizzesStorage);
  } else {
      userQuizzesStorage = {};
  }
  userQuizzesStorage[id] = key;
  localStorage.setItem("quizzes", JSON.stringify(userQuizzesStorage));
}

// BONUS - DELETE QUIZZ

function getSecretKey(id) {
  return JSON.parse(localStorage.getItem("quizzes"))[id];
}

function deleteQuizz(id) {
  if (window.confirm("Você realmente deseja apagar este quiz?")) {
    axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, {headers: {"Secret-Key": getSecretKey(id)}})
                  .then(() => {
                                alert("Quizz Excluído");
                                location.reload();
                              })
                  .catch(error => {
                                    alert("Ocorreu um erro!")
                                    console.log("Erro: ", error);
                                    location.reload();
                                  });
  }
}

// BONUS - EDIT QUIZZ

function editQuizz(element, id) { 
  element.parentNode.parentNode.removeAttribute("onclick");
  quizz = quizzesUser.filter(quizz => (quizz.id === id));
  currentQuizzEditing = quizz[0];
  addQuizzInfo();
}

function editQuizzSend(quizzObject, id) {
  axios.put(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, quizzObject, {headers: {"Secret-Key": getSecretKey(id)}})
                  .then(() => {
                                alert("Quizz alterado!");
                                location.reload();
                              })
                  .catch(error => { 
                                    alert("Ocorreu um erro!")
                                    console.log("Erro: ", error);
                                    location.reload();
                                  });
}