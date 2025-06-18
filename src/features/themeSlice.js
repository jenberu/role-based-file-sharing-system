import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    theme: localStorage.getItem("theme") || "light", // Default theme is light
};
  
const themeSlice = createSlice({
    name: "theme", // Prefix for action types
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light"? "dark" : "light";
            localStorage.setItem("theme", state.theme);
        },
    },
})
export const { toggleTheme } = themeSlice.actions  // action creator
export default themeSlice.reducer; // reducers