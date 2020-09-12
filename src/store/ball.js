import { writable, derived, get } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { quadOut, quadIn } from 'svelte/easing';

export const ballX = writable(0);
export const ballY = writable(0);
export const ballZ = writable(0);

export const ballIsMoving = writable(false);

export function doHit({direction}) {
    const duration = 2000;
    const height = 12;
    const distance = 48;

    const initX = get(ballX);
    const initY = get(ballY);
    const initZ = get(ballZ);

    const lateral = tweened(0, {
        duration
    });

    const rise = tweened(0, {
        duration: duration / 2,
        easing: quadOut
    });

    const fall = tweened(0, {
        duration: duration / 2,
        easing: quadIn
    });

    const directVect = [Math.cos(direction), Math.sin(direction)];

    const arc = derived(
        [lateral, rise, fall],
        ([$lateral, $rise, $fall]) => ([$lateral * directVect[0], $lateral * directVect[1], $rise - $fall])
    );

    const unsub = arc.subscribe(([arcX, arcY, arcZ]) => {
        // console.log({arcX, arcY, arcZ});
        ballX.set(initX - arcX);
        ballY.set(initY + arcY);
        ballZ.set(initZ + arcZ);
    });

    ballIsMoving.set(true);

    const lateralHit = lateral.set(distance);
    const riseFallHit = doHitRiseFall(rise, fall, height);

    return Promise.all([lateralHit, riseFallHit])
        .then(() => ballIsMoving.set(false))
        .then(unsub);
}

async function doHitRiseFall(rise, fall, height) {
    await rise.set(height);
    await fall.set(height);
    return;
}
