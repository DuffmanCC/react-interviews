import { useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const counterRef = useRef(0);

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">useState and useRef counter</h1>

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-row items-center gap-6">
          <button
            className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-700 text-white"
            onClick={() => setCount(count + 1)}
          >
            Count state
          </button>

          <span data-testid="state-value">{count}</span>
        </div>

        <div className="flex flex-row items-center gap-6">
          <button
            className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-700 text-white"
            onClick={() => counterRef.current++}
          >
            Count ref
          </button>

          <span data-testid="ref-value">{counterRef.current}</span>
        </div>
      </div>
    </main>
  );
}

export default App;
