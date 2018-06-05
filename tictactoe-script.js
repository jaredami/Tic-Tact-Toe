var $squares = $(".squareButton");
var $rows = [
  [$("#top1"), $("#top2"), $("#top3")], //top
  [$("#mid1"), $("#mid2"), $("#mid3")], //middle horizontal
  [$("#bott1"), $("#bott2"), $("#bott3")], //bottom
  [$("#top1"), $("#mid1"), $("#bott1")], //left
  [$("#top2"), $("#mid2"), $("#bott2")], //middle vertical
  [$("#top3"), $("#mid3"), $("#bott3")], //right
  [$("#top1"), $("#mid2"), $("#bott3")], //diag1
  [$("#top3"), $("#mid2"), $("#bott1")] //diag1
];
var $pl = "O";
var $pc = "X";
var $gameOver = false;
var $xChosen = false;
var $playerScore = 0;
var $pcScore = 0;
var playCounter = 0;

// win, loss, draw overlays
function playerWinOverlayOn() {
  $("#overlayText").text("You Win!");
  $("#overlay").css("display", "block");
}
function pcWinOverlayOn() {
  $("#overlayText").text("You Lose!");
  $("#overlay").css("display", "block");
}
function drawOverlayOn() {
  $("#overlayText").text("Draw!");
  $("#overlay").css("display", "block");
}
function overlayOff() {
  $("#overlay").css("display", "none");
}
function getRandSquare() {
  // function to add X to random square on board
  var $randSquare = $squares.eq([Math.floor(Math.random() * $squares.length)]);
  if ($randSquare.text() == "O" || $randSquare.text() == "X") {
    getRandSquare();
  } else {
    $randSquare.html($pc);
  }
}

// check for win, loss, draw
function checkPlayerWin() {
  // look through every row for three O's
  for (var i = 0; i < $rows.length; i++) {
    if (
      $rows[i][0].text() == $pl &&
      $rows[i][1].text() == $pl &&
      $rows[i][2].text() == $pl
    ) {
      $rows[i][0].css("background-color", "green");
      $rows[i][1].css("background-color", "green");
      $rows[i][2].css("background-color", "green");
      $gameOver = true; // stops player or pc from making another move
      $playerScore++;
      $("#playerScore").html($playerScore); // adds 1 point to player score
      playerWinOverlayOn(); // displays "You Win!"
      $(".chooseButton").prop("disabled", false);
      $(".squareButton").prop("disabled", false);
    }
  }
}
function checkPcWin() {
  // look through every row for three X's
  for (var i = 0; i < $rows.length; i++) {
    if (
      $rows[i][0].text() == $pc &&
      $rows[i][1].text() == $pc &&
      $rows[i][2].text() == $pc
    ) {
      $rows[i][0].css("background-color", "red");
      $rows[i][1].css("background-color", "red");
      $rows[i][2].css("background-color", "red");
      $gameOver = true; // stops player or pc from making another move
      $pcScore++;
      $("#pcScore").html($pcScore); // adds 1 point to pc score
      pcWinOverlayOn(); // displays "You Lose!"
      $(".chooseButton").prop("disabled", false);
      $(".squareButton").prop("disabled", false);
    }
  }
}
function checkDraw() {
  if (playCounter == 5 && $gameOver == false) {
    drawOverlayOn();
    $gameOver = true;
    $(".chooseButton").prop("disabled", false);
    $(".squareButton").prop("disabled", false);
    $("#pl").css("text-decoration", "underline");
    $("#pc").css("text-decoration", "none");
  }
}

// choose pc's move
function pcMove() {
  if ($gameOver == false) {
    setTimeout(function() {
      for (var i = 0; i < $rows.length; i++) {
        // if there are 2 X's in a row and an empty space, place an X there
        if (
          $rows[i][0].text() == $pc &&
          $rows[i][1].text() == $pc &&
          $rows[i][2].text() == ""
        ) {
          $rows[i][2].html($pc);
          $xChosen = true;
          break;
        } else if (
          $rows[i][1].text() == $pc &&
          $rows[i][2].text() == $pc &&
          $rows[i][0].text() == ""
        ) {
          $rows[i][0].html($pc);
          $xChosen = true;
          break;
        } else if (
          $rows[i][0].text() == $pc &&
          $rows[i][2].text() == $pc &&
          $rows[i][1].text() == ""
        ) {
          $rows[i][1].html($pc);
          $xChosen = true;
          break;
        }
      }

      if ($xChosen == false) {
        for (var i = 0; i < $rows.length; i++) {
          if (
            //block O from getting 3 in a row
            $rows[i][0].text() == $pl &&
            $rows[i][1].text() == $pl &&
            $rows[i][2].text() !== $pc
          ) {
            $rows[i][2].html($pc);
            $xChosen = true;
            break;
          } else if (
            $rows[i][1].text() == $pl &&
            $rows[i][2].text() == $pl &&
            $rows[i][0].text() !== $pc
          ) {
            $rows[i][0].html($pc);
            $xChosen = true;
            break;
          } else if (
            $rows[i][0].text() == $pl &&
            $rows[i][2].text() == $pl &&
            $rows[i][1].text() !== $pc
          ) {
            $rows[i][1].html($pc);
            $xChosen = true;
            break;
          }
        }
      }

      // if after running through all of the rows there are no wins/win-blocks, choose a random square
      if ($xChosen == false) {
        getRandSquare();
      }
      $("#pl").css("text-decoration", "underline");
      $("#pc").css("text-decoration", "none");
      checkPcWin();
      $(".squareButton").prop("disabled", false);
    }, 1000);
  }
}
// when doc is  ready...
$(document).ready(function() {
  // choosing to play as X or O
  $("#chooseObutton").click(function() {
    $pl = "O";
    $px = "X";
    $("#chooseObutton").css("border-color", "green");
    $("#chooseXbutton").css("border-color", "black");
  });
  $("#chooseXbutton").click(function() {
    $pl = "X";
    $pc = "O";
    $("#chooseXbutton").css("border-color", "green");
    $("#chooseObutton").css("border-color", "black");
  });

  // clicking a square
  $(".squareButton").click(function() {
    $(".chooseButton").prop("disabled", true);
    $(".squareButton").prop("disabled", true);
    $xChosen = false;
    playCounter++;
    if ($gameOver == false) {
      $("#" + this.id).text($pl);
      $("#" + this.id).css("animation", "pulse 1s");
      $("#pl").css("text-decoration", "none");
      $("#pc").css("text-decoration", "underline");
      checkPlayerWin();
      checkDraw();
      pcMove();
    }
  });

  // clicking the play again button
  $("#playAgainButton").click(function() {
    $squares.text("");
    $squares.css("background-color", "#f5f5f5");
    $gameOver = false;
    overlayOff();
    playCounter = 0;
  });

  // clicking the reset button
  $("#resetButton").click(function() {
    $squares.text("");
    $squares.css("background-color", "#f5f5f5");
    $gameOver = false;
    $xChosen = false;
    overlayOff();
    playCounter = 0;
    $playerScore = 0;
    $pcScore = 0;
    $("#playerScore").html($playerScore);
    $("#pcScore").html($pcScore);
    $("#pl").css("text-decoration", "underline");
    $("#pc").css("text-decoration", "none");
    //    $(".squareButton").css("animation", "bounceInDown 3s");
  });
});

// to add:
// let computer make first move every other game
