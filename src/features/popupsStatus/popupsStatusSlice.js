import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settingsPopup:true,
};


export const popupsStatusSlice = createSlice({
    name: 'popupStatus',
    initialState,
    reducers: {
        setStatusFalse: (state) => {
          state.settingsPopup = false
        }
    },
});

export const { setStatusFalse } = popupsStatusSlice.actions;



export default popupsStatusSlice.reducer;
