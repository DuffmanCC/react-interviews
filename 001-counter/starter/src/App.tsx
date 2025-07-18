function App() {
  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">useState and useRef counter</h1>
      <div className="flex flex-col items-center gap-6 py-1">
        <div className="flex flex-row items-center gap-6">
          <button className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-700 text-white">
            Count state
          </button>

          <span data-testid="state-value"></span>
        </div>

        <div className="flex flex-row items-center gap-6">
          <button className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-700 text-white">
            Count ref
          </button>

          <span data-testid="ref-value"></span>
        </div>

        <button className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-700 text-white">
          send message
        </button>
      </div>
    </main>
  );
}

export default App;
