import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, collectionGroup, doc, getDoc, getDocs, query, orderBy, where } from "firebase/firestore";

import { db, auth } from "../../services/firebase";

const initialState = {
    user: null,
    posts: [],
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

export const fetchUserPosts = createAsyncThunk("content/fetchUserPosts", async (id) => {
    const docRef = collection(db, `posts/${id ?? auth?.currentUser?.uid}/userPosts`);

    const q = query(docRef, orderBy("creation", "desc"));

    const docSnap = await getDocs(q);

    const filteredData = [];

    docSnap.forEach((doc) => {
        filteredData.push({
            id: doc.id,
            creation: doc.data().creation?.toDate().getTime(),
            ...doc.data(),
        });
    });

    return filteredData;
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

        builder.addCase(fetchUserPosts.pending, (state) => {
            //   state.isLoading = true
        });
        builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
            //   state.isLoading = false
            state.posts = action.payload;
        });
        builder.addCase(fetchUserPosts.rejected, (state, action) => {
            //   state.isLoading = false
            //   state.error = action.error.message
            state.posts = [];
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
