import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import PropTypes from 'prop-types';
import {
  getItemsFB,
  deleteItem,
  getNotes,
  createNote,
} from '../api/data/carData';
import NoteListCard from './NoteListCard';

const initialState = {
  note: '',
};
// card is obj {}, notecards is array [], better call card like stuffitem instead of card - URL hint
export default function CardDetail() {
  const [card, setCard] = useState({});
  const [noteCards, setNoteCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formNote, setFormNote] = useState(initialState);
  const { firebaseKey } = useParams();
  // const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    getItemsFB(firebaseKey).then((cardObj) => {
      if (isMounted) setCard(cardObj);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);
  // since need to track change in notcard separately, created a new useeffect
  useEffect(() => {
    let isMounted = true;
    getNotes(firebaseKey).then((notes) => {
      if (isMounted) setNoteCards(notes);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);
  // moved notecard from dependency array because of infinite loop
  // added setNoteCards(notes); to handle submit
  // every time notecards changes get it gain/refresh it

  const handleClick = (method) => {
    if (method === 'delete') {
      deleteItem(card).then((notes) => {
        setNoteCards(notes);
      });
      // deleteItem(card).then(history.push('/all'));
    }
    if (method === 'addnote') {
      setShowForm(true);
    }
  };
  const resetForm = () => {
    setFormNote(initialState);
  };
  const handleSubmit = (e) => {
    // console.warn(e.noteobj.value);
    e.preventDefault();
    createNote({ ...formNote, itemID: card.firebaseKey }).then((notes) => {
      setNoteCards(notes);
      resetForm();
      setShowForm(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{card.make}</h5>
          <h5 className="card-text">{card.model}</h5>
          <button
            onClick={() => handleClick('delete')}
            className="btn btn-danger"
            type="button"
          >
            Delete Car
          </button>
          <button
            onClick={() => handleClick('addnote')}
            className="btn btn-info"
            type="button"
          >
            Add Car
          </button>
          {showForm ? (
            <form onSubmit={handleSubmit}>
              <div className="m-3">
                <label htmlFor="note" className="form-label visually-hidden">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="note"
                  rows="3"
                  name="note"
                  value={formNote.note}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="m-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            ''
          )}
          <div className="d-flex flex-wrap">
            {noteCards.map((note) => (
              <NoteListCard key={note.firebaseKey} noteObj={note} setNoteCards={setNoteCards} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
