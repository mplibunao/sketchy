import { atom, useAtom } from 'jotai'
import { Point } from '../types'
import { commitDotsAtom, dotsAtom, SvgDots } from './SvgDots'
import { SvgShapes } from './SvgShapes'

const drawingAtom = atom(false)

const handleMouseDownAtom = atom(null, (_get, set) => {
	set(drawingAtom, true)
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

	const height = vh((100 - 15 * 2) / 2)
	const width = vw(100)
	//
	return (
		<div style={{ height }}>
			<svg
				width={`${width}`}
				height={`${height}`}
				viewBox={`0 0 ${width} ${height}`}
				onMouseDown={(_e) => {
					handleMouseDown()
				}}
				onMouseUp={handleMouseUp}
				onMouseMove={(e) => {
					const { x, y } = e.currentTarget.getBoundingClientRect()
					handleMouseMove([e.clientX - x, e.clientY - y])
				}}
			>
				<rect width={`${width}`} height={`${height}`} fill='#eee' />
				<SvgShapes />
				<SvgDots />
			</svg>
		</div>
	)
}

function vh(percent: number) {
	var h = Math.max(
		document.documentElement.clientHeight,
		window.innerHeight || 0
	)
	return (percent * h) / 100
}

function vw(percent: number) {
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	return (percent * w) / 100
}
