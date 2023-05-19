import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameSettingsReducer from "../features/gameSettings/gameSettingsSlice";
import popupsStatusSlice from "../features/popupsStatus/popupsStatusSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameSettings:gameSettingsReducer,
    popupsStatus:popupsStatusSlice
  },
});
