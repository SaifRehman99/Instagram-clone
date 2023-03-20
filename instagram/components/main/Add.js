import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
    const [galleryPermission, requestGalleryPermission] = ImagePicker.useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

    if (!cameraPermission || !galleryPermission) return <View />;

    if (!cameraPermission.granted || !galleryPermission?.granted)
        return (
            <View>
                <Text>Permission denied</Text>
            </View>
        );

    function toggleCameraType() {
        setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function takePicture() {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    async function pickImage() {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={styles.cameraContainer}>
                    <Camera style={styles.camera} type={type} ratio={"1:1"} ref={(ref) => setCamera(ref)} />
                </View>

                <Button onPress={toggleCameraType} title="Flip" />

                <Button onPress={takePicture} title="Click" />
                <Button onPress={pickImage} title="Gallery" />

                {image && <Image source={{ uri: image }} style={{ flex: 1, height: "20%" }} />}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: "row",
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
});
