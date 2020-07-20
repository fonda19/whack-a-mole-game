const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole; 
let timeUp = false;
let score = 0;

    //function to give random amount of time between the minimum and max time.
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
  //pick a random hole for the mole to pop up from. Will give a list of holes (get random DOM element)
  //
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole) {
        console.log(`that's the same one`);
        return randomHole(holes);
    }
      
    lastHole = hole; //this will save the reference of the last hole that popped up, to avoid repeating the same hole.
    return hole;
  }

  // to make the moles hop up
  function peep() {
      const time = randomTime(500, 2000);
      const hole = randomHole(holes);
      hole.classList.add('up');
      setTimeout(() => {
          hole.classList.remove('up');
          if(!timeUp) peep();
      }, time);
  }

  function startGame() {
      scoreBoard.textContent = 0;
      timeUp = false;
      score = 0;
      peep();
      setTimeout(() => timeUp = true, 10000)
  }

function bonk(e) {
    if(!e.isTrusted) return; //cheater
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));