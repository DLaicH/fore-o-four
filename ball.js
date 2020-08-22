import { Component } from './util.js';

export class Ball extends Component {
	constructor() {
		super('ball');
	}
	
	hit() {
		this.el.animate([
			{transform: 'translate3d(0, 0, 0)', easing: 'ease-in-out'},
			{transform: 'translate3d(0, -12rem, 4rem)', easing: 'ease-in-out'},
			{transform: 'translate3d(0, -24rem, 0)', easing: 'ease-in-out'}
		], 2000);
	}
}