<script setup lang="ts">
import { computed } from 'vue'
import { ButtonSort, ApartmentCard } from '@/components'
import { useShowMore } from '@/composables/useShowMore'
import { useSort } from '@/composables/useSort'
import { useStore } from '@/stores'

const { state } = useStore()

const btnsSort = [
	{
		text: 'S, м²',
		value: 'square',
	},
	{
		text: 'Этаж',
		value: 'floor',
	},
	{
		text: 'Цена, ₽',
		value: 'price',
	},
]

const { addSlice, isHiddenShowMoreBtn, slicedItems } = useShowMore({
	sliceItems: 10,
	totalItems: state.apartments.totalCount,
})

const { setSortKey, sort, sortArray, sortKey } = useSort()

const slicedApartments = computed(() =>
	sortArray.value(state.apartments.data).slice(0, slicedItems.value)
)
</script>

<template>
	<main class="main">
		<template v-if="slicedApartments.length > 0">
			<div class="row main__row-top">
				<div class="apartments-text row__left">Планировка</div>
				<div class="apartments-text row__left">Квартира</div>

				<ul class="sort-list row__right">
					<li
						class="sort-list__item"
						v-for="el in btnsSort"
						:key="el.value"
					>
						<ButtonSort
							@click="setSortKey(el.value)"
							:active="sortKey === el.value"
							:sort="sort"
						>
							{{ el.text }}
						</ButtonSort>
					</li>
				</ul>
			</div>

			<div class="main__list">
				<ul class="apartments-list apartments-list--mb">
					<li
						class="apartments-list__item"
						v-for="apartment in slicedApartments"
						:key="apartment.id"
					>
						<ApartmentCard v-bind="apartment" />
					</li>
				</ul>

				<button
					class="show-more"
					v-if="!isHiddenShowMoreBtn"
					@click="addSlice"
				>
					Загрузить еще
				</button>
			</div>
		</template>

		<div class="not-found" v-else>Ничего не найдено</div>
	</main>
</template>

<style scoped lang="scss">
.main {
	&__row-top {
		font-size: 14px;
		margin-bottom: 17px;

		@media (max-width: 960px) {
			grid-template-columns: 1fr;
		}
	}
}

.apartments-text {
	@media (max-width: 960px) {
		display: none;
	}
}

.sort-list {
	white-space: nowrap;

	@media (max-width: 960px) {
		grid-template-columns: repeat(3, auto);
		justify-self: start;
	}
}

.apartments-list {
	--item-bd: 1px solid rgba(0, 0, 0, 0.1);

	&--mb {
		margin-bottom: 48px;
	}

	&__item {
		border-bottom: var(--item-bd);
		&:first-child {
			border-top: var(--item-bd);
		}
		& + & {
			border-bottom: var(--item-bd);

			@media (max-width: 960px) {
				margin-top: 4px;
			}
		}

		@media (max-width: 960px) {
			border-radius: 8px;
			border: var(--item-bd);
			padding-left: 24px;
			padding-right: 24px;
		}
	}
}

.show-more {
	border: 1px solid rgba(11, 23, 57, 0.2);
	border-radius: 25px;
	padding: 8px 24px;
	transition: background-color 0.3s, color 0.3s;

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--c-acc);
			color: #fff;
		}
	}
}

.not-found {
	font-size: 22px;
	font-weight: 500;
}
</style>
