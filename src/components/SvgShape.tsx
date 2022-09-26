import { atom, useAtom } from 'jotai'
import { useMemo } from 'react'
import { Point, ShapeAtom } from '../types'
import { selectAtom, selectedAtomCreator } from './selection'

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
	const [, select] = useAtom(selectAtom)
	const [selected] = useAtom(
		useMemo(() => selectedAtomCreator(shapeAtom), [shapeAtom])
	)
	return (
		<g onClick={() => select(shapeAtom)}>
			<path
				d={shape.path}
				opacity={selected ? '0.3' : '0'}
				fill='none'
				stroke={shape.color || 'black'}
				strokeWidth='12'
			/>
			<path d={shape.path} fill='none' stroke='black' strokeWidth='3' />
		</g>
	)
}
