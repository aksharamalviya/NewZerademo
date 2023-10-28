import {authActions, homeActions} from '../actionTypes';
import {homeaction} from './homeactiontype';

const getInitialState = () => ({
  isLoading: false,
  profileStatus: true,
  statusImage: null,
});

export const home = (state = getInitialState(), action) => {
  switch (action.type) {

  
    case authActions.STATUS_UPDATE_SUCCESS:
      return {...state, profileStatus: true,statusImage:action.payload};
    case authActions.STATUS_VIEWED_SUCCESS:
      return {...state, profileStatus: false};
    default:
      return state;
  }
};
