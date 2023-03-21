import { View, Text, TextInput, Image, Button } from "react-native";
import React, { useState } from "react";

import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";

import { db, auth, storage } from "../../services/firebase";
import { useDispatch } from "react-redux";
import { fetchUserPosts } from "../../features/user/userSlice";

export default function Save({ navigation, route }) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState("");
    const image = route?.params.image;

    const uploadFile = async () => {
        if (!image) return;

        const response = await fetch(image);
        const blob = await response.blob();
        const fileName = Math.random().toString(36);

        const storageRef = ref(storage, `post/${auth?.currentUser?.uid}/${fileName}`);

        try {
            await uploadBytes(storageRef, blob);

            const url = await getDownloadURL(storageRef);

            savePost(url);
        } catch (err) {
            console.log(err);
        }

        // const uploadTask = uploadBytesResumable(storageRef, blob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        // uploadTask.on(
        //     "state_changed",
        //     (snapshot) => {
        //         // Observe state change events such as progress, pause, and resume
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log("Upload is " + progress.toFixed(2) + "% done");
        //         switch (snapshot.state) {
        //             case "paused":
        //                 console.log("Upload is paused");
        //                 break;
        //             case "running":
        //                 console.log("Upload is running");
        //                 break;
        //         }
        //     },
        //     (error) => {
        //         // Handle unsuccessful uploads
        //         console.error(error);
        //     },
        //     () => {
        //         // Handle successful uploads on complete
        //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             console.log("File available at", downloadURL);
        //         });
        //     }
        // );
    };

    const savePost = async (url) => {
        try {
            await addDoc(collection(db, `posts/${auth?.currentUser?.uid}/userPosts`), {
                url,
                caption,
                creation: serverTimestamp(),
            });

            dispatch(fetchUserPosts());

            // go to the initial route
            navigation.popToTop();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: image }} />
            <TextInput placeholder="Write a Caption" onChangeText={(value) => setCaption(value)} />

            <Button title="Upload" onPress={uploadFile} />
        </View>
    );
}
