import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./helloReducer";
import counterReducer from "./counterReducer";
import addReducer from "./addReducer";
import todosReducer from "./todosReducer";

export const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
