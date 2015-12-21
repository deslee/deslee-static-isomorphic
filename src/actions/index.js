import AppStore, {appStoreDispatcher} from '../stores/AppStore'
import actionTypes from '../constants/ActionTypes'

export function setLoading(loading) {
  loading ? appStoreDispatcher({type: actionTypes.LOADING_STARTED}) : appStoreDispatcher({type: actionTypes.LOADING_FINISHED})
}

export function toggleSnowing() {
  appStoreDispatcher({type: actionTypes.TOGGLE_SNOWING_EFFECT})
}

export function toggleTilting() {
  appStoreDispatcher({type: actionTypes.TOGGLE_TILTING})
}
