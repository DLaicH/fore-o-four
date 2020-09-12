import { writable, derived, get } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { quadOut, quadIn } from 'svelte/easing';

export const ballX = writable(0);
export const ballY = writable(0);
export const ballZ = writable(0);

const GRAVITY = 40;

export const ballIsMoving = writable(false);

export async function doHit({power, direction, angle}) {
    console.log('bounce');
    const duration = 2000 * power * Math.sin(angle) / GRAVITY;
    const height = Math.pow(power, 2) * Math.pow(Math.sin(angle), 2) / ( GRAVITY * 2 );
    const distance = Math.pow(power, 2) * Math.sin(angle * 2) / GRAVITY;

    if (distance < 0.5) {
        ballIsMoving.set(false);
        return;
    } else {
        ballIsMoving.set(true);
    }

    console.log({duration, height, distance});

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

    const lateralHit = lateral.set(distance);
    const riseFallHit = doHitRiseFall(rise, fall, height);

    await Promise.all([lateralHit, riseFallHit]);
    unsub();

    let bouncePower = power * 0.5;
    let bounceAngle = angle * 0.8;

    return await doHit({direction, power: bouncePower, angle: bounceAngle});
}

async function doHitRiseFall(rise, fall, height) {
    await rise.set(height);
    await fall.set(height);
    return;
}
