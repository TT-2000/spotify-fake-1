import { createSlice } from "@reduxjs/toolkit";

export const playReducer = createSlice({
    name: "actionPlaying",
    initialState: {
        isPlaying: false,
        trackId: null,
        artist_page: null,
    },
    reducers: {
        isPlaying: (state, action) => {
            state.isPlaying = action.payload || false
        },

        curTrack: (state, action) => {
            state.trackId = action.payload || null
        },


    }
})


export const { isPlaying, curTrack } = playReducer.actions

export default playReducer.reducer;