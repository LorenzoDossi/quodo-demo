import gsap from "gsap";

function defaultEnterAnimation({ current, next }) {
	const mask = document.createElement('div')
	document.querySelector('body').appendChild(mask)
	mask.classList.add('mask')

	gsap.set(mask, {
		width: window.innerWidth,
		height: window.innerHeight,
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 10,
		opacity: 0,
		background: window.getComputedStyle(current.container).backgroundColor,
	})

	const tl = gsap.timeline()

	tl.to(mask, {
		opacity: 1
	})

	return tl
}

export default defaultEnterAnimation
