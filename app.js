const questions = [
    {

        question: "Which rapper is known for the 2012 album good kid, m.A.A.d city, featuring tracks like Swimming Pools (Drank)?",
        answers: [
            { text: "Future", correct: false },
            { text: "Kendrick Lamar", correct: true },
            { text: "Drake", correct: false },
            { text: "Lil Wayne", correct: false }
        ]
    },
    {
        question: "Which album by Nas is considered a hip-hop classic?",
        answers: [
            { text: "Illmatic", correct: true },
            { text: "It Was Written", correct: false },
            { text: "Nastradamus", correct: false },
            { text: "Stillmatic", correct: false }
        ]
    },
    {
        question: "What is the name of the rap group behind the 1991 album The Low End Theory?",
        answers: [
            { text: "The Fugees", correct: true },
            { text: "NWA", correct: false },
            { text: "A Tribe Called Quest", correct: false },
            { text: "Outkast", correct: false }
        ]
    },

    {
        question: "Which female rapper released the 2002 album Under Construction, including the hit Work It?",

        answers: [
            { text: "Missy Elliot", correct: true },
            { text: "Nicki Minaj", correct: false },
            { text: "Lil Kim", correct: false },
            { text: "Foxy Brown", correct: false }
        ]
    },
    {
        question: "Which rapper won the first-ever Grammy for Best Rap Album in 1989 for Im Your Pusher?",
        answers: [
            { text: "DJ Jazzy Jeff & The Fresh Prince", correct: true },
            { text: "Run-DMC", correct: false },
            { text: "N.W.A", correct: false },
            { text: "Ice T", correct: false }
        ]
    },
    {
        question: "The stage name of the rapper born Shawn Carter,What is  known for albums like The Blueprint?",
        answers: [
            { text: "Shawn Carter", correct: true },
            { text: "Calvin Broadus", correct: false },
            { text: "Jay Z", correct: false },
            { text: "Memphis Bleek", correct: false }
        ]
    },

    {
        question: "Which Atlanta rapper’s 2018 album Astroworld featured the hit Sicko Mode?",
        answers: [
            { text: "Travis Scott", correct: true },
            { text: "Young Thug", correct: false },
            { text: "Lil Baby", correct: false },
            { text: "Gucci", correct: false }
        ]
    },

    {
        question: "Which rap duo released the 2000 album Stankonia, including the hit Ms. Jackson?",
        answers: [
            { text: "Bun B & Pimp C", correct: false },
            { text: "Clipse", correct: false },
            { text: "Mobb Deep", correct: false },
            { text: "Outkast", correct: true }
        ]
    },

    {
        question: " Which rapper’s 1999 debut album The Slim Shady LP included the single My Name Is?",
        answers: [
            { text: "Lil Wayne", correct: true },
            { text: "Dr. Dre", correct: false },
            { text: "Eminem", correct: true },
            { text: "Soulja Boy", correct: false }
        ]
    },


    {
        question: "What rapper sold the most albums in the early 90's?",
        answers: [
            { text: "Notorious Big", correct: false },
            { text: "2pac", correct: false },
            { text: "Run DMC", correct: true },
            { text: "Mc Hammer", correct: false }
        ]
    },

    {
        question: "What is the real name of rapper Jay-Z?",
        answers: [
            { text: "Shawn Carter", correct: true },
            { text: "Calvin Broadus", correct: false },
            { text: "Curtis Jackson", correct: false },
            { text: "Sean Combs", correct: false }
        ]
    },

    {
        question: "Who was the first rapper to ever sell a platinum record?",
        answers: [
            { text: "Run DMC", correct: true },
            { text: "LL Cool J", correct: false },
            { text: "Eric B. & Rakim", correct: false },
            { text: "DOC", correct: false }
        ]
    }
]
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionElement = document.getElementById("question");
const answerButtonsContainer = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const correctSound = new Audio("audio/correct-answer.mp3");
const incorrectSound = new Audio("audio/wrong-answer.mp3");
const backgroundMusic = new Audio("audio/travis-scott.mp3");

let currentQuestionIndex;
let score;
let shuffleQuestions;
let previousFirstQuestionIndex;
let previousFirstQuestion = null;

startButton.addEventListener("click", () => {
    startGame();
    backgroundMusic.play();
    backgroundMusic.volume = 0.05;
    console.log("shuffled questions", shuffleQuestions)
});

nextButton.addEventListener("click", () => {
    console.log(currentQuestionIndex)
    currentQuestionIndex++;
    setNextQuestion();
});
      
function startGame() {
    shuffleQuestions = shuffle([...questions]);
    // shuffle(shuffleQuestions);
    // const FirstQuestion = shuffleQuestions[0];
    // previousFirstQuestionIndex = questions.findIndex(q => q.question === shuffleQuestions.question);
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    document.getElementById("quiz").classList.remove("hide");
    setNextQuestion();
}



function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion() {
    questionElement.innerText = shuffleQuestions[currentQuestionIndex].question;
    shuffleQuestions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("button");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    answerButtonsContainer.innerHTML = "";
}

function selectAnswer(event) {
    const selectedButton = event.target;
    console.log('user clicked an answer:', selectedButton);
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        correctSound.play();
        correctSound.volume = 0.5;
        score++;
        scoreElement.innerText = score;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
        incorrectSound.play()
        incorrectSound.volume = 0.5;
    }
    Array.from(answerButtonsContainer.children).forEach(button => {
        button.disabled = true;
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        questionElement.innerText = `Quiz Finished! Final Score: ${score}/${questions.length}`;
    }
}
//Fisher-Yates Shuffle method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}


