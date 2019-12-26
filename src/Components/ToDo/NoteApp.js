import React, { Component } from "react";
import Note from "./Note";
import NoteForm from "../ToDoForm/ToDoForm";
import { DB_CONFIG } from "../Firebase/DB_CONFIG";
import firebase from "firebase/app";

export default class NoteApp extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("notes");

    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    const previousNotes = this.state.notes;

    //Database Snapshots
    this.database.on("chlid_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
    });

    this.setState({
      notes: previousNotes
    });

    this.database.on("child_removed", snap => {
      for (let i = 0; i < previousNotes.length; ++i) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.slice(i, 1);
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
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}
