export const map = fn => coll => coll.map(fn),

flow = fns => t => fns.reduce((p, fn) => fn(p), t);

