import { userConstants } from '../_constants';

export function songlists(state = {}, action) {
  switch (action.type) {
    case userConstants.GETLIST_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETLIST_SUCCESS:
      return {
        items:action.payload
      };
    case userConstants.GETLIST_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}