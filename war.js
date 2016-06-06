var player1Score = parseInt(0)
var player2Score = parseInt(0)
var $start= $("#start")
var dealt = false;
var deck = [];



function createDeck() {
  for (var i=1; i<14; i++) {
    deck[i] = {value:i,suit:"c"};
    //create cards 1-13 suit clubs
    deck[i+13] = {value:i,suit:"h"};
    //create cards 1-13 suit hearts
    deck[i+26] = {value:i,suit:"s"}
    //create cards 1-13 suit spades
    deck[i+39] = {value:i,suit:"d"}
    //create cards 1-13 suit diamonds
    console.log (i);
  }
  console.log(deck);
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
  console.log(deck);
  return deck;
}

$start.on("click", function(){
    createDeck();
    shuffle(deck);
});
