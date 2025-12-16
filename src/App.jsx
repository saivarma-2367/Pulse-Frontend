import { useEffect } from "react";
import "./App.css";
import Login from "./pages/NewLogin";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";

function App() {
  useEffect(() => {
    fetch("http://localhost:5001/")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <div className="app">
      <h1>Pulse</h1>
      <DashBoard />
    </div>
  );
}

export default App;
