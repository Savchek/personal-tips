
function createCopyButtons() {
	const elEntries = [...document.querySelectorAll('.list-item .list-code')]


	elEntries.forEach(entry => {
		const id = 'id' + Math.random().toString(16).slice(2)
		const elCopyButton = document.createElement('button')
		const elTextarea = document.createElement('textarea')
		
		elTextarea.classList.add(id)
		elTextarea.value = entry.innerText
		elTextarea.innerText = entry.innerText
		elTextarea.classList.add('copy-textarea')
		elCopyButton.classList.add('copy-btn')
		elCopyButton.innerHTML = '&#10063;'
		elCopyButton.dataset.clipboardTarget = '.' + id

		entry.appendChild(elTextarea)
		entry.appendChild(elCopyButton)
	})
}

function initCopyButtons() {
	createCopyButtons()

	try {
		const clipboard = new ClipboardJS('.copy-btn')
		
		clipboard.on('success', function(event) {
			event.trigger.classList.add('success')
			
			copyTimeout = setTimeout(() => {
				event.trigger.classList.remove('success')
			}, 1000);
			event.clearSelection();
		});
		clipboard.on('error', function(event) {
			event.trigger.classList.add('error')
			
			copyTimeout = setTimeout(() => {
				event.trigger.classList.remove('error')
			}, 1000);
		});
	} catch(error) {
		console.log(error)
	}
}

function filterEntries(event) {
	const value = event.target.value.toLowerCase().trim()
	const elEntries = [...document.querySelectorAll('.list-item')]

	if (value) {
		event.target.classList.add('active')
		elEntries.forEach(entry => {
			const entryText = entry.innerText.toLowerCase()

			if (entryText.includes(value)) {
				entry.classList.remove('hidden')
			} else {
				entry.classList.add('hidden')
			}
		})

		return
	}

	elEntries.forEach(entry => entry.classList.remove('hidden'))
	event.target.classList.remove('active')
}

function clearSearchbar() {
	let elSearchbar = document.querySelector('#listSearch')

	elSearchbar.value = ''
	elSearchbar.focus()
}

function initClearBtn() {
	let elClearBtn = document.querySelector('.clear-list-search')

	elClearBtn.addEventListener('click', clearSearchbar)
}

function initSearchbar() {
	let elSearchbar = document.querySelector('#listSearch')

	elSearchbar.addEventListener('input', filterEntries)
	elSearchbar.addEventListener('focus', filterEntries)

	setTimeout(() => elSearchbar.focus(), 500)
}

function toggleCodeOpen(event) {
	const elCode = event.currentTarget.parentNode.querySelector('.list-code pre')
	const isOpened = elCode.style.height == elCode.dataset.height

	if (isOpened) {
		elCode.style.height = '200px'
		elCode.classList.remove('opened')
	} else {
		elCode.style.height = elCode.dataset.height
		elCode.classList.add('opened')
	}

}

function initCodebox() {
	const elEntries = [...document.querySelectorAll('.list-item .list-code pre')]

	elEntries.forEach(entry => {
		if (entry.clientHeight > 150) {
			const elTiggleOpenBtn = document.createElement('button')

			entry.dataset.height = entry.clientHeight + 'px'
			entry.style.height = '200px'
			entry.classList.add('cut')
			
			elTiggleOpenBtn.classList.add('toggle-cut-btn')
			elTiggleOpenBtn.innerHTML = '&#10093;'
			elTiggleOpenBtn.addEventListener('click', toggleCodeOpen)
			entry.parentNode.appendChild(elTiggleOpenBtn)

		}
	})
}

function initList() {
	initCopyButtons()
	initClearBtn()
	initSearchbar()
	initCodebox()
}

document.addEventListener('DOMContentLoaded', initList);