<script lang="ts">
	import { get } from 'svelte/store';
	import { tilt, rotation, worldX, worldY, worldZ } from './store/world';
	import { doHit, ballIsMoving } from './store/ball';

	import Ball from './Ball.svelte';

	setTimeout(() => tilt.set(45), 2000);
	// setTimeout(() => turned = true, 5000);

	function handleKeydown(event) {
		if (event.key == 'ArrowLeft') rotation.update(angle => angle - 9);
		if (event.key == 'ArrowRight') rotation.update(angle => angle + 9);
		if (event.key == ' ' && !get(ballIsMoving)) hitInCurrentDirection();
	}

	function hitInCurrentDirection() {
		let direction = get(rotation) - 90;

		while (direction < 0) direction += 360;
		while (direction >= 360) direction -= 360;

		const hit = {
			direction: direction * Math.PI / 180,
			power: Math.random(),
			angle: Math.PI / 4
		};

		doHit(hit);
	}
</script>

<style>
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="layer">
	<div class="world-tilt" style="transform: rotate3d(1, 0, 0, {$tilt}deg)">
		<div class="world-plane" style="transform: rotate3d(0, 0, 1, {$rotation}deg) translate3d({$worldX}rem, {$worldY}rem, {$worldZ}rem)">
			<div class="course">
				<svg class="fairway" viewBox="0 0 100 100">
					<polygon class="fairway-poly" points="100,100 0,100 0,0 100,0" fill="#44aa55"/>
				</svg>
			</div>

			<Ball />
		</div>
	</div>
</div>
