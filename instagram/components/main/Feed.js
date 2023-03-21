import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../features/user/userSlice";

const Feed = () => {
    const dispatch = useDispatch();
    const { user, posts } = useSelector((state) => state?.user);

    useEffect(() => {
        dispatch(fetchUserPosts());
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{user?.name}</Text>
                <Text>{user?.email}</Text>
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
                                    console.log(loaded, total);
                                }}
                                onLoadStart={() => {
                                    console.log("loading....");
                                }}
                                onLoadEnd={() => {
                                    console.log("loaded....");
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

export default Feed;
