import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFollowing, fetchUserPosts } from "../../features/user/userSlice";
import { auth, db } from "../../services/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

const Profile = ({ navigation, route }) => {
    const [user_, setUser] = useState(null);
    const [isFollowing, setFollowing] = useState(false);

    const dispatch = useDispatch();
    const { user, posts, following } = useSelector((state) => state?.user);

    console.log(following, "---");
    useEffect(() => {
        dispatch(fetchUserPosts(route?.params?.id));
        console.log(1);

        if (route?.params?.id) {
            (async () => {
                const docRef = doc(db, "users", route?.params?.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data());
                } else {
                    setUser(null);
                }
            })();
        } else {
        }

        if (following.indexOf(route?.params?.id) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
    }, [route, following]);

    const onFollowOrUnfollow = async () => {
        isFollowing
            ? await deleteDoc(doc(db, `following/${auth?.currentUser?.uid}/userFollowing/${route?.params?.id}`))
            : await setDoc(doc(db, `following/${auth?.currentUser?.uid}/userFollowing/${route?.params?.id}`), {});

        dispatch(fetchUserFollowing());
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{user_ ? user_?.name : user?.name}</Text>
                <Text>{user_ ? user_?.email : user?.email}</Text>

                {route?.params?.id !== auth.currentUser?.uid ? (
                    <Button title={isFollowing ? "Following" : "Follow"} onPress={() => onFollowOrUnfollow()} />
                ) : null}
            </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                resizeMode="contain"
                                source={{ uri: item.url }}
                                // fadeDuration={2000}
                                onProgress={({ nativeEvent: { loaded, total } }) => {
                                    // console.log(loaded, total);
                                }}
                                onLoadStart={() => {
                                    // console.log("loading....");
                                }}
                                onLoadEnd={() => {
                                    // console.log("loaded....");
                                }}
                                progressiveRenderingEnabled={true}
                                loadingIndicatorSource={{ uri: "https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Emotes-face-smile-icon.png" }}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    containerInfo: {
        margin: 10,
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3,
        marginBottom: 20,
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
    },
});

export default Profile;
