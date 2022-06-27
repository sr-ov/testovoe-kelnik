import { computed, ref } from 'vue'
import orderBy from 'lodash.orderby'

interface IParams {
	initialSortKey?: string
}

export const useSort = ({ initialSortKey = '' }: IParams = {}) => {
	const sort = ref<'asc' | 'desc'>('asc')
	const sortKey = ref(initialSortKey)

	const toggleSort = () => {
		sort.value = sort.value === 'asc' ? 'desc' : 'asc'
	}

	const setSortKey = (newSortKey: string) => {
		const prevSortKey = sortKey.value

		if (prevSortKey === newSortKey) {
			toggleSort()
		} else {
			sort.value = 'asc'
			sortKey.value = newSortKey
		}
	}

	const sortArray = computed(() => <T>(arrToSort: T[]) => {
		if (!sortKey.value) return arrToSort

		return orderBy(arrToSort, [sortKey.value], [sort.value])
	})

	return {
		sort,
		sortArray,
		setSortKey,
		sortKey,
	}
}
