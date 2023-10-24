// import React, { useState, useEffect } from 'react';
import React, { useEffect, useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { firebase, auth, storage } from '../database';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import { uploadBytesResumable, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
    const [image, setImage] = useState(null);
    const [isImageError, setIsImageError] = useState(false);
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
                            addressName: info.addressName,
                            photoURL: info.photoURL
                        });
                        setid(res.id)
                        setName(info.name)
                        setPhone(info.phone)
                        setAddress(info.address)
                        setEmail(info.email)
                        setAddressName(info.addressName)
                        setImage({ uri: info.photoURL })
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

    const [loaded] = useFonts({
        Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
    });
    if (!loaded) {
        return null;
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.assets)
        if (result.assets == null) {
            setIsImageError(true)
        }

        const source = { uri: result.assets[0].uri };

        setImage(source);
        if (source == "") {
            setIsImageError(true)
        }


    }

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


        const blob = await fetch(image.uri).then((response) => response.blob());
        const filename = Date.now() + '.jpg';
        const imageRef = ref(storage, filename);

        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);
        try {
            const userRef = doc(firebase.firestore(), "users", id);
            await updateDoc(userRef, {
                id: id,
                name: name,
                phone: phone,
                address: address,
                email: email,
                addressName: addressName,
                photoURL: downloadURL
            });
            await user.updateProfile({
                photoURL: downloadURL,
            });
            console.log("อัปเดตข้อมูลเรียบร้อยแล้ว");
            Alert.alert(
                "Update Success",
                "New information was updated!!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('Profilee'); // Replace 'Admin' with the correct screen name
                        },
                    },
                ]
            );
        } catch (e) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", e);
        }
    };
    console.log(user.photoURL)
    return (
        <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
            <View style={styles.container}>
                {/* <Text style={[styles.title, { marginBottom: 10 }]}> Setting </Text> */}
                <Text style={[styles.label, { textAlign: 'center' }]}>Account</Text>
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

                <Text style={styles.label}> Profile Picture </Text>
                <ImageBackground
                    source={image ? { uri: image.uri } : require('../assets/upload.png')}
                    style={styles.backgroundImage}
                >
                    <TouchableOpacity style={[styles.selectImage, { marginTop: 20, marginBottom: 10 }]}
                        onPress={pickImage}>

                    </TouchableOpacity>
                </ImageBackground>
                <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]} onPress={updateUser}>
                    <Text style={styles.buttonText}>CONFIRM</Text>
                </TouchableOpacity>

                <View style={{ width: "100%", bottom: 0, position: 'absolute' }}>
                    <Button title="LogOut" color={"#c8b8ff"} onPress={handleSignOut} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingVertical: responsiveHeight(5)
        // margin: 5,
    },
    logo: {
        width: responsiveWidth(40),
        height: responsiveHeight(20),
        borderRadius: 100,
    },
    input: {
        fontSize: 18,
        borderBottomColor: "#262B46",
        backgroundColor: '#F6F7F9',
        width: "80%",
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 5,
        paddingVertical: 10,
        marginBottom: 15,
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
        backgroundColor: '#8667F2',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 20
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
    selectImage: {
        padding: 50,
        marginBottom: 15,
        justifyContent: "center",
        // width: responsiveWidth(30),
        // height: responsiveHeight(30)
    },
    backgroundImage: {
        flex: 1,
        width: responsiveWidth(80),
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});


export default SettingAccount;

