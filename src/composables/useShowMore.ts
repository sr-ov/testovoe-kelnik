import { computed, ref } from 'vue'

interface IParams {
	totalItems: number
	sliceItems: number
	initialSliceItems?: number
}

export const useShowMore = ({
	totalItems,
	sliceItems,
	initialSliceItems = sliceItems,
}: IParams) => {
	const count = ref(initialSliceItems)

	const addSlice = () => {
		count.value += sliceItems
	}
	const isHiddenShowMoreBtn = computed(() => count.value >= totalItems)

	return {
		slicedItems: count,
		addSlice,
		isHiddenShowMoreBtn,
	}
}
