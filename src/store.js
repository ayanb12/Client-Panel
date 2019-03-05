import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//reducers
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
	apiKey: "AIzaSyD6EcoyuCJPv-5wdxeW4Go2rV7OCOXMpr4",
    authDomain: "reactclientpanel-53939.firebaseapp.com",
    databaseURL: "https://reactclientpanel-53939.firebaseio.com",
    projectId: "reactclientpanel-53939",
    storageBucket: "reactclientpanel-53939.appspot.com",
    messagingSenderId: "9132336585"
}

//react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
// const settings = {timestampsInSnapshots: true};
// firestore.settings(settings)

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	 reduxFirestore(firebase) // <- needed if using firestore
 )(createStore)


 // Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer, // <- needed if using firestore
	notify: notifyReducer,
	settings: settingsReducer
 })

//check for settings oin localstorage
if(localStorage.getItem('settings') === null) {
	//default settings
	const defaultSettings = {
	disableBalanceOnAdd: true,
	disableBalanceOnEdit: false,
	allowRegistration: false
	}

	//set to localstorage
	localStorage.setItem('settings', JSON.stringify(defaultSettings))
}


 //create initial state
 const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

 //create store
 const store = createStoreWithFirebase(rootReducer, initialState, compose(
	 reactReduxFirebase(firebase),
	 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 ))

export default store