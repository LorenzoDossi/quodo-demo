import gsap from 'gsap'

function enterTransition(data) {

	const cover = document.createElement('div')
	data.next.container.appendChild(cover)

	gsap.set(cover, {
		transformOrigin: 'center bottom',
		position: 'absolute',
		background: '#8ebac9',
		width: window.innerWidth,
	})

	const tl = gsap.timeline()

	tl.fromTo(cover, {
		bottom: 0,
		left: 0,
		scaleY: 0
	}, {
		height: window.innerHeight,
		bottom: 0,
		left: 0,
		scaleY: 1,
		duration: 1,
		ease: 'power2.inOut'
	})

	return tl
}

export default enterTransition
