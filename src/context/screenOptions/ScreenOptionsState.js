import React, {useReducer} from 'react';

import ScreenOptionsContext from './ScreenOptionsContext';
import ScreenOptionsReducer from './ScreenOptionsReducer';

import {SHOW_HEADER_DRAWER} from '../types';

const ScreenOptionsState = props => {
  const initialState = {
    showHeaderDrawer: true,
  };

  const [state, dispatch] = useReducer(ScreenOptionsReducer, initialState);

  const ChangeShowHeaderDrawer = show => {
    dispatch({
      type: SHOW_HEADER_DRAWER,
      payload: show,
    });
  };

  return (
    <ScreenOptionsContext.Provider
      value={{
        showHeaderDrawer: state.showHeaderDrawer,
        ChangeShowHeaderDrawer,
      }}>
      {props.children}
    </ScreenOptionsContext.Provider>
  );
};

export default ScreenOptionsState;
