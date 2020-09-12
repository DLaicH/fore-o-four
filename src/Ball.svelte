<script>
	import { tweened } from 'svelte/motion';
	import { quadIn, quadOut, cubicOut } from 'svelte/easing';

	import { tilt, rotation } from './store/world';
	import { ballX, ballY, ballZ } from './store/ball';

	// let el;
	// let elZ;
	// export let hit;

	let counterTilt = 0;
	$: counterTilt = 360 - $tilt;
	let counterRotation = 0;
	$: counterRotation = 360 - $rotation;
</script>

<style>
	.ball-z {
		transform-style: preserve-3d;
	}

	.ball-plane {
		position: absolute;
		/* top: 66vh;
		left: 50vw; */
		top: -0.5rem;
		left: -0.5rem;
		
		transform: translate3d(0, 0, 0);
		perspective: 50rem;
		transform-style: preserve-3d;
	}

	.ball-shadow {
		width: 1rem;
		height: 1rem;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 0.5rem;
		position: absolute;
	}

	.ball {
		width: 1rem;
		height: 1rem;
		background-color: #fff;
		border-radius: 0.5rem;
		position: absolute;
		/* transform: translate3d(0, 0, 0.5rem) rotate3d(1, 0, 0, 0); */
		perspective: 50rem;
	}
</style>

<div class="ball-plane" style="transform: translate3d({$ballX}rem, {$ballY}rem, 0)">
	<div class="ball-z" style="transform: translateZ({$ballZ}rem)">
		<div
			class="ball"
			style="transform: translate3d(0, 0, 0.5rem) rotateZ({counterRotation}deg) rotate3d(1, 0, 0, {counterTilt}deg)"
		></div>
	</div>

	<div class="ball-shadow"></div>
</div>

