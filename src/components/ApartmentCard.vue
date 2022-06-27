<script setup lang="ts">
import { numberFormatRu } from '@/utils/numberFormatRu'
import { TOTAL_FLOORS } from '@/constants'

defineProps<{
	countRooms: number
	price: number
	floor: number
	square: number
	number: number
}>()
</script>

<template>
	<a class="apartment-card row" href="#">
		<div class="apartment-card__layout-img row__left">
			<img
				src="@/assets/images/layout.svg"
				alt=""
				height="80"
				width="80"
				aria-hidden="true"
			/>
		</div>
		<div class="apartment-card__count-rooms row__left">
			{{ countRooms }}-комнатная №{{ number }}
		</div>

		<div class="apartment-card__info row__right">
			<div>{{ numberFormatRu(square) }}</div>
			<div>
				{{ floor }} <span class="total-floors">из {{ TOTAL_FLOORS }}</span>
			</div>
			<div>{{ numberFormatRu(price) }}</div>
		</div>
	</a>
</template>

<style scoped lang="scss">
.apartment-card {
	padding-top: 16px;
	padding-bottom: 24px;

	@media (max-width: 960px) {
		grid-template-columns: initial;
		grid-template-areas:
			'rooms img'
			'info img';
	}
	&__layout-img {
		@media (max-width: 960px) {
			justify-self: end;
			grid-area: img;
		}
	}

	& &__count-rooms {
		font-weight: 500;

		@media (max-width: 960px) {
			margin-left: 0;
			grid-area: rooms;
		}
	}
	&__info {
		@media (max-width: 960px) {
			grid-template-columns: repeat(3, max-content);
			grid-area: info;
		}
	}
}

.total-floors {
	opacity: 0.5;
}
</style>
