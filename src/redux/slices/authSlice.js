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

export const loginAsync = createAsyncThunk("auth/login", async(loginData,{rejectWithValue})=>{

    try{
        const response = await fetch ("https://todo-learnz-development-hubs-projects.vercel.app/login",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            }, 
            body: JSON.stringify(loginData)
        })

        if(!response.ok){
            throw new Error("Error:Login failed")
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
        registerStatus: 'idle',
        loginData:{access_token: localStorage.getItem('accessToken') || ""},
        loggedIn : localStorage.getItem("loggedIn") == "true" ? true : false ,
        loginError: null,
        loginLoading: false,
        loginStatus: 'idle'
    },
    reducers:{
        authReset:(state)=> {
            state.registerError = null
            state.registerLoading = false
            state.registerStatus = 'idle'
            state.loginError = null
            state.loginLoading = false
            state.loginStatus = 'idle'

        },loggedOut : (state) => {
            state.loginData= {}
            state.loggedIn = false
            localStorage.clear()
        }

    } ,
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
        .addCase(loginAsync.pending, (state)=>{
            state.loginLoading = true
            state.loginError = null
            state.loginStatus = "pending"
        })
        .addCase(loginAsync.fulfilled, (state , action)=>{
            state.loginLoading = false 
            state.loginData = action.payload
            state.loginStatus = "success",
            state.loggedIn = "true"
            localStorage.setItem('accessToken', action.payload.access_token)
            localStorage.setItem('loggedIn', "true")
        })
        .addCase(loginAsync.rejected, (state, action)=>{
            state.loginLoading = false 
            state.loginError = action.payload
            state.loginStatus = "failed"
        })
        
        
    }
});
export const {authReset, loggedOut} = authSlice.actions;
export default authSlice.reducer;