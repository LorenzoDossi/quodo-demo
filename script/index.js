import barba from '@barba/core'
import gsap from 'gsap'

import updatePage from './updatePage'
import leaveTransition from './leaveTransition'
import enterTransition from './enterTransition'

const body = document.querySelector('body')

barba.init({
	preventRunning: true,
	transitions: [{
		name: 'button-transition',
		from: {
			custom: ({ trigger, next }) => {
				return trigger.classList && trigger.classList.contains('button-transition')
			}
		},
		before(data) {
			body.classList.add("header-translate-y")
		},
		enter({ current, next, trigger }) {
			return leaveTransition({ current, next, trigger})
		},
		after({ current, next, trigger }) {
			updatePage({ current, next, trigger })

			body.classList.remove("header-translate-y")

			return gsap.from(next.container, {
				opacity: 0
			})
		},
	}, {
		name: 'base-transition',
		before(data) {
			body.classList.add("header-translate-y")
		},
		leave({ current, next, trigger }) {
			return gsap.to(current.container, {
				opacity: 0
			})
		},
		after({ current, next, trigger }) {
			updatePage({ current, next, trigger })

			body.classList.remove("header-translate-y")

			return gsap.from(next.container, {
				opacity: 0
			})
		},
	}]
});
