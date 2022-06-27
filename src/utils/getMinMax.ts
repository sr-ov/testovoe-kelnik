export const getMinMax = (value: number[]) => {
	const sorted = [...value].sort((a, b) => a - b)

	return {
		min: sorted[0],
		max: sorted[sorted.length - 1],
	}
}
