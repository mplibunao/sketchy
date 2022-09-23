import { atom, useAtom } from 'jotai'
import { Point } from '../types'

const pointsToPath = (points: readonly Point[]) => {
	return points.reduce((acc, point, index) => {
		if (index === 0) {
			return `M ${point[0]} ${point[1]}`
		}
		return `${acc} L ${point[0]} ${point[1]}`
	}, '')
}

const shapeAtom = atom({ path: '' })

export const addShapeAtom = atom(
	null,
	(_get, set, points: readonly Point[]) => {
		set(shapeAtom, { path: pointsToPath(points) })
	}
)

export const SvgShape = () => {
	const [shape] = useAtom(shapeAtom)
	return (
		<g>
			<path d={shape.path} fill='none' stroke='black' strokeWidth='3' />
		</g>
	)
}
