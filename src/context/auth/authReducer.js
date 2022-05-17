import {
  REGISTER_USER,
  SET_LOCAL_INITIAL,
  SET_USER,
  LOGOUT_USER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOCAL_INITIAL:
      return {
        ...state,
        localInitial: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        localInitial: null,
      };
    default:
      return state;
  }
};
