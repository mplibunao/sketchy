import { useAtom } from 'jotai'
import { setColorAtom } from './selection'

const colors = [
	{ value: '', label: 'Default' },
	{ value: 'red', label: 'Red' },
	{ value: 'green', label: 'Green' },
	{ value: 'blue', label: 'Blue' },
]

export const Controls = () => {
	const [, setColor] = useAtom(setColorAtom)
	return (
		<div>
			{colors.map(({ value, label }) => (
				<button
					type='button'
					key={value}
					onClick={() => setColor(value)}
					style={{ backgroundColor: value }}
					className='inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
				>
					{label}
					Button text
				</button>
			))}
		</div>
	)
}
