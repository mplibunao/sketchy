import { atom, useAtom } from 'jotai'
import { Point } from '../types'

export const dotsAtom = atom<readonly Point[]>([])

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
