import { atom, useAtom } from 'jotai'
import { Point, ShapeAtom } from '../types'

const pointsToPath = (points: readonly Point[]) => {
	return points.reduce((acc, point, index) => {
		if (index === 0) {
			return `M ${point[0]} ${point[1]}`
		}
		return `${acc} L ${point[0]} ${point[1]}`
	}, '')
}

export const createShapeAtom = (points: readonly Point[]) =>
	atom({ path: pointsToPath(points) })

export const SvgShape = ({ shapeAtom }: { shapeAtom: ShapeAtom }) => {
	const [shape] = useAtom(shapeAtom)
	return (
		<g>
			<path d={shape.path} fill='none' stroke='black' strokeWidth='3' />
		</g>
	)
}
