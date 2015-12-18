import { createStore } from 'redux'
import actionTypes from '../constants/ActionTypes'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

var initial = {
  pageLoading: false
};

export var appStoreDispatcher = event => {
  if (canUseDOM) {
    AppStore.dispatch(event);
  }
};

var AppStore = createStore((state = initial, action) => {
  switch(action.type) {
    case (actionTypes.LOADING_STARTED):
      state.pageLoading = true;
      break;
    case (actionTypes.LOADING_FINISHED):
      state.pageLoading = false;
      break;
  }

  return state;
});

export default AppStore;
