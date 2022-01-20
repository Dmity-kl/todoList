import {Dispatch} from 'redux';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from "../../api/authAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {todolistsAPI} from "../../api/todolists-api";

const initialState = {
    isLoggedIn: false,
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value};


        default:
            return state;
    }
};
export const setIsLoggedInAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const;
};

export const setIsLoggedInTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('idle'))
            }else{
                handleServerAppError(res.data, dispatch);
            }
        })
};

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.logout()
        .then((res)=>{
            if (res.data.resultCode===0){
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('idle'));
            }
        })

}


type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType