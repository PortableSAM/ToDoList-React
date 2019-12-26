import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  render(props) {
    return (
      <div className="note fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.noteId)}
        >
          <i className="fas fa-eraser" />
        </span>
        <p className="noteContent">{this.noteContent}</p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};
