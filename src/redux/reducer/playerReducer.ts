import { PlayerActionTypes } from './../actionTypes';
interface IState {
    playing: object,
    currentTime: string | number
}

const INITIAL_STATE: IState = {
    playing: {},
    currentTime: ''
}

export const PlayerReducer = (state: IState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case PlayerActionTypes.PLAY:
            return {
                ...state,
                playing: action.playing
            }
        case PlayerActionTypes.PLAYING:
            return {
                ...state,
                currentTime: action.currentTime
            }


        default:
            return state
    }
}