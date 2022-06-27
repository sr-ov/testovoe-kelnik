<script setup lang="ts">
interface Props {
	height: number | string
	width: number | string
	withOverlay?: boolean
	withOpacity?: boolean
}
defineProps<Props>()
</script>

<template>
	<div class="overlay" :class="{ opacity: withOpacity }" v-if="withOverlay">
		<div class="content" v-if="withOverlay">
			<svg
				class="spinner"
				viewBox="0 0 50 50"
				:height="height"
				:width="width"
			>
				<circle
					class="path"
					cx="25"
					cy="25"
					r="20"
					fill="none"
					stroke-width="5"
				></circle>
			</svg>
		</div>
	</div>

	<svg
		class="spinner"
		v-else
		viewBox="0 0 50 50"
		:height="height"
		:width="width"
	>
		<circle
			class="path"
			cx="25"
			cy="25"
			r="20"
			fill="none"
			stroke-width="5"
		></circle>
	</svg>
</template>

<style scoped>
.overlay {
	position: fixed;
	height: 100vh;
	width: 100%;
	z-index: 1111;
	top: 0;
	left: 0;
}
.overlay.opacity {
	background-color: rgba(299, 299, 299, 0.7);
}

.content {
	position: relative;
	height: inherit;
	width: inherit;
	display: flex;
	align-items: center;
	justify-content: center;
}

.spinner {
	z-index: 2;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.path {
	stroke: rgb(189, 222, 255);
	stroke-linecap: round;
	animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}
</style>
