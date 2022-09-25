import { atom, useAtom } from 'jotai'
import { Point, ShapeAtom } from '../types'
import { selectAtom } from './selection'
import { createShapeAtom, SvgShape } from './SvgShape'

const shapeAtomsAtom = atom<ShapeAtom[]>([])

export const addShapeAtom = atom(null, (_get, set, point: readonly Point[]) => {
	const shapeAtom = createShapeAtom(point)
	set(shapeAtomsAtom, (prev) => [...prev, shapeAtom])
	set(selectAtom, shapeAtom)
})

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
