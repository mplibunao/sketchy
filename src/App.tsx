import { atom, useAtom } from "jotai";
import Layout from "./components/Layout";

type Point = [number, number];

const dotsAtom = atom<Point[]>([]);
const numberOfDotsAtom = atom((get) => get(dotsAtom).length);

const SvgDots = () => {
  const [dots] = useAtom(dotsAtom);
  return (
    <g width="100%" height="100%" viewBox="0 0 100% 100%">
      {dots.map(([x, y], i) => (
        <circle cx={x} cy={y} r="2" fill="#aaa" />
      ))}
    </g>
  );
};

export const SvgRoot = () => {
  const [, setDots] = useAtom(dotsAtom);
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100% 100%"
      onMouseMove={(e) => {
        const p: Point = [e.clientX, e.clientY];
        setDots((prev) => [...prev, p]);
      }}
    >
      <rect width="100%" height="100%" fill="#eee" />
      <SvgDots />
    </svg>
  );
};

export const Stats = () => {
  const [numberOfDots] = useAtom(numberOfDotsAtom);
  return (
    <ul>
      <li>Dots: {numberOfDots}</li>
    </ul>
  );
};

function App() {
  return (
    <Layout>
      <SvgRoot />
      <Stats />
    </Layout>
  );
}

export default App;
