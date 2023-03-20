import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const onSignUp = async () => {
        const { email, password } = form;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            console.log(userCredential?.user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log({ errorCode, errorMessage });
        }
    };

    return (
        <View>
            <TextInput placeholder="john@gmail.com" onChangeText={(email) => setForm((prevForm) => ({ ...prevForm, email }))} value={form?.email} />

            <TextInput
                placeholder="********"
                secureTextEntry={true}
                onChangeText={(password) => setForm((prevForm) => ({ ...prevForm, password }))}
                value={form?.password}
            />

            <Button title="Login" onPress={onSignUp} />
        </View>
    );
};

export default Login;
