import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";

import { db, auth, storage } from "../../services/firebase";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    // const userRef = doc(db, "users", user?.uid);

    const [form, setForm] = useState({ email: "", password: "", name: "" });

    const onSignUp = async () => {
        const { email, password, name } = form;

        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                return setDoc(doc(db, "users", auth?.currentUser?.uid), {
                    name,
                    email,
                });
            })
            .then((data) => {
                console.log("user added");
            })
            .catch((err) => {
                console.log(err);
            });
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
                    placeholder="john"
                    onChangeText={(name) => setForm((prevForm) => ({ ...prevForm, name }))}
                    value={form?.name}
                    style={{
                        padding: 12,
                        borderColor: "grey",
                        borderWidth: 2,
                        margin: 20,
                    }}
                />
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
                    onPress={onSignUp}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: "white",
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
