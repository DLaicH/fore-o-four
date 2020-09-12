<script>
    import Fairway from './Fairway.svelte';

    export let teeCoords = [];
    export let holeCoords = [];

    let relativeTeeCoords = [];
    const greenRadius = Math.random() * 10 + 15;
    const greenOffsetX = Math.random() * greenRadius * 0.25 - greenRadius * 0.5;
    const greenOffsetY = Math.random() * greenRadius * 0.25 - greenRadius * 0.5;

    $: relativeTeeCoords = [ teeCoords[0] - holeCoords[0], teeCoords[1] - holeCoords[1] ];
</script>

<style>
    .course {
        /* background-color: #070; */
        position: absolute;
    }

    .fairway {
        position: absolute;
    }

    .fairway-poly {
        fill: #4a5;
    }

    .tee {
        position: absolute;
        width: 10rem;
        height: 6rem;
        margin-left: -5rem;
        margin-top: -3rem;
        background-color: #4a5;
    }

    .green {
        position: absolute;
        background-color: #6c5;
        border-radius: 50%;
    }

    .hole {
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: #171717;
        left: -1rem;
        top: -1rem;
    }

</style>

<div class="course" style="left: {holeCoords[0]}rem; top: {holeCoords[1]}rem">
    <div class="green" style="width: {greenRadius}rem; height: {greenRadius}rem; left: {greenOffsetX}rem; top: {greenOffsetY}rem"></div>
    <div class="hole"></div>

    <Fairway {relativeTeeCoords} />

    <div class="tee" style="left: {relativeTeeCoords[0]}rem; top: {relativeTeeCoords[1]}rem"></div>
</div>