<script>
	import Ball from './Ball.svelte';

	let hit;

	setTimeout(() => {
		hit = {};
	}, 2000);
</script>

<style>
</style>

<div class="course"></div>
<Ball {hit} />
