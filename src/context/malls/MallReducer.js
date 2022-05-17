import {GET_MALLS} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MALLS:
      return {
        ...state,
        malls: action.payload,
      };
    default:
      return state;
  }
};
