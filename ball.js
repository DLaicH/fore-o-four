import { cEl } from './util';

export class Ball {
	constructor(parent) {
		this.el = cEl('div', {
			id: 'ball',
			class: 'ball'
		});
	}
}