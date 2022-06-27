<script setup lang="ts">
import { onMounted, onErrorCaptured, ref } from 'vue'
import { TheSuspenseContent, AppSpinner } from '@/components'
import { OFFSET_TOP } from './constants'

const isHiddenToTop = ref(true)
const err = ref<Error | null>(null)

onErrorCaptured((error) => {
	console.error(error)
	err.value = error
	return true
})

onMounted(() => {
	window.addEventListener('scroll', () => {
		isHiddenToTop.value = !(Math.floor(window.scrollY) > OFFSET_TOP)
	})
})
</script>

<template>
	<div class="container content-container" id="to-top">
		<div v-if="err">
			Произошла ошибка!!! Попробуйте позже или перезагрузите страницу
		</div>

		<Suspense v-else>
			<TheSuspenseContent />

			<template #fallback>
				<AppSpinner height="50" width="50" with-overlay />
			</template>
		</Suspense>

		<div class="to-top" :class="{ hidden: isHiddenToTop }">
			<a class="to-top__link" href="#to-top"></a>
		</div>
	</div>
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';

.content-container {
	--content-v-padding: 96px;
	@media (max-width: 960px) {
		--content-v-padding: 48px;
	}
	padding-top: var(--content-v-padding);
	padding-bottom: var(--content-v-padding);
	position: relative;
}

.to-top {
	position: absolute;
	background-color: #8d8880;
	right: 0;
	transition: visibility 0.3s, opacity 0.3s;

	&.hidden {
		visibility: hidden;
		opacity: 0;
	}

	&__link {
		width: 40px;
		height: 40px;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 30px;
		z-index: 111;
		background: no-repeat #95d0a1 url('@/assets/images/arrow-to-top.svg')
			center / auto;
	}
}

.row {
	display: grid;
	grid-template-columns: 80px 1fr auto;
	line-height: calc(20 / 14);
	gap: 20px;

	&__right {
		display: grid;
		grid-template-columns: repeat(3, 120px);
		gap: 20px;

		@media (max-width: 1250px) {
			grid-template-columns: repeat(3, 80px);
		}
	}
}

.visually-hidden {
	position: fixed;
	transform: scale(0);
}
</style>
