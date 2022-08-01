import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import { StoreState, StoreCreateFormData, StoreUpdateFormData } from "../utils/types";
import { postRequest, getRequest, uploadImageFunc } from "../utils/helper/helper"




const initialState: StoreState = {
    myStore: [],
    storeRatings: null,
    allStores: [],
    storeById: null,
    loading: false,
    error: null
}



export const createStore = createAsyncThunk(
    'store/createStore',
    async (payload: StoreCreateFormData) => {
        const response = await postRequest("/sidehustle/account/create", payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const updateStore = createAsyncThunk(
    'store/updateStore',
    async (payload: StoreUpdateFormData) => {
        const payloadData = {
            brandName: payload.brandName,
            description: payload.description,
            imgUrl: payload.imgUrl,
            address: payload.address,
            phoneNumber: payload.phoneNumber,
            location: payload.location,
            isDraft: payload.isDraft,
            status: payload.status
        }
        const response = await postRequest(`/sidehustle/account/${payload.id}/update`, payloadData)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)



export const getPersonalStore = createAsyncThunk(
    'store/myStore',
    async () => {
        const response = await getRequest("/sidehustle/account")
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const getStoreById = createAsyncThunk(
    'store/getStoreById',
    async (payload: string) => {
        const response = await getRequest(`/sidehustle/${payload}/details`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)


export const getAllStore = createAsyncThunk(
    'store/allStore',
    async () => {
        const response = await getRequest("/sidehustle/category")
        if (response?.status === 200) {
            return response?.data?.data
        }

    }
)

export const getStoreRating = createAsyncThunk(
    'store/getStoreRating',
    async (payload: string) => {
        const response = await getRequest(`/sidehustle/rate/ratings?sidehustleId=${payload}`)
        if (response?.status === 200) {
            return response?.data?.data
        }

    }
)


export const uploadImage = createAsyncThunk(
    'store/upload',
    async (payload: any) => {
        const response = await uploadImageFunc(payload)
        if (response?.status === 200) {
            return response?.data?.data?.url
        }
    }
)




export const StoreSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createStore.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(createStore.fulfilled, (state, action) => {
                state.loading = false,
                state.storeById = action.payload
               
            }),
            builder.addCase(createStore.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            }),
            builder.addCase(updateStore.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(updateStore.fulfilled, (state, action) => {
                state.loading = false
            }),
            builder.addCase(updateStore.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            }),
            builder.addCase(getPersonalStore.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(getPersonalStore.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.myStore = action.payload
            })
        builder.addCase(getPersonalStore.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(getAllStore.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(getAllStore.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.allStores = action.payload
            })
        builder.addCase(getAllStore.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(uploadImage.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(uploadImage.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
            })
        builder.addCase(uploadImage.rejected, (state, action) => {
            state.error = action.error.message
        }),
            builder.addCase(getStoreById.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(getStoreById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.storeById = action.payload
            })
        builder.addCase(getStoreById.rejected, (state, action) => {
            state.error = action.error.message
        }),
        builder.addCase(getStoreRating.pending, (state, action) => {
            state.loading = true
        }),
        builder.addCase(getStoreRating.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.storeRatings = action.payload
        })
    builder.addCase(getStoreRating.rejected, (state, action) => {
        state.error = action.error.message
    })
    }
})

export const myStore = (state: RootState) => state.store.myStore;

export const allStores = (state: RootState) => state.store.allStores;

export const storeRatings = (state: RootState) => state.store.storeRatings;

export const storebyId = (state: RootState) => state.store.storeById;

export default StoreSlice.reducer;