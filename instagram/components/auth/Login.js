import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const onLogin = async () => {
        const { email, password } = form;
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log({ errorCode, errorMessage });
        }
    };

    return (
        <View>
            <View
                style={{
                    // flex: 1,
                    backgroundColor: "#F3F4F8",
                    marginRight: 10,
                    justifyContent: "center",
                    // alignItems: "center",
                    borderRadius: 12,
                    height: "100%",
                }}
            >
                <TextInput
                    placeholder="john@gmail.com"
                    onChangeText={(email) => setForm((prevForm) => ({ ...prevForm, email }))}
                    value={form?.email}
                    style={{
                        padding: 12,
                        borderColor: "grey",
                        borderWidth: 2,
                        margin: 20,
                    }}
                />

                <TextInput
                    placeholder="********"
                    secureTextEntry={true}
                    onChangeText={(password) => setForm((prevForm) => ({ ...prevForm, password }))}
                    value={form?.password}
                    style={{
                        padding: 12,
                        borderColor: "grey",
                        borderWidth: 2,
                        margin: 20,
                    }}
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: "#FE7654",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 16,
                        borderRadius: 16,
                        padding: 10,
                    }}
                    onPress={onLogin}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: "white",
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
