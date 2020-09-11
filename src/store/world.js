// import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { cubicInOut } from 'svelte/easing';

import { ballX, ballY, ballZ } from './ball';

export const tilt = tweened(0, {
    duration: 400
});

export const rotation = tweened(0, {
    duration: 50
});


export const worldX = tweened(0, {
    duration: 400,
    easing: cubicInOut
});
ballX.subscribe(x => worldX.set(-x));

export const worldY = tweened(0, {
    duration: 400,
    easing: cubicInOut
});
ballY.subscribe(y => worldY.set(-y));

export const worldZ = tweened(0, {
    duration: 400,
    easing: cubicInOut
});
