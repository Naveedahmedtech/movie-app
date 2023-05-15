import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    url: {},
    geners: {}
}

export const movieSlice = createSlice({
    name: "movie",
    initialState, 
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGeneres: (state, action) => {
            state.geners = action.payload;
        }
    }
})

export const movieState = state => state.movie;

export const { getApiConfiguration, getGeneres } = movieSlice.actions;
