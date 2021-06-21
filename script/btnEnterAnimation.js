import gsap from "gsap";

function btnEnterAnimation({ current, trigger }) {
	const btn = trigger
	let btnData = trigger.getBoundingClientRect()
	const btnText = btn.firstChild
	const allButtons = document.querySelectorAll(".Button")
	const mask = document.createElement('div')
	document.querySelector('body').appendChild(mask)
	mask.classList.add('mask')

	const textWrapper = document.createElement('div')
	textWrapper.appendChild(document.createTextNode(btnText.textContent))
	btn.replaceChild(textWrapper, btnText)

	gsap.set(mask, {
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

	tl.to(mask, {
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

	return tl
}

export default btnEnterAnimation
