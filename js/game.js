const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missHits = 0;

function round() {
  let divSelector = randomDivId();
  
  $('.target').text(``);
  $('.target').removeClass("target").addClass("game-field");
  $(divSelector).addClass("target");
  $('.target').text(`${hits+1}`);

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('.wrapper').hide();
  $('#start-button').hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let penalty = missHits;
  let penaltyTime = Number(penalty).toPrecision(3);
  let totalResult = Number(totalPlayedSeconds) + Number(penaltyTime);

  $("#total-time-played").text(totalPlayedSeconds);
  $(".number-of-miss").text(penalty);
  $(".penalty-time").text(penaltyTime);
  $(".total-result").text(totalResult);

  $("#win-message").removeClass("d-none");
}

function firstHit() {
  firstHitTime = getTimestamp();
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }else{
    missHits++;
    function miss() {
      $(event.target).removeClass("game-field").addClass("miss").text(`Error!`);
    }
    function missContinue() {
      $(event.target).removeClass("miss").addClass("game-field").text(``);
    }
    miss();
    setTimeout(missContinue, 500);
  }
}


function init() {
  $("#start-button").click(round);
  $("#start-button").click(firstHit);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
