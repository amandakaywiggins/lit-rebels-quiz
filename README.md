# lit-rebels-quiz
[View the website here](https://amandakaywiggins.github.io/lit-rebels-quiz/index.html)


## Literary Rebels Trivia
Test your knowledge of these badass authors!"Literary Rebels Trivia" is a javascript game using basic timing events.

## Goal
Learn to use JavaScript Timing Events.

### Key Code
Creating a timer for each question that restarts everytime a new question loads.
````
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
````

## Authors
Amanda Kay Wiggins

## Acknowledgements
Created as part of the UT Bootcamp 
