import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../reducers/JobsSlice";

const rootReducer = combineReducers({
    jobs: jobsReducer,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];