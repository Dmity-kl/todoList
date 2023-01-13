import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/auth-Reducer";
import {authAPI} from "../api/authAPI";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized};
        default:
            return {...state};
    }
};

export const initialStateTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    debugger
    authAPI.autMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            }
            dispatch(setAppStatusAC('idle'));
        })
        .finally(() => {
                dispatch(setIsInitializedAC(true));
            },
        );
};


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized,
} as const);

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setIsInitializedActionType
