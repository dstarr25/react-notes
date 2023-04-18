import React, { useState } from 'react';
import { produce } from 'immer';
import Note from './components/note';

const App = () => {
    const [notes, setNotes] = useState({
        n0: {
            title: 'cat eating tail',
            text: '![](http://i.giphy.com/gyRWkLSQVqlPi.gif) this is cat',
            x: 1000,
            y: 0,
            zindex: 0,
        },
        n1: {
            title: 'noteTitle',
            text: 'noteText',
            x: 0,
            y: 0,
            zindex: 0,
        },
        n2: {
            title: 'four',
            text: 'sdojfhiusaof',
            x: 500,
            y: 400,
            zindex: 0,
        },
        n3: {
            title: 'number thoher',
            text: 'ur mother',
            x: 2000,
            y: 0,
            zindex: 0,
        },
    });

    const changeNotes = (id, fields) => {
        setNotes(
            produce((draft) => {
                draft[id] = { ...draft[id], ...fields };
            }),
        );
    };

    const deleteNote = (id) => {
        setNotes(
            produce((draft) => {
                delete draft[id];
            }),
        );
    };

    return (
        <div id="notesContainer">
            {
                Object.entries(notes).map(([id, note]) => {
                    return <Note deleteNote={deleteNote} changeNotes={changeNotes} id={id} note={note} />;
                })
            }
        </div>
    );
};

export default App;
