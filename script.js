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
    console.log(colorRgb + " : " + colorHexa);
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
    rightAnswer = makeColor();
    makeAnswers(rightAnswer);
    
    // When selecting an answer
    jQuery(".option").click(function(){
        var answer = jQuery(this).text();
        console.log(answer);
        if (answer == rightAnswer) {
            jQuery(".bravo").addClass("active");
            var score = parseInt(jQuery("#score").text());
            score = score +1;
            jQuery("#score").text(score);
        }
        else {
            jQuery(".faux").addClass("active");
        }
    });
    
    jQuery(".relaunch").click(function(){
        launch();
        jQuery(".faux").removeClass("active");
        jQuery(".bravo").removeClass("active");
    });
}

// We need to launch everything a first time
launch();