import { atom, useAtom } from 'jotai'
import { Point } from '../types'
import { addShapeAtom } from './SvgShapes'

export const dotsAtom = atom<readonly Point[]>([])

export const addDotAtom = atom(null, (_get, set, newDot: Point) => {
	set(dotsAtom, (dots) => [...dots, newDot])
})

export const commitDotsAtom = atom(null, (get, set) => {
	set(addShapeAtom, get(dotsAtom))
	set(dotsAtom, [])
})

export const SvgDots = () => {
	const [dots] = useAtom(dotsAtom)
	return (
		<g>
			{dots.map(([x, y], i) => (
				<circle key={i} cx={x} cy={y} r='2' fill='#aaa' />
			))}
		</g>
	)
}
