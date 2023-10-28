import {combineReducers} from 'redux';
import {persistReducer, purgeStoredState} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from './auth/auth.reducers';
import { home } from './home/home.reducer';


const storage = AsyncStorage;


const homeConfig = {
  key: 'home',
  storage,
  // blacklist: [ 'home'],

};


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['home'],
};

const rootReducer = combineReducers({

  home: persistReducer(homeConfig, home),
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const purgeStore = () => {
  purgeStoredState(persistConfig);
};

export default persistedReducer;
