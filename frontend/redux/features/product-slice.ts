import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: ProductState;
}

type ProductState = {
    productList: ProductData[];
}

interface ProductData {
    product_name: string;
    quantity: number;
    amount: number;
}

const initialState = {
    value: {
        productList: []
    } as ProductState
} as InitialState

export const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetList: () => initialState,
        addList: (state, action: PayloadAction<ProductData[]>) => {
            return {
                value: {
                    productList: action.payload
                }
            };
        }
    }
});

export const { resetList, addList } = products.actions;
export default products.reducer;