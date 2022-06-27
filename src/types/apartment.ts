export interface IApartment {
	id: number
	countRooms: number
	price: number
	floor: number
	square: number
	number: number
}

export interface StartEndValues {
	start: number
	end: number
}
export interface FilterParams {
	squareValues: StartEndValues
	priceValues: StartEndValues
	rooms: number[]
}

export interface IMinMax {
	min: number
	max: number
}

export interface IApartmentData {
	data: IApartment[]
	totalCount: number
	priceMinMax: IMinMax
	squareMinMax: IMinMax
}
