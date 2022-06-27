<script setup lang="ts">
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'

defineProps<{
	active?: boolean
	sort: 'asc' | 'desc'
}>()
</script>

<template>
	<button class="button-sort" :class="{ active }">
		<span class="button-sort__text">
			<slot />
		</span>
		<span class="button-sort__arrows">
			<IconArrowUp
				class="button-sort__arrow"
				:class="{ active: active && sort === 'desc' }"
			/>
			<IconArrowDown
				class="button-sort__arrow"
				:class="{ active: active && sort === 'asc' }"
			/>
		</span>
	</button>
</template>

<style scoped lang="scss">
.button-sort {
	width: 100%;
	padding: 5px 0 5px 5px;
	margin-left: -5px;
	text-align: left;
	display: flex;
	align-items: center;
	border: 2px solid transparent;
	border-radius: 6px;
	transition: border-color 0.3s;

	@media (any-hover: hover) {
		&:hover {
			border-color: var(--c-acc);
		}
	}
	&.active {
		color: var(--c-sec);
	}
	&__text {
	}
	&__arrows {
		margin-left: 8px;
	}
	&__arrow {
		display: block;

		&.active {
			stroke: #3eb57c;
		}

		& + & {
			margin-top: 2px;
		}
		&--up {
		}
		&--down {
		}
	}
}
</style>
