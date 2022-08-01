import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import { PayoutBody, PayoutState, ProfileState } from "../utils/types";
import { bankVerification, getRequest, postAuthRequest, postRequest, specialGetRequest, specialPostRequest } from "../utils/helper/helper"





const initialState: ProfileState = {
    profile: null,
    loading: null,
    error: null
}



export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async () => {
        const response = await specialGetRequest(`/auth/identity`)
        if (response?.status === 200) {
            return response?.data?.data[0]
        }
    }
)

export const changePassword = createAsyncThunk(
    'profile/changePassword',
    async (payload: any) => {
        const response = await postAuthRequest('/auth/request_reset', payload)
        if (response?.status === 200) {
            return response?.data?.data[0]
        }
    }
)

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (payload: {lName?: string, fName?: string, email?: string, mobile?: string, imgUrl?: string}) => {
        const response = await postAuthRequest(`/auth/identity/update`, payload)
        if (response?.status === 200) {
            return response?.data?.data[0]
        }
    }
)



export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.profile = action.payload
            })
        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message
        }),
            builder.addCase(updateProfile.pending, (state, action) => {
                
            }),
            builder.addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.profile = action.payload
            })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message
        })

    }
})

export const profileInfo = (state: RootState) => state.profiles.profile;

export const profileLoader = (state: RootState) => state.profiles.loading;



export default ProfileSlice.reducer;