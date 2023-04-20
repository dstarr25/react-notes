import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

const speed = { x: 3, y: 3 };

const Note = (props) => {
    const [editing, setEditing] = useState(false);
    const [hidden, setHidden] = useState('');
    const [pos, setPos] = useState({
        x: 500, y: 500, xSpeed: speed.x, ySpeed: speed.y,
    });
    const noteref = useRef(null);
    const [dvding, setDvding] = useState(false);

    const moveElt = () => {
        if (!dvding) return;
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

        if (pos.x + elementWidth >= appWidth) {
            console.log('hitting');
            setPos((p) => ({ ...p, xSpeed: -speed.x }));
        }

        if (pos.y + elementHeight >= appHeight) {
            console.log('hitting');
            setPos((p) => ({ ...p, ySpeed: -speed.y }));
        }

        if (pos.x <= 0) {
            console.log('hitting');
            setPos((p) => ({ ...p, xSpeed: speed.x }));
        }

        if (pos.y <= 0) {
            console.log('hitting');
            setPos((p) => ({ ...p, ySpeed: speed.y }));
        }
    };

    useInterval(() => {
        moveElt();
    }, 10);

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

    const toggleDvding = (bool) => {
        setDvding(bool);
        if (bool) {
            setPos((p) => ({ ...p, x: props.note.x, y: props.note.y }));
            return;
        }
        props.changeNotes(props.id, { x: pos.x, y: pos.y });
    };

    return (
        <Draggable
            handle={`#note${props.id} .dragButton`}
            onDrag={handleDrag}
            position={!dvding ? {
                x: props.note.x, y: props.note.y,
            } : {
                x: pos.x, y: pos.y,
            }}

        >
            <div id={`note${props.id}`} className={`note ${hidden}`} ref={noteref} onMouseEnter={() => { if (!dvding) return; setDvding(false); props.changeNotes(props.id, { x: pos.x, y: pos.y }); }} style={{ zIndex: props.note.zIndex }} onMouseLeave={() => props.changeNotes(props.id, { zIndex: 0 })} onClick={() => props.changeNotes(props.id, { zIndex: 1 })}>
                <div className="noteHeader">
                    <span className="noteTitle">{props.note.title}</span>
                    <button type="button" onClick={() => { setHidden('hidden'); if (dvding) toggleDvding(false); props.deleteNote(props.id); }} className="material-symbols-outlined trashButton noteButton">delete</button>
                    <button type="button" onClick={() => { toggleDvding(!dvding); }} className="material-symbols-outlined trashButton noteButton">motion_blur</button>
                    <button type="button" onClick={() => { setEditing((val) => !val); console.log(pos); }} className="material-symbols-outlined editButton noteButton">{editing ? 'done' : 'edit_note'}</button>
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
