import { atom, useAtom } from 'jotai'
import Layout from './components/Layout'
import { dotsAtom } from './components/SvgDots'
import { SvgRoot } from './components/SvgRoot'

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
	return (
		<Layout>
			<SvgRoot />
			<Stats />
		</Layout>
	)
}

export default App
