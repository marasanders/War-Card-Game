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
var gameInProgress = "true"

function createDeck() {
  for (var i=1; i<14; i++) {
//create cards 1-13 suit clubs
    deck[i-1] = {value:i,suit:"red"};
//create cards 1-13 suit hearts
//    deck[i+12] = {value:i,suit:"blue"};
//create cards 1-13 suit spades
//    deck[i+25] = {value:i,suit:"green"}
//create cards 1-13 suit diamonds
//    deck[i+38] = {value:i,suit:"orange"}
    // console.log (i);
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
};


function playOneHand(){
  player1Card = player1Hand.shift();
  player2Card = player2Hand.shift();
  if(!player2Card){debugger;}
  if (!(player1Hand.length&&player2Hand.length)) return;
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
    $(".Winner").css("color",player1Card.suit)
                .html("Player One Wins!")
//need to display score in if because if 2 wars in a row numbers will be off
    $(".Score.Player1").html("Remaining Cards for Player One: "+player1Hand.length);
    $(".Score.Player2").html("Remaining Cards for Player Two: "+player2Hand.length);
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
      $(".Winner").css("color",player2Card.suit)
                  .html("Player Two Wins!")
//need to display score in if because if 2 wars in a row numbers will be off
      $(".Score.Player1").html("Remaining Cards for Player One: "+player1Hand.length);
      $(".Score.Player2").html("Remaining Cards for Player Two: "+player2Hand.length);
  } else {
// It's a TIE
    $(".Winner").html("It's WAR!! Click to Start")
                .css("color","purple");
// Return the players cards to their hands so winner can take all and correct # of cards is displayed
      player1Hand.unshift(player1Card);
      player2Hand.unshift(player2Card);
      tieSwitch = 1
  }
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
    winner = ("Player 2 Wins The Game!!");
  } else {
    if (player2Hand.length === 0)
    winner = ("Player 1 Wins The Game!!!");
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

gameInProgress = "true"


$(".Card").on("click", function(){
//  if (gameInProgress){
  //random shuffle prevents game from getting stuck
    playsCounter = playsCounter + 1
    if (playsCounter > 15){
      shuffle(player1Hand);
      shuffle(player2Hand);
      playsCounter = parseInt(0);
    };


    playOneHand();
    flipCards();
    if (tieSwitch){
      war()
  }


    if (findWinner()){
      $(".Winner").html(winner)
                  .css("color","purple");
      $(".Card.Player1")
        .addClass("currentCard")
        .html("");
      $(".Card.Player2")
        .addClass("currentCard")
        .html("");
      $(".Card.Deck").removeClass("currentCard")
                     .html("Click to Start");
      gameInProgress = "false"
    }
//  }
});
