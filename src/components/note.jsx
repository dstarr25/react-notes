import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Note = (props) => {
    const [editing, setEditing] = useState(false);

    const handleDrag = (e, data) => {
        if (data.x < 0 || data.y < 0) return;
        props.changeNotes(props.id, { x: data.x, y: data.y });
        console.log('dragging');
    };

    const renderContent = () => {
        if (!editing) return <ReactMarkdown>{props.note.text || ''}</ReactMarkdown>;

        return (
            // <input value={props.note.text} onChange={(e) => props.changeNotes({ text: e.target.value })} />
            <textarea value={props.note.text} onChange={(e) => props.changeNotes(props.id, { text: e.target.value })} />
        );
    };

    return (
        <Draggable
            handle={`#note${props.id} .dragButton`}
            position={{
                x: props.note.x, y: props.note.y, width: 'auto', height: 'auto',
            }}
            onDrag={handleDrag}

        >
            <div id={`note${props.id}`} className="note">
                <div className="noteHeader">
                    <span className="noteTitle">{props.note.title}</span>
                    <span onClick={() => { console.log(props.id); props.deleteNote(props.id); }} className="material-symbols-outlined trashButton noteButton">delete</span>
                    <span onClick={() => { setEditing((val) => !val); console.log(props.id); }} className="material-symbols-outlined editButton noteButton">edit_note</span>
                    <span className="material-symbols-outlined dragButton noteButton">drag_pan</span>
                </div>

                <div className="noteContent">
                    {renderContent()}
                </div>

            </div>
        </Draggable>
    );
};

export default Note;
