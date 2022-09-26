import { atom, useAtom } from 'jotai'
import { Controls } from './components/Controls'
import { Layout } from './components/Layout'
import { dotsAtom } from './components/SvgDots'
import { SvgRoot } from './components/SvgRoot'
import { useAtomsDevtools } from 'jotai/devtools'

const numberOfDotsAtom = atom((get) => get(dotsAtom).length)

const Stats = () => {
	const [numberOfDots] = useAtom(numberOfDotsAtom)
	return (
		<ul>
			<li>Dots: {numberOfDots}</li>
		</ul>
	)
}

function App() {
	useAtomsDevtools('App')
	return (
		<Layout>
			<SvgRoot />
			<div className='controls'>
				<Controls />
				<Stats />
			</div>
		</Layout>
	)
}

export default App
