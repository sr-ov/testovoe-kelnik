export const numberFormatRu = (value: number) => {
	return new Intl.NumberFormat('ru').format(value)
}
