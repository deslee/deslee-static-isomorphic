import { createStore } from 'redux'
import actionTypes from '../constants/ActionTypes'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

var initial = {
  pageLoading: false,
  isSnowing: false,
  effects: {

  }
};

export var appStoreDispatcher = event => {
  if (canUseDOM) {
    AppStore.dispatch(event);
  }
};

var AppStore = createStore((state = initial, action) => {
  console.log('action', action.type);
  switch(action.type) {
    case (actionTypes.LOADING_STARTED):
      state.pageLoading = true;
      break;
    case (actionTypes.LOADING_FINISHED):
      state.pageLoading = false;
      break;
    case (actionTypes.TOGGLE_SNOWING_EFFECT):
      state.isSnowing = !state.isSnowing;
      break;
    case (actionTypes.TOGGLE_TILTING):
      state.isTilting = !state.isTilting;
      break;
  }

  return state;
});

export default AppStore;
