import React from "react";
import "./App.css";
import NoteApp from "./Components/ToDo/NoteApp";

function App() {
  return (
    <div className="App">
      <h1>Hello React World with To Do List</h1>
      <div style={{ display: "flex" }}>
        <NoteApp />
      </div>
    </div>
  );
}

export default App;
