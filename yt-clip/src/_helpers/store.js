import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
 
const myPersistReducer = persistReducer(persistConfig, rootReducer)

<<<<<<< HEAD
// const loggerMiddleware = createLogger();
=======
const loggerMiddleware = createLogger();
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac

export const store = createStore(
    myPersistReducer,
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
<<<<<<< HEAD
        // loggerMiddleware
=======
        loggerMiddleware
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
    ))
);

export const persistor = persistStore(store)
