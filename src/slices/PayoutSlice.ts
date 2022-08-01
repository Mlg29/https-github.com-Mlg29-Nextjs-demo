import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import { PayoutBody, PayoutState } from "../utils/types";
import { bankVerification, getRequest, postRequest, specialPostRequest } from "../utils/helper/helper"





const initialState: PayoutState = {
    payout: [],
    loading: null,
    error: null
}




export const addPayouts = createAsyncThunk(
    'payout/addPayouts',
    async (payload: PayoutBody ) => {
        const response = await postRequest(`/sidehustle/account/payouts`, payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)


export const getPayouts = createAsyncThunk(
    'payout/getPayouts',
    async () => {
        const response = await getRequest(`/sidehustle/account/payouts`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const deletePayout = createAsyncThunk(
    'payout/deletePayout',
    async (payload: string) => {
        const response = await specialPostRequest(`/sidehustle/account/payouts/${payload}/delete`, payload)

        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const updatePayout = createAsyncThunk(
    'payout/updatePayout',
    async (payload: any) => {
        const payloadData = {
            name: payload.name,
            account: payload?.account,
            bankName: payload?.bankName,
            backCode: payload.backCode
        }
        const response = await postRequest(`/sidehustle/account/payouts/${payload.id}/update`, payloadData)

        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)


export const verifyAccount = createAsyncThunk(
    'verify/verifyAccount',
    async (payload: any) => {
        var response = await bankVerification(payload)
        if (response?.status === 200) {
            return response
        }
    }
)


export const PayoutSlice = createSlice({
    name: 'payout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPayouts.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(getPayouts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.payout = action.payload
            })
        builder.addCase(getPayouts.rejected, (state, action) => {
            state.loading = false,
            state.payout = []
                state.error = action.error.message
        }),
        builder.addCase(addPayouts.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(addPayouts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                    // state.sellerOrderDetails = action.payload
            })
        builder.addCase(addPayouts.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        }),
        builder.addCase(updatePayout.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(updatePayout.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                    // state.sellerOrderDetails = action.payload
            })
        builder.addCase(updatePayout.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        }),
        builder.addCase(deletePayout.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(deletePayout.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                    // state.sellerOrderDetails = action.payload
            })
        builder.addCase(deletePayout.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        }),
        builder.addCase(verifyAccount.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(verifyAccount.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                    // state.sellerOrderDetails = action.payload
            })
        builder.addCase(verifyAccount.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        })

    }
})

export const payouts = (state: RootState) => state.payouts.payout;



export default PayoutSlice.reducer;