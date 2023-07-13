var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//To push random colour into gamePattern array
function nextSequence(){

    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = []; //To reset and clear the user clicked array
    var randomNumber = Math.floor((Math.random()*4));

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);

    playAudio(randomChosenColour);

}

//Function to play chosen color button audio
function playAudio(buttonId){
    var audioFilePath = "sounds/" + buttonId + ".mp3";
    var audio = new Audio(audioFilePath);
    audio.play();
}

//User clicked button event handler
$(".btn").click(function(event){
    var userChosenColor = $(this).attr("id"); //can also use this.id
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playAudio(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

})

//Animate button on pressing
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ $("#" + currentColour).removeClass("pressed"); }, 100);
}

//Detect keypress to start the game
$(document).keypress(function(event){
    if(!started){
        nextSequence();
        started = true;
        // console.log("game started");
    }
    // console.log(event.key);
    
})

//Check user answer
function checkAnswer(currentLevel){
         if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
            // console.log("success");

            if ( gamePattern.length == userClickedPattern.length) {
                setTimeout(function(){ nextSequence();}, 1000);
            }
            
         }
        else{
            // console.log("wrong");
            (new Audio("sounds/wrong.mp3")).play();
            $("body").addClass("game-over");
            setTimeout( function(){ $("body").removeClass("game-over");}, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}

//Start over function
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];

}