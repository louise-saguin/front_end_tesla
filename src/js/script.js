const screenPulse = document.getElementsByClassName('screen_pulse')
const tempScreenExplanations = document.getElementsByClassName('explanation__screen')
const screen = document.getElementsByClassName('screen__img')
const personaliseTesla = document.getElementsByClassName('personaliseTesla')
const popup = document.getElementsByClassName('personalize__popup')
const carColor = document.getElementsByClassName('currentCar__color')
const colorsBtn = document.getElementsByClassName('color')
const closePopup = document.getElementsByClassName('closePopup')
const colors = {
  black: 'black-noir-uni',
  grey: 'mdinight-silver-gris-nuit',
  black_metal: 'obsidian-black-noir-obsidien',
  blue: 'deep-blue-bleu-outremer',
  silver: 'silver-argent',
  white: 'white-blanc-uni',
  red: 'red-multi-coat-rouge'
}
const explainationTexts = {
  navigation: 'navigation',
  map: 'map',
  control: 'control',
  energie: 'energie',
}

let winWidth = window.innerWidth
let bool = true
let currentExplanation = ''
let screenExplanations = []
winWidth = window.innerWidth
//Initialisation screenExplanation

for (let i = 0; i < tempScreenExplanations.length; i++) {
  screenExplanations[tempScreenExplanations[i].classList[1]] = tempScreenExplanations[i]
}

window.addEventListener('resize', function () {
  winWidth = window.innerWidth
})

console.log(screenExplanations)

// Personalise Tesla

function displayPicture (id, currentElement) {
  const currentActive = document.querySelector('.inner-color.active')
  if (currentActive !== 'null') {
    currentActive.classList.remove('active')
  }
  carColor[0].innerHTML = pictureModel(colors[id])
  const buttonColor = currentElement.children
  buttonColor[0].classList.add('active')
}

function pictureModel (imageSrc) {
  return '<img src="src/img/' + imageSrc + '-300.png" alt="Tesl Model S - ' + imageSrc + '"' +
          'srcset="src/img/' + imageSrc + '-450.png 450w,' +
          'src/img/' + imageSrc + '.png 650w"' +
          'sizes="(min-width: 650px) 650px, (min-width: 450px) 450px, 300px">'
}

personaliseTesla[0].addEventListener('click', function (e) {
  e.preventDefault()
  popup[0].classList.toggle('hide')
  if (bool) {
    for (let i = 0; i < colorsBtn.length; i++) {
      colorsBtn[i].addEventListener('click', function () {
        displayPicture(this.classList[1], this)
      })
    }

    bool = false
  }
})

closePopup[0].addEventListener('click', function (e) {
  e.preventDefault()
  popup[0].classList.toggle('hide')
})

// Tactile Screen !

screenPulse[0].addEventListener('click', function () {
  screen[0].innerHTML = changeScreen('navigation')
  this.classList.remove('active')
  this.classList.add('hide')

  for (let i = 1; i < screenPulse.length; i++) {
    screenPulse[i].classList.add('active')
    screenPulse[i].classList.remove('hide')
    screenPulse[i].addEventListener('click', function () {
      if (winWidth > 450) {
        displayBox(this.classList[1])
        if (this.classList[1] === 'map') {
          screen[0].innerHTML = changeScreen('map')
        } else if (this.classList[1] === 'navigation') {
          screen[0].innerHTML = changeScreen('navigation')
        }
      } else { 
        if (screenExplanations['mobile'].classList.contains('active')) {
          if (currentExplanation !== this.classList[1]) {
            screenExplanations['mobile'].children[0].innerHTML = explainationTexts[this.classList[1]]
            currentExplanation = this.classList[1]
          } else {
            screenExplanations['mobile'].classList.remove('active')
          }
        } else {
          screenExplanations['mobile'].classList.add('active')
          screenExplanations['mobile'].children[0].innerHTML = explainationTexts[this.classList[1]]
          currentExplanation = this.classList[1]
        }
      }
    })
  }
})

function displayBox (current) {
  screenExplanations[current].classList.toggle('active')
}

function changeScreen (next) {
  return '<img src="src/img/' + next + '_250.png" alt="Ecran tactile - ' + next + '"' +
          'srcset="src/img/' + next + '_350.png 465w,' +
          'src/img/' + next + '_450.png 650w"' +
          'sizes="(min-width: 650px) 450px, (min-width: 450px) 350px, 250px">'
}
