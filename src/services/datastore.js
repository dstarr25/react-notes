import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// ^ we are using compat notation here as the new firebase 9 api is a mess and i kinda hate it

const firebaseConfig = {
    apiKey: 'AIzaSyAV_e-ZmWbnF7QJ_TyYcu8gypm9any8k9A',
    authDomain: 'firenotes-78d8b.firebaseapp.com',
    databaseURL: 'https://firenotes-78d8b-default-rtdb.firebaseio.com',
    projectId: 'firenotes-78d8b',
    storageBucket: 'firenotes-78d8b.appspot.com',
    messagingSenderId: '140120380695',
    appId: '1:140120380695:web:f0c1b503efccf338335352',
    measurementId: 'G-MCFPZXQERH',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export function fetchNotes(callback) {
    // do something here
    // firebase.database(app).ref('notes').on('value', (snapshot) => {
    //     const newNoteState = snapshot.val();
    //     return (newNoteState);
    //     // do something with new note state
    // });
    db.ref('notes').get().then((snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : {});
    });

    db.ref('notes').on('value', (snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : {});
    });
}

export function removeNote(id) {
    firebase.database().ref('notes').child(id).remove();
}

export function createNote(name) {
    const note = {
        title: name,
        text: '',
        x: 180,
        y: 420,
        zIndex: 0,
    };
    firebase.database().ref('notes').push(note);
}

export function alterNotes(id, fields) {
    firebase.database().ref(`notes/${id}`).update(fields);
}
