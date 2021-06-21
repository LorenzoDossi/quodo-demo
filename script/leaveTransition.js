import gsap from 'gsap'

function leaveTransition({ current, next, trigger }) {
	const parser = new DOMParser()
	const nextDocument = parser.parseFromString(next.html, 'text/html')

	const nextBody = nextDocument.querySelector('body')
	const btn = trigger
	const btnText = btn.firstChild
	const allButtons = document.querySelectorAll(".Button")
	let btnData = trigger.getBoundingClientRect()
	const box = document.createElement('div')

	// Create text wrapper (div and not a span for transform to be applied)
	const textWrapper = document.createElement('div')
	textWrapper.appendChild(document.createTextNode(btnText.textContent))
	btn.replaceChild(textWrapper, btnText)
	console.log('ok');

	// Set box properties
	current.container.appendChild(box)
	gsap.set(box, {
		autoRound: false,
		position: 'fixed',
		width: btnData.width,
		height: btnData.height,
		top: btnData.top,
		left: btnData.left,
		background: window.getComputedStyle(btn).backgroundColor,
		borderRadius: window.getComputedStyle(btn).borderRadius,
	})

	const tl = gsap.timeline()

	tl.to(textWrapper, {
		y: -btnData.height,
		duration: 0.5,
		ease: 'power2.in'
	}, 0)

	tl.to(box, {
			width: window.innerWidth,
			height: window.innerHeight,
			borderRadius: 0,
			top: 0,
			left: 0,
			duration: 1,
			ease: 'power2.inOut'
		}, 0.5)

	tl.to(btn, {
		opacity: 0
	}, 0.5)

	tl.to(allButtons, {
		zIndex: 0
	}, 0.5)

	function findCommonClasses(elementOne, ElementTwo) {
		return elementOne.some(item => ElementTwo.includes(item))
	}

	const btnClasses = Array.from(btn.classList)
	const nextBodyClasses = Array.from(nextBody.classList)

	if(!findCommonClasses(btnClasses, nextBodyClasses)) {
		// Colore diverso
		const cover = document.createElement('div')
		current.container.appendChild(cover)

		gsap.set(cover, {
			transformOrigin: 'center bottom',
			position: 'fixed',
			background: '#1e6847',
			width: window.innerWidth,
		})

		tl.fromTo(cover, {
			bottom: 0,
			left: 0,
			scaleY: 0
		}, {
			height: window.innerHeight,
			bottom: 0,
			left: 0,
			scaleY: 1,
			duration: 1.5,
			ease: 'power3.inOut'
		}, 1.5)
	}

	return tl
}

export default leaveTransition;
