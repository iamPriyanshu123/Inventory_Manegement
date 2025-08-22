import { useState } from "react";
import "./App.css";
import { Sidebar } from "./Components/Sidebar";
import { Category } from "./Components/Category";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Sidebar></Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
