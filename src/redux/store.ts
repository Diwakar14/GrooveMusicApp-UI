import { createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
let myWindow: any = window;
export const store = createStore(rootReducer, myWindow.__REDUX_DEVTOOLS_EXTENSION__ && myWindow.__REDUX_DEVTOOLS_EXTENSION__());