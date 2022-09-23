import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Layout from "./components/Layout";

type Point = [number, number];

const dotsAtom = atom<Point[]>([]);
const numberOfDotsAtom = atom((get) => get(dotsAtom).length);

const drawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (get, set, newDot: Point) => {
  set(drawingAtom, true);
  set(dotsAtom, (dots) => [...dots, newDot]);
});

const handleMouseUpAtom = atom(null, (get, set) => set(drawingAtom, false));

const handleMouseMoveAtom = atom(null, (get, set, newDot: Point) => {
  if (get(drawingAtom)) {
    set(dotsAtom, (dots) => [...dots, newDot]);
  }
});

const SvgDots = () => {
  const [dots] = useAtom(dotsAtom);
  return (
    <g>
      {dots.map(([x, y], i) => (
        <circle cx={x} cy={y} r="2" fill="#aaa" />
      ))}
    </g>
  );
};

const useCommitCount = () => {
  const commitCountRef = useRef(0);

  useEffect(() => {
    commitCountRef.current += 1;
  }, []);
  return commitCountRef.current;
};

export const SvgRoot = () => {
  const [, handleMouseUp] = useAtom(handleMouseUpAtom);
  const [, handleMouseMove] = useAtom(handleMouseMoveAtom);
  const [, handleMouseDown] = useAtom(handleMouseDownAtom);
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100% 100%"
      onMouseDown={(e) => {
        handleMouseDown([e.clientX, e.clientY]);
      }}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => {
        handleMouseMove([e.clientX, e.clientY]);
      }}
    >
      <rect width="100%" height="100%" fill="#eee" />
      <text x="3" y="12" fontSize="12px">
        Commits: {useCommitCount()}
      </text>
      <SvgDots />
    </svg>
  );
};

const Stats = () => {
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
