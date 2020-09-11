<script lang="ts">
	import { tilt, rotation } from './store/world';

	import Ball from './Ball.svelte';

	let hit;
	let tilted = false;
	let turned = false;
	let angle = 0;

	setTimeout(() => {
		hit = {
			direction: Math.random() * 2 * Math.PI,
			power: Math.random(),
			angle: Math.PI / 4
		};
	}, 5000);

	setTimeout(() => tilt.set(45), 2000);
	// setTimeout(() => turned = true, 5000);

	function handleKeydown(event) {
		if (event.key == 'ArrowLeft') rotation.update(angle => angle - 9);
		if (event.key == 'ArrowRight') rotation.update(angle => angle + 9);
	}
</script>

<style>
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="layer">
	<div class="world-tilt" style="transform: rotate3d(1, 0, 0, {$tilt}deg)">
		<div class="world-plane" style="transform: rotate3d(0, 0, 1, {$rotation}deg)">
			<div class="course">
				<svg class="fairway" viewBox="0 0 100 100">
					<polygon class="fairway-poly" points="100,100 0,100 0,0 100,0" fill="#44aa55"/>
				</svg>
			</div>
		</div>
	</div>
</div>

<div class="layer">
	<div class="world-tilt" style="transform: rotate3d(1, 0, 0, {$tilt}deg)">
		<div class="world-plane" style="transform: rotate3d(0, 0, 1, {$rotation}deg)">
			<Ball {hit} />
		</div>
	</div>
</div>
