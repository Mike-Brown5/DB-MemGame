const cards = document.querySelectorAll('.card');

let flipped = false;
let keepOpen = false;
let card_1, card_2;

function flipCard() {
  if (keepOpen) return;
  if (this === card_1) return;

  this.classList.add('flip');

  if (!flipped) {
    
    flipped = true;
    card_1 = this;

    return;
  }

  card_2 = this;

  checkMatch();
}

function checkMatch() {
  let match = card_1.dataset.saiyan === card_2.dataset.saiyan;

  if(match){
    disableClick()
  }else{  
   keepFlipped();
}}

function disableClick() {
  card_1.removeEventListener('click', flipCard);
  card_2.removeEventListener('click', flipCard);

  resetBoard();
}

function keepFlipped() {
  keepOpen = true;

  setTimeout(() => {
    card_1.classList.remove('flip');
    card_2.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flipped, keepOpen] = [false, false];
  [card_1, card_2] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randoms = Math.floor(Math.random() * 12);
    card.style.order = randoms;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
