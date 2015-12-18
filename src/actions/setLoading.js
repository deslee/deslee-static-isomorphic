import AppStore, {appStoreDispatcher} from '../stores/AppStore'
import actionTypes from '../constants/ActionTypes'

export default loading => loading ? appStoreDispatcher({type:actionTypes.LOADING_STARTED}) : appStoreDispatcher({type:actionTypes.LOADING_FINISHED})
