var quizArea = $("#quiz-here");
var countdownStart = 30;

// questions
var questions = [{
  question: "How many times was Oscar Wilde brought to trial?",
  answers: ["Never", "Once", "Twice", "Thrice"],
  rightA: "Thrice",
  image: "assets/images/oscarmyhoe.png"
}, {
  question: "Which notorious left-wing wit helped found the Hollywood Anti-Nazi League?",
  answers: ["Dorothy Parker", "F. Scott Fitzgerald", "Robert Benchley", "William Faulkner"],
  rightA: "Dorothy Parker",
  image: "assets/images/dorothymyhoe.jpg"
}, {
  question: "What book was inspired by the author being brutally beaten by homophobes?",
  answers: ["Maurice by E M Forster", "A Portrait of the Artist as a Young Man by James Joyce", "Fight Club by Chuck Palahniuk", "The Awakening by Kate Chopin"],
  rightA: "Fight Club by Chuck Palahniuk",
  image: "assets/images/chuckmyhoe.jpg"
}, {
  question: "Which had author had a file maintained on him for 20 years alleging he was an 'advanced Communist'?",
  answers: ["George Orwell", "Herman Melville", "Joseph Conrad", "Aldous Huxley"],
  rightA: "George Orwell",
  image: "assets/images/georgemyhoe.jpg"
}, {
  question: "This feminist authoer famously wrote, 'Thus humanity is male and man defines woman not herself but as relative to him.",
  answers: ["Virginia Woolfe", "Kate Chopin", "Mary Wollstonecraft", "Simone de Beauvoir"],
  rightA: "Simone de Beauvoir",
  image: "assets/images/simonemyhoe.jpg"
}, {
  question: "During school which author's independence and frank attitude so offended her principle he refused to call her by name?",
  answers: ["Edna St Vincent Millay", "Sylvia Plath", "Margaret Atwood", "Nella Larsen"],
  rightA: "Edna St Vincent Millay",
  image: "assets/images/vincentmyhoe.jpg"
}, {
  question: "Who was the first black woman to win a Pulitzer Prize for Fiction?",
  answers: ["Maya Angelou", "Alice Walker", "Zora Neale Hurston", "Audre Lorde"],
  rightA: "Alice Walker",
  image: "assets/images/alicemyhoe.jpg"
}, {
  question: "This children's author was an intelligence officer during World War II?",
  answers: ["Shel Silverstein", "Antoine de Saint-Exupery", "Roald Dahl", "C.S. Lewis"],
  rightA: "Roald Dahl",
  image: "assets/images/roaldmyhoe.jpg"
}];

// Setup game
var timer;

var game = {
    // variables
    questions: questions,
    displayedQ: 0,
    countdown: countdownStart,
    right: 0,
    wrong: 0,
    
    countdownBegin: function() {
        this.countdown--;
        $("#countdown").text(this.countdown);
        if (this.countdown === 0) {
            console.log("TIMES UP");
            this.timesUp();
        };
    },
    
    loadQ: function() {
        timer = setInterval(this.countdownBegin.bind(this), 1000);
        quizArea.html("<h2>" + questions[this.displayedQ].question + "</h2>");
        
        for (var i = 0; i < questions[this.displayedQ].answers.length; i++) {
            quizArea.append("<button class='answer' id='button' data-name='" + questions[this.displayedQ].answers[i]
            + "'>" + questions[this.displayedQ].answers[i] + "</button>");
        };
    },
    
    nextQ: function() {
        this.countdown = window.countdownStart;
        $("#countdown").text(this.countdown);
        this.displayedQ++;
        this.loadQ.bind(this)();
    },
    
    timesUp: function() {
        clearInterval(window.timer);
        $("#countdown").text(this.countdown);
        quizArea.html("<h2>Time's Up!</h2>");
        quizArea.append("<h3>Answer: " + questions[this.displayedQ].rightA);
        quizArea.append("<img src='" + questions[this.displayedQ].image + "' />");

        if (this.displayedQ === questions.length - 1) {
        setTimeout(this.done, 3 * 1000);
        } else {
        setTimeout(this.nextQ, 3 * 1000);
        };
    },
    
    done: function() {
        clearInterval(window.timer);
        quizArea.html("<h2>Your Results!</h2>");
        $("#countdown").text(this.countdown);
        quizArea.append("<h3>Right Answers: " + this.right + "</h3>");
        quizArea.append("<h3>Wrong Answers: " + this.wrong + "</h3>");
        quizArea.append("<h3>Unanswered: " + (questions.length - (this.wrong + this.right)) + "</h3>");
        quizArea.append("<br><button id='reset'>Try Again?</button>");
    },
    
    click: function(e) {
        clearInterval(window.timer);
        if ($(e.target).attr("data-name") === questions[this.displayedQ].rightA) {
            this.answeredRight();
        } else {
            this.answeredWrong();
        };
    },
    
    answeredWrong: function() {
        this.wrong++;
        clearInterval(window.timer);
        quizArea.html("<h2>Nope!</h2>");
        quizArea.append("<h3>The right answer was: " + questions[this.displayedQ].rightA + "</h3>");
        quizArea.append("<img src='" + questions[this.displayedQ].image + "' />");
        
        if (this.displayedQ === questions.length - 1) {
            setTimeout(this.done.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQ.bind(this), 3 * 1000);
        };
    },
    
    answeredRight: function() {
        clearInterval(window.timer);
        this.right++;
        quizArea.html("<h2>That's Right!</h2>");
        quizArea.append("<img src='" + questions[this.displayedQ].image + "' />");
        
        if (this.displayedQ === questions.length - 1) {
            setTimeout(this.done.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQ.bind(this), 3 * 1000);
        };
    },
    
    reset: function() {
        this.displayedQ = 0;
        this.countdown = countdownStart;
        this.right = 0;
        this.wrong = 0;
        this.loadQ();
    }
};

// click handlers
$(document).on("click", "#reset", game.reset.bind(game));

$(document).on("click", ".answer", function(e) {
  game.click.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#quiz-here").prepend("<h2>Time Left: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQ.bind(game)();
});