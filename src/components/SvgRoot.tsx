import { atom, useAtom } from 'jotai'
import { Point } from '../types'
import { commitDotsAtom, dotsAtom, SvgDots } from './SvgDots'
import { SvgShape } from './SvgShape'

const drawingAtom = atom(false)

const handleMouseDownAtom = atom(null, (_get, set, newDot: Point) => {
	set(drawingAtom, true)
	set(dotsAtom, (dots) => [...dots, newDot])
})

const handleMouseUpAtom = atom(null, (_get, set) => {
	set(drawingAtom, false)
	set(commitDotsAtom, null)
})

const handleMouseMoveAtom = atom(null, (get, set, newDot: Point) => {
	if (get(drawingAtom)) {
		set(dotsAtom, (dots) => [...dots, newDot])
	}
})

export const SvgRoot = () => {
	const [, handleMouseUp] = useAtom(handleMouseUpAtom)
	const [, handleMouseMove] = useAtom(handleMouseMoveAtom)
	const [, handleMouseDown] = useAtom(handleMouseDownAtom)
	return (
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 100% 100%'
			preserveAspectRatio='none'
			onMouseDown={(e) => {
				console.log('mouse down', e)
				handleMouseDown([e.clientX, e.clientY])
			}}
			onMouseUp={handleMouseUp}
			onMouseMove={(e) => {
				handleMouseMove([e.clientX, e.clientY])
			}}
		>
			<rect width='100%' height='100%' fill='#eee' />
			<SvgShape />
			<SvgDots />
		</svg>
	)
}
