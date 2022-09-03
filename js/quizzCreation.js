// SCREEN 3
// os Quizzzes do usuário devem ser guardados assim:
//localStorage.setItem('quizzes', `[${quizz.id}, ${quizz.id}, ...]`);

const elementoMain = document.querySelector("main");
let elementoScreen = "";


function addQuizzInfo() {
    scroll(0, 0);

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
    <button onclick="addQuizzQuestions()">Prosseguir para criar perguntas</button>
    </div>
    `;
}

let newQuizzObject = {};
let newQuizzTitle = "";
let newQuizzUrl = "";
let newQuestions = [];
let newQuizzQtty = 0;
let newQuizzLvl = 0;

function addQuizzQuestions() {
    newQuizzTitle = document.querySelector(".input-title").value;
    newQuizzUrl = document.querySelector(".input-url").value;
    newQuizzQtty = Number(document.querySelector(".input-question-qtty").value);
    newQuizzLvl = document.querySelector(".input-lvl-qtty").value;

    elementoScreen = document.querySelector(".creation-screen");

    if (validateQuizzInfo()) {
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

        elementoScreen.innerHTML += `<button onclick="addQuizzLevels()">Prosseguir para criar níveis</button>
      `;
    }
}

function addQuizzLevels() {
    // Armazenar os valores dos inputs para cada pergunta e criar um objeto
    scroll(0, 0);

    if (validateQuestions()) {
        for (let i = 0; i < newQuizzQtty; i++) {
            const qAnswers = [];

            const qText = document.querySelector(`.pergunta${i + 1} .input-q-text`).value;
            const qBgColor = document.querySelector(`.pergunta${i + 1} .input-q-bgcolor`).value;

            const aCorrect = document.querySelector(`.pergunta${i + 1} .input-correct-text`).value;
            const aCorrectUrl = document.querySelector(`.pergunta${i + 1} .input-correct-url`).value;

            qAnswers.push({
                text: aCorrect,
                image: aCorrectUrl,
                isCorrectAnswer: true,
            });

            const incorrectText1 = document.querySelector(`.pergunta${i + 1} .input-wrong-text1`).value;
            const incorrectUrl1 = document.querySelector(`.pergunta${i + 1} .input-wrong-url1`).value;

            qAnswers.push({
                text: incorrectText1,
                image: incorrectUrl1,
                isCorrectAnswer: false,
            });

            if (document.querySelector(`.pergunta${i + 1} .input-wrong-text2`).value !== "") {
                const incorrectText2 = document.querySelector(`.pergunta${i + 1} .input-wrong-text2`).value;
                const incorrectUrl2 = document.querySelector(`.pergunta${i + 1} .input-wrong-url2`).value;

                qAnswers.push({
                    text: incorrectText2,
                    image: incorrectUrl2,
                    isCorrectAnswer: false,
                });
            }
            if (document.querySelector(`.pergunta${i + 1} .input-wrong-text3`).value !== "") {
                const incorrectText3 = document.querySelector(`.pergunta${i + 1} .input-wrong-text3`).value;
                const incorrectUrl3 = document.querySelector(`.pergunta${i + 1} .input-wrong-url3`).value;

                qAnswers.push({
                    text: incorrectText3,
                    image: incorrectUrl3,
                    isCorrectAnswer: false,
                });
            }

            newQuestions.push({
                title: qText,
                color: qBgColor,
                answers: qAnswers,
            });
        }


        elementoScreen.innerHTML = `<h1>Agora, decida os níveis</h1>`;

        for (let i = 0; i < newQuizzLvl; i++) {
            elementoScreen.innerHTML += ` <div class="box level${i + 1}">
      <ul>
          <h2>Nível ${i + 1}</h2>
          <li><input class="input-lvl-title" placeholder="Título do nível" type="text"></li>
          <li><input class="input-lvl-percent" placeholder="% de acerto mínima" type="text"></li>
          <li><input class="input-lvl-url" placeholder="URL da imagem do nível" type="text"></li>
          <li><input class="input-lvl-text" placeholder="Descrição do nível" type="text"></li>
          
        </ul>
    </div>
  `;
        }

        elementoScreen.innerHTML += `<button onclick="addQuizzFinal()">Finalizar Quizz</button>`
    } else {
        alert('Preencha os dados corretamente!');
    }
}

const newQuizzLvlArray = [];

function addQuizzFinal() {

    if (validateLevels()) {
        scroll(0, 0);

        for (let i = 0; i < newQuizzLvl; i++) {
            const lvlTitle = document.querySelector(`.level${i + 1} .input-lvl-title`).value;
            const lvlPercent = Number(document.querySelector(`.level${i + 1} .input-lvl-percent`).value);
            const lvlImgUrl = document.querySelector(`.level${i + 1} .input-lvl-url`).value;
            const lvlText = document.querySelector(`.level${i + 1} .input-lvl-text`).value;

            newQuizzLvlArray.push({
                title: lvlTitle,
                image: lvlImgUrl,
                text: lvlText,
                minValue: lvlPercent
            });
        }
        console.log(newQuizzLvlArray);
        createObject();
        addQuizSend();
    }
}

function createObject() {
    newQuizzObject = {
        title: newQuizzTitle,
        image: newQuizzUrl,
        questions: newQuestions,
        levels: newQuizzLvlArray
    };
}

function addQuizSend() {
    elementoScreen.innerHTML = '<img src="./img/cupertino_activity_indicator.gif" alt="loading screen" class="loading">';

    const response = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', newQuizzObject);

    response.catch((error) => console.log(`erro: ${error.response.data}`));
    response.then(addQuizzSuccess);
}

function addQuizzSuccess(quizz) {
    console.log('adicionado com sucesso!');
    console.log(quizz);


    elementoScreen.innerHTML = `<h1>Seu quizz está pronto!</h1>`;

    elementoScreen.innerHTML += `<ul>
                    <li class="quizz" onclick="searchQuizz(${quizz.data.id})">
                        <div class="overlay">
                            <h1>${quizz.data.title}</h1>
                        </div>
                        <img src="${quizz.data.image}" alt="${quizz.data.title}"></img>
                    </li>
                    </ul>
                `;

    elementoScreen.innerHTML += `<button onclick="searchQuizz(${quizz.data.id}">Acessar Quizz</button>
    <button class="back-home" onclick="location.reload()">Voltar para home</button>`


}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


// Regular Expression para verificar se é Hexadecimal
const testHex = /^#[0-9A-Fa-f]{6}/g;

function validateQuestions() {
    for (let i = 0; i < newQuizzQtty; i++) {

        const qText = document.querySelector(`.pergunta${i + 1} .input-q-text`).value;
        const qBgColor = document.querySelector(`.pergunta${i + 1} .input-q-bgcolor`).value;
        const aCorrect = document.querySelector(`.pergunta${i + 1} .input-correct-text`).value;
        const aCorrectUrl = document.querySelector(`.pergunta${i + 1} .input-correct-url`).value;
        const incorrectText1 = document.querySelector(`.pergunta${i + 1} .input-wrong-text1`).value;
        const incorrectUrl1 = document.querySelector(`.pergunta${i + 1} .input-wrong-url1`).value;

        if (qText.length < 20) {
            return alert(`O título da pergunta ${i + 1} deve ter pelo menos 20 caracteres`);
        } else if (!testHex.test(qBgColor)) {
            return alert(`A cor da pergunta ${i + 1} deve ser hexadecimal com #`);
        } else if (aCorrect === '') {
            return alert(`o texto da pergunta ${i + 1} não pode ser vazio`);
        } else if (!validURL(aCorrectUrl)) {
            return alert(`A url da pergunta ${i + 1} deve ser uma url`);
        } else if (incorrectText1 == '') {
            return alert(`o texto da pergunta ${i + 1} não pode ser vazio`);
        } else if (!validURL(incorrectUrl1)) {
            return alert(`A url da pergunta ${i + 1} deve ser uma url`);
        }

        testHex.lastIndex = 0;
    }
    return (true);
}

function validateLevels() {
    const levelPercents = [];

    for (let i = 0; i < newQuizzLvl; i++) {
        const lvlTitle = document.querySelector(`.level${i + 1} .input-lvl-title`).value;
        const lvlPercent = Number(document.querySelector(`.level${i + 1} .input-lvl-percent`).value);
        const lvlImgUrl = document.querySelector(`.level${i + 1} .input-lvl-url`).value;
        const lvlText = document.querySelector(`.level${i + 1} .input-lvl-text`).value;

        if (lvlTitle.length < 10) {
            return alert(`O título do nível ${i + 1} deve ter pelo menos 10 caracteres`);
        } else if (lvlPercent < 0 || lvlPercent > 100) {
            return alert(`O percentual do nível ${i + 1} deve ser um número entre 0 e 100`);
        } else if (!validURL(lvlImgUrl)) {
            return alert(`A url do nível ${i + 1} deve ser uma url`);
        } else if (lvlText < 30) {
            return alert(`A descrição do nível ${i + 1} deve ter pelo menos 30 caracteres`);
        } levelPercents.push(lvlPercent);
    }

    if (!levelPercents.includes(0)) {
        return alert('É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%')
    }

    return true;
}

function validateQuizzInfo() {
    if (newQuizzTitle.length < 20 || newQuizzTitle.length > 65) {
        return alert(`O título ddo Quizz deve ter entre 20 e 65 caracteres`);
    } else if (newQuizzQtty < 3) {
        return alert(`O Quizz deve ter pelo menos 3 perguntas`);
    } else if (newQuizzLvl < 2) {
        return alert(`O Quizz deve ter pelo menos 2 níveis`);
    } else if (!validURL(newQuizzUrl)) {
        return alert(`A imagem do Quizz deve ser uma url`);
    }
    return true;
}



const objetao = {
    "title": "https://http.dog/200.jpg",
    "image": "https://http.dog/200.jpg",
    "questions": [
        {
            "title": "https://http.dog/200.jpg",
            "color": "#faffaf",
            "answers": [
                {
                    "text": "https://http.dog/200.jpg",
                    "image": "https://http.dog/200.jpg",
                    "isCorrectAnswer": true
                },
                {
                    "text": "https://http.dog/200.jpg",
                    "image": "https://http.dog/200.jpg",
                    "isCorrectAnswer": false
                }
            ]
        },
        {
            "title": "https://http.dog/200.jpg",
            "color": "#faffaf",
            "answers": [
                {
                    "text": "https://http.dog/200.jpg",
                    "image": "https://http.dog/200.jpg",
                    "isCorrectAnswer": true
                },
                {
                    "text": "https://http.dog/200.jpg",
                    "image": "https://http.dog/200.jpg",
                    "isCorrectAnswer": false
                }
            ]
        },
        {
            "title": "https://http.dog/200.jpg",
            "color": "#faffaf",
            "answers": [
                {
                    "text": "https://http.dog/200.jpg",
                    "image": "https://http.dog/200.jpg",
                    "isCorrectAnswer": true
                },
                {
                    "text": "https://http.dog/200.jpg",
                    "image": "https://http.dog/200.jpg",
                    "isCorrectAnswer": false
                }
            ]
        }
    ],
    "levels": [
        {
            "title": "#faffaf#faffaf#faffaf#faffaf",
            "image": "https://http.dog/200.jpg",
            "text": "https://http.dog/200.jpg",
            "minValue": 0
        },
        {
            "title": "https://http.dog/200.jpg",
            "image": "https://http.dog/200.jpg",
            "text": "https://http.dog/200.jpg",
            "minValue": 10
        }
    ]
}