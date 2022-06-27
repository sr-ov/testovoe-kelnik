<script setup lang="ts">
import { TheMain, TheSidebar, ThePageTitle } from '@/components'
import { useAsync } from '@/composables/useAsync'
import { useStore } from '@/stores'

const { actions } = useStore()

const { execute } = useAsync(actions.setApartments)
await execute()
</script>

<template>
	<div class="content-wrapper">
		<ThePageTitle class="area-title">Квартиры</ThePageTitle>
		<TheMain class="area-main" />
		<TheSidebar class="area-sidebar" />
	</div>
</template>

<style scoped lang="scss">
.area-title {
	grid-area: title;
}
.area-main {
	grid-area: main;
}
.area-sidebar {
	grid-area: sidebar;
}

.content-wrapper {
	display: grid;
	grid-template-columns: minmax(500px, 800px) minmax(318px, 400px);
	gap: 48px 80px;
	grid-template-areas:
		'title sidebar'
		'main sidebar';

	@media (max-width: 940px) {
		gap: 30px;
		grid-template-columns: 1fr;
		grid-template-areas:
			'title'
			'sidebar'
			'main';
	}
}
</style>
