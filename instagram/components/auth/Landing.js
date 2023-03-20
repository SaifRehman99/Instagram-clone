import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Landing = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
            }}
        >
            <TouchableOpacity
                style={{
                    backgroundColor: "#FE7654",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 16,
                    borderRadius: 16,
                    padding: 10,
                    margin: 30,
                }}
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={{ color: "white" }}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#FE7654",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 16,
                    borderRadius: 16,
                    padding: 10,
                    margin: 30,
                }}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>

            <Text></Text>
        </View>
    );
};

export default Landing;
