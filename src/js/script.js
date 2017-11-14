const carColor = document.querySelector('.current-car-color')
const colorsBtn = document.querySelectorAll('.color')
const colors = {
  black: 'src/img/black-noir-uni',
  grey: 'src/img/mdinight-silver-gris-nuit',
  black_metal: 'src/img/obsidian-black-noir-obsidien',
  blue: 'src/img/deep-blue-bleu-outremer',
  silver: 'src/img/silver-argent',
  white: 'src/img/white-blanc-uni',
  red: 'src/img/red-multi-coat-rouge'
}
console.log(carColor)

function displayPicture (id, currentElement) {
  const currentActive = document.querySelector('.inner-color.active')
  if (currentActive !== 'null') {
    currentActive.classList.remove('active')
  }
  // carColor.setAttribute('src', colors[id])
  carColor.innerHTML = pictureModel(colors[id])
  const buttonColor = currentElement.children
  buttonColor[0].classList.add('active')
}

for (let color of colorsBtn) {
  color.addEventListener('click', function () {
    displayPicture(this.classList[1], this)
  })
}

function pictureModel (imageSrc) {
  return '<source media="(min-width: 650px)" srcset="' + imageSrc + '.png">' +
         '<source media="(min-width: 465px)" srcset="' + imageSrc + '-450.png">' +
         '<img src="' + imageSrc + '-300.png" alt="">'
}
