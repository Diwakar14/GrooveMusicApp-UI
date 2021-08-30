import { PlayerReducer } from './playerReducer';
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({ PlayerReducer });