// ON PAGE LOAD
window.addEventListener('load', function () {
document.querySelector('.teslaSVideo').setAttribute('src', 'src/img/tesla_modelS_vid.mp4')
let security1 = document.querySelector('.tesla-security1')
let security2 = document.querySelector('.tesla-security2')

// First Image
security1.setAttribute('src', 'src/img/tesla-security-659.png')
security1.setAttribute('srcset', 'src/img/tesla-security-500.png 500w, src/img/tesla-security-659.png 659w')

// First Image
security2.setAttribute('src', 'src/img/tesla-security2-1094.png')
security2.setAttribute('srcset', 'src/img/tesla-security2-750.png 750w, src/img/tesla-security2-1094.png 1094w')

/*************************************** 

      Function part

***************************************/

/* Menu */

const fixeMenu = document.querySelector('.menu')
const allSection = document.querySelectorAll('section')
const burger = document.querySelector('.menu__burger')
const burgerContent = document.querySelector('.menu__burger__content')
const burgerLink = document.querySelectorAll('.menu__burger__content a')

/* Tactile screen */

const cameras = document.getElementsByClassName('radar__sensors')
const cameraSelect = document.querySelectorAll('.sensors__legend input')
const screenPulse = document.getElementsByClassName('screen_pulse')
const tempScreenExplanations = document.getElementsByClassName('explanation__screen')
const screen = document.getElementsByClassName('screen__img')

/* Personalise */

const personaliseTesla = document.getElementsByClassName('personaliseTesla')
const popup = document.getElementsByClassName('personalize__popup')
const carColor = document.getElementsByClassName('currentCar__color')
const colorsBtn = document.getElementsByClassName('color')
const closePopup = document.getElementsByClassName('closePopup')

/* Menu JSON */

const colors = {
  black: 'black-noir-uni',
  grey: 'mdinight-silver-gris-nuit',
  black_metal: 'obsidian-black-noir-obsidien',
  blue: 'deep-blue-bleu-outremer',
  silver: 'silver-argent',
  white: 'white-blanc-uni',
  red: 'red-multi-coat-rouge'
}

/* Personalise JSON*/

const explainationTexts = {
  navigation: ['Navigation', 'Une navigation intelligente qui s\'adapte aux conditions de circulation en temps réel.'],
  map: ['Carte', 'Accès aux cartes Google Maps™ simples et intuitives qui vous informent en temps réel sur les conditions de circulation.'],
  energie: ['Energie', 'Consommation d’énergie en temps réel et estimation de l\'autonomie restante.'],
  control: ['Contrôles', 'Ajustement de la position de conduite, gestion de la température et de l\'habitacle.']
}

/* Variables */

let bool = true
let currentExplanation = ''
let screenExplanations = []
let timeOutImg = 100
let backgroundMenuColor = 'rgba(20, 20, 20, 1)'
let backgroundMenuNone = 'rgba(20, 20, 20, 0)'

//Functional burger menu
burger.addEventListener('click', function () {
  if (burgerContent.classList.contains('active')) {
    burgerContent.style.transform = 'scaleY(0)'
    burgerContent.classList.remove('active')
  } else {
    burgerContent.style.transform = 'scaleY(1)'
    burgerContent.classList.add('active')
  }
})

  for (let i = 0; i < burgerLink.length; i++) {
    burgerLink[i].addEventListener('click', function (e) {
      burgerContent.style.transform = 'scaleY(0)'
      burgerContent.classList.remove('active')
    })
  }

//Initialisation screenExplanation

for (let i = 0; i < tempScreenExplanations.length; i++) {
  screenExplanations[tempScreenExplanations[i].classList[1]] = tempScreenExplanations[i]
}

// Personalise Tesla

function displayPicture(id, currentElement) {
  const currentActive = document.querySelector('.inner-color.active')
  if (currentActive !== 'null') {
    currentActive.classList.remove('active')
  }
  carColor[0].innerHTML = pictureModel(colors[id])
  const buttonColor = currentElement.children
  buttonColor[0].classList.add('active')
}

function pictureModel(imageSrc) {
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

  personaliseTesla[1].addEventListener('click', function (e) {
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

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    popup[0].classList.add('hide')
  }
})

// Tactile Screen

screenPulse[0].addEventListener('click', function () {
  screen[0].style.opacity = '0'
  setTimeout(function () {
    changeScreen('navigation')
  }, timeOutImg)
  this.classList.remove('active')
  this.classList.add('hide')

  for (let i = 1; i < screenPulse.length; i++) {
    screenPulse[i].classList.add('active')
    screenPulse[i].classList.remove('hide')
    screenPulse[i].addEventListener('click', function () {
      if (window.innerWidth >= 520) {
        displayBox(this.classList[1])
        if (this.classList[1] === 'map') {
          screen[0].style.opacity = '0'
          setTimeout(function () {
            changeScreen('map')
          }, timeOutImg)
        } else if (this.classList[1] === 'navigation') {
          screen[0].style.opacity = '0'
          setTimeout(function () {
            changeScreen('navigation')
          }, timeOutImg)
        }
      } else {
        if (screenExplanations['mobile'].classList.contains('active')) {
          if (currentExplanation !== this.classList[1]) {
            displayBoxMobile(this.classList[1])
          } else {
            screenExplanations['mobile'].classList.remove('active')
          }
        } else {
          screenExplanations['mobile'].classList.add('active')
          displayBoxMobile(this.classList[1])
        }
      }
    })
  }
})

function displayBox(current) {
  screenExplanations[current].classList.toggle('active')
}

function changeScreen(next) {
  let src = '<img src="src/img/' + next + '_250.png" alt="Ecran tactile - ' + next + '"' +
            'srcset="src/img/' + next + '_350.png 465w,' +
            'src/img/' + next + '_450.png 650w"' +
            'sizes="(min-width: 650px) 450px, (min-width: 450px) 350px, 250px">'
  screen[0].style.opacity = '1';
  screen[0].innerHTML = src;
}

function displayBoxMobile(current) {
  screenExplanations['mobile'].children[0].innerHTML = explainationTexts[current][0]
  screenExplanations['mobile'].children[1].innerHTML = explainationTexts[current][1]
  currentExplanation = current
  if (current === 'map') {
    screen[0].innerHTML = changeScreen('map')
  } else if (current === 'navigation') {
    screen[0].innerHTML = changeScreen('navigation')
  }
}

// Cameras sensors

for (let i = 0; i < cameraSelect.length; i++) {
  cameraSelect[i].addEventListener('change', function () {
    if (this.checked) {
      cameras[i].style.display = 'block'
    } else {
      cameras[i].style.display = 'none'
    }
  })
}

// Listen scroll to change background menu

window.addEventListener('scroll', function changeBackground () {
  if (window.innerWidth > 909) {
    if (this.scrollY > allSection[6].offsetTop) {
      fixeMenu.style.background = backgroundMenuNone
    }
    else if (this.scrollY > (allSection[5].offsetTop - allSection[5].scrollHeight / 2)) {
      fixeMenu.style.background = backgroundMenuColor
    }
    else if (this.scrollY > allSection[4].offsetTop) {
      fixeMenu.style.background = backgroundMenuNone
    }
    else if (this.scrollY > allSection[3].offsetTop) {
      fixeMenu.style.background = backgroundMenuColor
    }
    else if (this.scrollY > allSection[2].offsetTop) {
      fixeMenu.style.background = backgroundMenuNone
    }
    else if (this.scrollY > allSection[1].offsetTop) {
      fixeMenu.style.background = backgroundMenuColor
    }
    else if (this.scrollY > allSection[0].offsetTop) {
      fixeMenu.style.background = backgroundMenuNone
    }
    else {
      fixeMenu.style.background = backgroundMenuNone
    }
  } else {
    fixeMenu.style.background = backgroundMenuColor
  }
})

})