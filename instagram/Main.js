import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { fetchUser } from "./features/user/userSlice";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "./components/main/Feed";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./components/main/Profile";
const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return null;
};

const Main = () => {
    // const currentUser = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <Tab.Navigator initialRouteName="Feed">
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons color={color} size={24} name="home" />,
                }}
            />
            <Tab.Screen
                name="AddContainer"
                component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate("Add");
                    },
                })}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons color={color} size={24} name="plus-box" />,
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons color={color} size={24} name="account-circle" />,
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;
