<script>
	import { tweened } from 'svelte/motion';
	import { quadIn, quadOut, cubicOut } from 'svelte/easing';

	import { tilt, rotation } from './store/world';
	import { ballX, ballY } from './store/ball';

	let el;
	let elZ;
	export let hit;

	let counterTilt = 0;
	$: counterTilt = 360 - $tilt;
	let counterRotation = 0;
	$: counterRotation = 360 - $rotation;

	$: if (hit) {
		doHit();
	}

	function doHit() {


		console.log('doing hit');
		el.animate([
			{transform: 'translate3d(0, 0, 0)'},
			{transform: 'translate3d(-16rem, 16rem, 0)'}
		], {
			duration: 2000,
			//composite: 'accumulate'
		})
		.onfinish = () => {
			el.style.transform = 'translate3d(-16rem, 16rem, 0)';
			ballX.set(-16);
			ballY.set(16);
		};

		elZ.animate([
			{transform: 'translateZ(0)', easing: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)'},
			{transform: 'translateZ(12rem)', easing: 'cubic-bezier(0.42, 0.0, 1.0, 1.0)'},
			{transform: 'translateZ(0)'}
		], {
			duration: 2000,
			//composite: 'accumulate'
		});
	}

</script>

<style>
	.ball-z {
		transform-style: preserve-3d;
	}

	.ball-plane {
		position: absolute;
		top: 50vh;
		left: 50vw;
		width: 1rem;
		height: 1rem;
		transform: translate3d(0, 0, 0);
		perspective: 50rem;
		transform-style: preserve-3d;
	}

	.ball {
		width: 1rem;
		height: 1rem;
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		transform: rotate3d(1, 0, 0, 0);
		perspective: 50rem;
	}
</style>

<div class="ball-z" bind:this={elZ}>
	<div class="ball-plane" bind:this={el}>
		<div
			class="ball"
			style="transform: rotateZ({counterRotation}deg) rotate3d(1, 0, 0, {counterTilt}deg)"
		></div>
	</div>
</div>

