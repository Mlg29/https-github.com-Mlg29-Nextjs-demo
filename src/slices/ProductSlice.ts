import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";
import { ProductCreateFormData, ProductState, ProductUpdateFormData, StoreCreateFormData } from "../utils/types";
import { postRequest, getRequest, uploadImageFunc } from "../utils/helper/helper"




const initialState: ProductState = {
    products: [],
    productBySlug: null,
    loading: false,
    error: null
}



export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (payload: ProductCreateFormData) => {
        const payloadData = {
            name: payload?.name,
            description: payload?.description,
            categories: payload?.categories,
            variants: payload?.variants,
            isDraft: payload?.isDraft,
            status: payload?.status
        }


        const response = await postRequest(`/sidehustle/${payload.id}/products/add`, payloadData)

        return response?.data

    }
)


export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (payload: ProductUpdateFormData) => {

        const response = await postRequest(`/sidehustle/product/${payload.id}/update`, payload)

    }
)



export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (payload: string) => {
        const response = await getRequest(`/sidehustle/${payload}/products`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const getProductBySlug = createAsyncThunk(
    'product/getProductBySlug',
    async (payload: string) => {
        const response = await getRequest(`/sidehustle/product/?slug=${payload}`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const searchProduct = createAsyncThunk(
    'product/searchProduct',
    async (payload: { search: string, id: string }) => {
        const response = await getRequest(`/sidehustle/seller/product/search?searchString=${payload.search}&sidehustleId=${payload.id}`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)


export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
            }),
            builder.addCase(createProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            }),
            builder.addCase(updateProduct.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
            }),
            builder.addCase(updateProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            }),
            builder.addCase(getProduct.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.products = action.payload
            })
        builder.addCase(getProduct.rejected, (state, action) => {
            state.products = []
            state.error = action.error.message
        }),
            builder.addCase(searchProduct.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(searchProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.products = action.payload
            })
        builder.addCase(searchProduct.rejected, (state, action) => {
            state.products = []
            state.error = action.error.message
        }),
            builder.addCase(getProductBySlug.pending, (state, action) => {
                state.loading = true,
                    state.productBySlug = null
            }),
            builder.addCase(getProductBySlug.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.productBySlug = action.payload
            })
        builder.addCase(getProductBySlug.rejected, (state, action) => {
            state.productBySlug = null,
                state.error = action.error.message
        })
    }
})

export const products = (state: RootState) => state.products.products;

export const productBySlug = (state: RootState) => state.products.productBySlug;


export default ProductSlice.reducer;