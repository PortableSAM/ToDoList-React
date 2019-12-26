import React from "react";
import Note from "./Note";
import "./NoteApp.css";
import NoteForm from "../ToDoForm/ToDoForm";
import { DB_CONFIG } from "../Firebase/DB_CONFIG";
import firebase from "firebase/app";
import "firebase/database";
import { Container } from "react-bootstrap";

export default class TestNoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("notes");

    // We're going to setup the React state of our component
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    const previousNotes = this.state.notes;

    // DatabaseSnapshot
    this.database.on("child_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({
        notes: previousNotes
      });
    });

    this.database.on("child_removed", snap => {
      for (let i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: previousNotes
      });
    });
  }

  addNote(note) {
    this.database.push().set({ noteContent: note });
  }

  removeNote(noteId) {
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <Container>
        <div className="notesWrapper">
          <div className="notesHeader">
            <h1>To-Do List</h1>
          </div>
          <div className="notesBody">
            {this.state.notes.map(note => {
              return (
                <Note
                  noteContent={note.noteContent}
                  noteId={note.id}
                  key={note.id}
                  removeNote={this.removeNote}
                />
              );
            })}
          </div>
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </Container>
    );
  }
}
