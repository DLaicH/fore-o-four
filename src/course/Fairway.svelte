<script>
    import { onMount } from "svelte";

    export let relativeTeeCoords = [];

    const MIN_SECTION_LENGTH = 50;
    const MAX_TEE_DISTANCE = 30;
    const MIN_TEE_DISTANCE = 20;
    const MAX_RANDOM_ANGLE = Math.PI * 0.999;

    let fairwayPoints = [];
    let fairwayOffset = [0, 0];
    let fairwayWidth = 100;
    let fairwayHeight = 100;
    
    onMount(() => {
        let points = [];
        const distance = Math.sqrt(relativeTeeCoords[0] * relativeTeeCoords[0] + relativeTeeCoords[1] * relativeTeeCoords[1]);
        let remainingDistance = distance;

        function getRandomAngleOffset(remainingDistance) {
            const progress = remainingDistance / distance;
            const randFactor = Math.random() * 2 - 1;

            // return 0;
            return MAX_RANDOM_ANGLE * randFactor * Math.pow(progress, 2);
        }

        function getNextPoint([x, y], length, remainingDistance) {
            let angle = Math.atan2(-y, -x);
            let offset = getRandomAngleOffset(length);
            angle += offset;
            let newX = x + Math.cos(angle) * length;
            let newY = y + Math.sin(angle) * length;

            return [newX, newY];
        }

        function getRemainingDistance([x, y]) {
            return Math.sqrt(x * x + y * y);
        }

        const teeDistance = MIN_TEE_DISTANCE + Math.random() * (MAX_TEE_DISTANCE - MIN_TEE_DISTANCE);
        const firstPoint = getNextPoint(relativeTeeCoords, teeDistance, remainingDistance);
        remainingDistance = getRemainingDistance(firstPoint);

        points.push(firstPoint);
        let lastPoint = firstPoint;

        while (remainingDistance > MIN_SECTION_LENGTH && points.length < 100) {
            const lengthRange = remainingDistance - MIN_SECTION_LENGTH * 2;
            const sectionLength = MIN_SECTION_LENGTH + Math.random() * Math.random() * lengthRange;

            let point = getNextPoint(lastPoint, sectionLength, remainingDistance);
            points.push(point);
            remainingDistance = getRemainingDistance(point);

            console.log(point);

            lastPoint = point;
        }

        if (Math.random() > 0.5) points.push([0, 0]);

        const pointMinX = Math.min(...points.map(point => point[0])) - 20;
        const pointMinY = Math.min(...points.map(point => point[1])) - 20;

        points = points.map(point => ([
            point[0] - pointMinX,
            point[1] - pointMinY
        ]));

        const pointMaxX = Math.max(...points.map(point => point[0])) + 32;
        const pointMaxY = Math.max(...points.map(point => point[1])) + 32;

        fairwayOffset = [pointMinX, pointMinY];
        fairwayWidth = pointMaxX;
        fairwayHeight = pointMaxY;
        fairwayPoints = points;
    });

    function pointsToString(points) {
        return points
            .map(point => point.join(','))
            .join(' ');
    }

</script>

<style>
    .fairway {
        position: absolute;
        font-size: 1rem;
        z-index: -1;
    }

    /* .fairway-poly {
        fill: #4a5;
    } */
</style>

{#if fairwayPoints.length > 0}
    <svg
        class="fairway"
        width="{fairwayWidth}em"
        height="{fairwayHeight}em"
        style="left: {fairwayOffset[0]}rem; top: {fairwayOffset[1]}rem"
        viewBox="0 0 {fairwayWidth} {fairwayHeight}"
    >
        <polyline
            class="fairway-poly"
            points="{pointsToString(fairwayPoints)}"
            stroke="#44aa55"
            fill="none"
            stroke-width="32"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
{/if}