// import React, { useState, useEffect } from 'react';
import React, { useEffect, useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Button, } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { firebase, auth } from '../database';
import { collection, query, where, doc, getDoc, updateDoc, deleteDoc, } from "firebase/firestore";

const SettingAccount = ({ navigation, route }) => {
    console.log("############################### setting page ###############################")
    const [id, setid] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [addressName, setAddressName] = useState("");
    const [data, setData] = useState([]);
    const user = firebase.auth().currentUser;
    const fetchData = () => {
        const collectionRef = firebase.firestore().collection("users");
        collectionRef.get()
            .then((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((res) => {
                    let info = res.data();
                    if (info.email === user.email) {
                        items.push({
                            key: res.id,
                            name: info.name,
                            phone: info.phone,
                            address: info.address,
                            email: info.email,
                            addressName: info.addressName
                        });
                        setid(res.id)
                        setName(info.name)
                        setPhone(info.phone),
                            setAddress(info.address),
                            setEmail(info.email),
                            setAddressName(info.addressName)
                    }
                });
                setData(items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                console.log("finally")
            });
    };
    useEffect(() => {
        fetchData();
    }, []);


    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")

            })
            .catch(error => alert(error.message))
    }


    console.log("data 3 ????", data);
    const updateUser = async () => {
        console.log(id)
        try {
            const userRef = doc(firebase.firestore(), "users", id);
            await updateDoc(userRef, {
                id: id,
                name: name,
                phone: phone,
                address: address,
                email: email,
                addressName: addressName
            });
            console.log("อัปเดตข้อมูลเรียบร้อยแล้ว");
            Alert.alert(
                "Update Success",
                "New information was updated!!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('Profile'); // Replace 'Admin' with the correct screen name
                        },
                    },
                ]
            );
        } catch (e) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", e);
        }
    };

    return (
        <View style={styles.container}>
            {/* <Text style={[styles.title, { marginBottom: 10 }]}> Setting </Text> */}

            <TextInput style={styles.input} placeholder='Username'
                value={name}
                onChangeText={(val) => setName(val)} />

            <TextInput
                multiline
                // numberOfLines={4}
                style={[styles.input,]}
                placeholder='Email'
                value={email}
                onChangeText={(val) => setEmail(val)}
                editable={false} />

            <TextInput style={styles.input} placeholder='phone number' keyboardType='numeric'
                value={phone}
                onChangeText={(val) => setPhone(val)} />


            <Text style={[styles.label, { textAlign: 'center', marginTop: 20 }]}>Address</Text>

            <TextInput style={styles.input} placeholder='Name'
                value={addressName}
                onChangeText={(val) => setAddressName(val)} />
            <TextInput
                multiline
                numberOfLines={4}
                style={styles.input}
                placeholder='Address'
                value={address}
                onChangeText={(val) => setAddress(val)} />

            <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]} onPress={updateUser}>
                <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>

            <View style={{ width: "100%", position: 'absolute', bottom: 0 }}>
                <Button title="LogOut" color={"#c8b8ff"} onPress={handleSignOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 5,
    },
    logo: {
        width: responsiveWidth(40),
        height: responsiveHeight(20),
        borderRadius: 100,
    },
    input: {
        fontSize: 16,
        borderBottomColor: "#262B46",
        backgroundColor: '#eee',
        width: "80%",
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginTop: 5,
        fontFamily: 'Anuphan'
    },
    label: {
        fontSize: 18,
        textAlign: 'left',
        width: '80%',
        marginTop: 10,
        fontFamily: 'Anuphan'

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Anuphan'
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        width: '80%',
        marginBottom: 10,
        fontFamily: 'Anuphan'
    },
    button: {
        backgroundColor: '#9276F2',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Anuphan'
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '80%'
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '80%'
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'Anuphan'
    },
});


export default SettingAccount;

