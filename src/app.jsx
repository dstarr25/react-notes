import React, { useEffect, useState } from 'react';
import { produce } from 'immer';
import Note from './components/note';
import NoteEnter from './components/noteEnter';
import {
    fetchNotes, removeNote, createNote, alterNotes,
} from './services/datastore';

const App = () => {
    const [noteNum, setNoteNum] = useState(0);
    const [notes, setNotes] = useState({
        // n10: {
        //     title: 'note',
        //     text: 'this is a note',
        //     x: 500,
        //     y: 100,
        //     zIndex: 0,
        // },
        // n11: {
        //     title: 'penis',
        //     text: 'more penis',
        //     x: 800,
        //     y: 400,
        //     zIndex: -14,
        // },
        // n12: {
        //     title: 'penis',
        //     text: 'more penis',
        //     x: 15,
        //     y: 100,
        //     zIndex: -14,
        // },
        // n13: {
        //     title: 'penis',
        //     text: 'more penis',
        //     x: 1000,
        //     y: 100,
        //     zIndex: -14,
        // },
    });

    const changeNotes = (id, fields) => {
        // setNotes(
        //     produce((draft) => {
        //         draft[id] = { ...draft[id], ...fields };
        //     }),
        // );

        // now firebase:
        alterNotes(id, fields);
    };

    const deleteNote = (id) => {
        setTimeout(() => {
            // setNotes(
            //     produce((draft) => {
            //         delete draft[id];
            //     }),
            // );

            // now firebase:
            removeNote(id);
        }, 900);
    };

    const addNote = (name) => {
        console.log('adding note...');
        // setNotes(
        //     produce((draft) => {
        //         draft[`n${noteNum}`] = {
        //             title: name,
        //             text: '',
        //             x: 180,
        //             y: 420,
        //             zIndex: 0,
        //         };
        //     }),
        // );
        // setNoteNum((val) => val + 1);

        // now firebase:
        createNote(name);
    };

    // instead of componentDidMount which doesn't work with functional components :(
    useEffect(() => {
        fetchNotes((n) => {
            setNotes(n);
        });
    }, []);

    return (
        <div>
            <NoteEnter addNote={addNote} />
            <div id="notesContainer">
                {
                    Object.entries(notes).map(([id, note]) => {
                        console.log(notes);
                        return <Note key={id} deleteNote={deleteNote} changeNotes={changeNotes} id={id} note={note} />;
                    })
                }
            </div>
        </div>
    );
};

export default App;
