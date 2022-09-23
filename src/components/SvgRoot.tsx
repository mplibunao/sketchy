import { atom, useAtom } from 'jotai'
import { Point } from '../types'
import { dotsAtom, SvgDots } from './SvgDots'
import { useEffect, useRef } from 'react'

const drawingAtom = atom(false)

export const useCommitCount = () => {
	const commitCountRef = useRef(0)

	useEffect(() => {
		commitCountRef.current += 1
	}, [])
	return commitCountRef.current
}

const handleMouseDownAtom = atom(null, (get, set, newDot: Point) => {
	set(drawingAtom, true)
	set(dotsAtom, (dots) => [...dots, newDot])
})

const handleMouseUpAtom = atom(null, (get, set) => set(drawingAtom, false))

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
			onMouseDown={(e) => {
				handleMouseDown([e.clientX, e.clientY])
			}}
			onMouseUp={handleMouseUp}
			onMouseMove={(e) => {
				handleMouseMove([e.clientX, e.clientY])
			}}
		>
			<rect width='100%' height='100%' fill='#eee' />
			<text x='3' y='12' fontSize='12px'>
				Commits: {useCommitCount()}
			</text>
			<SvgDots />
		</svg>
	)
}
