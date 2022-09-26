import { atom, SetStateAction } from 'jotai'
import { ShapeAtom, ShapeAtomValue } from '../types'

const internalShapeAtomsAtom = atom<ShapeAtom[]>([])

const historyAtom = atom<ShapeAtomValue[][]>([])

export const saveHistoryAtom = atom(null, (get, set) => {
	const shapes = get(internalShapeAtomsAtom).map((shapeAtom) => get(shapeAtom))
	set(historyAtom, (prev) => [shapes, ...prev])
})

export const shapeAtomsAtom = atom(
	(get) => get(internalShapeAtomsAtom),
	(_get, set, action: SetStateAction<ShapeAtom[]>) => {
		set(saveHistoryAtom, null)
		set(internalShapeAtomsAtom, action)
	}
)

export const undoAtom = atom(
	(get) => {
		const hasHistory = get(historyAtom).length > 0
		return hasHistory
	},
	(get, set) => {
		const history = get(historyAtom)

		if (history.length > 0) {
			const [shapes, ...rest] = history

			set(internalShapeAtomsAtom, (prev) => {
				return shapes.map((shape, index) =>
					get(prev[index]) === shape ? prev[index] : atom(shape)
				)
			})

			set(historyAtom, rest)
		}
	}
)
