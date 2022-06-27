import axios from 'axios'
import { API_URL } from '@/constants'
import { getMinMax } from '@/utils/getMinMax'
import type { IApartment, IApartmentData } from '@/types'
import type { FilterParams } from '@/types/apartment'

const delay = (delay: number) =>
	new Promise((res) => {
		setTimeout(res, delay)
	})

const api = axios.create({ baseURL: API_URL })

export const getApartments = async (): Promise<IApartmentData> => {
	const { data } = await api.get<IApartment[]>('')

	const priceMinMax = getMinMax(data.map(({ price }) => price))
	const squareMinMax = getMinMax(data.map(({ square }) => square))

	await delay(600)

	return { data, totalCount: data.length, priceMinMax, squareMinMax }
}

export const getFilteredApartments = async ({
	priceValues,
	squareValues,
	rooms,
}: FilterParams): Promise<IApartmentData> => {
	const apartments = await getApartments()

	const filteredApartments = apartments.data.filter(
		({ countRooms, price, square }) => {
			const isPriceBetweenValues =
				price >= priceValues.start && price <= priceValues.end
			const isSquareBetweenValues =
				square >= squareValues.start && square <= squareValues.end

			return (
				isPriceBetweenValues &&
				isSquareBetweenValues &&
				(!rooms.length ? true : rooms.includes(countRooms))
			)
		}
	)

	await delay(300)

	return {
		...apartments,
		data: filteredApartments,
	}
}
