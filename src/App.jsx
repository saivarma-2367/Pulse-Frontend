import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://localhost:5001/")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <div className="app">
      <h1>Pulse</h1>
      <p>Your work. One clear focus.</p>
    </div>
  );
}

export default App;
