/*
the premise of the game is to have a grid of 24 face-down cards. the cards faces consist
of pairs of matches. clicking on cards will flip them over revealing the value. when two cards
of the same value are selected they will disappear
*/

/**
before writing any actual code we need an idea of the actual steps to go from nothing to 
finished product. break it up into small tasks

display 12 cards
duplicate the cards and have 2 sets of 12
randomize the display of cards
add selected style for selected cards
only allow two cards to be selected at a time
determine if two selected cards are a match and hide them
reset guess count after 2
add delay to selections
show back of card initially and flip on select

 */

// card data

const cardsArray = [
    {
        name:'book',
        img: 'img/open-book.png',
    },
    {
        name:'hand',
        img: 'img/hand.png',
    },
    {
        name:'envelope',
        img: 'img/envelope.png',
    },
    {
        name:'money',
        img: 'img/money.png',
    },
    {
        name:'placeholder',
        img: 'img/placeholder.png',
    },
    {
        name:'clock',
        img: 'img/clock.png',
    },
    {
        name:'share',
        img: 'img/share.png',
    },
    {
        name:'camera',
        img: 'img/photo-camera.png',
    },
    {
        name:'star',
        img: 'img/star.png',
    },
    {
        name:'bank',
        img: 'img/piggy-bank.png',
    },
    {
        name:'music',
        img: 'img/musical-note.png',
    },
    {
        name:'phone',
        img: 'img/smartphone.png',
    },
];

const game = document.getElementById('game');
const grid = document.createElement('section');
let gameGrid = cardsArray.concat(cardsArray);
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const match = () => {

        var selected = document.querySelectorAll('.selected')
        
        selected.forEach(card => {
            card.classList.add('match')

    })
};

const resetGuesses = () => {
    firstGuess = ''
    secondGuess = ''
    count = 0
  
        var selected = document.querySelectorAll('.selected')

        selected.forEach(card => {
            card.classList.remove('selected')

    })
};

grid.setAttribute('class', 'grid');

game.appendChild(grid);

gameGrid.forEach(item => {

    // Create card element with the name dataset
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = item.name

    // Create front of card
    const front = document.createElement('div')
    front.classList.add('front')

    // Create back of card, which contains
    const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${item.img})`

    // Append card to grid, and front and back to each card
    grid.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)

});

grid.addEventListener('click', function(event) {
    // The event target is our clicked item
    let clicked = event.target

    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget) {
        return
      } else if (count < 2) {
        count++
        if (count === 1) {
            // Assign first guess
            firstGuess = clicked.parentNode.dataset.name
            console.log(firstGuess)
            clicked.parentNode.classList.add('selected')
        } else {
            // Assign second guess
            secondGuess = clicked.parentNode.dataset.name
            console.log(secondGuess)
            clicked.parentNode.classList.add('selected')
        }
        // If both guesses are not empty...
        if (firstGuess !== '' && secondGuess !== '') {
          // and the first guess matches the second match...
          if (firstGuess === secondGuess) {
            setTimeout(match, delay)
            setTimeout(resetGuesses, delay)
          } else {
            setTimeout(resetGuesses, delay)
          }
        }
        // Set previous target to clicked
        previousTarget = clicked;
      }
  });

