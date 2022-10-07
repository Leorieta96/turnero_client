import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDTu6lBk42wumXXZHknnxrvDsyGdajjAsk',
    authDomain: 'mamantulahc.firebaseapp.com',
    databaseURL: 'https://mamantulahc.firebaseio.com',
    projectId: 'mamantulahc',
    storageBucket: 'mamantulahc.appspot.com',
    messagingSenderId: '252597823558',
    appId: '1:252597823558:web:a7865fe9ab94d3b4698247',
    measurementId: 'G-F8CRF8VE1E',
};
const app = initializeApp(firebaseConfig);

/* const storage = app.storage();
 */
export default app;
