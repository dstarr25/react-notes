import React, { useEffect, useState } from 'react';
import { produce } from 'immer';
import Draggable from 'react-draggable';
import Note from './components/note';
import NoteEnter from './components/noteEnter';
import Loginout from './components/loginout';
import {
    fetchNotes, removeNote, createNote, alterNotes, googleLogin,
} from './services/datastore';

const App = () => {
    const [notes, setNotes] = useState({});
    const [user, setUser] = useState({ localId: 'guest' });

    const changeNotes = (id, fields) => {
        alterNotes(user.localId, id, fields);
    };

    const deleteNote = (id) => {
        setTimeout(() => {
            removeNote(user.localId, id);
        }, 900);
    };

    const addNote = (name) => {
        createNote(user.localId, name);
    };

    const loginNewUser = (newUser) => {
        setUser(newUser);
        fetchNotes(newUser, (n) => {
            setNotes(n);
        });
    };

    const logoutUser = () => {
        loginNewUser({ localId: 'guest' });
    };

    // instead of componentDidMount which doesn't work with functional components :(
    useEffect(() => {
        fetchNotes(user, (n) => {
            setNotes(n);
        });
    }, []);

    return (
        <div id="appContainer">
            <NoteEnter addNote={addNote} />
            <div id="notesContainer">
                {
                    Object.entries(notes).map(([id, note]) => {
                        // console.log(notes);
                        return <Note key={id} deleteNote={deleteNote} changeNotes={changeNotes} id={id} note={note} />;
                    })
                }
            </div>
            <Loginout user={user} loginNewUser={loginNewUser} logoutUser={logoutUser} />
        </div>
    );
};

export default App;
