const startButton = document.querySelector('.input-block__button')
const inputsArray = document.querySelectorAll('.input-block__field input')
const inputRoundTime = document.querySelector('.round-time input')
const inputRestTime = document.querySelector('.rest-time input')
const inputRoundNum = document.querySelector('.round-number input')
const inputPrepTime = document.querySelector('.prep-time input')
const inputSetNum = document.querySelector('.set-number input')
const timerRound = document.querySelector('.timer-block__round')
const timerSets = document.querySelector('.timer-block__set')
const timerTime = document.querySelector('.timer-block__time-timer')
const timerBlock = document.querySelector('.timer-block')
const inputBlock = document.querySelector('.input-block')
const containerBlock = document.querySelector('.container')
const errorMessage = document.querySelector('.form__error')
const formInputs = document.querySelectorAll('.input-block__field')

startButton.addEventListener('click', startHandler)

let roundTime = restTime = roundNum = currentRoundTime = currentRestTime = setsNum = preparationTime = currentPreparationTime = 0,  
currentRound = currentSet = 1,
roundInterval, 
restInterval, 
preparationInterval

const green = `rgba(20, 229, 31, 0.6)`, 
red = `rgba(236, 12, 27, 0.7)`, 
yellow = `rgba(236, 236, 13, 0.6)`

function startHandler(e) {
   e.preventDefault()
   let validation = false
   formInputs.forEach(input => {
      if(input.value === undefined) {
         validation = true
      }
   })
   if(validation){
      errorMessage.style.display = 'flex'
      setTimeout(() => errorMessage.style.display = 'none', 3000)
      return
   }
   console.log(inputsArray);
   roundTime = +inputRoundTime.value
   restTime = +inputRestTime.value
   roundNum = +inputRoundNum.value
   preparationTime = +inputPrepTime.value
   setsNum = +inputSetNum.value
   timerSets.textContent = `Set: ${currentSet}/${setsNum}`
   timerRound.textContent = `Round: ${currentRound}/${roundNum}`
   timerBlock.style.display = `flex`
   inputBlock.style.display = `none`
   startPreparation()
}

function startPreparation() {
   containerBlock.style.backgroundColor = yellow
   currentPreparationTime = preparationTime
   timerTime.textContent = `${currentPreparationTime}`
   preparationInterval = setInterval(refreshPreparaionTimer,  1000)
}

function refreshPreparaionTimer() {
   currentPreparationTime--; 
   timerTime.textContent = `${currentPreparationTime}`
   if (currentPreparationTime === -1) {
      clearInterval(preparationInterval)
      startRound()
   }
   console.log(currentPreparationTime);
}

function startRound() {
   currentRoundTime = roundTime
   timerTime.textContent = `${currentRoundTime}`
   containerBlock.style.backgroundColor = green
   roundInterval = setInterval(refreshRoundTimer, 1000)
}

function refreshRoundTimer() {
   currentRoundTime--; 
   timerTime.textContent = `${currentRoundTime}`
   if (currentRoundTime === -1) {
      clearInterval(roundInterval)
      if (roundNum === currentRound && setsNum > currentSet) {
         currentSet++
         currentRound = 1
         timerSets.textContent = `Set: ${currentSet}/${setsNum}`
         return startPreparation()
      } else if (roundNum === currentRound) {
         return endTimer()
      }
      return startRest()
   }
   console.log(currentRoundTime);
}

function refreshRestTimer() {
   currentRestTime--;
   timerTime.textContent = `${currentRestTime}`
   if (currentRestTime === -1) {
      clearInterval(restInterval)
      currentRound++
      timerRound.textContent = `Round: ${currentRound}/${roundNum}`
      startRound()
   }
   console.log(currentRestTime);
}

function startRest() {
   currentRestTime = restTime
   timerTime.textContent = `${currentRestTime}`
   containerBlock.style.backgroundColor = red
   restInterval = setInterval(refreshRestTimer, 1000)
}

function endTimer() {
   timerBlock.style.display = 'none'
   inputBlock.style.display = 'block'
   containerBlock.style.backgroundColor = `rgba(0, 0, 0, 0.6)`
}