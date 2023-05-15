import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "../features/movieSlice";

const store = configureStore({
    reducer: {
        movie: movieSlice.reducer,
    }
})

export default store;
