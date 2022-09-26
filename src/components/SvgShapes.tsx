import { atom, useAtom } from 'jotai'
import { Point, ShapeAtom } from '../types'
import { selectAtom, selectedAtom, unselectAtom } from './selection'
import { createShapeAtom, SvgShape } from './SvgShape'

const shapeAtomsAtom = atom<ShapeAtom[]>([])

export const addShapeAtom = atom(null, (_get, set, point: readonly Point[]) => {
	const shapeAtom = createShapeAtom(point)
	set(shapeAtomsAtom, (prev) => [...prev, shapeAtom])
	set(selectAtom, shapeAtom)
})

export const deleteSelectedShapeAtom = atom(
	(get) => {
		const isSelected = !!get(selectedAtom)
		return isSelected
	},
	(get, set) => {
		const selectedShapeAtom = get(selectedAtom)
		if (selectedShapeAtom) {
			set(shapeAtomsAtom, (prev) =>
				prev.filter((item) => item !== selectedShapeAtom)
			)
			set(unselectAtom, null)
		}
	}
)

export const SvgShapes = () => {
	const [shapeAtoms] = useAtom(shapeAtomsAtom)
	return (
		<g>
			{shapeAtoms.map((shapeAtom) => (
				<SvgShape key={`${shapeAtom}`} shapeAtom={shapeAtom} />
			))}
		</g>
	)
}
