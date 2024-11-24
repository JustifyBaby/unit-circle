import { useState } from "react";
import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Params from "./components/Params";

function App() {
  const [type, setType] = useState("sin");
  const [value, setValue] = useState(0);

  return (
    <main className='h-[90vh] overflow-hidden flex flex-col justify-center items-center'>
      <Canvas type={type} value={value} />
      <Params setType={setType} setValue={setValue} />
    </main>
  );
}

export default App;
