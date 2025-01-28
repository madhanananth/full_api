import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice";

const store = configureStore({
    reducer:{
        auth:authReducer,
    }
})

export default store;