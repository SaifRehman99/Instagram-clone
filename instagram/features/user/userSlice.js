import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

import { db, auth } from "../../services/firebase";

const initialState = {
    user: null,
};

export const fetchUser = createAsyncThunk("content/fetchUser", async () => {
    const docRef = doc(db, "users", auth?.currentUser?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            //   state.isLoading = true
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            //   state.isLoading = false
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            //   state.isLoading = false
            //   state.error = action.error.message
            state.user = null;
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
