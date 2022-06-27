import { getApartments, getFilteredApartments } from '@/api'
import orderBy from 'lodash.orderby'
import type { IApartment, IApartmentData } from '@/types'
import type { FilterParams } from '@/types/apartment'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useStore = defineStore('apartments', () => {
	/* STATE */
	const state = reactive({
		apartments: {} as IApartmentData,
	})
	/* /STATE */

	/* ACTIONS */
	async function setApartments() {
		state.apartments = await getApartments()
	}

	async function setFilteredApartments(filterParams: FilterParams) {
		state.apartments = await getFilteredApartments(filterParams)
	}

	/* /ACTIONS */
	return {
		state,
		actions: {
			setApartments,
			setFilteredApartments,
		},
	}
})