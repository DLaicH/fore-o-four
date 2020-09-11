// import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';

export const tilt = tweened(0, {
    duration: 400
});

export const rotation = tweened(0, {
    duration: 50
});