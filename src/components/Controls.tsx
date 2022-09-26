import clsx from 'clsx'
import { useAtom } from 'jotai'
import { setColorAtom } from './selection'

const colors = [
	{ value: 'indigo', label: 'Default' },
	{ value: 'red', label: 'Red' },
	{ value: 'green', label: 'Green' },
	{ value: 'blue', label: 'Blue' },
]

export const Controls = () => {
	const [currentColor, setColor] = useAtom(setColorAtom)
	return (
		<div>
			{colors.map(({ value, label }) => (
				<button
					type='button'
					key={value}
					disabled={currentColor === null || currentColor === value}
					onClick={() => setColor(value)}
					className={`inline-flex items-center rounded border border-transparent bg-${value}-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-${value}-700 focus:outline-none focus:ring-2 focus:ring-${value}-500 focus:ring-offset-2 bg-${value}-600 disabled:opacity-50 disabled:cursor-not-allowed`}
				>
					{label}
				</button>
			))}
		</div>
	)
}
