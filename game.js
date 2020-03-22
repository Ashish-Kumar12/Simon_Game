
var colors = ["green", "red", "yellow", "blue"];
var computerSequence = [];
var userSequence = [];
var level = 0;
var started = false;
var buttons = document.querySelectorAll(".btn");
var numOfButtons = buttons.length;

// Initialize buttons

buttons.forEach(function(button){
    button.addEventListener("click", function(){
        if(started){
        var clickedColor = this.id;
        userSequence.push(clickedColor);
        animate(clickedColor);
        playSound(clickedColor);
        checkSequence(userSequence.length - 1);
        }
    });
});

// Initialize keypress

document.addEventListener("keypress", function(){
    if(!started)
    {
        setTimeout(function(){
            nextSequenceGenerator();
            started = true;
        }, 250);
    }
});

// Random sequence generator function

function nextSequenceGenerator()
{
    var randomNumber = Math.floor(Math.random()*numOfButtons);
    var randomColor = colors[randomNumber];
    computerSequence.push(randomColor);
    level++;
    document.querySelector("#level-title").textContent = "Level " + level; 
    animate(randomColor);
}

function checkSequence(currentColorIndex)
{
    // Check current selection
    if(userSequence[currentColorIndex] !== computerSequence[currentColorIndex])
    {
        gameOver();
        return;
    }

    // To check if user has got the right sequence or not
    if(userSequence.length === computerSequence.length)
    {
        setTimeout(function(){
            userSequence = [];
            nextSequenceGenerator();
        }, 750);
    }
}

function gameOver()
{
    document.querySelector("#level-title").textContent = "Game Over! Press any key to restart"; 
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){
        document.querySelector("body").classList.remove("game-over");
    }, 300);
    playSound("wrong");
    started = false;
    userSequence = [];
    computerSequence = [];
    level = 0;
}

function animate(color)
{
    var animateColor = document.querySelector("#" + color);
    animateColor.classList.add("pressed");
    setTimeout(function(){
        animateColor.classList.remove("pressed");
    }, 300);
}

function playSound(color)
{
    var playAudio = new Audio("sounds/" + color + ".mp3");
    playAudio.play();
}