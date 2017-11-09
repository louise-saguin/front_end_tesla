const carColor = document.querySelector('.current-car-color')
const colorsBtn = document.querySelectorAll('.color')
const colors = {
  black: 'src/img/black-noir-uni.png',
  grey: 'src/img/mdinight-silver-gris-nuit.png',
  black_metal: 'src/img/obsidian-black-noir-obsidien.png',
  blue: 'src/img/deep-blue-bleu-outremer.png',
  silver: 'src/img/silver-argent.png',
  white: 'src/img/white-blanc-uni.png',
  red: 'src/img/red-multi-coat-rouge.png'
}

function displayPicture (id, currentElement) {
  const currentActive = document.querySelector('.inner-color.active')
  if (currentActive !== 'null') {
    currentActive.classList.remove('active')
  }
  carColor.setAttribute('src', colors[id])
  const buttonColor = currentElement.children
  buttonColor[0].classList.add('active')
}

for (let color of colorsBtn) {
  color.addEventListener('click', function () {
    displayPicture(this.classList[1], this)
  })
}
