import React, { Component } from "react";
import Note from "./Note";
import NoteForm from "../ToDoForm/ToDoForm";

export default class NoteApp extends Component {
  render() {
    return (
      <div>
        <h2>NoteApp</h2>
        <div>
          <Note />
          <NoteForm />
        </div>
      </div>
    );
  }
}
