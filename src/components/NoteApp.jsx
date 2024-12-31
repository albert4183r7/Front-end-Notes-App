import React from 'react';
import NoteList from './NoteList';
import { getInitialData } from '../utils/index';
import NoteInput from './NoteInput';
import NoteSearch from './NoteSearch';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchKeyword: '',
    }

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          }
        ]
      }
    });
  }

  onArchiveHandler(id) {
    const notes = this.state.notes.map(note => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });
    this.setState({ notes });
  }

  onSearchHandler(keyword){
    this.setState({ searchKeyword: keyword });
  }


  render() {
    const filteredNotes = this.state.notes.filter(note =>
      note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
    );

    const activeNotes = filteredNotes.filter(note => !note.archived);
    const archivedNotes = filteredNotes.filter(note => note.archived);
    
    const renderNoteSection = (title, notes) => (
      <>
        <h2>{title}</h2>
        {notes.length ? (
          <NoteList 
            notes={notes} 
            onDelete={this.onDeleteHandler} 
            onArchive={this.onArchiveHandler} 
          />
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan</p>
        )}
      </>
    );

    return (
      <>
        <div className="note-app__header">
          <h1>Notes</h1>
          <NoteSearch 
            onSearch={this.onSearchHandler} 
          />
        </div>

        <div className="note-app__body">
          <div className="note-input">
            <h2>Buat Catatan</h2>
            <NoteInput addNote={this.onAddNoteHandler} />
          </div>

          {renderNoteSection('Catatan Aktif', activeNotes)}
          {renderNoteSection('Arsip', archivedNotes)}
        </div>
      </>
    );
  }
}

export default NoteApp;