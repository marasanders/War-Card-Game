"use strict";
var deck = [];
var cards = [];
var player1Hand = [];
var player2Hand = [];
var player1Card;
var player2Card;
var multiWar1Hold = [];
var multiWar2Hold = [];
var tieSwitch = 0
var $start= $("#start")
var playsCounter = parseInt(0)
var winner = ""


function createDeck() {
  for (var i=1; i<14; i++) {
    //create cards 1-13 suit RED
    deck[i-1] = {value:i,suit:"red"};
    //create cards 1-13 suit BLUE
    deck[i+12] = {value:i,suit:"blue"};
    //create cards 1-13 suit GREEN
    deck[i+25] = {value:i,suit:"green"}
    //create cards 1-13 suit ORANGE
    deck[i+38] = {value:i,suit:"orange"}
  }
}

function shuffle(deck){
  var cardToShuffle = deck.length
  var tempHold = []
  var randomCard = []
  // While there remain cards to shuffle…
  while (cardToShuffle) {
    // Pick a card any card.
    randomCard = Math.floor(Math.random() * cardToShuffle--);
    // And swap it with the current card.
    tempHold = deck[cardToShuffle];
    deck[cardToShuffle] = deck[randomCard];
    deck[randomCard] = tempHold;
  }
  return deck;
}

function splitTheDeck(){
  var j = 0
  // allows you to change deck size if games are too long
  var l = (deck.length * .5)
  for (var i=0; i<l; i ++) {
    player1Hand[i] = deck[j];
    player2Hand[i] = deck[j+1];
    j = j + 2
  }
};


function playOneHand(){
  player1Card = player1Hand.shift();
  player2Card = player2Hand.shift();
  //  if(!(player1Card&&player2Card)) debugger
  if ((player1Card.value) > (player2Card.value))  {
    // Did the last play result in a war?
    if ((multiWar1Hold.length != 0)||(multiWar2Hold.length != 0)) {
      // Check the length of the War Hold the Cards Array it can be smaller than 4 if the player had
      // less than 4 cards in their hand - It can be larger than 4 if there were 2 ties in a row
      // Append all War Hold Arrays to the end of the winners Hand
      var l = multiWar1Hold.length
      for (var i = 0; i < l; i++) {
        player1Hand.push(multiWar1Hold[i]);
      }
      l = multiWar2Hold.length
      for (var i = 0; i < l; i++) {
        player1Hand.push(multiWar2Hold[i]);
      }
    }
    // Give the winner back his card and give him the losers card too
    player1Hand.push(player2Card);
    player1Hand.push(player1Card);
    // Reset War Hold Arrays for new play
    multiWar1Hold = [];
    multiWar2Hold = [];
    $(".winner").css("color",player1Card.suit)
    .html("Player One Wins!")
    //need to display score in if because if 2 wars in a row numbers will be off
    $(".score.player1").html("Remaining Cards for Player One: "+player1Hand.length);
    $(".score.player2").html("Remaining Cards for Player Two: "+player2Hand.length);
  } else if ((player2Card.value) > (player1Card.value))  {
    // Did the last play result in a war?
    if ((multiWar1Hold.length != 0)||(multiWar2Hold.length != 0)) {
      // Check the length of the War Hold the Cards Array it can be smaller than 4 if the player had
      // less than 4 cards in their hand - It can be larger than 4 if there were 2 ties in a row
      // Append all War Hold Arrays to the end of the winners Hand
      var l = multiWar1Hold.length
      for (var i = 0; i < l; i++) {
        player2Hand.push(multiWar1Hold[i]);
      }
      l = multiWar2Hold.length
      for (var i = 0; i < l; i++) {
        player2Hand.push(multiWar2Hold[i]);
      }
    }
    // Give the winner back his card and give him the losers card too
    player2Hand.push(player1Card);
    player2Hand.push(player2Card);
    // Reset War Hold Arrays for new play
    multiWar1Hold = [];
    multiWar2Hold = [];
    $(".winner").css("color",player2Card.suit)
    .html("Player Two Wins!")
    //need to display score in if because if 2 wars in a row numbers will be off
    $(".score.player1").html("Remaining Cards for Player One: "+player1Hand.length);
    $(".score.player2").html("Remaining Cards for Player Two: "+player2Hand.length);
  } else {
    // It's a TIE
    $(".winner").html("It's WAR!! Click to Start")
    .css("color","purple");
    // Return the players cards to their hands so winner can take all and correct # of cards is displayed
    player1Hand.unshift(player1Card);
    player2Hand.unshift(player2Card);
    tieSwitch = 1
  }
};


function flipCards(){
  $(".js-play.player1")
  .addClass("currentCard")
  .css("color",player1Card.suit)
  .html(player1Card.value);
  $(".js-play.player2")
  .addClass("currentCard")
  .css("color",player2Card.suit)
  .html(player2Card.value);
}

function findWinner () {
  if (player1Hand.length === 0) {
    winner = ("Player 2 Wins The Game");
  } else {
    if (player2Hand.length === 0)
    winner = ("Player 1 Wins The Game");
  }
  return (winner);
};

function war() {
  var war1Hold = player1Hand.splice(0,4);
  var war2Hold = player2Hand.splice(0,4);
  // Check the length of the War Hold the Cards Array it can be smaller than 4 if the player had
  // less than 4 cards in their hand - It can be larger than 4 if there were 2 ties in a row
  // Append all War Hold Arrays to the end of the winners Hand
  var l = war1Hold.length
  for (var i = 0; i < l; i++) {
    multiWar1Hold.push(war1Hold[i]);
  }
  l = war2Hold.length
  for (var i = 0; i < l; i++) {
    multiWar2Hold.push(war2Hold[i]);
  }
  tieSwitch = 0
};


// START THE GAME

$(document).ready(function() {
  // Display Blank Card for Players
  $(".js-play.player1").addClass("currentCard");
  $(".js-play.player2").addClass("currentCard");
})

$start.on("click", function(){
  // Reset all Variables
  deck = [];
  cards = [];
  player1Hand = [];
  player2Hand = [];
  player1Card;
  player2Card;
  multiWar1Hold = [];
  multiWar2Hold = [];
  tieSwitch = 0
  playsCounter = parseInt(0)
  winner = ""
  createDeck();
  shuffle(deck);
  splitTheDeck();
  // Show the Back of the card  for Players to look like the deck was split
  // Reset all Playing fields for a new game
  $(".js-play.player1").removeClass("currentCard")
  .html("Click Either Pile to Begin")
  .css("color","white");

  $(".js-play.player2").removeClass("currentCard")
  .html("Continue Clicking to Deal")
  .css("color","white");
  // Show blank space where deck
  $(".card.deck").addClass("currentCard")
  .html(" ");
  $(".score.player1").html("Remaining Cards for Player One:       ");
  $(".score.player2").html("Remaining Cards for Player Two:       ");
  $(".winner").html(" ")
});

$(".js-play").on("click", function(){

  // Don't allow user to keep clicking after game is finished
  if (winner) {
    return;
  }
  playOneHand();
  flipCards();
  if (tieSwitch){
    war()
  }

  if (findWinner()){
    $(".winner").html(winner)
    .css("color","purple");
    $(".js-play.player1")
    .addClass("currentCard")
    .html("");
    $(".card.player2")
    .addClass("currentCard")
    .html("");
    $(".card.deck").removeClass("currentCard")
    .html("Click to Start");
  }
})

// $("#start").click()
//
//     setInterval(function(){
//       $(".js-play.player1").click()
//     },100)
