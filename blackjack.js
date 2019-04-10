
/* 
  BlackJack Game
  @Rebecca Deng
  Have Fun! 
*/

// First create array of all card values 
let value = ["Ace", "King","Queen","Jack",
    "10","9","8","7","6","5","4","3","2",];
  
// Now create array of suits 

let suit = ["Hearts","Spades","Diamonds","Clubs"];

// All other variables needed for this game: 

let newgame = document.getElementById("restart-button");
let hit = document.getElementById("hit-button");
let pass = document.getElementById("pass-button");
let firsttext = document.getElementById("intro");
let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let pTotalScore = document.getElementById("playerscore");
let stuff = document.getElementById("stuff");
let dealerdescription = document.getElementById("dealerhand");
let dealercard1 = document.getElementById("dealercard1");
let dealercard2 = document.getElementById("dealercard2");
let dealerscore = document.getElementById("dealerscore");
let dearlerinfo = document.getElementById("dealerinfo");
let playerArray = [];
let dealerArray = [];
var dealerScore = 0; 
var playerScore = 0;
var grab, deck;


//Functions 
function createDeck(){
  deck = [];
  for (let suitIdx = 0; suitIdx < 4; suitIdx++){
    for (let valueIdx = 0; valueIdx < 13; valueIdx++){
      deck.push(value[valueIdx] + " of " + suit[suitIdx]);
    }
  }
  return deck;
} 
// Create hand
function createHand(deck) {
  card = [];
  for (let i = 0; i < 2; i++){ 
    grab = Math.trunc(Math.random()*deck.length);
    card[i] = deck[grab];
    deck.splice(grab, 1);
  }
  let player = {1: card[0], 2: card[1]};
  return player; 
}

function initialScore(a, b){
  for (t = 1; t < 3; t++){
    a = keepScore(a, b[t]);
  }
  return a;
} 

function keepScore(score, grab){ 
  //console.log("KEEPSCOREINIT: " + score + " " + grab);
  if (!isNaN(Number.parseInt(grab))){
      score += Number.parseInt(grab);
    }
    else if (grab.slice(0,3) == "Ace"){
      if (score + 11 <= 21) {
        score += 11;
      } else {
        score += 1;
      }
    }
    else {
      score += 10;
    } 
  //console.log("KEEPSCORERETURN: " + score);
  return score; 
}

function alarm(message){
  setTimeout(function() {
    window.alert(message);
  }, 1000);

}

function details(){
  hit.style.display = "none";
  pass.style.display = "none";
  pTotalScore.innerHTML = "Player Score: " + playerScore;
  dealerscore.style.display = "block";
  dealercard2.style.display = "block"; 
  dealercard2.innerHTML = dealer[2];
  dealerscore.innerHTML = "Dealer Score: " + dealerScore;
  newgame.style.display = "block"; 
}

function newGameDisplayDetails(){
  firsttext.innerHTML = "Your Hand ";
  firsttext.style.width = "130px";
  card1.style.display = "block";
  card2.style.display = "block";
  pTotalScore.style.display = "block";
  dealerdescription.style.display = "block";
  dealercard1.style.display = "block";
  card1.innerHTML = player1[1];
  card2.innerHTML = player1[2];
  dealerdescription.innerHTML = "Dealer Hand "; 
  dealercard1.innerHTML = dealer[1];
  pTotalScore.innerHTML = "Player Score: " +  playerScore;
  hit.style.display = "inline";
  pass.style.display = "inline";
  newgame.style.display = "none";
  dealercard2.style.display = "none";
  dealerscore.style.display = "none";
}

function displayDetails(id, array, grab){
  let para = document.createElement("p");
  let node = document.createTextNode(grab);
  para.appendChild(node);
  array.push (id.appendChild(para)); 
  console.log("array length is: " + array.length);
}

function deleteDisplayDetails(id, array){
  for (let jack = 0; jack <array.length; jack++){ 
    id.removeChild(array[jack]);
  }
  array.length = 0;
}

function grabCard(deck){
  grab = deck[Math.trunc(Math.random()*deck.length)];
  console.log("GRABBY: " + grab);
  deck.splice(grab, 1);
  return grab; 
}

// JavaScript Listeners 

// New Game Mechanism; to be used in the beginning 
newgame.addEventListener('click', function() {
  console.log("Going through newgame");
  deleteDisplayDetails(stuff, playerArray);
  deleteDisplayDetails(dealerinfo, dealerArray);
  playerScore = 0;
  dealerScore = 0;
  deck = createDeck();
  dealer = createHand(deck);
  player1 = createHand(deck);
  dealerScore = initialScore(dealerScore, dealer);
  playerScore = initialScore(playerScore, player1);
  newGameDisplayDetails();
});

// Hit Mechanism for Player 
hit.addEventListener('click', function() {
  console.log("Going through hit");
  grab = grabCard(deck);
  displayDetails(stuff, playerArray, grab);
  playerScore = keepScore(playerScore, grab);
  pTotalScore.innerHTML = "Player Score: " + playerScore;
  if (playerScore > 21){
    details();
    alarm("You Lose! Click 'New Game' to start a new game");
  }
});

// Pass Mechanism--Dealer assumes control 
pass.addEventListener('click', function(){
  console.log("Going through pass");
  for (let i = 0; i < 5; i++){
    if (dealerScore <= 16){
      grab = grabCard(deck);
      displayDetails(dealerinfo, dealerArray, grab);
      dealerScore = keepScore(dealerScore, grab);
    }  
    else {break;}
  }
  if((dealerScore === playerScore) && (dealerScore <= 21)){
    details();
    alarm("It's a tie! Click 'New Game' to start new game");
  }
  else if (dealerScore > 21){
    details();
    alarm("You win! Click 'New Game' to start new game");
  }
   else if (dealerScore < playerScore){
    details();
    alarm("You win! Click 'New Game' to start new game");
  }
  else if ((dealerScore > playerScore) && (dealerScore <= 21)){
    if ((dealer[1].includes("Ace") || dealer[1].includes("Jack")) && (dealer[2].includes("Ace") || dealer[2].includes("Jack"))) {
      details();
      alarm("You Lose! Dealer has BlackJack. Click 'New Game' to start new game")
    }
    details();
    alarm("You Lose! Click 'New Game' to start new game");
  }
});







  



