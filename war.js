var player1Score = parseInt(0)
var player2Score = parseInt(0)
var player1Hand = [];
var player2Hand = [];
var $start= $("#start")
var dealt = false;
var deck = [];
var winner;



function createDeck() {
  for (var i=1; i<14; i++) {
//create cards 1-13 suit clubs
    deck[i-1] = {value:i,suit:"c"};
//create cards 1-13 suit hearts
    deck[i+12] = {value:i,suit:"h"};
//create cards 1-13 suit spades
    deck[i+25] = {value:i,suit:"s"}
//create cards 1-13 suit diamonds
    deck[i+38] = {value:i,suit:"d"}
    // console.log (i);
console.log (deck[i-1]);
console.log (deck[i-1].value);
    // console.log (deck[i+12]);
    // console.log (deck[i+25]);
    // console.log (deck[i+38]);
  }
  // console.log(deck);
}

function shuffle(deck) {
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
function splitTheDeck(deck,player1Hand,player2Hand){
   var j = 0
   for (var i=0; i<26; i ++) {
      player1Hand[i] = deck[j];
      player2Hand[i] = deck[j+1];
      j = j + 2
      // console.log(player2Hand[i]);
     }
    //  console.log(player1Hand);
     return (deck,player1Hand,player2Hand)
};

//Finds the shortest array to use for the for loop so we don't run out of cards
function smallestPile (player1Hand,player2Hand) {
  if (player1Hand.length > player2Hand.length) {
    return (player2Hand.length);
  } else {
    return (player1Hand.length);
  }
};

function letsPlay (winner,player1Hand,player2Hand){
  var numberOfCards = smallestPile(player1Hand,player2Hand)
  console.log ("smallest pile " + numberOfCards)
  for (var i=0; i < numberOfCards; i ++) {
    if ((player1Hand[i].value) > (player2Hand[i].value))  {
       player1Hand.push (player2Hand[i]);
       console.log ("One Won "+player1Hand[player1Hand.length-1].value);
       console.log ("2  "+player2Hand[i].value);
       player2Hand.splice(i , 1);
       if (numberOfCards > player2Hand.length){
         numberOfCards = player2Hand.length
       }
       console.log ("2  "+player2Hand[i].value);
    } else {
      console.log ("Two Won  "+player2Hand[i].value);
      console.log ("1  "+player1Hand[i].value);
    }
  }
};


$start.on("click", function(){
    createDeck();
    shuffle(deck);
    splitTheDeck (deck,player1Hand,player2Hand);
    letsPlay(winner,player1Hand,player2Hand);
    console.log (player1Hand.length);
});
