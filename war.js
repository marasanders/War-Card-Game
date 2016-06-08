var player1Hand = [];
var player2Hand = [];
var deck = [];
var cards = [];
var player1Card;
var player2Card;
var $start= $("#start")
var dealt = false;
var winner = ""
var playsCounter = parseInt(0)

// Game was too long and boring with 52 cards
//
// function createDeck() {
//   for (var i=1; i<7; i++) {
// //create cards 1-6 suit red
//     deck[i-1] = {value:i,suit:"red"};
// //create cards 1-6 suit blue
//     deck[i+5] = {value:i,suit:"blue"};
// //create cards 1-6 suit green
//     deck[i+11] = {value:i,suit:"green"}
// //create cards 1-6 suit orange
//     deck[i+17] = {value:i,suit:"orange"}
//     // console.log (i);
//     console.log (deck[i-1]);
//     console.log (deck[i-1].value);
//     console.log (deck[i-1].suit);
//   }
// }
function createDeck() {
  for (var i=1; i<14; i++) {
//create cards 1-13 suit clubs
    deck[i-1] = {value:i,suit:"red"};
//create cards 1-13 suit hearts
    deck[i+12] = {value:i,suit:"blue"};
//create cards 1-13 suit spades
    deck[i+25] = {value:i,suit:"green"}
//create cards 1-13 suit diamonds
    deck[i+38] = {value:i,suit:"orange"}
    // console.log (i);
    console.log (deck[i-1]);
    console.log (deck[i-1].value);
    console.log (deck[i-1].suit);
  }
}

function shuffle(cards){
  var cardToShuffle = cards.length, tempHold, randomCard;
// While there remain cards to shuffle…
  while (cardToShuffle) {
// Pick a card any card.
    randomCard = Math.floor(Math.random() * cardToShuffle--);
// And swap it with the current card.
    tempHold = cards[cardToShuffle];
    cards[cardToShuffle] = cards[randomCard];
    cards[randomCard] = tempHold;
  }
  return cards;
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
     console.log(deck.length)
};


function playOneHand(){
  player1Card = player1Hand.shift();
  player2Card = player2Hand.shift();
  if ((player1Card.value) > (player2Card.value))  {
    player1Hand.push(player2Card);
    player1Hand.push(player1Card);
    $(".Winner").css("color",player1Card.suit)
                .html("Player One Wins!")
  } else if ((player2Card.value) > (player1Card.value))  {
    player2Hand.push(player1Card);
    player2Hand.push(player2Card);
    $(".Winner").css("color",player2Card.suit)
                .html("Player Two Wins!")
  } else {
    $(".Winner").html("It's a Tie!")
      player1Hand.push(player1Card);
      player2Hand.push(player2Card);
  }
  $(".Score.Player1").html("Remaining Cards for Player One: "+player1Hand.length);
  $(".Score.Player2").html("Remaining Cards for Player Two: "+player2Hand.length);
};


function flipCards(){
  $(".Card.Player1")
    .addClass("currentCard")
    .css("color",player1Card.suit)
    .html(player1Card.value);
  $(".Card.Player2")
    .addClass("currentCard")
    .css("color",player2Card.suit)
    .html(player2Card.value);
}

function findWinner () {
    if (player1Hand.length === 0) {
    winner = ("Player 2 Wins");
  } else {
    if (player2Hand.length === 0)
    winner = ("Player 1 Wins");
  }
  return (winner);
};

$(document).ready(function() {
  // Display Blank Card for Players
  $(".Card.Player1").addClass("currentCard");
  $(".Card.Player2").addClass("currentCard");
})
$start.on("click", function(){
  createDeck();
  shuffle(deck);
  splitTheDeck();
  // Show the Back of the card  for Players to look like the deck was split
  $(".Card.Player1").removeClass("currentCard");
  $(".Card.Player2").removeClass("currentCard");
  // Show blank space where deck
  $(".Card.Deck").addClass("currentCard");
});

$(".Card").on("click", function(){
  //random shuffle prevents game from getting stuck
  playsCounter = playsCounter + 1
  if (playsCounter > 15){
    shuffle(player1Hand);
    shuffle(player2Hand);
    playsCounter = parseInt(0);
  };
  playOneHand();
  flipCards();
  if (findWinner()){
    $(".Winner").html(winner)
                .css("color",purple);
    $(".Card.Player1")
      .addClass("currentCard")
      .html("");
    $(".Card.Player2")
      .addClass("currentCard")
      .html("");
    $(".Card.Deck").removeClass("currentCard")
                   .html("Click to Start");
  }
})
