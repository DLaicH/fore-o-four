import { Component } from './util.js';

export class Ball extends Component {
	constructor() {
		super('ball');
	}
	
	hit() {
		this.el.animate([
			{transform: 'translate3d(0, 0, 0)'},
			{transform: 'translate3d(0, -24rem, 0)'}
		], {
			duration: 2000,
			composite: 'accumulate'
		})
		.onfinish = () => {
			this.el.style.transform = 'translate3d(0, -24rem, 0)';
		};
		
		this.el.animate([
			{transform: 'translateZ(0)', easing: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)'},
			{transform: 'translateZ(4rem)', easing: 'cubic-bezier(0.42, 0.0, 1.0, 1.0)'},
			{transform: 'translateZ(0)'}
		], {
			duration: 2000,
			composite: 'accumulate'
		});
	}
}