import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, collectionGroup, doc, getDoc, getDocs, query, orderBy, where, onSnapshot } from "firebase/firestore";

import { db, auth } from "../../services/firebase";

const initialState = {
    user: null,
    posts: [],
    following: [],
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

export const fetchUserFollowing = createAsyncThunk("content/fetchUserFollowing", async () => {
    const filteredData = [];

    // const docRef = collectionGroup(db, `userFollowing`);
    const docRef = collection(db, `following/${auth?.currentUser?.uid}/userFollowing`);

    const docSnap = await getDocs(docRef);

    // const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
    //     console.log(querySnapshot?.docs);
    //     querySnapshot.docs.forEach((doc) => {
    //         console.log(doc?.data());
    //         // filteredData.push(doc.data());
    //     });
    // });

    docSnap?.forEach((doc) => {
        filteredData.push(doc.id);
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

        builder.addCase(fetchUserFollowing.pending, (state) => {
            //   state.isLoading = true
        });
        builder.addCase(fetchUserFollowing.fulfilled, (state, action) => {
            //   state.isLoading = false
            state.following = action.payload;
        });
        builder.addCase(fetchUserFollowing.rejected, (state, action) => {
            //   state.isLoading = false
            //   state.error = action.error.message
            state.following = [];
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
