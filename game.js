
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var touched = false;
var level = 0;

$(document).keypress(function() {
  if (!started ) {
    document.getElementById("bgname").style.display = "none"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(document).addEventListener('touchstart',function(){
  if( is_touch_enabled() && !touched) {
    
    document.getElementById("bgname").style.display = "none"
    $("#level-title").text("Level " + level);
    nextSequence();
    touched=true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function is_touch_enabled() {
  
  return ( 'ontouchstart' in window ) ||
          ( navigator.maxTouchPoints > 0 ) ||
          ( navigator.msMaxTouchPoints > 0 );
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      document.getElementById("bgname").style.display = "block"
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  touched = false;
}

function myFunction() {
  document.getElementById("myDropup").classList.toggle("show");
}


window.onclick = function(event){
  if (!event.target.matches('.dropbtn')){
    var dropup = document.getElementsByClassName("dropup-content");
    var i;
    for (i = 0; i < dropup.length; i++) {
      var openDropup = dropup[i];
      if (openDropup.classList.contains('show')) {
        openDropup.classList.remove('show');
      }
    }
  }
}


