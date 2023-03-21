import { Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import SafeViewAndroid from "./utils/AndroidSheet";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddScreen from "./components/main/Add";

import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { icons } from "./constants";

import { store } from "./store";

import { Provider } from "react-redux";

import Main from "./Main";
import Save from "./components/main/Save";

const Stack = createNativeStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(true);

            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setLoggedIn(uid);
                setLoading(false);
                // ...
            } else {
                // User is signed out
                // ...
                setLoggedIn(false);
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>Loading.....</Text>
            </View>
        );
    }

    if (!loggedIn) {
        return (
            <NavigationContainer>
                <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{
                                headerLeft: () => (
                                    <TouchableOpacity
                                        style={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: "white",
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            source={icons?.chevronLeft}
                                            resizeMode="cover"
                                            style={{
                                                width: "50%",
                                                height: "50%",
                                                borderRadius: 10 / 1.25,
                                                backgroundColor: "#F3F4F8",
                                            }}
                                        />
                                    </TouchableOpacity>
                                ),
                                headerTitle: "",
                                headerShadowVisible: false,
                            }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerLeft: (props) => (
                                    <TouchableOpacity
                                        onPress={(e) => {
                                            console.log(e.navigation);
                                        }}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: "white",
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            source={icons?.chevronLeft}
                                            resizeMode="cover"
                                            style={{
                                                width: "50%",
                                                height: "50%",
                                                borderRadius: 10 / 1.25,
                                                backgroundColor: "#F3F4F8",
                                            }}
                                        />
                                    </TouchableOpacity>
                                ),
                                headerTitle: "",
                                headerShadowVisible: false,
                            }}
                        />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                        <Stack.Screen name="Add" component={AddScreen} />
                        <Stack.Screen name="Save" component={Save} />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        </Provider>
    );
}
