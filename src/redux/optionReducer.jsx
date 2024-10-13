import { createSlice } from "@reduxjs/toolkit";

const optionReducer = createSlice({
    name: "actionsOption",
    initialState: {
        libraryType: null,
        isToggleLayoutCurrentSong: false,
        isDiscographyFormat: false,
        isFormatListTrack: false,
    },

    reducers: {
        actionLibraryType: (state, action) => {
            state.libraryType = action.payload
        },
        actionLayoutCurrentSong: (state, action) => {
            state.isToggleLayoutCurrentSong = action.payload
        },
        actionDiscographyFormat: (state, action) => {
            state.isDiscographyFormat = action.payload
        },
        actionFormatListTracks: (state, action) => {
            state.isFormatListTrack = action.payload
        },

    }

})

export const { actionLibraryType, actionLayoutCurrentSong, actionDiscographyFormat, actionFormatListTracks } = optionReducer.actions

export default optionReducer.reducer
