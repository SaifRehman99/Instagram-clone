import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const [form, setForm] = useState({ email: "", password: "", name: "" });

    const onSignUp = async () => {
        const { email, password } = form;
        try {
            const data = await createUserWithEmailAndPassword(auth, email, password);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <TextInput placeholder="john" onChangeText={(name) => setForm((prevForm) => ({ ...prevForm, name }))} value={form?.name} />

            <TextInput placeholder="john@gmail.com" onChangeText={(email) => setForm((prevForm) => ({ ...prevForm, email }))} value={form?.email} />

            <TextInput
                placeholder="********"
                secureTextEntry={true}
                onChangeText={(password) => setForm((prevForm) => ({ ...prevForm, password }))}
                value={form?.password}
            />

            <Button title="Sign Up" onPress={onSignUp} />
        </View>
    );
};

export default Register;
