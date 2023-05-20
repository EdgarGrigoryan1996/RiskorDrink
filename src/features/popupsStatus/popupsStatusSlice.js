import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settingsPopup:true,
    startResultPopup:false,
};


export const popupsStatusSlice = createSlice({
    name: 'popupStatus',
    initialState,
    reducers: {
        setStatusFalse: (state) => {
          state.settingsPopup = false
        },
        setStartResultPopupStatus: (state,action) => {
            state.startResultPopup = action.payload.status
        }
    },
});

export const { setStatusFalse,setStartResultPopupStatus } = popupsStatusSlice.actions;



export default popupsStatusSlice.reducer;
