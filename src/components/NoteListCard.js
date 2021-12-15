import React from 'react';
import PropTypes from 'prop-types';
import { deleteNote } from '../api/data/carData';

export default function NoteListCard({ noteObj, setNoteCards }) {
  const deleteNoteObj = () => {
    deleteNote(noteObj.firebaseKey).then(setNoteCards);
  };
  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{noteObj.note}</h5>
          <button
            onClick={() => deleteNoteObj()}
            className="btn btn-danger"
            type="button"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

NoteListCard.propTypes = {
  noteObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    itemID: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
  setNoteCards: PropTypes.func.isRequired,
};
