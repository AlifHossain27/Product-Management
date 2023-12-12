import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuthenticated: boolean;
}

const initialState = {
    value: {
        isAuthenticated: false
    } as AuthState
} as InitialState

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction) => {
            return {
                value: {
                    isAuthenticated: true
                }
            }
        }
    }
})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;