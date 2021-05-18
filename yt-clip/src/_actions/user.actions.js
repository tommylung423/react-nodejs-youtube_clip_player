import { userConstants } from '../_constants';
import { userService,songService } from '../_services';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getSongLists,
    register
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
        .then(
            user => { 
                dispatch(getSongLists(user._id));              
                dispatch(success(user));
                history.push('/home');
            }
        ).catch(error =>{
            dispatch(failure(error.message));})  
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(name,email, password) {
    return dispatch => {
        dispatch(request({ email }));
        userService.register(name,email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/home');
                }                
            ).catch(error =>{
                dispatch(failure(error.message));})    
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getSongLists(uid) {
    return dispatch => {
        dispatch(request());
        songService.getSongLists(uid)
        .then(
            songlists => { 
                dispatch(success(songlists));               
            }                
        ).catch(error =>{
            dispatch(failure(error.message));}) 
    };
    function request() { return { type: userConstants.GETLIST_REQUEST } }
    function success(songlists) { return { type: userConstants.GETLIST_SUCCESS, payload: songlists } }
    function failure(error) { return { type: userConstants.GETLIST_FAILURE, error } }
}
