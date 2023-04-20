import React, { useState } from 'react';

const NoteEnter = (props) => {
    const [name, setName] = useState('');

    const handleSubmitToAdam = (e) => {
        e.preventDefault();
        props.addNote(name);
        setName('');
    };

    return (
        <form className="noteEnterContainer" onSubmit={handleSubmitToAdam}>
            <input required type="text" placeholder="new note" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">add</button>
        </form>
    );
};

export default NoteEnter;
