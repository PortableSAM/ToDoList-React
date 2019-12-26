import React from "react";
import "./App.css";
import NoteApp from "./Components/ToDo/NoteApp";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <NoteApp />
      </div>
    </div>
  );
}

export default App;
