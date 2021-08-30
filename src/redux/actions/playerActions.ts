import { PlayerActionTypes } from './../actionTypes';

export const PlayAction = (data: any) => ({
    type: PlayerActionTypes.PLAY,
    playing: data
});
export const UpdateCurrentTime = (currentTime: any) => ({
    type: PlayerActionTypes.PLAYING,
    currentTime
});