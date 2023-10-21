import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button, ImageBackground, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import * as ImagePicker from 'expo-image-picker';
import { firebase, storage } from '../database';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Timestamp } from 'firebase/firestore';

const IdentifyScreen = ({ navigation }) => {
    console.log("############################### saler page ###############################")
    const [id, setid] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [idCard, setIdCard] = useState("");
    const [image, setImage] = useState(null);
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
                        });
                        setid(res.id)
                        setName(info.name)
                        setPhone(info.phone),
                        setAddress(info.address)
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


    console.log("data", data)


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        const source = { uri: result.assets[0].uri };
        setImage(source);
    }


    const timestamp = Timestamp.now();

    const regisToSaler = async () => {

        const blob = await fetch(image.uri).then((response) => response.blob());
        const filename = Date.now() + '.jpg';
        const imageRef = ref(storage, filename);

        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);

        firebase
            .firestore()
            .collection("regisToSaler")
            .add({
                name: name,
                image: downloadURL,
                email: user.email,
                idCard: idCard,
                address: address,
                phone: phone,
                createAt: timestamp
            })
            .then(() => {
                // setName("");
                // setImage(null);
                // setIdCard("")
                // setAddress("")
                // setPhone("")

                Alert.alert(
                    "Your request has been successfully sent.",
                    "We will reply within 3 days.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate('Profile');
                            },
                        },
                    ]
                );


            });
    }

























    return (
        <ScrollView>
            <View style={styles.container}>

                {/* <Text style={styles.title}> Saler {'\n'}</Text> */}
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} value={name} placeholder='Name'
                    onChangeText={(val) => {
                        setName(val)
                    }} />

                <Text style={styles.label}>ID Card</Text>
                <TextInput style={styles.input} value={idCard} keyboardType='numeric' placeholder='ID Card Number'
                    onChangeText={(val) => {
                        setIdCard(val)
                    }} />

                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} value={address} placeholder='Address' keyboardType='phone-pad'
                    onChangeText={(val) => {
                        setAddress(val)
                    }} />

                <Text style={styles.label}>Phone</Text>
                <TextInput style={styles.input} placeholder='Contract' value={phone} keyboardType='phone-pad'
                    onChangeText={(val) => {
                        setPhone(val)
                    }} />

                <Text style={styles.label}> {'\n'} Certified True Copy </Text>

                <ImageBackground
                    source={image ? { uri: image.uri } : require('../assets/upload.png')}
                    style={styles.backgroundImage}
                >
                    <TouchableOpacity style={[styles.selectImage, { marginTop: 20, marginBottom: 10, width: '80%', }]}
                        onPress={pickImage}>
                        {/* <Text style={{ color: '#000', textAlign: 'center', fontSize: 20, }}>Select Image</Text> */}

                    </TouchableOpacity>
                </ImageBackground>

                <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%' }]}
                    onPress={regisToSaler}>
                    <Text style={styles.buttonText}>CONFIRM</Text>
                </TouchableOpacity>
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
        paddingVertical: responsiveHeight(5)
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
    selectImage: {
        // borderWidth: 2,
        // borderRadius: 10,
        padding: 50,
        marginBottom: 15,
        justifyContent: "center",
    },
    label: {
        fontSize: 20,
        textAlign: 'left',
        width: '80%'

    },
    title: {
        fontSize: 40,
        fontWeight: '400',
        margin: 0
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
        letterSpacing: 3,
        fontSize: 20
    },
    backgroundImage: {
        flex: 1,
        width: responsiveWidth(80),
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});


export default IdentifyScreen;

