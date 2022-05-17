import {SHOW_HEADER_DRAWER} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SHOW_HEADER_DRAWER:
      return {
        ...state,
        showHeaderDrawer: action.payload,
      };
    default:
      return state;
  }
};
