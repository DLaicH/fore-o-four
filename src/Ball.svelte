<script>
	let el;
	let elZ;
	export let hit;

	$: if (hit) {
		doHit();
	}

	function doHit() {
		console.log('doing hit');
		el.animate([
			{transform: 'translate3d(0, 0, 0)'},
			{transform: 'translate3d(0, -24rem, 0)'}
		], {
			duration: 2000,
			//composite: 'accumulate'
		})
		.onfinish = () => {
			el.style.transform = 'translate3d(0, -24rem, 0)';
		};

		elZ.animate([
			{transform: 'translateZ(0)', easing: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)'},
			{transform: 'translateZ(4rem)', easing: 'cubic-bezier(0.42, 0.0, 1.0, 1.0)'},
			{transform: 'translateZ(0)'}
		], {
			duration: 2000,
			//composite: 'accumulate'
		});
	}

</script>

<div class="ballZ" bind:this={elZ}>
	<div class="ball" bind:this={el}></div>
</div>

