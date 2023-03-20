import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import SafeViewAndroid from "./utils/AndroidSheet";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setUser(uid);
                setLoading(false);
                // ...
            } else {
                // User is signed out
                // ...
                setUser(null);
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

    if (!user) {
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
                                    <TouchableOpacity>
                                        <Text>back</Text>
                                    </TouchableOpacity>
                                ),
                                headerTitle: "",
                            }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerLeft: () => (
                                    <TouchableOpacity>
                                        <Text>back</Text>
                                    </TouchableOpacity>
                                ),
                                headerTitle: "",
                            }}
                        />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        );
    }

    if (user) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>User Loggd In</Text>
            </View>
        );
    }
}
