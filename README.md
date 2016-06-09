# War-Card_Game

Build an application to play the card game war.

Technologies used: HTML, JavaScript, JQuery, CSS

Approach Taken:

Load Initial Page

I.    A Visual appears Center Displays a Pile of "Cards" with message click here to begin play 2 Player Slots on either side are Empty.
II.   Create a Deck of 52 Cards - Each card with its own unique number and color combination.
III.  Sort the sequential Deck to create a random order.
IV.   Split the deck giving each player every other card.
V.    Pressing Start Causes a visual of the Cards being split into two piles.
VI.   Clicking on a Pile will Begin play - compare each card:

      a. Higher card:

         1. Player Wins Opponents card.
         2. If there are holding piles they are added to Players Hand (see below Tie)
         3. Player Wins is Displayed in the Winning Color and The Amount of Cards for each player is Updated and Displayed.

      b. Tie:

         1. Players Card and the next three cards are placed in a holding pile.

VII.  Clicking will cause play to continue until one player has no more cards.
VIII. Winning Player Wins is display and Player Slots are emptied all Cards Return to the Deal Pile with a Message to Click to Start.     

As a User I should be able to Click on the Middle Pile of Cards and Have the Cards Split.
As a User I should be able to Click on my pile of Cards and have the next card display.
As a User if I win a round it should be acknowledged.
As a User if my card ties it should let me know a war is about to happen.
As a User if I win the game it should be acknowledged.
As a User I would expect the game to reset when the game is over.   

PLANNING:

Card Game of War

Build an application to play the card game war.

Specifications:

Initial Page will be Loaded:
Score counter will be set at 26 for each player.
Two Cards will appear "face down" on the screen one marked Computer the other Opponent
Begin Game:
Opponent will click on their own deck and a card will be revealed for opponent and computer.
If one card is greater in value than the other:
Display "Computer/Opponent wins card"
The winners counter will go up by one the losers will go down by one.
If the cards have the same value;
  Play continues.
When one players counter reaches zero or less the other player is declared winner.
