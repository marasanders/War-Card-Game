var player1Score = parseInt(0)
var player2Score = parseInt(0)
var player1Hand = [];
var player2Hand = [];
var $start= $("#start")
var dealt = false;
var deck = [];



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
//console.log (deck.value[i]);
    // console.log (deck[i+12]);
    // console.log (deck[i+25]);
    // console.log (deck[i+38]);
  }
  // console.log(deck);
}

function shuffle(deck) {
  var cardToShuffle = deck.length, tempHold, remainingCard;
// While there remain cards to shuffle…
  while (cardToShuffle) {
// Pick a card any card.
    remainingCard = Math.floor(Math.random() * cardToShuffle--);
// And swap it with the current card.
    tempHold = deck[cardToShuffle];
    deck[cardToShuffle] = deck[remainingCard];
    deck[remainingCard] = tempHold;
  }
  // console.log(deck);
  return deck;
}

// Split the deck
function splitTheDeck(deck,player1Hand,player2Hand){
   var j = 0
   for (i=0; i<26; i = i + 1) {
      player1Hand[i] = deck[j];
      player2Hand[i] = deck[j+1];
      j = j + 2
//console.log(player1Hand.value[i]);
      // console.log(player2Hand[i]);
     }
    //  console.log(player1Hand);
     return (deck,player1Hand,player2Hand)
};

$start.on("click", function(){
    createDeck();
    shuffle(deck);
    splitTheDeck (deck,player1Hand,player2Hand)
});
