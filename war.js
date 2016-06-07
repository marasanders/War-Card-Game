var player1Score = parseInt(0)
var player2Score = parseInt(0)
var player1Hand = [];
var player2Hand = [];
var player1Card;
var player2Card;
var $start= $("#start")
var dealt = false;
var deck = [];
var winner;



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
    // console.log (deck[i+12]);
    // console.log (deck[i+25]);
    // console.log (deck[i+38]);
  }
  // console.log(deck);
}

function shuffle(){
  var cardToShuffle = deck.length, tempHold, randomCard;
// While there remain cards to shuffle…
  while (cardToShuffle) {
// Pick a card any card.
    randomCard = Math.floor(Math.random() * cardToShuffle--);
// And swap it with the current card.
    tempHold = deck[cardToShuffle];
    deck[cardToShuffle] = deck[randomCard];
    deck[randomCard] = tempHold;
  }
  // console.log(deck);
  return deck;
}

// Split the deck
function splitTheDeck(){
   var j = 0
   for (var i=0; i<26; i ++) {
      player1Hand[i] = deck[j];
      player2Hand[i] = deck[j+1];
      j = j + 2
      console.log(player2Hand[i]);
     }
      console.log(player1Hand[i]);
     return (deck,player1Hand,player2Hand)
};

//Finds the shortest array to use for the for loop so we don't run out of cards
function smallestPile () {
  if (player1Hand.length > player2Hand.length) {
    return (player2Hand.length);
  } else {
    return (player1Hand.length);
  }
};
//
// function flipCard(player1card,player2card){
//   console.log ("flip card 1   "+player1card.suit)
//   console.log ("flip card 2  "+player2card.suit)
//
// }



function playOneHand(){
  var numberOfCards = smallestPile()
  player1Card = player1Hand.shift();
  player2Card = player2Hand.shift();
  // for (var i=0; i < numberOfCards; i ++){
    // flipCard(player1Hand[i],player2Hand[i])
  if ((player1Card.value) > (player2Card.value))  {
    player1Hand.push(player2Card);
    // console.log ("One Won "+player1Hand[player1Hand.length-1].value);
    // console.log ("2  "+player2Hand[i].value);
  } else if ((player2Card.value) > (player1Card.value))  {
    player2Hand.push (player1Card);
    // console.log ("Two Won "+player1Hand[player1Hand.length-1].value);
    // console.log ("1  "+player1Hand[i].value);

  } else {
    console.log ("It's a tie!")
    $(".Card.Player1").removeClass("nocard");
  }
  numberOfCards = smallestPile(player1Hand,player2Hand)
  console.log ("smallest pile " + numberOfCards)
    // }
};

$(document).ready(function() {
  $(".Card.Player1").addClass("nocard");
  $(".Card.Player2").addClass("nocard");
})
$start.on("click", function(){
  $(".Card.Player1").removeClass("nocard");
  $(".Card.Player2").removeClass("nocard");
  $(".Card.Deck").addClass("nocard");
    createDeck();
    shuffle();
    splitTheDeck();
    console.log (player1Hand.length);
});

$(".Card").on("click", function(){
  playOneHand();
  flipCards();
})

function flipCards(){
  $(".Card.Player1")
    .addClass("nocard")
    .css("color",player1Card.suit)
    .html(player1Card.value);
  // console.log ("1 suit = "+player1Card.suit);
  //  var suitcolor = (player1card.suit)
  // console.log ("HELLO"+player1Card.value);
  //    $(".Card.Player1").removeClass("nocard");
  $(".Card.Player2")
    .addClass("nocard")
    .css("color",player2Card.suit)
    .html(player2Card.value);
  setTimeout(function(){
    console.log ("WAIT")
  }, 10000);
  // $(".Card.Player1").removeClass("nocard");
  // $(".Card.Player2").removeClass("nocard");
  // $(".Card.Player1").html("");
  // $(".Card.Player2").html("");
}
