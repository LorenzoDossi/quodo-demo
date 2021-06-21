import barba from '@barba/core'
import gsap from 'gsap'

import updatePage from './updatePage'
import btnEnterAnimation from './btnEnterAnimation'
import defaultEnterAnimation from './defaultEnterAnimation'
import defaultLeaveAnimation from './defaultLeaveAnimation'
import leaveTransition from './leaveTransition'
import enterTransition from './enterTransition'

const body = document.querySelector('body')

barba.init({
	preventRunning: true,
	transitions: [{
		leave(data) {
			if (data.trigger.classList.contains('button-transition')) {
				return btnEnterAnimation(data)
			} else {
				return defaultEnterAnimation(data)
			}
		},
		after(data) {
			updatePage(data)

			return defaultLeaveAnimation(data)
		},
	}]
});

// from: {
// 	custom: ({ trigger, next }) => {
// 		return trigger.classList && trigger.classList.contains('button-transition')
// 	}
// }

barba.hooks.before((data) => {
	body.classList.add("is-transitioning")
})
