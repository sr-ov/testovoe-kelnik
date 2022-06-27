<script setup lang="ts">
import { ref, watch } from 'vue'
import RangeSlider from '@vueform/slider'
import { numberFormatRu } from '@/utils/numberFormatRu'
import { RoomsFilter, AppRange, AppSpinner } from '@/components'
import '@vueform/slider/themes/default.css'
import { useStore } from '@/stores'
import { useAsync } from '@/composables/useAsync'

const { state, actions } = useStore()
const { execute, status } = useAsync(actions.setFilteredApartments)
const roomsVariants = [1, 2, 3]
const rooms = ref<number[]>([])
const dirtyFilteres = ref(false)

const defaultRangePrice = [
	state.apartments.priceMinMax.min,
	state.apartments.priceMinMax.max,
]
const defaultRangeSquare = [
	state.apartments.squareMinMax.min,
	state.apartments.squareMinMax.max,
]

const rangePrice = ref(defaultRangePrice)
const rangeSquare = ref(defaultRangeSquare)

const onApplyFilters = async () => {
	await execute({
		rooms: rooms.value,
		squareValues: { start: rangeSquare.value[0], end: rangeSquare.value[1] },
		priceValues: { start: rangePrice.value[0], end: rangePrice.value[1] },
	})
}
watch(rooms, async () => {
	await onApplyFilters()
})

const onResetFilteres = () => {
	if (!dirtyFilteres.value) return

	rooms.value = []
	rangePrice.value = defaultRangePrice
	rangeSquare.value = defaultRangeSquare
	dirtyFilteres.value = false
}

watch([rooms, rangePrice, rangeSquare], () => {
	dirtyFilteres.value = true
})
</script>

<template>
	<aside class="sidebar">
		<div class="sidebar__content">
			<ul class="sidebar__count-rooms-filter">
				<li v-for="room in roomsVariants" :key="room">
					<RoomsFilter :room="room" v-model="rooms">
						{{ room }}
					</RoomsFilter>
				</li>
			</ul>
			<AppRange
				label="Стомость квартиры, ₽"
				:start="numberFormatRu(rangePrice[0])"
				:end="numberFormatRu(rangePrice[1])"
			>
				<RangeSlider
					v-model="rangePrice"
					:min="state.apartments.priceMinMax.min"
					:max="state.apartments.priceMinMax.max"
					:lazy="false"
					:tooltips="false"
					@change="onApplyFilters"
				/>
			</AppRange>

			<AppRange
				label="Площадь, м²"
				:start="numberFormatRu(rangeSquare[0])"
				:end="numberFormatRu(rangeSquare[1])"
			>
				<RangeSlider
					v-model="rangeSquare"
					:min="state.apartments.squareMinMax.min"
					:max="state.apartments.squareMinMax.max"
					:lazy="false"
					:tooltips="false"
					@change="onApplyFilters"
				/>
			</AppRange>

			<button class="reset-filters" @click="onResetFilteres">
				Сбросить параметры
				<span class="reset-filters__img">
					<img
						src="@/assets/images/reset.svg"
						alt=""
						aria-hidden="true"
						height="8"
						width="8"
					/>
				</span>
			</button>
		</div>

		<Teleport to="body">
			<AppSpinner
				v-if="status === 'pending'"
				height="50"
				width="50"
				with-opacity
				with-overlay
			/>
		</Teleport>
	</aside>
</template>

<style scoped lang="scss">
.sidebar {
	&__content {
		position: sticky;
		top: var(--content-v-padding);
		right: 0;
		background: linear-gradient(
			135deg,
			rgba(174, 228, 178, 0.3) 0%,
			rgba(149, 208, 161, 0.3) 100%
		);
		border-radius: 10px;
		overflow: hidden;
		padding: 40px;
		display: grid;
		gap: 24px;
	}
	&__count-rooms-filter {
		display: grid;
		grid-template-columns: repeat(4, 44px);
		gap: 16px;
	}
}

.reset-filters {
	display: flex;
	align-items: center;
	font-size: 14px;
	line-height: 20px;
	padding: 8px 16px;
	border-radius: 6px;
	border: 2px solid transparent;
	transition: border-color 0.3s;
	justify-self: start;

	@media (any-hover: hover) {
		&:hover {
			border-color: var(--c-sec);
		}
	}
	&__img {
		margin-left: 8px;
	}
}
</style>
