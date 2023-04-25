// import firebase from 'firebase/compat/app';
// import { GoogleAuthProvider } from 'firebase/compat/auth';
// import 'firebase/compat/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get, remove, update, push } from 'firebase/database';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// ^ we are using compat notation here as the new firebase 9 api is a mess and i kinda hate it
// NOPE I'm using modern notation lol get rekt
// but really it was just to get google auth working I couldn't figure it out with the compat notation stuff :(

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
let listener = null;

// export function fetchNotes(callback) {
//     db.ref('notes').get().then((snapshot) => {
//         callback(snapshot.exists() ? snapshot.val() : {});
//     });

//     db.ref('notes').on('value', (snapshot) => {
//         callback(snapshot.exists() ? snapshot.val() : {});
//     });
// }

export function fetchNotes(user, callback) {
    if (listener) listener();
    const notesRef = ref(db, user.localId);
    get(notesRef).then((snapshot) => {
        if (!snapshot.exists()) {
            const welcomeNote = {
                title: user.localId !== 'guest' ? `Hello, ${user.displayName}` : 'Welcome to the guest page',
                text: user.localId !== 'guest' ? `Welcome to your private notes page.\n You are logged in as ${user.email}` : 'Hit the button down to the right to sign in with google and create your own private notes page!',
                x: 100,
                y: 100,
                zIndex: 0,
            };
            callback({ welcomeNote });
            push(notesRef, welcomeNote);
            return;
        }
        callback(snapshot.val());
    });
    listener = onValue(notesRef, (snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : {});
    });
}

// export function removeNote(id) {
//     db.ref('notes').child(id).remove();
// }

export function removeNote(user, id) {
    const refToNote = ref(db, `${user}/${id}`);
    remove(refToNote);
}

// export function createNote(name) {
//     const note = {
//         title: name,
//         text: '',
//         x: 180,
//         y: 420,
//         zIndex: 0,
//     };
//     db.ref('notes').push(note);
// }

// export function createNote(name) {
//     const note = {
//         title: name,
//         text: '',
//         x: 180,
//         y: 420,
//         zIndex: 0,
//     };
//     db.ref('notes').push(note);
// }

export function createNote(user, name) {
    const note = {
        title: name,
        text: '',
        x: 180,
        y: 420,
        zIndex: 0,
    };
    const notesRef = ref(db, user);
    push(notesRef, note);
}

// export function alterNotes(id, fields) {
//     db.ref(`notes/${id}`).update(fields);
// }

export function alterNotes(user, id, fields) {
    // db.ref(`notes/${id}`).update(fields);
    const refToNote = ref(db, `${user}/${id}`);
    update(refToNote, fields);
}

export function googleLogin(setUser) {
    signInWithPopup(auth, provider).then((res) => {
        console.log('about to call setUser function');
        console.log(res.user.reloadUserInfo);
        setUser(res.user.reloadUserInfo);
    }).catch((e) => {
        console.log(e);
    });
}
