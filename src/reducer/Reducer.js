import {SIGNIN, ISSEARCH, AUTHENTICATE} from '../actions/ActionType';

export const Reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                signInEnabled: action.payload.signInEnabled
            }
        case ISSEARCH:
            return {
                ...state,
                searchEnabled: action.payload.searchEnabled
            }
        case AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        default:
            return state;
    }
}