
let userClickedPattern = [];
let level =0;
let gamePattern=[];
let gamestarted = false;

let buttonColours = ["red", "blue", "green", "yellow"];


//game starts from here 
$(document).on("keydown",function(){
    if(!gamestarted){
    gamestarted=true;
   nextSequence();
   $("h1").text("level "+level);
   $(".restart").css("display","inline-block"); 
   $(".restart").html("<h3>restart</h3>"); 
    }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
      $("#level-title").text("Level " + level);
    //random color selected and pushed to gamepattern array
 let randomNumber=  Math.floor(Math.random()*4) ;
let randomChosenColour =buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
//chosen color shown to user through animation and audio
$('#'+randomChosenColour).fadeOut(100).fadeIn(100);
playaudio(randomChosenColour);
}

function playaudio(colour){
    let sound;
    switch(colour){
        case "red":sound = "./sounds/red.mp3";break;
        case "green":sound = "./sounds/green.mp3";break;
        case "yellow":sound = "./sounds/yellow.mp3";break;
        case "blue":sound = "./sounds/blue.mp3";break;
        default:sound = "./sounds/wrong.mp3";break;
    }
   let audio = new Audio(sound);
    audio.play();
}

//user clicks on random color which is in gamepattern
$( ".btn" ).on( "click", function(e) {
    if(gamestarted===true){
let  userChosenColor= $(this).attr("id");
 playaudio(userChosenColor);
 userClickedPattern.push(userChosenColor);
animatepress(this);
checkanswer(userClickedPattern.length-1);
    }else{
     $("h1").text("game over press any key to restart");
        playaudio("wrong");
        $("body").addClass("game-over");
setTimeout(() => {
   $("body").removeClass("game-over"); 
},200);
    }

} );

function animatepress(currentColour){
$(currentColour).addClass("pressed");
setTimeout(()=>{
    $(currentColour).removeClass("pressed");
},100);
}

function checkanswer(currentlevel){
if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){nextSequence();},1000);
    };
    
}else{
  $("h1").text("gameover press any key to play again");
  playaudio("wrong");
$("body").addClass("game-over");
setTimeout(() => {
   $("body").removeClass("game-over"); 
},200);
restart();
}
}

function restart(){
level = 0;
gamestarted=false;
 gamePattern=[];
}

//restart game in middle of it
$(".restart").on("click",function(){
 $("h1").text("game re-started");
    restart(); 
})
// restart function is working properly but making it caused some sound problem now game doesn't make any sound