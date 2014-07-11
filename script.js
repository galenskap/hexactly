// Function to convert hex format to a rgb color
function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}

// Function to pick three random numbers and build a color
function randomRgb() {
    var color = "rgb(";
    for (var i=0; i<3; i++) {
        var number = 0 + Math.floor(Math.random() * 255);
        if (i<2) {
            color += number+", ";
        }
        else {
            color += number + ")";
        }
    }
    return color;
}

// Function to select a color for a level
function makeColor() {
    var colorRgb = randomRgb();
    var colorHexa = rgb2hex(colorRgb);
    // Fill the square
    jQuery("#couleur").css("background-color",colorRgb);
    return colorHexa;
}

// Function to display four possible answers
function makeAnswers(rightColor) {
    // Delete all displayed answers
    jQuery("#answers").empty();
    // Pick a random position for the right answer
    var position = 0 + Math.floor(Math.random() * 4);
    for (var n=0; n<4; n++) {
        if (n == position) {
            var option = '<li class="option">' +rightColor+ '</li>';
            jQuery("#answers").append(option);
        }
        else {
            var option = '<li class="option">' +rgb2hex(randomRgb())+ '</li>';
            jQuery("#answers").append(option);
        }
    }
}
    
// Launch everything
function launch() {
    level ++;
    jQuery("#level").text(level-1);
    rightAnswer = makeColor();
    makeAnswers(rightAnswer);
    
    // When selecting an answer
    jQuery(".option").click(function(){
        var answer = jQuery(this).text();
        if (answer == rightAnswer) {
            jQuery(".bravo").addClass("active");
            score ++;
            jQuery("#score").text(score);
        }
        else {
            jQuery(".faux").addClass("active");            
            jQuery("#rightAnswer").empty().text(rightAnswer).css("color", rightAnswer);
        }
        if (level == 10) {
            // track the time 'cause this is the end, my friend
            endGame = (new Date).getTime();
            chrono = calcTime(startGame, endGame);
            jQuery(".scoreResult").append(score);
            jQuery(".timerResult").append(chrono);
            jQuery(".daGame").css("display", "none");
            jQuery(".daEnd").css("display", "block");
        }
    });
    
    jQuery(".relaunch").click(function(){
        launch();
        jQuery(".active").removeClass("active");
        console.log("level: " +level);
        console.log("score: " +score);
        console.log("end: " +endGame);
    });
}

// We need to launch everything a first time (after the "Start" click)
jQuery("#startLink").click(function(){
    level = 0;
    score = 0;
    startGame = (new Date).getTime();
    launch();
    jQuery(".daGame").css("display", "block");
    jQuery(".daIntro").css("display", "none");
});

// Calculate time spent on the game
function calcTime(startGame, endGame) {
    var difference = endGame - startGame;
    var totalSeconds = Math.floor(difference/1000);
    var left = totalSeconds%60;
    if(left.toString().length == 1) {left = "0" + left.toString();}
    var minutes = (totalSeconds-left)/60;
    var totalTime = minutes + '\'' + left + '"';
    return totalTime;
}