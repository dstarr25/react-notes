import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Note = (props) => {
    const [editing, setEditing] = useState(false);
    const [hidden, setHidden] = useState('');
    const [pos, setPos] = useState({
        x: 500, y: 500, xSpeed: 10, ySpeed: 10,
    });
    const noteref = useRef(null);
    const [deleted, setDeleted] = useState(true);

    const moveElt = () => {
        const element = noteref.current;
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;
        const appWidth = window.innerWidth;
        const appHeight = window.innerHeight;

        // console.log(elementWidth, elementHeight, appWidth, appHeight);
        // console.log(elementWidth, elementHeight);
        // console.log(appWidth, appHeight);
        // console.log({
        //     ...pos,
        //     x: pos.x + pos.xSpeed,
        //     y: pos.y + pos.ySpeed,
        // });
        // console.log('pos.x + pos.xSpeed', pos.x + pos.xSpeed, 'pos.x', pos.x, 'pos.xSpeed', pos.xSpeed);
        console.log('x', pos.x, 'y', pos.y);
        console.log({
            ...pos,
            x: pos.x + pos.xSpeed,
            y: pos.y + pos.ySpeed,
        });
        setPos((p) => ({
            ...p,
            x: p.x + p.xSpeed,
            y: p.y + p.ySpeed,
        }));

        if (pos.x + elementWidth >= appWidth || pos.x <= 0) {
            console.log('hitting');
            setPos((p) => ({ ...p, xSpeed: -p.xSpeed }));
        }

        if (pos.y + elementHeight >= appHeight || pos.y <= 0) {
            console.log('hitting');
            setPos((p) => ({ ...p, ySpeed: -p.ySpeed }));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            moveElt();
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
        }, 4000);
    }, [noteref]);

    const handleDrag = (e, data) => {
        // if (data.x < 0 || data.y < 0) return;
        props.changeNotes(props.id, { x: data.x, y: data.y });
        console.log('dragging');
    };

    const renderContent = () => {
        if (!editing) return <ReactMarkdown>{props.note.text || ''}</ReactMarkdown>;

        return (
            <textarea value={props.note.text} onChange={(e) => props.changeNotes(props.id, { text: e.target.value })} />
        );
    };

    return (
        <Draggable
            handle={`#note${props.id} .dragButton`}
            position={!deleted ? {
                x: props.note.x, y: props.note.y,
            } : {
                x: pos.x, y: pos.y,
            }}
            onDrag={handleDrag}

        >
            <div id={`note${props.id}`} className={`note ${hidden}`} ref={noteref}>
                <div className="noteHeader">
                    <span className="noteTitle">{props.note.title}</span>
                    <button type="button" onClick={() => { setHidden('hidden'); props.deleteNote(props.id); }} className="material-symbols-outlined trashButton noteButton">delete</button>
                    <button type="button" onClick={() => { setEditing((val) => !val); console.log(props.id); }} className="material-symbols-outlined editButton noteButton">{editing ? 'done' : 'edit_note'}</button>
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
