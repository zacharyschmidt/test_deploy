import { Action, IUIEIA } from '../../types';
import * as types from '../actions/ui/types';

const initialState: IUIEIA = {
  snackbar: { type: undefined, msg: '' }
};

export const uiReducer = (state = initialState, action: Action): IUIEIA => {
  switch (action.type) {
    case types.SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload
      };
    case types.CLEAR_SNACKBAR:
      return {
        ...state,
        snackbar: { type: undefined, msg: '' }
      };
    default:
      return state;
  }
};
