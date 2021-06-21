function updatePage({ current, next, trigger }) {
	const parser = new DOMParser()
	const nextDocument = parser.parseFromString(next.html, 'text/html')

	// Update header
	const currentHeaderLogo = document.querySelector('.Header-logo')
	const nextHeaderLogo = nextDocument.querySelector('.Header-logo')

	if (nextHeaderLogo !== null) {
		document.querySelector('.Header').replaceChild(nextHeaderLogo, currentHeaderLogo)
	}

	const currentHeaderLink = Array.from(document.querySelectorAll('.Header-navItem a'))
	const nextHeaderLink = Array.from(nextDocument.querySelectorAll('.Header-navItem a'))

	nextHeaderLink.map((link, i) => {
		currentHeaderLink[i].classList.remove("is-active")
		if (link.href === next.url.href) {
			link.classList.add("is-active")
			currentHeaderLink[i].parentElement.replaceChild(link, currentHeaderLink[i])
		}
	})

	// Update body background class
	const currentBody = document.querySelector('body')
	const nextBody = nextDocument.querySelector('body')

	currentBody.classList.forEach((className, i) => {
		if (className.includes('background')) {
			currentBody.classList.remove(className)
		}
	})

	nextBody.classList.forEach((className, i) => {
		if (className.includes('background')) {
			currentBody.classList.add(className)
		}
	})
}

export default updatePage
