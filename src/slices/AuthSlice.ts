import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { LoginFormData, SignupType, LoginState, OauthAction } from "../utils/types";
import { postAuthRequest } from "../utils/helper/helper"




const initialState: LoginState = {
  userData: [],
  loading: false,
  error: null
}



export const createUser = createAsyncThunk(
  'auth/signUp',
  async (payload: SignupType) => {
    const response = await postAuthRequest("/auth/regUser", payload)
    if (response?.status === 200) {
      localStorage.setItem('token', response?.data?.token)
    }

  }
)


export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (payload: string) => {
    const response = await postAuthRequest("/auth/request_reset", payload)
    if (response?.status === 200) {
      localStorage.setItem('token', response?.data?.token)
    }
    else {
      console.log({response})
    }

  }
)



export const oauthLogin = createAsyncThunk(
  'auth/oauth',
  async (payload: OauthAction) => {
    var response = await postAuthRequest('/auth/login/oAuthGo', payload)
    if (response?.status === 200) {
      localStorage.setItem('token', response?.data?.token)
    }
  }
)


export const signInUser = createAsyncThunk(
  'auth/signin',
  async (payload: LoginFormData) => {
    const response = await postAuthRequest("/auth/login", payload)
    if (response?.status === 200) {
      localStorage.setItem('token', response?.data?.token)
    }

  }
)


export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(createUser.fulfilled, (state, action) => {


      }),
      builder.addCase(createUser.rejected, (state, action) => {
        state.loading = false,
          state.error = action.payload
      }),
      builder.addCase(signInUser.pending, (state, action) => {
        state.loading = true
      }),
      builder.addCase(signInUser.fulfilled, (state, action) => {
      })
    builder.addCase(signInUser.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(forgetPassword.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(forgetPassword.fulfilled, (state, action) => {
      })
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(oauthLogin.fulfilled, (state, action) => {

    })
  }
})

export const loginState = (state: RootState) => state.auth.userData;

export default AuthSlice.reducer;