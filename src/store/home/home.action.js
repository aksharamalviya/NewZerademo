import {authActions} from '../actionTypes';

import {Alert} from 'react-native';

export const _doStausUpdate = (data) => {
  return dispatch => {
    dispatch({type: authActions.STATUS_UPDATE_SUCCESS,payload:data})


  };
};
export const _doStausViewed = () => {
  return dispatch => {
    dispatch({type: authActions.STATUS_VIEWED_SUCCESS});
  };
};
