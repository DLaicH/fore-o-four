export const map = fn => coll => coll.map(fn),

flow = fns => t => fns.reduce((p, fn) => fn(p), t),

gEl = document.getElementById,

cEl = (tag, attrs, content) => {
	return flow([
		sAttrs(attrs),
		sContent(content)
	])
	(document.createElement(tag));
},

sAttrs = attrs => el => {
	for (const attr in attrs) {
		const val = attrs[attr];
		
		if (attr == 'style' && typeof val == 'object') sStyle(val)(el);
		else el.setAttribute(attr, val);
	}
	
	return el;
},

sStyles = styles => el => {
	if (typeof styles == 'string') el.setAttribute('style', styles);
	else {
		for (const style in styles) {
			const val = styles[style];
			el.style[style] = val;
		}
	}
	return el;
},

sContent = content => el => {
	el.innerHTML = typeof content == 'string' ? content : '';
	if (typeof content == 'object') {
		if (!Array.isArray(content)) {
			content = [content];
		}
		
		for (child of content) {
			el.appendChild(child);
		}
	}
	
	return el;
};

export class Component {
	constructor() {
		this.el = cEl('div', {
			id: 'ball',
			class: 'ball'
		});
	}
};