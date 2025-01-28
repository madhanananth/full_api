import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const registerationAsync = createAsyncThunk("auth/registeration", async(registerationData,{rejectWithValue})=>{

    try{
        const response = await fetch ("https://todo-learnz-development-hubs-projects.vercel.app/register",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            }, 
            body: JSON.stringify(registerationData)
        })

        if(!response.ok){
            throw new Error("Error:Registeration failed")
        }
        return await response.json()

    } catch (error){
        return rejectWithValue(error.message) 
    }
})




const authSlice = createSlice({
    name : "auth",
    initialState: {
        data:{},
        registerError: null,
        registerLoading: false,
        registerStatus: 'idle'
    }, 
    extraReducers:(builder) =>{
        builder
        .addCase(registerationAsync.pending, (state)=>{
            state.registerLoading = true 
            state.registerError = null 
            state.registerStatus = "pending"
        })
        .addCase(registerationAsync.fulfilled, (state, action)=>{
            state.registerLoading = false
            state.data = action.payload
            state.registerStatus = "success"
        })
        .addCase(registerationAsync.rejected, (state, action)=>{
            state.registerLoading = false 
            state.registerError = action.payload 
            state.registerStatus = "failed"
        })
        
    }
})

export default authSlice.reducer;