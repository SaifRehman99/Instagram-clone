import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Search({ navigation }) {
    const [users, setUsers] = useState([]);

    const fetchUser = async (search) => {
        try {
            const docRef = collection(db, `users`);

            const q = query(docRef, where("name", ">=", search));

            const docSnap = await getDocs(q);

            const filteredData = [];

            docSnap.forEach((doc) => {
                filteredData.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            console.log(filteredData);

            setUsers(filteredData);
        } catch (error) {
            console.log(error);
        }
    };

    const myDebounce = (fn, delay) => {
        let timer;

        return function (...args) {
            if (timer) clearInterval(timer);

            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const handleChange = myDebounce((data) => {
        fetchUser(data);
    }, 2000);

    return (
        <View>
            <TextInput placeholder="Search for users..." onChangeText={handleChange} />

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile", { id: item.id })}>
                        <Text>{item?.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
