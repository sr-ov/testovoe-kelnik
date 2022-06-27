<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	room: number
	modelValue: number[]
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	},
})
</script>

<template>
	<input
		class="filter-checkbox visually-hidden"
		type="checkbox"
		:id="'checkbox' + room"
		:value="room"
		v-model="value"
	/>
	<label class="filter-label" :for="'checkbox' + room"> <slot />к </label>
</template>

<style scoped lang="scss">
.filter-checkbox:checked ~ .filter-label {
	background-color: var(--c-sec);
	box-shadow: 0px 6px 20px #95d0a1;
	color: #fff;
}

.filter-label {
	height: 44px;
	width: 44px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	transition: background-color 0.3s, color 0.3s;

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--c-acc);
			color: #fff;
		}
	}
}
</style>
