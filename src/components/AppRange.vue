<script setup lang="ts">
defineProps<{
	label: string
	start: string
	end: string
}>()
</script>

<template>
	<div class="range">
		<div class="range__label">{{ label }}</div>
		<div class="range__nums">
			<span> <span class="range__text">от</span> {{ start }} </span>
			<span> <span class="range__text">до</span> {{ end }} </span>
		</div>

		<slot />
	</div>
</template>

<style>
.range {
	--slider-bg: #c7c7c7;
	--slider-height: 3px;
	--slider-connect-bg: var(--c-sec);
	--slider-handle-bg: var(--c-sec);
	--slider-handle-shadow: none;
}
</style>

<style scoped lang="scss">
.range {
	&__label {
		font-size: 14px;
		line-height: calc(20 / 14);
		margin-bottom: 8px;
	}
	&__nums {
		display: flex;
		justify-content: space-between;
		font-weight: 500;
		margin-bottom: 12px;
	}
	&__text {
		opacity: 0.5;
		margin-right: 8px;
	}
}
</style>
