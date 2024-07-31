const rate = 6.9
const multiplier = 1
const updateRate = 0.04
const fixedRounder = 5

let elCounter
let counterInterval

function countUp() {
	const fractionToAdd = rate * multiplier / (3600 / updateRate)
	const currentValue = parseFloat(elCounter.dataset.actualCount)
	
	elCounter.dataset.actualCount = currentValue + fractionToAdd
	elCounter.innerHTML = String((currentValue + fractionToAdd).toFixed(fixedRounder)).split('.').map((e, i) => i == 0 ? e : `<span class="s">${e}</span>`).join('')
}

function getBusinessDatesCount(endDate) {
	let count = 0
	const startDate = new Date(new Date(endDate).setDate(1))

	while (startDate <= endDate) {
		const dayOfWeek = startDate.getDay()

		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			count++
		}
		
		startDate.setDate(startDate.getDate() + 1)
	}
	
	return count
}

function initCounter() {
	const date = new Date()
	const days = getBusinessDatesCount(date) * 8
	const initialHours = date.getHours()
	const currentDay = date.getDay()
	let hours = 0
	let minutes = 0
	let seconds = 0
	let isWorkday = currentDay != 0 && currentDay != 6

	if (isWorkday) {
		if (initialHours <= 18) {
			hours = initialHours - 9
			minutes = date.getMinutes() / 60
			seconds = date.getSeconds() / 3600
		} else {
			hours = 8
		}
	}

	elCounter = elCounter || document.querySelector('.counter')
	elCounter.dataset.actualCount = ((days + hours + minutes + seconds) * rate * multiplier).toFixed(fixedRounder)
	elCounter.innerHTML = elCounter.dataset.actualCount.split('.').map((e, i) => i == 0 ? e : `<span class="s">${e}</span>`).join('')

	if (counterInterval) {
		clearInterval(counterInterval)
	}

	if (date.getHours() <= 18) {
		counterInterval = setInterval(countUp, updateRate * 1000)
	}
}

document.addEventListener('DOMContentLoaded', initCounter)