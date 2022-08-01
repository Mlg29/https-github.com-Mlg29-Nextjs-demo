import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import { OrdersState } from "../utils/types";
import { getRequest, postRequest, specialPostRequest } from "../utils/helper/helper"




const initialState: OrdersState = {
    sellerOrders: [],
    sellerOrderDetails: null,
    outOfStock: null,
    loading: null,
    error: null
}




export const getSellerOrders = createAsyncThunk(
    'orders/getOrders',
    async (payload: any) => {
        const response = await getRequest(`/sidehustle/orders/sales/${payload.id}?orderStatus=${payload.status}`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const searchOrder = createAsyncThunk(
    'order/searchOrder',
    async (payload: { search: string, id: string }) => {
        const response = await getRequest(`/sidehustle/orders/searchOrders?searchString=${payload.search}&sidehustleId=${payload.id}`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const getOutofStocks = createAsyncThunk(
    'orders/getOutofStocks',
    async (payload: any) => {
        const response = await getRequest(`/sidehustle/product/outOfStock?sidehustleId=${payload}`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const getSellerOrderDetail = createAsyncThunk(
    'orders/getOrderDetail',
    async (payload: any) => {
        const response = await getRequest(`/sidehustle/orders/sales/${payload.id}`)

        if (response?.status === 200) {
            const newData = response?.data.data?.find((data, i) => data?.id === payload?.orderId)
            return newData
        }
    }
)


export const changeOrderStatus = createAsyncThunk(
    'orders/changeOrderStatus',
    async (payload: any) => {
        const response = await specialPostRequest(`/sidehustle/orders/update/status?orderStatus=${payload?.status}&orderId=${payload?.orderId}`, payload.productId)
        if (response?.status === 200) {
            const newData = response?.data.data
            return newData
        }
    }
)


export const rejectAndCancelOrder = createAsyncThunk(
    'orders/rejectAndCancelOrder',
    async (payload: any) => {
        const response = await postRequest(`/sidehustle/orders/update/status?orderStatus=${payload.status}&orderId=${payload.orderId}`, payload.body)
        if (response?.status === 200) {
            const newData = response?.data.data
            return newData
        }
    }
)

export const orderSearch = createAsyncThunk(
    'orders/orderSearch',
    async (payload: any) => {
        const response = await getRequest(`/sidehustle/orders/searchOrders?searchString=${payload.searchValue}&sidehustleId=${payload.id}`)
        // if (response?.status === 200) {
        //     const newData = response?.data.data
        //     return newData
        // }
    }
)


export const SellerOrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetData: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getSellerOrders.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(getSellerOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.sellerOrders = action.payload
            })
        builder.addCase(getSellerOrders.rejected, (state, action) => {
            state.loading = false,
            state.sellerOrders = []
                state.error = action.error.message
        }),
        builder.addCase(searchOrder.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(searchOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.sellerOrders = action.payload
            })
        builder.addCase(searchOrder.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        }),
            builder.addCase(getSellerOrderDetail.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(getSellerOrderDetail.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.sellerOrderDetails = action.payload
            })
        builder.addCase(getSellerOrderDetail.rejected, (state, action) => {
            state.loading = false,
            state.sellerOrderDetails = null,
                state.error = action.error.message
        }),
            builder.addCase(changeOrderStatus.pending, (state, action) => {
                // state.loading = true
            }),
            builder.addCase(changeOrderStatus.fulfilled, (state, action: PayloadAction<any>) => {
                // state.loading = false,
                state.sellerOrderDetails = action.payload
            })
        builder.addCase(changeOrderStatus.rejected, (state, action) => {
            // state.loading = false,
            state.error = action.error.message
        }),
            builder.addCase(rejectAndCancelOrder.pending, (state, action) => {
                // state.loading = true
            }),
            builder.addCase(rejectAndCancelOrder.fulfilled, (state, action: PayloadAction<any>) => {
                // state.loading = false,
                state.sellerOrderDetails = action.payload
            })
        builder.addCase(rejectAndCancelOrder.rejected, (state, action) => {
            // state.loading = false,
            state.error = action.error.message
        }),
            builder.addCase(orderSearch.pending, (state, action) => {
                // state.loading = true
            }),
            builder.addCase(orderSearch.fulfilled, (state, action: PayloadAction<any>) => {
                // state.loading = false,
                // state.sellerOrderDetails = action.payload
            })
        builder.addCase(orderSearch.rejected, (state, action) => {
            // state.loading = false,
            state.error = action.error.message
        }),
        builder.addCase(getOutofStocks.pending, (state, action) => {
            state.loading = true
        }),
        builder.addCase(getOutofStocks.fulfilled, (state, action: PayloadAction<any>) => {
             state.loading = false,
            state.outOfStock = action.payload
        })
    builder.addCase(getOutofStocks.rejected, (state, action) => {
        state.loading = false,
        state.error = action.error.message
    })

    }
})

export const sellerOrders = (state: RootState) => state.orders.sellerOrders;

export const sellerOrderDetails = (state: RootState) => state.orders.sellerOrderDetails

export const orderLoader = (state: RootState) => state.orders.loading

export const outOfStocks = (state: RootState) => state.orders.outOfStock

export const{ resetData} = SellerOrderSlice.actions

export default SellerOrderSlice.reducer;