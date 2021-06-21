import gsap from "gsap";

function defaultLeaveAnimation({ current, next, trigger }) {
	const mask = document.querySelector('.mask')

	const slide = document.getElementById('slide')
	const tl = gsap.timeline()

	const currentClassList = Array.from(current.container.classList)
	const NextClassList = Array.from(next.container.classList)
	let currentBgClass
	let nextBgClass
	let triggerBgClass

	currentClassList.forEach(classItem => {
		if (classItem.includes('background')) {
			currentBgClass = classItem
		}
	})

	NextClassList.forEach(classItem => {
		if (classItem.includes('background')) {
			nextBgClass = classItem
		}
	})

	if (trigger.classList) {
		trigger.classList.forEach(classItem => {
			if (classItem.includes('background')) {
				triggerBgClass = classItem
			}
		})
	}


	gsap.set(slide, {
		width: window.innerWidth,
		height: window.innerHeight,
		scaleY: 0,
		opacity: 1,
		position: 'fixed',
		transformOrigin: 'center bottom',
		bottom: 0,
		left: 0,
		zIndex: 1000,
		pointerEvents: 'none'
	})

	if (trigger.classList && trigger.classList.contains('button-transition')) {
		if (triggerBgClass === nextBgClass) {
			tl.to(mask, {
				opacity: 0,
				duration: 1
			})
			tl.add(function(){ mask.parentNode.removeChild(mask) })
			tl.add(function(){ document.querySelector('body').classList.remove("is-transitioning") }, "-=1")
		} else {
			gsap.set(slide, {
				background: window.getComputedStyle(next.container).backgroundColor,
			})

			tl.to(slide, {
				scaleY: 1,
				duration: 0.7
			})

			tl.add(function(){ mask.parentNode.removeChild(mask) })

			tl.to(slide, {
				opacity: 0,
				duration: 1,
				ease: 'power3.inOut'
			})

			tl.add(function(){
				document.querySelector('body').classList.remove("is-transitioning")
			}, "-=1")
		}

	}	else if (currentBgClass === nextBgClass) {
		tl.to(mask, {
			opacity: 0,
			duration: 1
		})
		tl.add(function(){ mask.parentNode.removeChild(mask) })
		tl.add(function(){ document.querySelector('body').classList.remove("is-transitioning") }, "-=1")
	} else {

		gsap.set(slide, {
			background: window.getComputedStyle(next.container).backgroundColor,
		})

		tl.to(slide, {
			scaleY: 1,
			duration: 1,
			ease: 'power3.inOut'
		})

		tl.add(function(){ mask.parentNode.removeChild(mask) })

		tl.to(slide, {
			opacity: 0,
			duration: 1
		})

		tl.add(function(){
			document.querySelector('body').classList.remove("is-transitioning")
		}, "-=1")
	}

	return tl
}

export default defaultLeaveAnimation



// if (trigger.classList && trigger.classList.contains('button-transition')) {
// 	gsap.set(slide, {
// 		width: window.innerWidth,
// 		height: window.innerHeight,
// 		background: window.getComputedStyle(trigger).backgroundColor,
// 		scaleY: 0,
// 		opacity: 1,
// 		position: 'fixed',
// 		transformOrigin: 'center bottom',
// 		bottom: 0,
// 		left: 0,
// 		zIndex: 1000,
// 		pointerEvents: 'none'
// 	})

// 	tl.to(slide, {
// 		scaleY: 1,
// 		duration: 0.7
// 	})

// 	tl.to(slide, {
// 		opacity: 0
// 	}, 1.4)

// } else
